module.exports = class UserDto {
  email;
  id;
  isActivated;
  fullName;
  surName;
  patronymic;
  birthday;
  gender;
  avatar;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.fullName = model.fullName;
    this.surName = model.surName;
    this.patronymic = model.patronymic;
    this.birthday = model.birthday;
    this.gender = model.gender;
    this.avatar = model.avatar;
  }
};
