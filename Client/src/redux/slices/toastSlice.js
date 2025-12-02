import { createSlice } from "@reduxjs/toolkit";

const getUserId = () => {
  const stored = JSON.parse(localStorage.getItem("user"));
  return stored?.user?._id || "guest";
};

const loadToasts = () => {
  const userId = getUserId();
  return JSON.parse(localStorage.getItem(`toasts_${userId}`) || "[]");
};

const initialState = {
  toasts: loadToasts(),
};

const toastSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    addToast: (state, action) => {
      const {
        product,
        quantity,
        size,
        color,
        type = "success",
        message,
        duration = 3000,
      } = action.payload;

      const toastId = `${product._id}-${size || "NA"}-${color || "NA"}`;

      const existing = state.toasts.find((t) => t.id === toastId);

      if (existing) {
        existing.quantity = quantity;
        existing.message =
          message ||
          `${product.name} (${color || "default"} - ${
            size || "Free"
          }) added to bag`;
        existing.type = type;
        existing.duration = duration;
      } else {
        state.toasts.push({
          id: toastId,
          product,
          quantity,
          size,
          color,
          type,
          message:
            message ||
            `${product.name} (${color || "default"} - ${
              size || "Free"
            }) added to bag`,
          duration,
        });
      }

      const userId = getUserId();
      localStorage.setItem(`toasts_${userId}`, JSON.stringify(state.toasts));
    },

    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);

      const userId = getUserId();
      localStorage.setItem(`toasts_${userId}`, JSON.stringify(state.toasts));
    },

    updateToastQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existing = state.toasts.find((t) => t.id === id);
      if (existing) {
        existing.quantity = quantity;
      }

      const userId = getUserId();
      localStorage.setItem(`toasts_${userId}`, JSON.stringify(state.toasts));
    },

    clearToasts: (state) => {
      state.toasts = [];
      const userId = getUserId();
      localStorage.setItem(`toasts_${userId}`, "[]");
    },

    loadToastsFromStorage: (state, action) => {
      state.toasts = action.payload;
    },
  },
});

export const {
  addToast,
  removeToast,
  clearToasts,
  loadToastsFromStorage,
  updateToastQuantity,
} = toastSlice.actions;

export default toastSlice.reducer;
