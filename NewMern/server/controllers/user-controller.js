const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest(
            "Некоректные данные при регистрации",
            errors.array()
          )
        );
      }
      const {
        email,
        password,
        fullName,
        surName,
        patronymic = "",
        birthday = "ДД.ММ.ГГГГ",
        gender = "",
        avatar = "",
      } = req.body;

      const user = await userService.registration(
        email,
        password,
        fullName,
        surName,
        patronymic,
        birthday,
        gender,
        avatar
      );
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async googleRegistration(req, res, next) {
    try {
      const { email, givenName, imageUrl } = req.body;
      const user = await userService.googleRegistration(
        email,
        givenName,
        imageUrl
      );
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async googleLogin(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userService.googleLogin(email);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async getUser(req, res, next) {
    try {
      const userId = req.userId;
      const user = await userService.getUser(userId);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async userDataChange(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest(
            "Некоректные данные при заполнении поля",
            errors.array()
          )
        );
      }
      const { fullName, gender, birthday, id, patronymic, surName } = req.body;
      const user = await userService.userDataChange(
        fullName,
        gender,
        birthday,
        id,
        patronymic,
        surName
      );

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async loginChange(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest(
            "Некоректные данные при заполнении поля",
            errors.array()
          )
        );
      }
      const { email, id } = req.body;
      const user = await userService.loginChange(email, id);

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async passwordChange(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest(
            "Некоректные данные при заполнении поля",
            errors.array()
          )
        );
      }
      const { password, newPassword, id } = req.body;
      const user = await userService.passwordChange(password, newPassword, id);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async sendPasswordLink(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userService.sendPasswordLink(email);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async recoveryPassword(req, res, next) {
    try {
      const { email, newPassword } = req.body;
      const user = await userService.recoveryPassword(email, newPassword);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async avatarUpload(req, res, next) {
    try {
      const { id } = req.body;
      const file = req.files.avatar;
      const user = await userService.avatarUpload(id, file);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
