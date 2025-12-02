import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/slices/cartSlice";
import { addToast, removeToast } from "../redux/slices/toastSlice";
import { BrushCleaning, Trash2 } from "lucide-react";
import Footer from "../components/Footer"
import Navigation from "../components/Navigation"

const CartPage = () => {
  const items = useSelector((state) => state.cart.cartItems);
  const total = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  const getToastId = (item) =>
    `${item._id}-${item.size || "NA"}-${item.color || "NA"}`;

  const handleIncrement = (item) => {
    dispatch(incrementQuantity(item.uniqueId));

    const toastId = getToastId(item);

    dispatch(
      addToast({
        id: toastId,
        product: item.product || item,
        quantity: item.quantity + 1,
        size: item.size,
        color: item.color,
      })
    );
  };

  const handleDecrement = (item) => {
    const toastId = getToastId(item);

    if (item.quantity > 1) {
      dispatch(decrementQuantity(item.uniqueId));

      dispatch(
        addToast({
          id: toastId,
          product: item.product || item,
          quantity: item.quantity - 1,
          size: item.size,
          color: item.color,
        })
      );
    } else {
      dispatch(decrementQuantity(item.uniqueId));
      dispatch(removeToast(toastId));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item.uniqueId));
    dispatch(removeToast(getToastId(item)));
  };

  return (
    <>
    <Navigation />
    <div className="p-6 max-w-4xl mx-auto mt-20">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Your Cart</h2>

      {items.length === 0 ? (
        <div className="p-10 text-center text-gray-500 text-lg bg-white/60 backdrop-blur-md shadow rounded-xl flex justify-center gap-2.5">
          Your cart is empty <BrushCleaning />
        </div>
      ) : (
        <>
          <div className="space-y-5">
            {items.map((item) => (
              <div
                key={item.uniqueId}
                className="flex flex-col sm:flex-row justify-between items-center bg-white/80 backdrop-blur-sm shadow-md rounded-xl p-4 transition hover:shadow-lg"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover shadow-sm"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {item.name}
                    </h3>
                    <p className="text-gray-700 font-medium">₹{item.price}</p>
                    <p className="text-sm text-gray-500">
                      Size: <span className="font-medium">{item.size}</span> •
                      Color: <span className="font-medium">{item.color}</span>
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                  <button
                    onClick={() => handleDecrement(item)}
                    className="w-9 h-9 bg-gray-200 hover:bg-gray-300 text-lg font-bold rounded-lg transition"
                  >
                    −
                  </button>

                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-gray-900 font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => handleIncrement(item)}
                    className="w-9 h-9 bg-gray-200 hover:bg-gray-300 text-lg font-bold rounded-lg transition"
                  >
                    +
                  </button>
                </div>

                {/* Remove + Total */}
                <div className="text-right mt-3 sm:mt-0">
                  <p className="font-semibold text-gray-900 text-lg">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemove(item)}
                    className="mt-1 flex items-center gap-1 text-red-500 hover:text-red-600 transition text-sm"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="mt-8 p-6 bg-gray-900 text-white rounded-xl shadow-lg flex justify-between items-center">
            <h3 className="text-xl font-bold">Total: ₹{total}</h3>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
    <Footer />
    </>
  );
};

export default CartPage;
