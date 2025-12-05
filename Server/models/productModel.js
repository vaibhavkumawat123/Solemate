import mongoose from "mongoose";
import slugify from "slugify";

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

productSchema.pre("save", async function (next) {
  if (!this.isModified("name")) return next();

  let baseSlug = slugify(this.name, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let counter = 1;

  const Product = mongoose.model("Product");

  while (await Product.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
