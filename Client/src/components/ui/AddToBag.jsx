import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/slices/cartSlice";
import { addToast, removeToast } from "../../redux/slices/toastSlice";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const AddToBag = ({ product, color, size }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const addButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const colorString = color?.color || "Default Color";
  const sizeString = size || "Default Size";
  const isOutOfStock =
    Number(color?.items_left) === 0 ||
    color?.is_in_inventory === false ||
    Number(product?.items_left) === 0 ||
    product?.is_in_inventory === false ||
    !color ||
    !size;

  const uniqueId = `${product._id}-${sizeString}-${colorString}`;

  const cartItem = cartItems.find((item) => item.uniqueId === uniqueId);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    if (cartItem) {
      dispatch(incrementQuantity(uniqueId));
    } else {
      dispatch(
        addToCart({
          id: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          size: sizeString,
          color: colorString,
          uniqueId: uniqueId,
        })
      );
    }

    dispatch(
      addToast({
        id: uniqueId,
        product,
        size: sizeString,
        color: colorString,
        quantity: cartItem ? cartItem.quantity + 1 : 1,
        type: "success",
      })
    );
  };

  // Increment Quantity
  const handleIncrementWithToast = () => {
    if (!cartItem) return;
    dispatch(incrementQuantity(uniqueId));
    dispatch(
      addToast({
        id: uniqueId,
        product,
        size: sizeString,
        color: colorString,
        quantity: cartItem.quantity + 1,
        type: "success",
      })
    );
  };

  // Decrement Quantity
  const handleDecrementWithToast = () => {
    if (!cartItem) return;
    if (cartItem.quantity > 1) {
      dispatch(decrementQuantity(uniqueId));
      dispatch(
        addToast({
          id: uniqueId,
          product,
          size: sizeString,
          color: colorString,
          quantity: cartItem.quantity - 1,
          type: "info",
        })
      );
    } else {
      dispatch(decrementQuantity(uniqueId));
      dispatch(removeToast(uniqueId));
    }
  };

  return (
    <div className="inset-x-4 transition-all duration-500 ease-in-out">
      <AnimatePresence mode="wait">
        {cartItem ? (
          <motion.div
            key="cart-counter"
            initial={{ width: "100%" }}
            animate={{ width: "160px" }}
            exit={{ width: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center bg-black text-white rounded-xl py-2 px-3 shadow-lg relative"
            >
              <div className="flex w-full items-center justify-between z-10">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={handleDecrementWithToast}
                  className="w-full h-6 flex items-center justify-center text-white rounded-full font-extrabold shadow-md"
                >
                  <FaMinus />
                </motion.button>

                <motion.span
                  key={cartItem.quantity}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="text-xl font-bold"
                >
                  {cartItem.quantity}
                </motion.span>

                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={handleIncrementWithToast}
                  className="w-full h-6 flex items-center justify-center text-white rounded-full font-extrabold shadow-md"
                >
                  <FaPlus />
                </motion.button>
              </div>

              {loading && (
                <LinearProgress
                  sx={{
                    "& .MuiLinearProgress-bar": { backgroundColor: "#fff" },
                    backgroundColor: "rgba(255,255,255,0.2)",
                    height: 4,
                    borderRadius: 0,
                  }}
                  className="absolute bottom-0 left-0 w-full"
                />
              )}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="add-button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full relative"
          >
            <Button
              variant="accent"
              ref={addButtonRef}
              onClick={() => {
                if (isOutOfStock) return;
                handleAddToCart();
              }}
              disabled={isOutOfStock}
              className={`
      w-full font-semibold py-6 px-25 rounded-xl shadow-lg relative flex flex-col 
      justify-center items-center z-10
      ${
        isOutOfStock
          ? "bg-red-200 text-red-600 cursor-not-allowed border border-red-400"
          : "bg-black text-white hover:bg-gray-900 hover:shadow-glow"
      }
  `}
            >
              <div className="flex items-center justify-center gap-2">
                {isOutOfStock ? (
                  <span className="text-red-600 font-semibold">
                    Currently Not Available
                  </span>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" />
                    Add to Bag
                  </>
                )}
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent
          className="
      max-w-sm 
      rounded-2xl 
      p-6 
      bg-white/75 
      shadow-xl 
      border border-gray-200
      animate-in 
      fade-in-90 
      zoom-in-95
    "
        >
          <DialogHeader className="space-y-2 text-center">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Login Required
            </DialogTitle>

            <DialogDescription className="text-gray-600 font-medium text-base leading-relaxed">
              To add this product to your bag, please login to your account.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex items-center justify-center gap-3 mt-6">
            <Button
              variant="outline"
              className="w-full py-2 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => setShowLoginDialog(false)}
            >
              Cancel
            </Button>

            <Button
              className="w-full py-2 rounded-lg !bg-black text-white hover:bg-gray-900"
              onClick={() => navigate("/user")}
            >
              Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddToBag;
