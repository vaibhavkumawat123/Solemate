import Navigation from "@/components/Navigation";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

import newBalanceVideo from "../assets/NB-video.mp4";
import newBalanceLogo from "../assets/nb-logo.png";

import { motion } from "framer-motion";

const NewBalancePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="relative h-[93vh] w-full flex items-center justify-center text-center overflow-hidden">
        {/* Background Video */}
        <video
          src={newBalanceVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.55]"
        />

        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Content */}
        <div className="relative z-10 text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold drop-shadow-xl mb-6"
          >
            Explore{" "}
            <span className="bg-gradient-to-r from-[#fbfbfb] to-[#c8c8c8] bg-clip-text text-transparent">
              New Balance
            </span>{" "}
            Collection
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-3 text-lg md:text-xl max-w-2xl mx-auto font-[Poppins] text-gray-100 leading-relaxed tracking-wide italic"
          >
            Step into premium comfort & ultimate performance with the latest{" "}
            <span className="font-semibold">New Balance Shoes</span>. From running to
            lifestyle — we have it all.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            whileHover={{ scale: 1.15, rotate: 3 }}
            className="w-28 h-28 sm:w-32 sm:h-32 bg-white/60 backdrop-blur-md mt-8 
            rounded-full flex items-center justify-center shadow-2xl p-4 mx-auto"
          >
            <img
              src={newBalanceLogo}
              alt="NewBalance Logo"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>
      </div>

      {/* Product Section  */}
      <div className="mt-6">
        <ProductGrid brand="New Balance" title="New Balance Best Sellers" />
      </div>

      <Footer />
    </div>
  );
};

export default NewBalancePage;