import express from "express";
import multer from "multer";
import {
  signupUser,
  loginUser,
  updateProfile,
  changePassword,
  googleLogin,     
} from "../controllers/authController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/register", signupUser);
router.post("/login", loginUser);
router.post("/change-password", changePassword);

router.put("/update-profile", upload.single("avatar"), updateProfile);

router.post("/google-login", googleLogin);

export default router;
