import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const HeroPage = () => {
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-zinc-400 via-white to-gray-400 py-10 sm:py-12 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-8 text-center lg:text-left"
        >
          {/* Small Tag */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
            className="flex items-center justify-center lg:justify-start space-x-2 text-yellow-600"
          >
            <Star className="h-5 w-5 fill-current" />
            <span className="text-xl font-medium uppercase tracking-wider">
              Premium Quality
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
          >
            Step Into{" "}
            <span className="block bg-gradient-to-r from-[#2e2a20] to-[#d4a017] bg-clip-text text-transparent">
              Excellence
            </span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
            className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0"
          >
            Discover our curated collection of premium footwear. Where style
            meets comfort, and every step tells a story of craftsmanship.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 1.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            {/* Black CTA */}
            <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl bg-black text-white px-6 py-3 font-medium transition">
              <div className="inline-flex h-12 w-full translate-y-0 items-center justify-center bg-black px-6 text-white transition group-hover:-translate-y-[150%]">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2.5" />
              </div>
              <div className="absolute inline-flex h-12 w-full translate-y-[100%] items-center justify-center bg-[#ddb445] px-6 text-black transition duration-300 group-hover:translate-y-0">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2.5 text-black" />
              </div>
            </button>

            {/* Outline CTA */}
            <button className="group relative inline-flex h-12 w-auto items-center justify-center overflow-hidden rounded-xl border-2 border-gray-900 px-6 py-3 font-medium transition-all duration-300 ease-in-out">
              <span className="absolute inset-0 flex items-center justify-center text-gray-900 translate-y-0 group-hover:-translate-y-full opacity-100 group-hover:opacity-0 transition-all duration-300 ease-in-out">
                View Lookbook
              </span>
              <span className="absolute inset-0 flex items-center justify-center bg-black text-white translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                View Lookbook
              </span>
              <span className="invisible">View Lookbook</span>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 1.5 }}
            className="flex items-center justify-center lg:justify-start space-x-8 pt-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">500+</div>
              <div className="text-sm text-gray-600">Premium Styles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">50K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">4.9★</div>
              <div className="text-sm text-gray-600">Customer Rating</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 to-yellow-500/20 rounded-3xl blur-3xl"></div>
          <div className="relative z-10 w-full h-[350px] sm:h-[450px] lg:h-[600px]">
            <img
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"
              alt="Premium Shoes Collection"
              className="w-full h-full object-cover rounded-3xl shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroPage;
