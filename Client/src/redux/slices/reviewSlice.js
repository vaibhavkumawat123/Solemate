import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductReviews = createAsyncThunk(
  "reviews/fetchProductReviews",
  async ({ productId, page = 1 }, thunkAPI) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await axios.get(
        `${API_URL}/api/reviews/product/${productId}?page=${page}&limit=5`
      );

      return { reviews: res.data.reviews, hasMore: res.data.hasMore };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    page: 1,
    hasMore: true,
    loading: false,
    error: null,
  },
  reducers: {
    resetReviews: (state) => {
      state.reviews = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        const { reviews, page } = action.payload;

        if (page === 1) {
          state.reviews = reviews;
        } else {
          const existingIds = new Set(state.reviews.map((r) => r._id));
          const uniqueNewReviews = reviews.filter(
            (r) => !existingIds.has(r._id)
          );
          state.reviews = [...state.reviews, ...uniqueNewReviews];
        }

        state.page = page;
        state.hasMore = reviews.length > 0;
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
