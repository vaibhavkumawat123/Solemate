import React, { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import axios from "axios";
import { motion } from "framer-motion";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query");

  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [sort, setSort] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setSelectedBrand(params.get("brand") || "");
    setSelectedGender(params.get("gender") || "");
    setSelectedCategory(params.get("category") || "");
    setSelectedColor(params.get("color") || "");
    setSort(params.get("sort") || "");
  }, []);

  const updateURLParams = (
    newBrand = selectedBrand,
    newGender = selectedGender,
    newCategory = selectedCategory,
    newColor = selectedColor,
    newSort = sort
  ) => {
    const params = new URLSearchParams();

    if (query) params.set("query", query);
    if (newBrand) params.set("brand", newBrand);
    if (newGender) params.set("gender", newGender);
    if (newCategory) params.set("category", newCategory);
    if (newColor) params.set("color", newColor);
    if (newSort) params.set("sort", newSort);

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    axios.get(`${API_URL}/api/products`).then((res) => {
      setAllProducts(res.data);
    });
  }, []);

  useEffect(() => {
    let results = allProducts;

    if (query)
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase())
      );

    if (selectedBrand)
      results = results.filter(
        (p) => p.brand.toLowerCase() === selectedBrand.toLowerCase()
      );

    if (selectedGender)
      results = results.filter(
        (p) => p.gender?.toLowerCase() === selectedGender.toLowerCase()
      );

    if (selectedCategory)
      results = results.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );

    if (selectedColor)
      results = results.filter((p) =>
        Array.isArray(p.color)
          ? p.color
              .join(" ")
              .toLowerCase()
              .includes(selectedColor.toLowerCase())
          : String(p.color || "")
              .toLowerCase()
              .includes(selectedColor.toLowerCase())
      );

    if (sort === "low")
      results = [...results].sort((a, b) => a.price - b.price);
    if (sort === "high")
      results = [...results].sort((a, b) => b.price - a.price);

    setFiltered(results);
  }, [
    allProducts,
    query,
    selectedBrand,
    selectedGender,
    selectedCategory,
    selectedColor,
    sort,
  ]);

  // DESKTOP FILTER SIDEBAR
  const FilterSidebar = (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 bg-white shadow-lg rounded-2xl p-6 h-fit"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800">Filters</h3>

      {/* Sort */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Sort By Price</p>
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            updateURLParams(
              selectedBrand,
              selectedGender,
              selectedCategory,
              selectedColor,
              e.target.value
            );
          }}
          className="w-full px-3 py-2 rounded-xl border border-gray-300"
        >
          <option value="">Default</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      {/* Brand */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Brand</p>
        <select
          value={selectedBrand}
          onChange={(e) => {
            setSelectedBrand(e.target.value);
            updateURLParams(
              e.target.value,
              selectedGender,
              selectedCategory,
              selectedColor,
              sort
            );
          }}
          className="w-full px-3 py-2 rounded-xl border border-gray-300"
        >
          <option value="">All</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
          <option value="Reebok">Reebok</option>
        </select>
      </div>

      {/* Gender */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Gender</p>
        <select
          value={selectedGender}
          onChange={(e) => {
            setSelectedGender(e.target.value);
            updateURLParams(
              selectedBrand,
              e.target.value,
              selectedCategory,
              selectedColor,
              sort
            );
          }}
          className="w-full px-3 py-2 rounded-xl border border-gray-300"
        >
          <option value="">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>
      </div>

      {/* Category */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Category</p>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            updateURLParams(
              selectedBrand,
              selectedGender,
              e.target.value,
              selectedColor,
              sort
            );
          }}
          className="w-full px-3 py-2 rounded-xl border border-gray-300"
        >
          <option value="">All</option>
          <option value="Running">Running</option>
          <option value="Sneakers">Sneakers</option>
          <option value="Casual">Casual</option>
        </select>
      </div>

      {/* Color */}
      <div className="mb-2">
        <p className="font-semibold mb-2">Color</p>
        <input
          value={selectedColor}
          onChange={(e) => {
            setSelectedColor(e.target.value);
            updateURLParams(
              selectedBrand,
              selectedGender,
              selectedCategory,
              e.target.value,
              sort
            );
          }}
          type="text"
          placeholder="e.g. black, white"
          className="w-full px-3 py-2 rounded-xl border border-gray-300"
        />
      </div>
    </motion.div>
  );

  const MobileFilterSidebar = (
    <div className="w-full h-full overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Filters</h3>

      {/* SAME FILTER UI AS DESKTOP */}
      {/* Sort */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Sort By Price</p>
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            updateURLParams(
              selectedBrand,
              selectedGender,
              selectedCategory,
              selectedColor,
              e.target.value
            );
          }}
          className="w-full px-3 py-2 rounded-xl border border-gray-300"
        >
          <option value="">Default</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      {/* Brand */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Brand</p>
        <select
          value={selectedBrand}
          onChange={(e) => {
            setSelectedBrand(e.target.value);
            updateURLParams(
              e.target.value,
              selectedGender,
              selectedCategory,
              selectedColor,
              sort
            );
          }}
          className="w-full px-3 py-2 rounded-xl border border-gray-300"
        >
          <option value="">All</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
          <option value="Reebok">Reebok</option>
        </select>
      </div>

      {/* Gender */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Gender</p>
        <select
          value={selectedGender}
          onChange={(e) => {
            setSelectedGender(e.target.value);
            updateURLParams(
              selectedBrand,
              e.target.value,
              selectedCategory,
              selectedColor,
              sort
            );
          }}
          className="w-full px-3 py-2 rounded-xl border border-gray-300"
        >
          <option value="">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>
      </div>

      {/* Category */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Category</p>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            updateURLParams(
              selectedBrand,
              selectedGender,
              e.target.value,
              selectedColor,
              sort
            );
          }}
          className="w-full px-3 py-2 rounded-xl border border-gray-300"
        >
          <option value="">All</option>
          <option value="Running">Running</option>
          <option value="Sneakers">Sneakers</option>
          <option value="Casual">Casual</option>
        </select>
      </div>

      {/* Color */}
      <div className="mb-2">
        <p className="font-semibold mb-2">Color</p>
        <input
          value={selectedColor}
          onChange={(e) => {
            setSelectedColor(e.target.value);
            updateURLParams(
              selectedBrand,
              selectedGender,
              selectedCategory,
              e.target.value,
              sort
            );
          }}
          type="text"
          placeholder="e.g. black, white"
          className="w-full px-3 py-2 rounded-xl border border-gray-300"
        />
      </div>
    </div>
  );

  return (
    <>
      <Navigation />

      {/* MOBILE FILTER BUTTON */}
      <div className="lg:hidden flex justify-end px-6 mt-24">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="px-4 py-2 bg-black text-white rounded-xl"
        >
          Filters
        </button>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 bg-black/40 flex z-50">
          <div className="bg-white w-72 h-full p-6 shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setMobileFilterOpen(false)}>✖</button>
            </div>
            {MobileFilterSidebar}
          </div>
        </div>
      )}

      {/* MAIN LAYOUT */}
      <div className="mt-6 md:mt-20 container mx-auto px-4 md:px-6 flex gap-6 md:gap-8 items-start">
        {/* STICKY DESKTOP SIDEBAR */}
        <div className="hidden lg:block sticky top-28 h-fit">
          {FilterSidebar}
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:flex-1 bg-gradient-to-br from-[#f5f5f5] via-[#f0f1f5] to-[#e6e7ec] rounded-none md:rounded-2xl p-2 sm:p-3 md:p-6">
          <ProductGrid
            title={`Search Results for "${query}"`}
            description={`${filtered.length} items found`}
            brand={false}
            gender={false}
            productsOverride={filtered}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SearchResults;
