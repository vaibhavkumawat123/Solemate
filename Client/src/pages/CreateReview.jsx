import React, { useState, useRef } from "react";
import { Rating, TextInput, Textarea, Button } from "@mantine/core";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { HiMiniCamera } from "react-icons/hi2";
import { BsCameraVideoFill } from "react-icons/bs";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CreateReview() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const fileInputRef = useRef(null);
  const location = useLocation();
  const productId = location.state?.productId;

  if (!productId) {
    toast.error("Invalid product! Try again.");
    return navigate("/");
  }

  console.log("Submitting review for productId:", productId);

  const handleSubmit = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = !!storedUser;

    if (!isLoggedIn) {
      toast.custom(
        (t) => (
          <div
            className="w-full max-w-xs p-4 bg-white shadow-lg rounded-xl border border-gray-200 flex items-start gap-3 animate-fade-in"
            style={{
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 3.1l8.485 8.485a6 6 0 01-8.485 8.485L3.515 11.586A6 6 0 0112 3.1z"
                />
              </svg>
            </div>

            <div className="flex-1">
              <p className="text-base font-semibold text-gray-900">
                Login Required
              </p>
              <p className="text-sm text-gray-600">
                To create a review, please login to your account.
              </p>
            </div>

            <button
              onClick={() => toast.dismiss(t)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>
          </div>
        ),
        {
          position: window.innerWidth < 768 ? "bottom-center" : "bottom-left",
          duration: 5000,
        }
      );

      return;
    }

    const userId = storedUser?.user?._id;
    const userName = storedUser?.user?.name;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("userId", userId);
      formData.append("userName", userName);
      formData.append("title", title);
      formData.append("rating", rating);
      formData.append("comment", comment);

      mediaFiles.forEach((file) => formData.append("media", file));

      const API_URL = import.meta.env.VITE_API_URL;

      const res = await axios.post(`${API_URL}/api/reviews`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Review submitted successfully!");
      navigate(`/product/${productId}`);
    } catch (err) {
      console.error("Error submitting review", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBoxClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const removeFile = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 p-6 md:p-12 mt-18">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Write a Product Review</h1>

          {/* Rating */}
          <div>
            <p className="font-semibold mb-2">Your Rating</p>
            <Rating
              value={rating}
              onChange={setRating}
              fractions={2}
              size="xl"
              color="black"
            />
          </div>

          {/* Title */}
          <div>
            <p className="font-semibold mb-1">
              Title of your review (required)
            </p>
            <TextInput
              placeholder="Write a short title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Review Text */}
          <div>
            <p className="font-semibold mb-1">Your Review</p>
            <Textarea
              placeholder="Share your thoughts about this product..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              autosize
              minRows={4}
            />
          </div>

          {/* Media Upload */}
          <div>
            <p className="font-semibold mb-3">Upload Image / Video</p>
            <div
              onClick={handleBoxClick}
              className="h-36 border-2 rounded-2xl border-dashed bg-gray-50 hover:bg-gray-100 border-gray-400 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-1 text-gray-600">
                <HiMiniCamera className="w-10 h-10 p-2 bg-white rounded-full shadow-md" />
                <BsCameraVideoFill className="w-10 h-10 p-2 bg-white rounded-full shadow-md" />
              </div>
              <p className="text-gray-500 font-medium text-sm">
                Click to upload
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {mediaFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center"
                >
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-black text-sm transition-colors hover:bg-red-600 z-10"
                  >
                    <span className="font-extrabold text-lg">&times;</span>
                  </button>

                  {/* Preview */}
                  {file.type.startsWith("image") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="uploaded"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <video
                        src={URL.createObjectURL(file)}
                        className="w-full h-full object-cover"
                        muted
                        controls
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                        <div className="w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            className="w-4 h-4"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={(e) => {
                const newFiles = Array.from(e.target.files);
                setMediaFiles((prev) => [...prev, ...newFiles]);
              }}
              className="hidden"
              ref={fileInputRef}
            />
          </div>

          {/* Submit */}
          <Button
            variant="filled"
            onClick={handleSubmit}
            size="md"
            color="black"
            className="transition-transform !rounded-xl hover:scale-101"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}{" "}
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
