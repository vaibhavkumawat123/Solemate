import { motion } from "framer-motion";
import { Play } from "lucide-react";
import desktopImage from "../assets/pageSummary8.jpg";
import mobileImage from "../assets/pageSummaryMobile.jpg";
import shoePoster from "../assets/shoePoster.jpg";

const SummaryArea = () => {
  return (
    <section className="relative z-0 py-24 px-6 sm:px-12 lg:px-20">
      {/* Desktop Background */}
      <div
        className="hidden sm:block absolute inset-0 bg-no-repeat bg-cover bg-center bg-fixed -z-10"
        style={{ backgroundImage: `url(${desktopImage})` }}
      ></div>

      {/* Mobile Background */}
      <div className="sm:hidden absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundAttachment: "scroll",
          }}
        ></div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Content Wrapper */}
      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl mx-auto">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
          >
            Step Into{" "}
            <span className="bg-gradient-to-r from-[#2e2a20] to-[#d4a017] bg-clip-text text-transparent">
              Style
            </span>
            <br /> Discover Shoes That Define You
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-200 text-lg sm:text-xl mt-6"
          >
            Elevate every step with comfort, style, and performance — designed
            for you.
          </motion.p>

          {/* Shop Button + Play Icon */}
          <div className="mt-12 flex items-center gap-12">
            {/* Shop Button */}
            <button className="group relative inline-flex h-14 sm:h-16 md:h-18 items-center justify-center overflow-hidden rounded-full font-semibold shadow-lg cursor-pointer select-none w-full sm:w-auto">
              {/* First Layer (default state) */}
              <div
                className="inline-flex h-14 sm:h-16 md:h-18 translate-x-0 items-center justify-center 
    bg-gradient-to-r from-[#2e2a20] to-[#d4a017] px-6 sm:px-10 py-3 sm:py-4 
    text-base sm:text-lg md:text-xl text-white transition group-hover:-translate-x-[150%]"
              >
                Shop the Look
              </div>

              {/* Second Layer (hover state with black bg & white text) */}
              <div
                className="absolute inline-flex h-14 sm:h-16 md:h-18 w-full translate-x-[100%] items-center justify-center 
    bg-black px-6 sm:px-10 py-3 sm:py-4 
    text-base sm:text-lg md:text-xl text-white transition duration-300 group-hover:translate-x-0"
              >
                Shop the Look
              </div>
            </button>

            {/* Play Button with Rotating Border */}
            <div className="relative flex items-center justify-center">
              {/* Rotating Border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                className="absolute w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 rounded-full border-4 border-dashed border-yellow-500"
              ></motion.div>

              {/* Play Icon */}
              <button className="relative z-10 w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 flex items-center justify-center rounded-full bg-yellow-600 hover:bg-yellow-700 transition-all">
                <Play
                  className="text-white"
                  size={20}
                  sm={24}
                  md={28}
                  lg={32}
                  xl={36}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Poster Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.4, ease: "easeOut" },
          }}
          className="w-full sm:w-[18rem] md:w-[24rem] lg:w-[28rem] relative"
        >
          <img
            src={shoePoster}
            alt="Shoe Poster"
            className="rounded-2xl shadow-3xl bg-black/10 w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SummaryArea;
