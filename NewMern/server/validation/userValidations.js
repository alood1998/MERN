const { body } = require("express-validator");

class UserValidations {
  regValidation = [
    body("fullName", "Имя не может быть короче 2 символов")
      .isLength({ min: 3 })
      .isString(),
    body("surName", "Фамилия не может быть короче 2 символов")
      .isLength({ min: 3 })
      .isString(),
    body("email", "Введите коректный email").isEmail(),
    body("password", "Пароль не может быть короче 6 символов").isLength({
      min: 6,
      max: 32,
    }),
  ];

  logValidation = [
    body("email", "Введите коректный email").normalizeEmail().isEmail(),
    body("password", "Пароль не может быть короче 6 символов").exists(),
  ];

  userDataChange = [
    body("patronymic", "Отчество не может быть короче 2 символов").isString(),
    body("gender", "Выберите ваш пол").isString(),
    body("birthday", "Укажите дату рождения").isString(),
  ];

  logChange = [
    body("email", "Введите коректный email").normalizeEmail().isEmail(),
  ];

  passwordChange = [
    body("password", "Пароль не может быть короче 5 символов").isLength({
      min: 5,
      max: 32,
    }),
  ];
}
module.exports = new UserValidations();
