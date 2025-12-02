import { createSlice } from "@reduxjs/toolkit";

const getUserId = () => {
  const stored = JSON.parse(localStorage.getItem("user"));
  return stored?.user?._id || "guest";
};

const loadCart = () => {
  const userId = getUserId();
  return JSON.parse(localStorage.getItem(`cartItems_${userId}`) || "[]");
};

const storedCart = loadCart();

const initialState = {
  cartItems: storedCart,
  totalQuantity: storedCart.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: storedCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const uniqueId = `${item.id}-${item.size || "NA"}-${item.color || "NA"}`;
      const existing = state.cartItems.find((i) => i.uniqueId === uniqueId);

      if (existing) {
        existing.quantity++;
      } else {
        state.cartItems.push({ ...item, uniqueId, quantity: 1 });
      }

      state.totalQuantity++;
      state.totalPrice += item.price;

      const userId = getUserId();
      localStorage.setItem(
        `cartItems_${userId}`,
        JSON.stringify(state.cartItems)
      );
    },

    incrementQuantity: (state, action) => {
      const uniqueId = action.payload;
      const existing = state.cartItems.find((i) => i.uniqueId === uniqueId);

      if (existing) {
        existing.quantity++;
        state.totalQuantity++;
        state.totalPrice += existing.price;
      }

      const userId = getUserId();
      localStorage.setItem(
        `cartItems_${userId}`,
        JSON.stringify(state.cartItems)
      );
    },

    decrementQuantity: (state, action) => {
      const uniqueId = action.payload;
      const existing = state.cartItems.find((i) => i.uniqueId === uniqueId);

      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity--;
          state.totalQuantity--;
          state.totalPrice -= existing.price;
        } else {
          state.totalQuantity--;
          state.totalPrice -= existing.price;
          state.cartItems = state.cartItems.filter(
            (i) => i.uniqueId !== uniqueId
          );
        }
      }

      const userId = getUserId();
      localStorage.setItem(
        `cartItems_${userId}`,
        JSON.stringify(state.cartItems)
      );
    },

    removeFromCart: (state, action) => {
      const uniqueId = action.payload;
      const existing = state.cartItems.find((i) => i.uniqueId === uniqueId);

      if (existing) {
        state.totalQuantity -= existing.quantity;
        state.totalPrice -= existing.price * existing.quantity;
        state.cartItems = state.cartItems.filter(
          (i) => i.uniqueId !== uniqueId
        );
      }

      const userId = getUserId();
      localStorage.setItem(
        `cartItems_${userId}`,
        JSON.stringify(state.cartItems)
      );
    },

    loadCartFromStorage: (state, action) => {
      state.cartItems = action.payload;
      state.totalQuantity = action.payload.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = action.payload.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  loadCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
