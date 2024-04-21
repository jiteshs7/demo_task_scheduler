const Mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { REGEX } = require("../shared/Constants");

const UserSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your full name"],
      match: [REGEX.FULL_NAME, "Please add valid name."],
      minLength: 2,
    },
    email: {
      type: String,
      unique: true,
      match: [REGEX.EMAIL, "Please add a valid email"],
      required: [true, "Please enter your email address"],
      minLength: 2,
    },
    password: {
      type: String,
      required: [true, "Please enter password with minimum 8 characters"],
      minLength: 8,
    },
  },
  {
    timestamps: true,
  }
);

// @desc helps to match encrypted password
UserSchema.methods.matchPassword = async function (enteredPass) {
  if (typeof enteredPass === "number") enteredPass += "";

  const result = await bcrypt.compare(enteredPass, this.password);
  return result;
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified) return next();

  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(this.password, salt);
  this.password = result;
});

module.exports = Mongoose.model("User", UserSchema);
