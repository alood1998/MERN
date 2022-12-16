const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  fullName: { type: String, required: true },
  surName: { type: String },
  password: { type: String },
  patronymic: { type: String },
  birthday: { type: String },
  gender: { type: String },
  avatar: String,
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  temporaryPassword: { type: String },
});

module.exports = model("User", UserSchema);
