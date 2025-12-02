import Navigation from "@/components/Navigation";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import bgBrands from "../assets/bgBrands.jpg";
import imgLogo1 from "../assets/adidas-logo.png";
import imgLogo2 from "../assets/nike-logo.png";
import imgLogo3 from "../assets/nb-logo.png";
import imgLogo4 from "../assets/puma-logo.png";
import imgLogo5 from "../assets/converse-logo.png";
import imgLogo6 from "../assets/vans-logo.png";

import { motion } from "framer-motion";

const BrandsPage = () => {
  const logos = [imgLogo1, imgLogo2, imgLogo3, imgLogo4, imgLogo5, imgLogo6];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section with Background */}
      <div
        className="relative bg-fixed h-[93vh] w-full bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${bgBrands})` }}
      >
        <div className="absolute inset-0 bg-black/56" />

        <div className="relative z-10 text-white px-6">
          {/* Heading Animation */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-extrabold drop-shadow-lg mb-7"
          >
            Explore{" "}
            <span className="bg-gradient-to-r from-[#614606] to-[#d7aa39] bg-clip-text text-transparent">
              Top
            </span>{" "}
            Brands
          </motion.h1>

          {/* Paragraph Animation */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-lg md:text-xl max-w-2xl mx-auto 
             font-[Poppins] text-gray-100 leading-relaxed tracking-wide italic"
          >
            Discover the best collections from{" "}
            <span className="font-semibold text-white">Nike</span>,{" "}
            <span className="font-semibold text-white">Adidas</span>,{" "}
            <span className="font-semibold text-white">Puma</span>,{" "}
            <span className="font-semibold text-white">Vans</span>,{" "}
            <span className="font-semibold text-white">Converse</span> &{" "}
            <span className="font-semibold text-white">New Balance</span>.
          </motion.p>

          {/* Logos with staggered animation */}
          {/* Logos with scale animation */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 sm:gap-7 md:gap-8 mt-7"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {logos.map((logo, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, scale: 0.5 },
                  show: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.15, rotate: 3 }} // hover par aur lively
                className="w-22 h-22 sm:w-25 sm:h-25 rounded-full bg-white/60 backdrop-blur-md p-3 
                 flex items-center justify-center shadow-2xl"
              >
                <img
                  src={logo}
                  alt={`logo ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Product Sections */}
      <div>
        <ProductGrid brand="Nike" title="Nike Shoes" />
        <ProductGrid brand="Adidas" title="Adidas Trending" />
        <ProductGrid brand="Puma" title="Puma Collection" />
        <ProductGrid brand="Vans" title="Vans Style" />
        <ProductGrid brand="Converse" title="Converse Classics" />
        <ProductGrid brand="New Balance" title="New Balance Picks" />
      </div>

      <Footer />
    </div>
  );
};

export default BrandsPage;
