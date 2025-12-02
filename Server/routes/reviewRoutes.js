import express from "express";
import {
  addReview,
  getReviewByProduct,
  getReviews,
  deleteReview,
} from "../controllers/reviewController.js";
import multer from "multer";

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", upload.array("media", 5), addReview);

router.get("/product/:productId", getReviews);

router.get("/product/:productId/all", getReviewByProduct);

router.delete("/:reviewId", deleteReview);

export default router;
