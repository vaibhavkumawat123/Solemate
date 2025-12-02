import reviewModel from "../models/reviewModel.js";
import Review from "../models/reviewModel.js";
import mongoose from "mongoose";

export const addReview = async (req, res) => {
  try {
    const { productId, userId, userName, title, rating, comment } = req.body;

    const mediaFiles =
      req.files?.map((file) => ({
        type: file.mimetype.startsWith("video") ? "video" : "image",
        url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
      })) || [];

    const review = await Review.create({
      product: productId,
      user: userId,
      userName,
      title,
      rating,
      comment,
      media: mediaFiles,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.log("Review Error:", error);
    res.status(500).json({ message: "Failed to upload review" });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const skip = (page - 1) * limit;

    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const hasMore = reviews.length === Number(limit);

    res.json({ reviews, hasMore });
  } catch (error) {
    console.error("❌ Error in getReviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

export const getReviewByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await reviewModel
      .find({ product: productId })
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { userId } = req.body; // logged-in user id

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this review",
      });
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete Review Error:", error);
    res.status(500).json({ message: "Failed to delete review" });
  }
};
