import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { removeToast } from "../../redux/slices/toastSlice";
import { X, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { useState, Fragment } from "react";

const ToastContainer = () => {
  const toasts = useSelector((state) => state.toasts?.toasts || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Helper function to safely get image string
  const getProductImage = (product) => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0]; // first image
    }
    return product.image || product.mainImage || "";
  };

  return (
    <>
      {/* Desktop Toasts */}
      <div className="hidden md:flex fixed top-1/2 right-5 -translate-y-1/2 flex-col gap-3 z-[9999] pointer-events-auto w-fit">
        <AnimatePresence>
          {toasts.slice(0, 2).map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="w-95 bg-white shadow-lg rounded-xl p-4 flex gap-3 items-center relative overflow-hidden"
            >
              {/* Progress Bar */}
              <motion.div
                key={`${toast.id}-${toast.quantity}`}
                className="absolute top-0 left-0 h-1.5 bg-black/74"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              {/* Product Image */}
              <div className="w-25 h-25 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img
                  src={getProductImage(toast.product)}
                  alt={toast.product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 line-clamp-1">
                  {toast.product.name}
                </h4>
                <p className="text-red-700 text-l font-bold">
                  ${toast.product.price}
                </p>
                {toast.size && (
                  <p className="text-gray-700 text-sm font-semibold">
                    Size: <span className="font-bold">{toast.size}</span>
                  </p>
                )}
                <p className="text-gray-700 text-sm font-semibold">
                  Qty: <span className="font-bold">{toast.quantity}</span>
                </p>
                <div
                  className="flex bg-black text-white/90 justify-center gap-1.5 font-semibold rounded-3xl py-1 mt-2.5 items-center cursor-pointer"
                  onClick={() => navigate("/cart")}
                >
                  View in <ShoppingBag size={21} />
                </div>
              </div>

              {/* Close */}
              <button
                onClick={() => dispatch(removeToast(toast.id))}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition"
              >
                <X size={28} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* View More Button */}
        {toasts.length > 2 && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-800 transition"
          >
            View More ({toasts.length - 2}+)
          </button>
        )}
      </div>

      {/* Mobile Toasts */}
      <div className="flex md:hidden fixed bottom-16 left-1/2 -translate-x-1/2 z-[9999] flex-col gap-2 w-[90%] pointer-events-auto">
        <AnimatePresence>
          {toasts.slice(0, 2).map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-white rounded-lg shadow-md p-3 flex gap-3 items-center relative overflow-hidden"
            >
              {/* Progress Bar */}
              <motion.div
                key={`${toast.id}-${toast.quantity}`}
                className="absolute top-0 left-0 h-1 bg-black"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              {/* Image */}
              <div className="w-22 h-22 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img
                  src={getProductImage(toast.product)}
                  alt={toast.product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-l line-clamp-1">
                  {toast.product.name}
                </h4>
                <p className="text-red-700 text-l font-semibold">
                  ${toast.product.price}
                </p>
                {toast.size && (
                  <p className="text-gray-700 text-sm font-medium">
                    Size: <span className="font-bold">{toast.size}</span>
                  </p>
                )}
                <p className="text-gray-700 text-sm font-medium">
                  Qty: <span className="font-bold">{toast.quantity}</span>
                </p>
                <div
                  className="flex bg-black text-white/90 justify-center gap-1.5 font-normal rounded-3xl w-34 py-0.5 mt-2.5 items-center cursor-pointer"
                  onClick={() => navigate("/cart")}
                >
                  View in <ShoppingBag size={18} />
                </div>
              </div>

              {/* Close */}
              <button
                onClick={() => dispatch(removeToast(toast.id))}
                className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 transition"
              >
                <X size={30} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* View More Button */}
        {toasts.length > 2 && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-black text-white px-3 py-1 rounded-lg font-medium shadow-md hover:bg-gray-800 transition text-sm self-center"
          >
            View More ({toasts.length - 2}+)
          </button>
        )}
      </div>

      {/* Dialog for All Toasts */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} as={Fragment}>
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[10000]">
          <div className="bg-white rounded-xl w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto p-5 relative">
            <h2 className="text-lg font-bold mb-4">All Products</h2>

            {/* List all toasts */}
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className="flex gap-3 items-center p-3 border-b last:border-b-0"
              >
                <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={getProductImage(toast.product)}
                    alt={toast.product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{toast.product.name}</h4>
                  <p className="text-red-700 font-bold">
                    ${toast.product.price}
                  </p>
                  {toast.size && (
                    <p className="text-gray-700 text-sm">Size: {toast.size}</p>
                  )}
                  <p className="text-gray-700 text-sm">Qty: {toast.quantity}</p>
                </div>
                <button
                  onClick={() => dispatch(removeToast(toast.id))}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
            ))}

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={28} />
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ToastContainer;
