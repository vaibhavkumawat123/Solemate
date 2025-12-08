import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Heart,
  RulerDimensionLine,
  Play,
  Trash,
} from "lucide-react";
import { FaArrowLeft, FaArrowRight, FaPlus, FaMinus } from "react-icons/fa";
import Navigation from "../components/Navigation.jsx";
import Footer from "../components/Footer.jsx";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { Rating } from "@mantine/core";
import AddToBag from "../components/ui/AddToBag.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/slices/cartSlice.js";
import {
  fetchProductReviews,
  resetReviews,
} from "../redux/slices/reviewSlice.js";
import { toggleWishlist } from "../redux/slices/wishlistSlice";
import { toast } from "@/hooks/use-toast";

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pincode, setPincode] = useState("");
  const [deliveryMsg, setDeliveryMsg] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const imageRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [openReviewsDialog, setOpenReviewsDialog] = useState(false);
  const [openReviewMediaDialog, setOpenReviewMediaDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = storedUser?.user?._id;
  const API_URL = import.meta.env.VITE_API_URL;

  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isWishlisted = wishlistItems.some((item) => item._id === product?._id);

  const [quantity, setQuantity] = useState(1);

  const handleOpenReviewsDialog = () => setOpenReviewsDialog(true);
  const handleCloseReviewsDialog = () => setOpenReviewsDialog(false);

  const dispatch = useDispatch();
  const {
    reviews,
    loading: reviewsLoading,
    hasMore,
    page,
  } = useSelector((state) => state.review);

  const images = selectedColor?.images?.length
    ? selectedColor.images
    : product?.mainImage
    ? [product.mainImage]
    : product?.image
    ? [product.image]
    : [];

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        const res = await axios.get(`${API_URL}/api/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (productId) {
      dispatch(resetReviews());
      dispatch(fetchProductReviews({ productId, page: 1 }));
    }
  }, [dispatch, productId]);

  const handleLoadMore = () => {
    dispatch(fetchProductReviews({ productId, page: page + 1 }));
  };

  // console.log("Reviews data:", reviews);
  // console.log("Review media:", reviews.media);

  // average rating calculate
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  // Color selection
  const handleColorSelect = (variant) => {
    setSelectedColor(variant);
    const firstImg = variant.images?.[0] || null;
    setSelectedImage(firstImg);
    setCurrentImageIndex(0);
    localStorage.setItem(
      `selectedColor-${product._id}`,
      JSON.stringify(variant)
    );
    localStorage.setItem(`selectedImage-${product._id}`, firstImg);
  };

  // Size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    localStorage.setItem(`selectedSize-${product._id}`, size);
  };

  // Pincode
  const handlePincodeChange = (pin) => {
    setPincode(pin);
    localStorage.setItem(`pincode-${product._id}`, pin);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      if (!loggedInUserId) return;

      await axios.delete(`${API_URL}/api/reviews/${reviewId}`, {
        data: { userId: loggedInUserId },
      });

      dispatch(resetReviews());
      dispatch(fetchProductReviews({ productId, page: 1 }));
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  useEffect(() => {
    if (!product) return;

    const savedColor = localStorage.getItem(`selectedColor-${productId}`);
    const savedImage = localStorage.getItem(`selectedImage-${productId}`);
    const savedSize = localStorage.getItem(`selectedSize-${productId}`);
    const savedPincode = localStorage.getItem(`pincode-${productId}`);

    if (savedColor) {
      const parsedColor = JSON.parse(savedColor);
      setSelectedColor(parsedColor);
      setSelectedImage(savedImage || parsedColor?.images?.[0] || null);
      setCurrentImageIndex(0);
    } else if (product.variants?.length > 0) {
      const firstVariant = product.variants[0];
      setSelectedColor(firstVariant);
      setSelectedImage(
        firstVariant.images?.[0] || product.mainImage || product.image || null
      );
      setCurrentImageIndex(0);
    } else {
      const defaultImg = product.mainImage || product.image || null;
      setSelectedImage(defaultImg);
      setCurrentImageIndex(0);
    }

    setSelectedSize(savedSize || null);
    setPincode(savedPincode || "");
  }, [product]);

  const handlePrev = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const checkDelivery = () => {
    if (!pincode) setDeliveryMsg("Please enter a pincode");
    else if (pincode.length === 6)
      setDeliveryMsg("Delivery available in your area ✅");
    else setDeliveryMsg("Invalid pincode ❌");
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cartProduct = product
    ? {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: selectedImage || product.image || product.mainImage,
      }
    : null;

  const cartItem = useSelector((state) =>
    product
      ? state.cart.cartItems.find(
          (item) =>
            item._id === product._id &&
            item.size === (selectedSize || "default") &&
            item.color === (selectedColor?.color || "default")
        )
      : null
  );

  const sizes = [
    { brand: "4", uk: "1.5", eu: "38", us: "4", cm: "8.3" },
    { brand: "4.5", uk: "2", eu: "39", us: "4.5", cm: "8.5" },
    { brand: "5", uk: "2.5", eu: "40", us: "5", cm: "8.7" },
    { brand: "5.5", uk: "3", eu: "41", us: "5.5", cm: "8.9" },
    { brand: "6", uk: "3.5", eu: "42", us: "6", cm: "9.1" },
    { brand: "6.5", uk: "4", eu: "43", us: "6.5", cm: "9.3" },
    { brand: "7", uk: "4.5", eu: "44", us: "7", cm: "9.4" },
    { brand: "7.5", uk: "5", eu: "45", us: "7.5", cm: "9.6" },
    { brand: "8", uk: "5.5", eu: "46", us: "8", cm: "9.8" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400 via-white to-gray-400">
      <Navigation />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto p-4 md:p-12 pt-20 md:pt-24 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-5"
      >
        {/* Left Section (Image) */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col lg:flex-row justify-center items-start gap-5 w-full"
        >
          {/* Thumbnails */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex flex-row lg:flex-col gap-2 lg:gap-4 overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar w-full lg:w-[100px]"
          >
            {images.filter(Boolean).map((img, i) => {
              const isSelected = selectedImage === img;
              const isVideo = img.toLowerCase().includes(".mp4");

              return (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  key={i}
                  onClick={() => {
                    setSelectedImage(img);
                    setCurrentImageIndex(i);
                  }}
                  className={`flex-shrink-0 rounded-xl border overflow-hidden transition-all duration-200
          ${isSelected ? "border-3 border-black" : "border-gray-300"}
          h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20`}
                  title={`View ${i + 1}`}
                >
                  {isVideo ? (
                    <video
                      src={img}
                      loop
                      autoPlay
                      muted
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={img}
                      alt={`thumb-${i}`}
                      className="h-full w-full object-cover"
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          <Dialog
            open={openImage}
            onClose={() => setOpenImage(false)}
            fullScreen
            PaperProps={{
              sx: {
                backgroundColor: "black",
                position: "relative",
                overflow: "hidden",
                zIndex: 1500,
              },
            }}
          >
            <div className="relative flex items-center justify-center bg-black w-full h-full overflow-visible">
              {/* Left button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 
             bg-zinc-400 hover:bg-zinc-500 text-black 
             p-4 rounded-full z-[9999]"
              >
                <FaArrowLeft size={28} />
              </motion.button>

              {/* Selected media */}
              {selectedImage?.toLowerCase().includes(".mp4") ? (
                <motion.video
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  src={selectedImage}
                  autoPlay
                  playsInline
                  loop
                  controls
                  className="max-h-[400px] md:max-h-[600px] lg:max-h-[700px] w-full px-2 md:px-4 object-contain rounded-xl z-10"
                />
              ) : (
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  src={selectedImage}
                  alt="Full view"
                  className="max-h-full max-w-full object-contain"
                />
              )}

              {/* Right button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 
             bg-zinc-400 hover:bg-zinc-500 text-black 
             p-4 rounded-full z-[9999]"
              >
                <FaArrowRight size={28} />
              </motion.button>

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setOpenImage(false)}
                className="absolute top-6 right-4 
                 bg-white/30 hover:bg-white/50 text-white 
                 p-3 w-12 rounded-full z-[2000]"
              >
                ✕
              </motion.button>
            </div>
          </Dialog>

          {/* Main Image */}
          <div
            className="relative flex justify-center items-center bg-gray-200 rounded-2xl shadow-lg min-h-[300px] md:min-h-[500px] lg:min-h-[600px] w-full cursor-pointer"
            onClick={() => setOpenImage(true)}
          >
            {images.length > 1 && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-4 rounded-full hover:bg-black/70 z-30"
                >
                  <FaArrowLeft />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-4 rounded-full hover:bg-black/70 z-30"
                >
                  <FaArrowRight />
                </motion.button>
              </>
            )}

            {selectedImage && selectedImage.trim() !== "" ? (
              selectedImage.toLowerCase().includes(".mp4") ? (
                <motion.video
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  src={selectedImage}
                  autoPlay
                  playsInline
                  loop
                  controls
                  className="max-h-[450px] md:max-h-[600px] lg:max-h-[700px] w-full px-2 md:px-4 object-contain rounded-xl z-10"
                />
              ) : (
                <div className="relative">
                  {/* Desktop: image with hover zoom */}
                  <motion.img
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    ref={imageRef}
                    src={selectedImage}
                    alt={product?.name || "Product image"}
                    className="hidden sm:block max-h-[600px] w-full object-contain rounded-xl"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />

                  {isHovered && imageRef.current && (
                    <div
                      className="absolute pointer-events-none border border-gray-300 rounded-xl overflow-hidden z-[2000]"
                      style={{
                        width: "200px",
                        height: "200px",
                        top: `${mousePos.y - 100}px`,
                        left: `${mousePos.x - 100}px`,
                        backgroundImage: `url(${selectedImage})`,
                        backgroundSize: `${
                          imageRef.current.offsetWidth * 2
                        }px ${imageRef.current.offsetHeight * 2}px`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: (() => {
                          const rect = imageRef.current.getBoundingClientRect();
                          const relX = mousePos.x / rect.width;
                          const relY = mousePos.y / rect.height;

                          const bgX =
                            -relX * imageRef.current.offsetWidth * 2 + 100;
                          const bgY =
                            -relY * imageRef.current.offsetHeight * 2 + 100;

                          return `${bgX}px ${bgY}px`;
                        })(),
                      }}
                    />
                  )}

                  {/* Mobile fallback */}
                  <motion.img
                    src={selectedImage}
                    alt={product?.name || "Product image"}
                    className="sm:hidden max-h-[400px] md:max-h-[600px] lg:max-h-[700px] w-full px-2 md:px-4 object-contain drop-shadow-xl rounded-xl z-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              )
            ) : (
              <div className="w-full h-[400px] flex items-center justify-center text-gray-500 border rounded-xl">
                No image available
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col justify-start gap-4 w-full mt-6 lg:mt-0"
        >
          <motion.div variants={item}>
            <p className="uppercase text-lg md:text-xl tracking-widest text-gray-600 font-extrabold mb-0.5">
              {product.brand}
            </p>
            <p className="text-base md:text-lg text-gray-500 font-semibold">
              For {product.gender}
            </p>
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-1.5 mb-3 mt-1.5">
              {/* Average rating stars */}
              <Rating
                value={avgRating}
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

              {/* Total ratings */}
              <span className="text-sm text-gray-600">
                {reviews.length} {reviews.length === 1 ? "rating" : "ratings"}
              </span>
            </div>

            <h3 className=" font-semibold uppercase text-green-700">
              {product?.category}
            </h3>
          </motion.div>

          <motion.p
            variants={item}
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent"
          >
            ${product.price}
          </motion.p>

          {/* Color selection */}
          <motion.div variants={item} className="mt-4 md:mt-6">
            <h3 className="font-semibold mb-2">Select Color:</h3>
            <div className="flex gap-2 md:gap-3 flex-wrap">
              {product.variants?.map((variant) => (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  key={variant.color}
                  onClick={() => {
                    handleColorSelect(variant);
                  }}
                  className={`px-3 md:px-4 py-2 rounded-full border transition ${
                    selectedColor?.color === variant.color
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-800 border-gray-300 hover:border-black"
                  }`}
                >
                  {variant.color}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Sizes & Chart */}
          <motion.div variants={item} className="mt-4 md:mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base md:text-lg font-semibold">
                Available Sizes:
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={handleClickOpen}
                className="flex gap-1 pb-1 md:pb-2 font-semibold text-sm md:text-base"
              >
                <RulerDimensionLine /> View Size Chart
              </motion.button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 md:gap-3 mt-2">
              {product?.available_sizes?.map((size, idx) => (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  key={idx}
                  onClick={() => handleSizeSelect(size)}
                  className={`px-4 md:px-6 py-1.5 md:py-2 rounded-lg border font-medium text-sm md:text-base transition-all duration-200 ${
                    selectedSize === size
                      ? "bg-black text-white border-black shadow-md scale-105"
                      : "bg-white text-gray-700 border-gray-300 hover:border-black hover:shadow"
                  }`}
                >
                  {size}
                </motion.button>
              ))}
            </div>

            <p
              className={`text-sm md:text-base font-semibold px-3 py-1.5 rounded-full shadow-md w-max mt-3 ${
                selectedColor?.is_in_inventory
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {selectedColor
                ? selectedColor.is_in_inventory
                  ? `In Stock (${selectedColor.items_left} left)`
                  : "Out of Stock"
                : "Select a Color"}
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={fadeIn}
            className="flex flex-col md:flex-row gap-4 mt-13 justify-center items-center w-full"
          >
            {/* Add to Bag */}
            <div className="w-full sm:w-auto">
              <AddToBag
                product={{
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  image: selectedImage,
                }}
                color={selectedColor}
                size={selectedSize}
              />
            </div>

            {/* Wishlist */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full sm:w-auto"
            >
              <Button
                variant={isWishlisted ? "default" : "outline"}
                onClick={() => {
                  dispatch(
                    toggleWishlist({
                      _id: product._id,
                      name: product.name,
                      price: product.price,
                      image:
                        selectedImage || product.mainImage || product.image,
                    })
                  );

                  if (isWishlisted) {
                    toast({
                      title: "Removed from Wishlist 💔",
                      description: `${product.name} has been removed from your wishlist.`,
                      className:
                        "bg-black text-white border border-white/20 shadow-xl",
                    });
                  } else {
                    toast({
                      title: "Added to Wishlist ❤️",
                      description: `${product.name} was added to your wishlist.`,
                      className:
                        "bg-black text-white border border-white/20 shadow-xl",
                    });
                  }
                }}
                className={`w-full sm:w-auto px-25 py-6 rounded-xl text-sm md:text-lg font-semibold flex items-center justify-center gap-2
  ${
    isWishlisted
      ? "bg-red-500 text-white hover:bg-red-500 hover:text-white border-none"
      : "border-gray-300 hover:border-gray-500"
  }
  `}
              >
                <Heart size={20} fill={isWishlisted ? "white" : "none"} />
                {isWishlisted ? "Wishlisted" : "Wishlist"}
              </Button>
            </motion.div>
          </motion.div>

          <p className="text-gray-600 leading-relaxed text-sm md:text-lg mt-3">
            {product.description || "No description available."}
          </p>

          {/* Pincode */}
          <div className="space-y-2 pt-6 md:pt-8">
            <p className="text-sm md:text-base font-semibold text-gray-500">
              Check delivery to your pincode
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="tel"
                inputMode="numeric"
                maxLength={6}
                value={pincode}
                onChange={(e) =>
                  handlePincodeChange(e.target.value.replace(/\D/g, ""))
                }
                placeholder="Enter 6-digit pincode"
                className="flex-1 rounded-xl border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <Button
                onClick={checkDelivery}
                className="rounded-xl !bg-amber-500 !text-black !font-medium"
              >
                Check
              </Button>
            </div>
            {deliveryMsg && (
              <p className="text-sm md:text-base mt-1 text-gray-700">
                {deliveryMsg}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Size Chart Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="w-full"
        >
          <DialogTitle>Size Chart</DialogTitle>
          <DialogContent dividers className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-gray-400 text-left">
                  <th className="border border-gray-900 px-4 py-2">Brand</th>
                  <th className="border border-gray-900 px-4 py-2">UK</th>
                  <th className="border border-gray-900 px-4 py-2">EU</th>
                  <th className="border border-gray-900 px-4 py-2">US</th>
                  <th className="border border-gray-900 px-4 py-2">CM</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((size, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition text-center even:bg-gray-200"
                  >
                    <td className="border border-gray-400 px-4 py-2 font-medium">
                      {size.brand}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {size.uk}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {size.eu}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {size.us}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {size.cm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </motion.div>
      </Dialog>

      {/* Shipping & Returns */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 pb-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-8 mt-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            Shipping & Returns
          </h2>
          <p className="mt-3 text-gray-600">
            Free return on all qualifying orders within <strong>10 days</strong>{" "}
            of your order delivery date. Visit our{" "}
            <Link to="/return-policy" className="underline underline-offset-4">
              Return Policy
            </Link>{" "}
            for more information.
          </p>
          <div className="mt-4 text-gray-600">
            <p>
              For any queries, email{" "}
              <a
                href="mailto:customercareasia@solemate.com"
                className="text-gray-900 underline"
              >
                customercareasia@solemate.com
              </a>{" "}
              or WhatsApp at{" "}
              <a
                href="https://wa.me/917073571484"
                className="text-gray-900 underline"
              >
                7073571484
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Review Section for Feedback */}
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-24">
          {/* Left side: Add Review */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Customer Reviews
            </h1>

            <Rating
              value={avgRating}
              fractions={2}
              readOnly
              size="lg"
              color="black"
            />

            <p className="mt-2 text-gray-600 text-base sm:text-lg font-medium">
              {avgRating} out of 5 stars ({reviews.length} reviews)
            </p>

            {reviews.length === 0 && (
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                No reviews yet. Be the first to review!
              </p>
            )}

            {/* Rating Breakdown */}
            <div className="mt-6 w-full space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter((r) => r.rating === star).length;
                const percentage = reviews.length
                  ? (count / reviews.length) * 100
                  : 0;

                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="w-14 text-sm sm:text-base font-semibold">
                      {star} star
                    </span>
                    <div className="flex-1 h-4 bg-gray-300 rounded-lg overflow-hidden">
                      <div
                        className="h-4 bg-black rounded-lg"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-sm sm:text-base font-semibold text-gray-700">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>

            <hr className="mt-4 border-gray-300 border-2" />

            <h2 className="mt-6 text-lg sm:text-xl font-semibold">
              Review this product
            </h2>
            <p className="text-gray-700 text-sm sm:text-base mb-4">
              Share your thoughts with other customers
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="px-5 py-2 sm:px-6 sm:py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition transform hover:scale-105"
              onClick={() => {
                if (!product || !product._id) {
                  toast.error("Product not loaded yet! Please wait...");
                  return;
                }

                navigate("/create-review", {
                  state: { productId: product._id },
                });
              }}
            >
              Write a product review
            </motion.button>
          </div>

          {/* Right side: Top reviews */}
          <div className="flex flex-col gap-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-4">
              Worldwide Customer Feedback Highlights
            </h1>

            <div className="flex flex-col gap-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                What Our Customers Say
              </h2>

              {reviews.length > 0 ? (
                <>
                  {reviews.slice(0, 2).map((review, idx) => (
                    <div
                      key={`${review._id}-${idx}`}
                      className="bg-white border rounded-xl p-4"
                    >
                      {/* Header */}
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">
                            {review.user?.name ||
                              review.userName ||
                              "Anonymous"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <Rating
                          value={review.rating}
                          readOnly
                          size="sm"
                          color="dark"
                        />
                      </div>

                      {/* Comment */}
                      <p className="text-gray-700 mb-2">{review.comment}</p>

                      {/* Media */}
                      {review.media?.length > 0 && (
                        <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-hide">
                          {review.media.map((file, mediaIdx) => {
                            const url =
                              typeof file === "string" ? file : file.url;
                            if (!url) return null;

                            const isVideo = url.toLowerCase().endsWith(".mp4");

                            return isVideo ? (
                              <div
                                key={`${review._id}-video-${mediaIdx}`}
                                className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-lg overflow-hidden border cursor-pointer flex-shrink-0"
                                onClick={() => {
                                  setSelectedReview(review);
                                  setSelectedMedia(url);
                                  setOpenReviewMediaDialog(true);
                                }}
                              >
                                <video
                                  src={url}
                                  muted
                                  autoPlay
                                  loop
                                  className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                  <Play className="text-white h-10 w-10" />
                                </div>
                              </div>
                            ) : (
                              <img
                                key={`${review._id}-img-${mediaIdx}`}
                                src={url}
                                alt={`review-${mediaIdx}`}
                                className="h-28 w-28 sm:h-32 sm:w-32 object-cover rounded-lg border flex-shrink-0 cursor-pointer"
                                onClick={() => {
                                  setSelectedReview(review);
                                  setSelectedMedia(url);
                                  setOpenReviewMediaDialog(true);
                                }}
                              />
                            );
                          })}
                        </div>
                      )}

                      {/* ⭐ Delete Button ONLY for review owner */}
                      {loggedInUserId === review.user?._id && (
                        <button
                          className="text-black text-m !font-semibold mt-3 flex gap-1"
                          onClick={() => {
                            setReviewToDelete(review._id);
                            setConfirmDeleteOpen(true);
                          }}
                        >
                          <Trash /> Delete Review
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Load More Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => setOpenReviewsDialog(true)}
                    className="mt-4 px-5 py-2 sm:px-6 sm:py-3 rounded-lg bg-gray-600 hover:scale-105 text-gray-50 transition transform"
                  >
                    Load More Reviews
                  </motion.button>
                </>
              ) : (
                <p className="text-gray-500 text-sm sm:text-base">
                  No customer reviews yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Review Media Dialog */}
        <Dialog
          open={openReviewMediaDialog}
          onClose={() => setOpenReviewMediaDialog(false)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              backgroundColor: "snow",
              zIndex: 2000,
              borderRadius: 4,
              overflow: "hidden",
            },
          }}
        >
          <div className="relative flex flex-col items-center justify-center w-full p-4 sm:p-6">
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 text-white bg-black/70 p-2 rounded-full z-50"
              onClick={() => setOpenReviewMediaDialog(false)}
            >
              ✕
            </motion.button>

            {/* Media */}
            {selectedMedia?.toLowerCase().endsWith(".mp4") ? (
              <video
                src={selectedMedia}
                controls
                autoPlay
                className="max-h-[45vh] sm:max-h-[60vh] w-auto rounded-lg object-contain"
              />
            ) : (
              <img
                src={selectedMedia}
                alt="Review media"
                className="max-h-[45vh] sm:max-h-[60vh] w-auto rounded-lg object-contain"
              />
            )}

            {/* Review Details */}
            {selectedReview && (
              <div className="mt-4 p-4 bg-black/50 rounded-lg w-full sm:w-3/4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                  <p className="font-semibold text-lg text-white">
                    {selectedReview.user?.name || "Anonymous"}
                  </p>
                  <Rating
                    value={selectedReview.rating}
                    readOnly
                    size="sm"
                    color="black"
                  />
                </div>
                <p className="text-xs text-gray-300 mb-2">
                  {new Date(selectedReview.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-100 text-sm">
                  {selectedReview.comment}
                </p>
              </div>
            )}
          </div>
        </Dialog>

        {/* All Reviews Dialog */}
        <Dialog
          open={openReviewsDialog}
          onClose={handleCloseReviewsDialog}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>
            <h1 className="font-bold text-xl sm:text-2xl">
              All Customer Reviews
            </h1>
          </DialogTitle>

          <DialogContent dividers>
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className={`bg-white rounded-xl p-3 sm:p-4 border 
          ${review.user?.name ? "border-gray-300" : "border-gray-400"}`}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                    <p className="font-semibold text-base">
                      {review.user?.name || review.userName || "Anonymous"}
                    </p>
                    <Rating
                      value={review.rating}
                      readOnly
                      size="sm"
                      color="dark"
                    />
                  </div>

                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-gray-700 text-sm">{review.comment}</p>

                  {/* Media */}
                  {review.media?.length > 0 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
                      {review.media.map((file, idx) => {
                        const url = typeof file === "string" ? file : file.url;
                        if (!url) return null;

                        const isVideo = url.toLowerCase().endsWith(".mp4");

                        return (
                          <div
                            key={idx}
                            className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-lg overflow-hidden border cursor-pointer flex-shrink-0"
                            onClick={() => {
                              setSelectedReview(review);
                              setSelectedMedia(url);
                              setOpenReviewMediaDialog(true);
                            }}
                          >
                            {isVideo ? (
                              <>
                                <video
                                  src={url}
                                  muted
                                  autoPlay
                                  loop
                                  className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                  <Play className="text-white h-8 w-8" />
                                </div>
                              </>
                            ) : (
                              <img
                                src={url}
                                alt="review"
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {loggedInUserId === review.user?._id && (
                    <button
                      className="text-black !font-semibold flex gap-1 mt-2.5"
                      onClick={() => {
                        setReviewToDelete(review._id);
                        setConfirmDeleteOpen(true);
                      }}
                    >
                      <Trash /> Delete Review
                    </button>
                  )}
                </div>
              ))}
            </div>
          </DialogContent>

          <DialogActions>
            <Button className="!bg-black" onClick={handleCloseReviewsDialog}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Confirm Delete Dialog */}
        <Dialog
          open={confirmDeleteOpen}
          onClose={() => setConfirmDeleteOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle className="!text-lg !font-semibold">
            Confirm Delete
          </DialogTitle>

          <DialogContent>
            <p className="text-gray-700 text-base">
              Are you sure you want to delete this review?
            </p>
          </DialogContent>

          <DialogActions>
            <Button
              variant="outline"
              onClick={() => setConfirmDeleteOpen(false)}
              className="rounded-lg"
            >
              Cancel
            </Button>

            <Button
              className="!bg-red-600 hover:!bg-red-700 text-white rounded-lg"
              onClick={() => {
                handleDeleteReview(reviewToDelete);
                setConfirmDeleteOpen(false);
              }}
            >
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Footer />
    </div>
  );
}
