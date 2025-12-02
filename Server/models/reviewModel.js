import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    title: { type: String, required: true },

    rating: { type: Number, required: true },

    comment: { type: String },

    media: [
      {
        type: { type: String, enum: ["image", "video"], required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
