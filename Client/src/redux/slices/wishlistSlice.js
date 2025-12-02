import { createSlice } from "@reduxjs/toolkit";

const getUserId = () => {
  const stored = JSON.parse(localStorage.getItem("user"));
  return stored?.user?._id || "guest";
};

const loadWishlist = () => {
  const userId = getUserId();
  return JSON.parse(localStorage.getItem(`wishlist_${userId}`) || "[]");
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: loadWishlist(),
  },

  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((p) => p._id === product._id);

      if (exists) {
        state.items = state.items.filter((p) => p._id !== product._id);
      } else {
        state.items.push(product);
      }

      const userId = getUserId();
      localStorage.setItem(`wishlist_${userId}`, JSON.stringify(state.items));
    },

    loadWishlistFromStorage: (state, action) => {
      state.items = action.payload || [];
    },

    clearWishlist: (state) => {
      state.items = [];
      const userId = getUserId();
      localStorage.setItem(`wishlist_${userId}`, JSON.stringify([]));
    },
  },
});

export const { toggleWishlist, loadWishlistFromStorage, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
