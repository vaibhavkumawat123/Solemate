import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  loginUser,
  resetStatus,
  googleLogin,
} from "../redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-shoes.jpg";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase";

const Auth = () => {
  const dispatch = useDispatch();
  const { loading, error, success, user } = useSelector((state) => state.auth);

  const [dialCode, setDialCode] = useState("+91");
  const [phone, setPhone] = useState("");
  // const [openDial, setOpenDial] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const countryCodes = [
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+1", country: "USA", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+33", country: "France", flag: "🇫🇷" },
  ];

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  useEffect(() => {
    if (success && user) {
      navigate("/");
    }
  }, [success, user, navigate]);

  useEffect(() => {
    if (error) {
      showToast("error", error || "Something went wrong");
    }

    if (success) {
      showToast(
        "success",
        isLogin
          ? "Welcome back! You're logged in "
          : "Account created successfully!"
      );
    }
  }, [error, success, isLogin]);

  const validatePassword = (pwd) => {
    const minLength = pwd.length >= 8;
    const startsWithCapital = /^[A-Z]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    if (!minLength) return "Password must be at least 8 characters long.";
    if (!startsWithCapital) return "Password must start with a capital letter.";
    // if (!hasSpecialChar)
    //   return "Password must contain at least one special character or symbol.";

    return null;
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      dispatch(
        googleLogin({
          name: googleUser.displayName,
          email: googleUser.email,
          googleId: googleUser.uid,
          avatar: googleUser.photoURL,
        })
      );

      toast.success("Logged in with Google!");
    } catch (error) {
      console.error(error);
      toast.error("Google Sign-in failed!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validatePassword(password);
    if (validationError) {
      showToast("error", validationError);
      return;
    }

    if (isLogin) {
      dispatch(loginUser({ email, password }));
    } else {
      if (password !== confirmPassword) {
        showToast("error", "Passwords do not match!");
        return;
      }

      dispatch(
        registerUser({
          name,
          email,
          password,
          phone: `${dialCode}${phone}`,
        })
      );
    }
  };

  const showToast = (type, message) => {
    const baseStyles =
      "px-4 py-3 rounded-xl shadow-md shadow-black/30 font-semibold text-sm";

    if (type === "error") {
      toast.error(message, {
        duration: 2200,
        className: `${baseStyles} bg-red-500 text-white border border-red-400`,
      });
    } else {
      toast.success(message, {
        duration: 5200,
        className: `${baseStyles} bg-black text-white border border-black/40`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 relative overflow-hidden min-h-[250px] lg:min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 opacity-90 z-10" />
        <img
          src={heroImage}
          alt="Premium sneakers collection"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12 text-white text-center md:text-left">
          <h1 className="text-3xl md:text-5xl mb-3 md:mb-4 animate-fade-in font-bold leading-tight">
            Step Into Style
          </h1>
          <p
            className="text-lg md:text-xl opacity-90 animate-fade-in font-semibold"
            style={{ animationDelay: "0.1s" }}
          >
            Discover the perfect pair for every adventure
          </p>
        </div>
      </div>

      {/* Right Section - Auth Form */}
      <div className="w-full lg:flex-1 flex items-center justify-center p-6 md:p-8 bg-gray-100">
        <Card className="w-full max-w-md p-8 shadow-xl shadow-black/45 animate-scale-in border border-white/10 backdrop-blur-md bg-card/90 transition-all duration-100">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl mb-2 font-bold tracking-wide">
              {isLogin ? "Welcome Back" : "Join Us"}
            </h2>
            <p className="text-muted-foreground font-semibold text-gray-500">
              {isLogin
                ? "Sign in to access your account"
                : "Create an account to get started"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            {!isLogin && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="transition-all duration-200 border-gray-600"
                />
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-all duration-200 border-gray-600"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2 animate-fade-in">
                <Label>Phone Number</Label>

                <div className="flex gap-2">
                  {/* Country Code Dropdown */}
                  <select
                    value={dialCode}
                    onChange={(e) => setDialCode(e.target.value)}
                    className="w-28 p-2 border border-gray-600 rounded-lg bg-white text-black font-medium"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+81">🇯🇵 +81</option>
                  </select>

                  {/* Phone Input */}
                  <Input
                    type="tel"
                    placeholder="**********"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 10) setPhone(value);
                    }}
                    className="flex-1 border-gray-600"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="transition-all duration-200 border-gray-600 pr-12"
                />

                {/* Eye Icon (Lucide) */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            {!isLogin && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="confirmPassword">Confirm Password</Label>

                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="transition-all duration-200 border-gray-600 pr-12"
                  />

                  {/* Eye Icon (Lucide) */}
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}

            {/* Forgot Password (Login Only) */}
            {isLogin && (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-sm text-accent hover:text-accent/80 transition-all"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full rounded-xl bg-black text-white shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-black/40 transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
            </Button>
          </form>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full mt-6 flex items-center justify-center gap-3 bg-white/45 
             text-black border border-gray-300 hover:bg-gray-100 
             rounded-xl py-3 shadow-md transition-all !font-semibold"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/960px-Google_Favicon_2025.svg.png"
              className="w-6 h-6"
              alt="Google"
            />
            Continue with Google
          </button>

          {/* Switch Auth Mode */}
          <div className="mt-6 text-center">
            <p className="text-l flex gap-2.5 justify-center text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setPassword("");
                  setConfirmPassword("");
                }}
                className="text-accent underline hover:text-accent/80 font-bold transition-all"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
