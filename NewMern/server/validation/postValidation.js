const { body } = require("express-validator");

class UserValidations {
  postCreateValidation = [
    body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
    body("body", "Минимальная длина 10 символов")
      .isLength({ min: 10 })
      .isString(),
    body("picture", "Неверная ссылка на изображение").optional().isString(),
  ];
}

module.exports = new UserValidations();
