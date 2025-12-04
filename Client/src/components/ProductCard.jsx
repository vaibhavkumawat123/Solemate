import axios from "axios";
import { useEffect, useMemo, useState, useRef, Fragment } from "react";
import { ShoppingBag, Heart } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate, Link } from "react-router-dom";
import { Rating } from "@mantine/core";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../redux/slices/wishlistSlice";
import { toast } from "@/hooks/use-toast";

// helpers
const isImageUrl = (url = "") => /\.(png|jpe?g|webp|gif|avif)$/i.test(url);
const pickFirstImage = (arr = []) => arr.find(isImageUrl) || arr[0] || "";
const normalize = (s = "") => String(s).trim().toLowerCase();
const swatchStyle = (c = "") => {
  const base = String(c).split("/")[0].trim();
  return {
    backgroundColor: /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(base)
      ? base
      : base.toLowerCase(),
  };
};

const ProductCard = ({ product, onToggleLike, className, style }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const wishlist = useSelector((state) => state.wishlist.items);
  const isLiked = wishlist.some((item) => item._id === product._id);

  const handleToggleLike = () => {
    dispatch(toggleWishlist(product));

    if (isLiked) {
      toast({
        title: "Removed from Wishlist ❌",
        description: `${product.name} has been removed.`,
        variant: "destructive",
        className: "bg-black/85 text-white border-none shadow-lg",
      });
    } else {
      toast({
        title: "Added to Wishlist ❤️",
        description: `${product.name} is added to your wishlist.`,
        className: "bg-black/85 text-white border-none shadow-lg",
      });
    }
  };

  const variants = useMemo(
    () => (Array.isArray(product?.variants) ? product.variants : []),
    [product?.variants]
  );
  const colorOptions = useMemo(
    () => variants.map((v) => v.color).filter(Boolean),
    [variants]
  );

  const currentVariant = useMemo(() => {
    if (!selectedColor) return null;
    return (
      variants.find((v) => normalize(v.color) === normalize(selectedColor)) ||
      null
    );
  }, [variants, selectedColor]);

  const fallbackVariantImage = useMemo(
    () => pickFirstImage(variants[0]?.images || []),
    [variants]
  );
  const initialImage = useMemo(
    () => product?.mainImage || product?.image || fallbackVariantImage || "",
    [product, fallbackVariantImage]
  );

  useEffect(() => {
    if (!selectedColor && colorOptions.length)
      setSelectedColor(colorOptions[0]);
  }, [colorOptions]);

  useEffect(() => {
    const imgFromVariant = pickFirstImage(currentVariant?.images || []);
    setMainImage(imgFromVariant || initialImage);
  }, [currentVariant, initialImage]);

  const discountPercentage = product?.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : product?.discount;

  // Reviews
  const fetchReviews = async (page = 1) => {
    if (!product?._id) return;
    setReviewsLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await axios.get(
        `${API_URL}/api/reviews/product/${product._id}?page=${page}&limit=5`
      );
      setReviews(
        page === 1
          ? res.data.reviews
          : [
              ...reviews,
              ...res.data.reviews.filter(
                (r) => !reviews.some((p) => p._id === r._id)
              ),
            ]
      );
    } catch (err) {
      console.error(err);
    } finally {
      setReviewsLoading(false);
    }
  };
  useEffect(() => {
    fetchReviews(1);
  }, [product._id]);
  const computedAvgRating = useMemo(
    () =>
      reviews.length
        ? reviews.reduce((sum, r) => sum + Number(r.rating ?? 0), 0) /
          reviews.length
        : 0,
    [reviews]
  );

  return (
    <>
      <div
        className={cn(
          "group relative rounded-xl p-4 transition-all duration-500 ease-smooth",
          "shadow-lg md:hover:shadow-2xl md:hover:-translate-y-1.5 border border-white/10",
          "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#0f172a] via-[#1e293b] to-[#111a30]",
          "flex flex-col justify-between items-center text-center rounded-4xl overflow-hidden",
          className
        )}
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* overlay shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 md:group-hover:opacity-10 transition duration-700 rounded-xl" />

        {/* badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product?.isNew && (
            <span className="bg-gradient-to-r from-green-400 to-lime-500 text-black text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
              New
            </span>
          )}
          {(product?.isSale || discountPercentage) && (
            <span className="bg-gradient-to-r from-pink-500 to-red-600 text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
              {discountPercentage ? `-${discountPercentage}%` : "Sale"}
            </span>
          )}
        </div>

        {/* wishlist */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleToggleLike}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition",
              isLiked
                ? "bg-red-500/10 scale-95"
                : "bg-black/5 hover:bg-black/10"
            )}
          >
            {isLiked ? (
              <FaHeart className="w-6 h-6 text-red-500 transition-transform duration-300 scale-110" />
            ) : (
              <Heart className="w-6 h-6 text-gray-400 hover:text-red-400 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* product image */}
        <div className="relative aspect-[4/5] mb-4 overflow-hidden rounded-lg bg-black/20 cursor-pointer flex justify-center items-center">
          <motion.img
            src={mainImage}
            alt={product?.name}
            onClick={() => navigate(`/product/${product._id}`)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.08, rotate: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105 group-hover:rotate-1"
            onError={(e) => {
              e.currentTarget.src =
                product?.mainImage ||
                product?.image ||
                "https://via.placeholder.com/600x600?text=Image+not+available";
            }}
          />

          {/* Quick Add overlay */}
          <div className="absolute inset-x-4 bottom-4 transition-all duration-500 ease-in-out">
            <button
              onClick={() => navigate(`/product/${product._id}`)}
              className="bg-black text-white p-3 w-full rounded-2xl"
            >
              <span className="font-semibold text-l">View Product</span>
            </button>
          </div>
        </div>

        {/* info section */}
        <div className="relative z-10 w-full space-y-4 flex flex-col items-center">
          {/* brand + rating */}
          <div className="flex items-center justify-between w-full px-2">
            {product?.brand && (
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                {product.brand}
              </span>
            )}
            <div className="flex items-center gap-1">
              <Rating
                value={computedAvgRating}
                fractions={2}
                readOnly
                size="sm"
                style={{ color: "black" }}
                emptySymbol={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="black"
                    className="w-4 h-4"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.442a1 1 0 00-.364 1.118l1.287 3.947c.3.922-.755 1.688-1.538 1.118l-3.36-2.442a1 1 0 00-1.176 0l-3.36 2.442c-.783.57-1.838-.196-1.538-1.118l1.287-3.947a1 1 0 00-.364-1.118L2.025 9.375c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.948z"
                      strokeWidth="1"
                    />
                  </svg>
                }
                fullSymbol={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="black"
                    className="w-4 h-4"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.442a1 1 0 00-.364 1.118l1.287 3.947c.3.922-.755 1.688-1.538 1.118l-3.36-2.442a1 1 0 00-1.176 0l-3.36 2.442c-.783.57-1.838-.196-1.538-1.118l1.287-3.947a1 1 0 00-.364-1.118L2.025 9.375c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.948z" />
                  </svg>
                }
              />
              <span className="text-xs text-gray-400">
                ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          </div>

          {/* product name */}
          <Link to={`/product/${product._id}`}>
            <h3 className="text-2xl font-bold leading-tight md:group-hover:text-gray-700 transition-colors duration-300 md:hover:underline">
              {product?.name}
            </h3>
          </Link>

          {/* price + colors */}
          <div className="flex flex-col items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent">
                ${product?.price}
              </span>
              {product?.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {colorOptions.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {colorOptions.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    title={c}
                    aria-label={`Choose ${c}`}
                    className={cn(
                      "rounded-full border h-6 w-6 transition-all duration-300 ease-in-out",
                      "hover:scale-110 hover:ring-2 hover:ring-white/80",
                      selectedColor === c
                        ? "scale-110 ring-2 ring-white border-gray-600 border-2"
                        : "scale-100 border-white/40"
                    )}
                    style={swatchStyle(c)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-2">
            {currentVariant ? (
              currentVariant.is_in_inventory ? (
                <p className="text-green-500 font-bold">
                  In Stock ({currentVariant.items_left} left)
                </p>
              ) : (
                <p className="text-red-500 font-bold">Out of Stock</p>
              )
            ) : (
              <p className="text-gray-400">Select a color</p>
            )}
          </div>

          {/* category + gender */}
          <div className="border-t border-white/10 flex gap-6 mt-3 items-center text-sm">
            <span className="text-green-600 font-bold uppercase tracking-wide">
              {product?.category}
            </span>
            <span className="text-gray-500">For {product.gender}</span>
          </div>
        </div>

        {/* glowing orbs */}
        <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
        <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
      </div>
    </>
  );
};

export default ProductCard;
