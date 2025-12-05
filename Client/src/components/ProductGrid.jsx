import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard.jsx";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const ProductGrid = ({
  brand,
  title,
  gender,
  description,
  productsOverride,
  filterBestSeller,
  filterNewArrival,
}) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query");

  const selectedBrandFromURL = searchParams.get("brand");
  const selectedCategory = searchParams.get("category");
  const selectedGender = searchParams.get("gender");

  useEffect(() => {
    if (productsOverride) {
      setProducts(productsOverride);
      setFiltered(productsOverride);
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL;

    axios
      .get(`${API_URL}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })

      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Something went wrong while fetching products.");
      });
  }, [productsOverride]);

  useEffect(() => {
    if (productsOverride) {
      setFiltered(productsOverride);
      return;
    }

    let filteredProducts = products;

    if (brand) {
      if (Array.isArray(brand)) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            typeof product.brand === "string" &&
            brand
              .map((b) => b.toLowerCase())
              .includes(product.brand.toLowerCase())
        );
      } else if (typeof brand === "string") {
        filteredProducts = filteredProducts.filter(
          (product) =>
            typeof product.brand === "string" &&
            product.brand.toLowerCase() === brand.toLowerCase()
        );
      }
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (typeof selectedBrandFromURL === "string") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          typeof product.brand === "string" &&
          product.brand.toLowerCase() === selectedBrandFromURL.toLowerCase()
      );
    }

    if (typeof selectedCategory === "string") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          typeof product.category === "string" &&
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (typeof gender === "string") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          typeof product.gender === "string" &&
          product.gender.toLowerCase() === gender.toLowerCase()
      );
    }

    if (filterBestSeller) {
      filteredProducts = filteredProducts.filter((p) => p.best_seller === 1);
    }

    if (filterNewArrival) {
      filteredProducts = filteredProducts.filter((p) => p.new_arrival === true);
    }

    setFiltered(filteredProducts);
  }, [
    brand,
    selectedBrandFromURL,
    selectedCategory,
    gender,
    products,
    productsOverride,
    filterBestSeller,
    filterNewArrival,
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  const underlineVariants = {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9], delay: 0.3 },
    },
  };

  const descVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.6, 0.05, 0.01, 0.9], delay: 0.5 },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-300 via-zinc-100 to-gray-300">
      {/* Background blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-100 rounded-full blur-[150px] opacity-20 z-0" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-200 rounded-full blur-[120px] opacity-10 z-0" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          animate="show"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent 
             bg-clip-text bg-gradient-to-r from-yellow-300 via-[#2c2104e7] to-yellow-300 
             text-center mb-4 md:mb-6 font-playfair"
        >
          {title || "All Products"}
        </motion.h2>

        <motion.div
          variants={underlineVariants}
          initial="hidden"
          animate="show"
          className="w-24 sm:w-32 h-1.5 mx-auto mt-2 bg-gradient-to-r 
             from-[#b6880b] via-[#f1ca7c] to-[#b6880b] rounded-full shadow-md mb-6 origin-center"
        ></motion.div>

        <motion.p
          variants={descVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center text-[16px] sm:text-[18px] 
             md:text-[20px] font-semibold text-[#6b6553b6] mb-8 px-4 sm:px-8"
        >
          {description}
        </motion.p>

        {/* Error / No products */}
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-xl sm:text-2xl text-gray-300 font-bold">
            No products found ...
          </p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-12"
          >
            {filtered.map((product) => (
              <motion.div
                key={product._id}
                variants={cardVariants}
                className="w-full max-w-[400px]"
              >
                <ProductCard product={product} reviews={product.reviews} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
