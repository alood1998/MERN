const UserModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const generator = require("generate-password");
const jwt = require("jsonwebtoken");
const mailService = require("./mail-service");
const mailSendPassword = require("./mail-sendPassword");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const fileService = require("./fileService");

class UserService {
  async registration(
    email,
    password,
    fullName,
    surName,
    patronymic,
    birthday,
    gender,
    avatar
  ) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь ${email} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
      fullName,
      surName,
      patronymic,
      birthday,
      gender,
      avatar,
      temporaryPassword: "",
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return { user: userDto, token };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return { user: userDto, token };
  }

  async googleRegistration(email, givenName, imageUrl) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь ${email} уже существует`);
    }
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email,
      password: "",
      activationLink,
      fullName: givenName,
      surName: "",
      patronymic: "",
      birthday: "ДД.ММ.ГГГГ",
      gender: "",
      avatar: imageUrl,
      temporaryPassword: "",
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return { user: userDto, token };
  }

  async googleLogin(email) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }

    const userDto = new UserDto(user);
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return { user: userDto, token };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Неккоректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }

  async getUser(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден");
    }
    const userDto = new UserDto(user);

    return { user: userDto };
  }

  async userDataChange(fullName, gender, birthday, id, patronymic, surName) {
    const user = await UserModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        fullName,
        gender,
        birthday,
        patronymic,
        surName,
      },
      { new: true }
    );
    const userDto = new UserDto(user);
    return { user: userDto };
  }

  async loginChange(email, id) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь ${email} уже существует`);
    }
    const user = await UserModel.findOneAndUpdate(
      {
        _id: id,
      },
      { email },
      { new: true }
    );
    const userDto = new UserDto(user);

    return { user: userDto };
  }

  async passwordChange(password, newPassword, id) {
    const user_id = await UserModel.findOne({ id });

    const isPassEquals = await bcrypt.compare(password, user_id.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Введен неверный текущий пароль");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const user = await UserModel.findOneAndUpdate(
      {
        _id: id,
      },
      { password: hashedPassword },
      { new: true }
    );
    const userDto = new UserDto(user);

    return { message: "Пароль успешно изменен" };
  }

  async sendPasswordLink(email) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }

    const password = generator.generate({
      length: 10,
      numbers: true,
    });
    const hashPassword = await bcrypt.hash(password, 3);

    const temporaryPassword = jwt.sign(
      { hashPassword },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );
    await UserModel.findOneAndUpdate(
      {
        _id: user.id,
      },
      { temporaryPassword },
      { new: true }
    );
    await mailSendPassword.sendPasswordMail(email, password);
    return {
      message:
        "На указанный адрес электронной почты отправлен временный пароль, введите его",
    };
  }

  async recoveryPassword(email, newPassword) {
    const candidate = await UserModel.findOne({ email });
    const oldDecodedPassword = jwt.verify(
      candidate.temporaryPassword,
      process.env.JWT_SECRET
    );
    const isPassEquals = await bcrypt.compare(
      newPassword,
      oldDecodedPassword.hashPassword
    );
    if (!isPassEquals) {
      throw ApiError.BadRequest("Введен неверный временный пароль");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const user = await UserModel.findOneAndUpdate(
      {
        _id: candidate.id,
      },
      { password: hashedPassword, temporaryPassword: "" },
      { new: true }
    );
    const userDto = new UserDto(user);

    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return { user: userDto, token };
  }

  async avatarUpload(id, file) {
    const fileName = fileService.saveFile(file);
    const user = await UserModel.findOneAndUpdate(
      {
        _id: id,
      },
      { avatar: fileName },
      { new: true }
    );
    const userDto = new UserDto(user);
    return { user: userDto };
  }
}

module.exports = new UserService();
