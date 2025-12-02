import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loadCartFromStorage } from "./cartSlice";
import { clearToasts, loadToastsFromStorage } from "./toastSlice";
import { clearWishlist, loadWishlistFromStorage } from "./wishlistSlice";

const API_URL = "http://localhost:5000/api/auth";

const storedUser = JSON.parse(localStorage.getItem("user"));

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration Failed"
      );
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  }
);

// GOOGLE LOGIN
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (googleUser, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        {
          name: googleUser.name,
          email: googleUser.email,
          googleId: googleUser.googleId,
          avatar: googleUser.avatar,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          user: res.data.user,
          token: res.data.token,
        })
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Google Login Failed"
      );
    }
  }
);

// UPDATE PROFILE
export const saveProfile = createAsyncThunk(
  "auth/saveProfile",
  async ({ formData, userId }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_URL}/update-profile?userId=${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return res.data;
    } catch {
      return rejectWithValue("Update failed");
    }
  }
);

// CHANGE PASSWORD
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ userId, oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/change-password`, {
        userId,
        oldPassword,
        newPassword,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Password change failed"
      );
    }
  }
);

// AUTH SLICE
const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: storedUser?.user || null,
    token: storedUser?.token || null,
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    // LOGOUT
    logout: (state, action) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("user");

      action.asyncDispatch(loadCartFromStorage([]));
      action.asyncDispatch(clearToasts());
      action.asyncDispatch(clearWishlist());
    },

    clearError: (state) => {
      state.error = null;
    },

    restoreUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },

    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };

      localStorage.setItem(
        "user",
        JSON.stringify({
          user: state.user,
          token: state.token,
        })
      );
    },
  },

  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem(
          "user",
          JSON.stringify({
            user: state.user,
            token: state.token,
          })
        );
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem(
          "user",
          JSON.stringify({
            user: state.user,
            token: state.token,
          })
        );

        const userId = action.payload.user._id;

        const savedCart = JSON.parse(
          localStorage.getItem(`cartItems_${userId}`) || "[]"
        );
        action.asyncDispatch(loadCartFromStorage(savedCart));

        const savedToasts = JSON.parse(
          localStorage.getItem(`toasts_${userId}`) || "[]"
        );
        action.asyncDispatch(loadToastsFromStorage(savedToasts));

        const savedWishlist = JSON.parse(
          localStorage.getItem(`wishlist_${userId}`) || "[]"
        );
        action.asyncDispatch(loadWishlistFromStorage(savedWishlist));
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GOOGLE LOGIN
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.user = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE PROFILE
      .addCase(saveProfile.fulfilled, (state, action) => {
        if (!action.payload?.user) return;

        const updatedUser = { ...action.payload.user };
        if (!updatedUser.avatar) updatedUser.avatar = null;

        state.user = { ...state.user, ...updatedUser };

        localStorage.setItem(
          "user",
          JSON.stringify({
            user: state.user,
            token: state.token,
          })
        );
      })

      .addCase(changePassword.fulfilled, (state) => {
        state.success = true;
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, restoreUser, updateUser, resetStatus } =
  authSlice.actions;

export default authSlice.reducer;
