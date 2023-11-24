import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: ["Name is required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    phone: { type: String },
    profileImg: { type: String },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Too short password"],
    },
    passwordChangedAt: { type: Date },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  //Hashing for password
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
const User = mongoose.model("User", userSchema);
export default User;

// const user = this;
// if(user.isModified('password')){
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(user.password, salt, (err, hash) => {
//       user.password = hash;
//       next();
//     });
//   });
// }else{
//   next();
// }