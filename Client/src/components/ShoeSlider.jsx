import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PackageSearch } from "lucide-react";

// === Shoe Posters Import ===
import nikePoster from "../assets/nikePoster.jpg";
import adidasPoster from "../assets/adidasPoster.jpg";
import pumaPoster from "../assets/pumaPoster.jpg";
import conversePoster from "../assets/conversePoster.jpg";

const ShoeSlider = () => {
  const items = [
    {
      id: 1,
      image: nikePoster,
      title: "Nike Air Max",
      tagline: "Feel the Air. Walk on Clouds.",
    },
    {
      id: 2,
      image: adidasPoster,
      title: "Adidas Ultraboost",
      tagline: "Boost Your Run. Push Beyond Limits.",
    },
    {
      id: 3,
      image: pumaPoster,
      title: "Puma RS-X",
      tagline: "Retro Style. Modern Comfort.",
    },
    {
      id: 4,
      image: conversePoster,
      title: "Converse Classic",
      tagline: "Timeless Kicks for Every Generation.",
    },
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <section className="py-14 px-6 md:px-10 lg:px-20 flex flex-col lg:flex-row items-center justify-center lg:items-start gap-10 lg:gap-16 bg-gradient-to-tl from-gray-400 via-white to-zinc-300 overflow-hidden">
      
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2,  ease: [0.6, 0.05, 0.01, 0.9]  }}
        className="w-full lg:w-1/2 max-w-lg space-y-6 text-center lg:text-left"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-xl sm:text-2xl font-bold text-yellow-600 uppercase tracking-wider flex items-center gap-2.5 justify-center lg:justify-start"
        >
          <PackageSearch /> Luxurious Brands
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
        >
          Step Into{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-500">
            Elegance
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.9 }}
          className="text-gray-600 text-base sm:text-lg leading-relaxed"
        >
          Discover the world’s finest sneakers crafted with premium materials
          and timeless designs. Elevate your style with every step.
        </motion.p>

        {/* Customer Testimonial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 1.2 }}
          className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md"
        >
          <p className="text-gray-700 italic text-sm sm:text-base">
            “These sneakers are not just shoes, they’re an experience. Comfort,
            class and confidence in every step!”
          </p>
          <div className="mt-3 flex items-center justify-center lg:justify-start gap-3">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="customer"
              className="w-10 h-10 rounded-full border"
            />
            <div>
              <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                Rahul Sharma
              </h4>
              <span className="text-xs sm:text-sm text-gray-500">
                Verified Buyer
              </span>
            </div>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 1.5 }}
          className="flex justify-center lg:justify-start gap-4 mt-8"
        >
          <img src="https://judgeme-public-images.imgix.net/judgeme/medals-v2-2025-rebranding/tops/1-percent.svg?auto=format" alt="" />
          <img src="https://judgeme-public-images.imgix.net/judgeme/medals-v2-2025-rebranding/ver_rev/diamond.svg?auto=format" alt="" />
          <img src="https://judgeme-public-images.imgix.net/judgeme/medals-v2-2025-rebranding/auth/bronze.svg?auto=format" alt="" />
        </motion.div>
      </motion.div>

      {/* Right Slider */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="w-full lg:w-1/2 max-w-md relative rounded-2xl overflow-hidden shadow-2xl"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={items[index].id}
            src={items[index].image}
            alt={items[index].title}
            initial={{ opacity: 0, x: 150, scale: 1.1 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -150, scale: 0.9 }}
            transition={{
              duration: 1.2,
             ease: [0.6, 0.05, 0.01, 0.9],
            }}
            className="w-full h-[360px] sm:h-[460px] md:h-[520px] lg:h-[560px] object-cover rounded-2xl"
          />
        </AnimatePresence>

        {/* Title Overlay */}
        <motion.div
          key={items[index].id + "-overlay"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{
            duration: 1,
           ease: [0.6, 0.05, 0.01, 0.9],
          }}
          className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-2 sm:py-3 px-2 sm:px-3"
        >
          <h3 className="text-base sm:text-lg md:text-xl font-bold">
            {items[index].title}
          </h3>
          <p className="text-[10px] sm:text-xs md:text-sm opacity-90">
            {items[index].tagline}
          </p>
        </motion.div>

        {/* Left Button */}
        <motion.button
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.95, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-3 bg-white/80 backdrop-blur-md shadow-lg w-10 h-10 rounded-full flex items-center justify-center transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        {/* Right Button */}
        <motion.button
          whileHover={{ scale: 1.15, rotate: -5 }}
          whileTap={{ scale: 0.95, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-3 bg-white/80 backdrop-blur-md shadow-lg w-10 h-10 rounded-full flex items-center justify-center transition"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
};

/* === Arrows === */
function ArrowLeft({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ArrowRight({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default ShoeSlider;
