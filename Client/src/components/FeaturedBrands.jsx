import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import img1 from "../assets/nike-shoe.png";
import img2 from "../assets/adidas-shoe.png";
import img3 from "../assets/nb-shoe.png";
import img4 from "../assets/puma-shoe.png";
import img5 from "../assets/converse-shoe.png";
import img6 from "../assets/vans-shoe.png";

import imgLogo1 from "../assets/adidas-logo.png";
import imgLogo2 from "../assets/nike-logo.png";
import imgLogo3 from "../assets/nb-logo.png";
import imgLogo4 from "../assets/puma-logo.png";
import imgLogo5 from "../assets/converse-logo.png";
import imgLogo6 from "../assets/vans-logo.png";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.25,
      duration: 1.1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const logos = [imgLogo1, imgLogo2, imgLogo3, imgLogo4, imgLogo5, imgLogo6];

const brands = [
  {
    id: 1,
    name: "Nike",
    description: "Unleash your potential with innovation and style.",
    image: img1,
    logo: imgLogo2,
  },
  {
    id: 2,
    name: "Adidas",
    description: "Elevate performance with every stride.",
    image: img2,
    logo: imgLogo1,
  },
  {
    id: 3,
    name: "New Balance",
    description: "Built for those who run the world differently.",
    image: img3,
    logo: imgLogo3,
  },
  {
    id: 4,
    name: "Puma",
    description: "Speed meets fashion — feel the energy.",
    image: img4,
    logo: imgLogo4,
  },
  {
    id: 5,
    name: "Converse",
    description: "Classics never fade — stay iconic.",
    image: img5,
    logo: imgLogo5,
  },
  {
    id: 6,
    name: "Vans",
    description: "Street-ready. Style-forward. Always original.",
    image: img6,
    logo: imgLogo6,
  },
];

const FeaturedBrands = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1] scale-105 animate-slow-pan">
        <div className="absolute inset-0 " />
      </div>

      <div className="max-w-7xl mx-auto text-center px-4 relative z-10">
        {/* Heading */}
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-5xl sm:text-6xl font-extrabold tracking-tight text-transparent 
          bg-clip-text bg-gradient-to-r from-gray-400 via-gray-600 to-zinc-950 
          drop-shadow-2xl font-[Poppins] mt-7"
        >
          <span className="bg-gradient-to-r from-[#2e2a20] to-[#d4a017] bg-clip-text text-transparent font-bold">
            Globally
          </span>{" "}
          Featured Brands
        </motion.h2>

        {/* Decorative Line */}
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-26 h-1.5 mx-auto mt-7 bg-gradient-to-r from-[#b6880b] via-[#f1ca7c] to-[#b6880b] rounded-full shadow-md mb-6"
        />

        {/* Sub Text */}
        <motion.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto font-[Outfit] italic leading-relaxed tracking-wide 
          text-center bg-gradient-to-r from-gray-900 via-gray-500 to-zinc-800 bg-clip-text text-transparent mb-12"
        >
          Step into the future with iconic brands{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b6880b] to-[#b49552be] font-semibold">
            setting new standards
          </span>{" "}
          in design, comfort, and innovation.
        </motion.p>

        {/* Logos */}
        <motion.div
          className="flex flex-wrap justify-center gap-5 sm:gap-6 md:gap-7 mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {logos.map((logo, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={fadeUp}
              className="w-16 h-16 sm:w-30 sm:h-30 rounded-full bg-gray-100 backdrop-blur-lg p-2  
              flex items-center justify-center shadow-2xl transition-transform duration-500 hover:scale-110 hover:rotate-6"
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

      {/* Brand Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 max-w-7xl mx-auto relative z-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {brands.map((brand, i) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                delay: i * 0.25,
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
              },
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, rotateX: 2, rotateY: -2 }}
            className="relative overflow-hidden rounded-2xl shadow-2xl w-full max-w-[380px] mx-auto group"
          >
            {/* Shoe Image */}
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-[370px] object-cover brightness-75 group-hover:brightness-90 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Content */}
            <div className="absolute bottom-0 p-6 z-10 flex flex-col gap-4 text-left">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-24 h-24 rounded-full bg-white/50 backdrop-blur-md p-2 flex items-center justify-center shadow-xl"
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="w-full h-full object-contain"
                />
              </motion.div>

              {/* Brand Name */}
              <h3
                className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text 
              bg-gradient-to-br from-white via-gray-300 to-white drop-shadow-sm font-[Poppins]"
              >
                {brand.name}
              </h3>

              {/* Description */}
              <p
                className="text-sm sm:text-base text-gray-300 font-[Outfit] leading-snug tracking-wide italic 
              border-l-4 border-[#d4a017] pl-4 bg-white/10 backdrop-blur-sm rounded-md"
              >
                {brand.description}
              </p>

              {/* Button */}
              <button
                onClick={() => {
                  const route = brand.name.toLowerCase().replace(/ /g, "-");
                  navigate(`/${route}`);
                }}
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full 
  font-[Poppins] font-semibold shadow-lg mt-2"
              >
                {/* Default */}
                <div
                  className="inline-flex h-12 translate-x-0 items-center justify-center 
                bg-[#143d95e0] px-8 w-full text-white transition-all duration-300 
                group-hover:-translate-x-[150%]"
                >
                  Explore Now
                </div>

                {/* Hover Layer */}
                <div
                  className="absolute inline-flex h-12 w-full translate-x-[100%] items-center justify-center 
                bg-black px-8 text-white transition-all duration-300 group-hover:translate-x-0"
                >
                  Explore Now
                </div>
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedBrands;
