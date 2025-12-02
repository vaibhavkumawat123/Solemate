import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: {
      type: String,
      required: function () {
        return this.authProvider === "local"; 
      },
      minlength: 6,
    },

    avatar: { type: String, default: null },
    bio: { type: String, default: "" },
    phone: { type: String, default: "" },

    googleId: { type: String, default: null },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.authProvider === "google") return next();

  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

const User = mongoose.model("User", userSchema);
export default User;
