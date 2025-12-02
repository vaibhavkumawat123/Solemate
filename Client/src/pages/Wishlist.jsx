import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toggleWishlist } from "../redux/slices/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";  

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector((state) =>
    state.wishlist.items.map((item) => ({
      ...item,
      _id: item._id || item.id,
    }))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 mt-21 pt-5 pb-20">
        {/*EMPTY STATE */}
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-32 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="p-3 rounded-2xl bg-red-100">
                <Heart className="text-red-600" size={28} />
              </span>
              <h1 className=" text-4xl font-extrabold tracking-tight text-gray-900">
                Your Wishlist
              </h1>
            </div>

            <p className="text-gray-600 text-lg mb-14">
              Start adding items you love
            </p>

            {/* Big Heart Icon */}
            <div className="relative mb-10">
              <div className="w-48 h-48 bg-red-100 rounded-full shadow-inner flex items-center justify-center">
                <Heart className="text-red-500" size={90} />
              </div>

              {/* Dustbin Icon */}
              <div className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#444"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M8 8l8 8M16 8l-8 8" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Your wishlist is empty
            </h2>

            <p className="text-gray-600 max-w-md mt-2">
              Save items by clicking the heart icon. They’ll appear here for
              easy access.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-8 px-8 py-3 bg-black rounded-xl text-white text-lg font-semibold hover:bg-neutral-800 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/*HEADER*/}
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
                ❤️ Wishlist
              </h1>
              <p className="text-gray-600 mt-1 text-lg">
                Items you love — saved for later
              </p>
            </div>

            {/*ITEM GRID */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 animate-fade-in">
              {wishlist.map((item) => (
                <div
                  key={item._id}
                  className="
                    bg-white rounded-3xl border border-gray-200 
                    shadow-sm hover:shadow-xl hover:-translate-y-1 
                    transition-all duration-300 overflow-hidden group
                  "
                >
                  {/* Image */}
                  <div className="w-full h-64 bg-gray-100 overflow-hidden rounded-t-3xl">
                    <img
                      src={item.image || item.imageURL || item.mainImage}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                      alt={item.name}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-sm">{item.brand}</p>

                    <p className="text-2xl font-bold text-gray-900">
                      ₹{item.price}
                    </p>

                    {!item.inStock && (
                      <span className="text-sm text-red-500 font-medium">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 p-5 pt-0">
                    <Button
                      onClick={() => navigate(`/product/${item._id}`)}
                      className="
    flex-1 !bg-black text-white py-2 rounded-xl 
    !hover:bg-neutral-800 transition !font-medium
  "
                      // disabled={!item.inStock}
                    >
                      View Product
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => {
                        dispatch(toggleWishlist(item));

                        toast({
                          title: "Removed from Wishlist 💔",
                          description: `${item.name} has been removed from your wishlist.`,
                          className:
                            "bg-black/85 text-white border border-gray-400 shadow-xl",
                        });
                      }}
                      className="border-red-500 flex items-center gap-2"
                    >
                      Remove
                      <Heart className="w-5 h-5 text-red-500" fill="red" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
