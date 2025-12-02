import mongoose from "mongoose";

const embeddedReviewSchema = new mongoose.Schema(
  {
    name: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    mainImage: { type: String, required: true },

    category: String,
    gender: String,

    items_left: { type: Number, default: 0 },
    is_in_inventory: { type: Boolean, default: true },

    isNew: { type: Boolean, default: false },
    isSale: { type: Boolean, default: false },

    description: String,

    new_arrival: { type: Boolean, default: false },
    best_seller: { type: Number, default: 0 },

    available_sizes: [String],
    color: [String],

    slug: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        return this.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w\-]+/g, "");
      },
    },

    reviews: [embeddedReviewSchema],

    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },

    variants: [
      {
        color: String,
        images: [String],
      },
    ],

    customId: String,
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (this.items_left == null) {
    this.items_left = 0;
  }
  this.is_in_inventory = this.items_left > 0;
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
