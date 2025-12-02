import { Award, Shield, Truck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Handcrafted with the finest materials and attention to detail that defines luxury footwear.",
  },
  {
    icon: Shield,
    title: "Lifetime Warranty",
    description:
      "We stand behind our craftsmanship with comprehensive warranty coverage for peace of mind.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description:
      "Complimentary worldwide shipping on all orders with express delivery options available.",
  },
];

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const BrandStory = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-200 via-white to-zinc-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8"
          >
            <motion.div variants={fadeUp}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Crafting{" "}
                <span className="bg-gradient-to-r from-[#2e2a20] to-[#d4a017] bg-clip-text text-transparent">
                  Excellence
                </span>{" "}
                Since 1985
              </h2>
            </motion.div>

            <motion.p variants={fadeUp} custom={1} className="text-lg text-gray-600 mb-6">
              For nearly four decades, we've been dedicated to creating
              footwear that transcends trends. Our commitment to quality,
              comfort, and style has made us a trusted name among discerning
              customers worldwide.
            </motion.p>

            <motion.p variants={fadeUp} custom={2} className="text-lg text-gray-600">
              Every pair tells a story of meticulous craftsmanship, premium
              materials, and innovative design. From our workshop to your
              wardrobe, we ensure each step you take is confident and
              comfortable.
            </motion.p>

            {/* Features with Stagger */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      delay: i * 0.3,
                      duration: 1.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    },
                  }}
                  viewport={{ once: true }}
                  className="text-center space-y-3"
                >
                  <div className="mx-auto w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Images with Stagger Grid */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {[
                "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80",
              ].map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt="brand-story"
                  className={`w-full h-48 object-cover rounded-2xl shadow-lg ${
                    i === 1 ? "mt-8" : i === 2 ? "-mt-4" : i === 3 ? "mt-4" : ""
                  }`}
                  initial={{ opacity: 0, scale: 0.85, y: 40 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      delay: i * 0.3,
                      duration: 1.2,
                      ease: [0.25, 0.1, 0.25, 1],
                    },
                  }}
                  viewport={{ once: true }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
