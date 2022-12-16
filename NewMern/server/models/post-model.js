const { Schema, model, mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    // likesCount: [{ type: ObjectId, ref: "User" }],
    // like: { type: Boolean, default: false },
    likesCount: [{}],
    viewsCount: { type: Number, default: 0 },
    picture: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", UserSchema);
