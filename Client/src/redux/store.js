import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice.js";
import reviewReducer from "./slices/reviewSlice.js";
import toastReducer from "./slices/toastSlice";
import authReducer from "./slices/authSlice.js";
import wishlistReducer from "./slices/wishlistSlice.js";

const asyncDispatchMiddleware = (store) => (next) => (action) => {
  let syncFinished = false;
  let queue = [];

  const asyncDispatch = (asyncAction) => queue.push(asyncAction);

  const result = next({ ...action, asyncDispatch });

  syncFinished = true;
  while (queue.length) store.dispatch(queue.shift());

  return result;
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    review: reviewReducer,
    toasts: toastReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncDispatchMiddleware),
});
