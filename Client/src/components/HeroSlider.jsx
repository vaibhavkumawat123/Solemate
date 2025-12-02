import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
// import heroShoes1 from "@/assets/hero-shoes-1.jpg";
import heroShoes1 from "../assets/slideVideo.mp4";
import heroShoes2 from "@/assets/slideVideo2.mp4";
import heroShoes4 from "@/assets/slideVideo3.mp4";
import heroShoes3 from "@/assets/hero-shoes-3.jpg";
// import { video } from "framer-motion/client";

const slides = [
  {
    id: 1,
    video: heroShoes1,
    title: "Revolutionary Comfort",
    subtitle: "Experience the future of footwear",
    description:
      "Discover our latest collection of premium athletic shoes designed for performance and style.",
    cta: "Shop Now",
  },
  {
    id: 2,
    video: heroShoes2,
    title: "Elegance Redefined",
    subtitle: "Where luxury meets functionality",
    description:
      "Step into sophistication with our curated selection of premium lifestyle sneakers.",
    cta: "Explore Collection",
  },
  {
    id: 3,
    video: heroShoes4,
    title:
      "Step Into Style. Walk With Confidence. Where Comfort Meets Fashion.",
    subtitle: "From streetwear to sportswear, we’ve got you covered.",
    description:
      "We bring you the finest shoes from the world’s top brands – designed to keep you stylish, comfortable, and ahead of the trend.",
    cta: "Find Your Pair",
  },
  {
    id: 4,
    image: heroShoes3,
    title: "Unlimited Possibilities",
    subtitle: "Push your limits with confidence",
    description:
      "From street to sport, find the perfect pair for every moment of your journey.",
    cta: "Discover More",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 48000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const textVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 1.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative h-screen w-full overflow-hidden font-sans">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === currentSlide
              ? "translate-x-0"
              : index < currentSlide
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
        >
          {/* Background Video */}
          {slide.video ? (
            <video
              src={slide.video}
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover z-[-1]"
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center px-4 text-white">
            <div className="max-w-3xl text-center space-y-5 animate-fade-up">
              <motion.h2
                variants={textVariant}
                initial="hidden"
                animate="visible"
                custom={0.3}
                className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-400 bg-clip-text text-transparent font-[Playfair_Display] tracking-wide leading-tight drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]"
              >
                {slide.title}
              </motion.h2>

              <motion.p
                variants={textVariant}
                initial="hidden"
                animate="visible"
                custom={0.6}
                className="text-xl md:text-2xl text-yellow-200 font-[Urbanist] font-semibold tracking-wider italic drop-shadow-sm"
              >
                Experience the Icons of Innovation
              </motion.p>

              <motion.p
                variants={textVariant}
                initial="hidden"
                animate="visible"
                custom={0.9}
                className="text-base md:text-lg max-w-xl mx-auto text-zinc-200 font-[Poppins] font-bold leading-relaxed tracking-wide italic"
              >
                Discover bold designs and cutting-edge comfort crafted by the
                world’s most legendary shoe brands.
              </motion.p>

              <motion.button
                variants={textVariant}
                initial="hidden"
                animate="visible"
                custom={1.2}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border-2 border-yellow-200 bg-black text-yellow-300 font-semibold px-8 py-2.5 mt-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:bg-black group-hover:border-black"
              >
                {/* Skewed Animated Background */}
                <span className="absolute inset-0 translate-y-full skew-y-7 scale-y-0 bg-yellow-400 transition-all duration-700 ease-in-out group-hover:translate-y-0 group-hover:scale-150 z-0 rounded-xl"></span>

                {/* Text Content */}
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black font-bold">
                  {slide.cta}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full ${
              i === currentSlide
                ? "bg-white scale-110 shadow-md"
                : "bg-white/50 hover:bg-white/80"
            } transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
