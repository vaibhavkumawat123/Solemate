import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  User,
  LogOut,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice.js";
import { CircleUserRound, MailCheck } from "lucide-react";
import { createPortal } from "react-dom";
import { toast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const cartCount = useSelector((state) => state.cart.cartItems.length);
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const triggerSearch = () => {
    if (!searchQuery.trim()) return;

    setIsSearchOpen(false);
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  const { user } = useSelector((state) => state.auth);

  const isActive = (path) => location.pathname === path;

  const handleUserClick = () => {
    if (!user) {
      setIsDialogOpen(true);
    } else {
      setIsDialogOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    if (!user) {
      setIsMenuOpen(false);
      setIsDialogOpen(false);
    }
  }, [user]);

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.brand.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(filtered);
  };

  const container = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        staggerChildren: 0.25,
        duration: 1.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const navItems = [
    { path: "/men", label: "Men" },
    { path: "/women", label: "Women" },
    { path: "/brands", label: "Brands" },
    { path: "/sale", label: "Sale" },
    { path: "/new-arrivals", label: "New Arrivals" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.6,
              scale: { type: "spring", bounce: 2 },
            }}
            className="group text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide transition-all duration-300 hover:scale-110"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <Link to={"/"}>
              <span className="text-white">SOLE</span>
              <span
                className="ml-1 text-[#ddb445] group-hover:text-yellow-400 transition duration-300"
                style={{ fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}
              >
                MATE
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="flex items-center space-x-8 xl:space-x-12"
            >
              {navItems.map((itemNav) => (
                <motion.div
                  key={itemNav.path}
                  variants={item}
                  whileHover={{ y: 2, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  className={`relative text-base xl:text-lg font-medium group ${
                    isActive(itemNav.path)
                      ? "text-[#ddb445]"
                      : "text-white/70 hover:text-[#ddb445]"
                  }`}
                >
                  <Link to={itemNav.path}>
                    {itemNav.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 ${
                        isActive(itemNav.path)
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="group relative h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 
  overflow-hidden rounded-full border border-white/20 
  bg-white/10 backdrop-blur-md transition duration-300 hover:scale-110
  focus:outline-none focus:ring-0"
            >
              {/* Default State */}
              <span
                className="absolute inset-0 flex items-center justify-center translate-y-0 opacity-100 
    transition-all duration-300 group-hover:-translate-y-12 group-hover:opacity-0"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
              </span>

              {/* Hover State (from bottom) */}
              <span
                className="absolute inset-0 flex items-center justify-center translate-y-12 opacity-0
    bg-[#c89c25] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-110"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-black font-bold" />
              </span>
            </Button>

            <div className="hidden lg:flex items-center space-x-2 relative z-[1000]">
              <Button
                variant="none"
                size="icon"
                onClick={() => {
                  navigate("/wishlist-page");
                }}
                className="relative h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 
rounded-full border border-white/20 bg-white/10 
backdrop-blur-md transition duration-200 
hover:scale-105 
hover:bg-transparent    
focus:outline-none focus:ring-0
"
              >
                <FaHeart className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" />

                {wishlistCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 
      bg-red-500 text-white text-[10px] sm:text-xs font-bold 
      rounded-full h-4 w-4 sm:h-5 sm:w-5 
      flex items-center justify-center shadow-md"
                  >
                    {wishlistCount}
                  </span>
                )}
              </Button>

              {/* User Button */}
              <div
                className="relative"
                onMouseEnter={() => user && setIsDialogOpen(true)}
                onMouseLeave={() => user && setIsDialogOpen(false)}
              >
                <Button
                  onClick={!user ? handleUserClick : undefined}
                  variant="none"
                  className={`relative flex items-center gap-2 rounded-full overflow-hidden 
      border border-white/20 backdrop-blur-md transition-all duration-500 group 
      focus:outline-none focus:ring-0 bg-transparent hover:bg-transparent
      ${
        user
          ? "px-3 sm:px-4 py-2 sm:py-2.5 hover:scale-[1.03]"
          : "w-10 h-10 sm:w-11 sm:h-11 justify-center hover:scale-110"
      }`}
                  style={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  }}
                >
                  {user ? (
                    <div
                      className="flex items-center gap-2 transition-all duration-500 py-3.5"
                      onClick={() => navigate("/profile")}
                    >
                      {/* === USER AVATAR SHOW WITH FALLBACK === */}
                      {user.avatar ? (
                        <img
                          src={`http://localhost:5000${user.avatar}`}
                          alt={user.name}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-[#ddb445]/70 transition-all duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 border border-white/30 flex items-center justify-center 
        transition-all duration-500 group-hover:scale-105"
                        >
                          <User className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
                        </div>
                      )}

                      {/* === NAME SHOW === */}
                      <span className="text-white/80 font-medium text-sm tracking-wide transition-all duration-500">
                        Hi,{" "}
                        <span className="text-[#ddb445] font-semibold group-hover:text-[#eecb63] transition-colors duration-500">
                          {user.name.split(" ")[0]}
                        </span>
                      </span>
                    </div>
                  ) : (
                    <>
                      <span
                        className="absolute inset-0 flex items-center justify-center 
          translate-y-0 opacity-100 group-hover:-translate-y-12 group-hover:opacity-0 
          transition-all duration-300"
                      >
                        <User className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
                      </span>
                      <span
                        className="absolute inset-0 flex items-center justify-center 
          bg-[#ddb445] text-black font-extrabold translate-y-12 opacity-0 
          group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <User className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </>
                  )}
                </Button>

                {/* ✅ Hover Dropdown */}
                <AnimatePresence>
                  {user && isDialogOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-66 bg-black/70 backdrop-blur-2xl border border-white/20 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] p-4 text-white z-[9999]"
                    >
                      <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 z-20 "
                        style={{
                          borderLeft: "12px solid transparent",
                          borderRight: "12px solid transparent",
                          borderBottom: "12px solid rgba(0,0,0,0.7)",
                          borderTop: "0px solid transparent",
                        }}
                      ></div>
                      <p className="text-sm flex items-center gap-1.5 text-gray-200 mb-1 font-medium">
                        <CircleUserRound size={34} /> {user.name}
                      </p>
                      <p className="text-[13.5px] font-semibold flex items-center gap-1.5 text-gray-300 mb-3 break-words">
                        <MailCheck size={34} /> {user.email}
                      </p>
                      <button
                        onClick={() => navigate("/profile")}
                        className="w-full mb-2.5 border-1 border-gray-300 rounded-3xl"
                      >
                        View Profile
                      </button>
                      <Button
                        onClick={() => {
                          setIsDialogOpen(false);
                          setShowLogoutDialog(true);
                        }}
                        className="w-full bg-red-500 hover:bg-red-600 text-white !font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                      >
                        <LogOut /> Logout
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!user && isDialogOpen && (
                <Dialog
                  as={motion.div}
                  static
                  open={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                  className="fixed inset-0 z-[999] flex items-center justify-center p-4"
                >
                  {/* Background Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    aria-hidden="true"
                  />

                  {/* Dialog Box */}
                  <div className="absolute top-[85px] left-1/2 -translate-x-1/2 w-full max-w-sm flex justify-center">
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="relative z-50 w-full rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 text-center shadow-2xl"
                    >
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold text-white mb-2"
                      >
                        Please Login
                      </Dialog.Title>
                      <p className="text-gray-300 mb-5">
                        You need to login to access your account.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button
                          onClick={() => {
                            setIsDialogOpen(false);
                            navigate("/user");
                          }}
                          className="!bg-[#ba942c] hover:bg-yellow-500 !text-black !font-bold px-5 !py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                          Go to Login
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                          className="border border-white/30 text-white bg-white/10 cursor-pointer transition-none hover:bg-white/10 hover:text-white"
                        >
                          Cancel
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </Dialog>
              )}
            </div>

            <Link to={"/cart"}>
              <Button
                variant="ghost"
                size="icon"
                className={`group relative h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 
rounded-full bg-gradient-to-br 
${
  cartCount > 0
    ? "from-yellow-500/30 to-yellow-300/30 hover:from-yellow-600/50 hover:to-yellow-500/50 border-yellow-500/30"
    : "from-gray-500/20 to-gray-600/20 hover:from-gray-500/30 hover:to-gray-600/30 border-gray-400/30"
} 
transition-all duration-300 backdrop-blur-md border hover:scale-110 
focus:outline-none focus:ring-0`}
              >
                <ShoppingBag
                  className={`h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 
      ${cartCount > 0 ? "text-yellow-400" : "text-gray-200"} 
      group-hover:text-black`}
                />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-white text-[10px] sm:text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 
  rounded-full bg-white/10 hover:bg-white/20 
  backdrop-blur-md transition duration-300 
  focus:outline-none focus:ring-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-white/80" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-white/80" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl z-50"
          >
            <div className="max-w-7xl mx-auto px-4 py-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.12, ease: "easeOut" },
                  },
                }}
                className="flex flex-col space-y-5 sm:space-y-6"
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    variants={{
                      hidden: { opacity: 0, x: -15 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-base sm:text-lg md:text-xl font-medium transition-all duration-500 hover:translate-x-2 ${
                        isActive(item.path)
                          ? "text-yellow-400"
                          : "text-white/70 hover:text-yellow-400"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile/Tablet User + Heart */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center justify-start space-x-4 pt-5 border-t border-white/10"
                >
                  {/* Wishlist Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/wishlist-page")}
                    className="relative h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 
           border border-white/20 backdrop-blur-md transition 
           hover:scale-110 duration-300"
                  >
                    <FaHeart className="h-5 w-5 text-white/80" />

                    {wishlistCount > 0 && (
                      <span
                        className="
      absolute -top-1 -right-1 
      bg-red-500 text-white text-[10px] font-bold 
      rounded-full h-4 w-4 flex items-center justify-center
      shadow-[0_2px_6px_rgba(0,0,0,0.4)]
    "
                      >
                        {wishlistCount}
                      </span>
                    )}
                  </Button>

                  {/* 👤 USER BUTTON*/}
                  {user ? (
                    <div
                      className="flex items-center space-x-3 cursor-pointer 
                 bg-white/10 border border-white/20 backdrop-blur-md 
                 px-4 py-2 rounded-full hover:scale-105 transition-all"
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/profile");
                      }}
                    >
                      {/* Avatar */}
                      {user.avatar ? (
                        <img
                          src={`http://localhost:5000${user.avatar}`}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover border border-yellow-600"
                        />
                      ) : (
                        <div
                          className="w-10 h-10 rounded-full bg-white/20 
                        flex items-center justify-center border border-white/30"
                        >
                          <User className="text-white/80" size={20} />
                        </div>
                      )}

                      {/* USERNAME */}
                      <span className="text-white font-medium text-lg">
                        Hi,{" "}
                        <span className="text-yellow-400 font-semibold">
                          {user.name.split(" ")[0]}
                        </span>
                      </span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/user");
                      }}
                      className="bg-white/10 border border-white/20 backdrop-blur-md 
               px-5 py-2 rounded-full text-white hover:scale-110 
               transition-all"
                    >
                      Login
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*LOGOUT CONFIRMATION POPUP */}
      {createPortal(
        <AnimatePresence>
          {showLogoutDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999] flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-2xl shadow-2xl w-80 text-center"
              >
                {!isLoggingOut ? (
                  <>
                    <h2 className="text-xl font-semibold text-white mb-3">
                      Are you sure?
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Do you really want to logout?
                    </p>

                    <div className="flex gap-3">
                      <Button
                        className="flex-1 !bg-gray-300 !text-black !font-semibold hover:bg-gray-400"
                        onClick={() => setShowLogoutDialog(false)}
                      >
                        Cancel
                      </Button>

                      <Button
                        className="flex-1 bg-red-600 text-white !font-semibold hover:bg-red-700"
                        onClick={() => {
                          setIsLoggingOut(true);

                          setTimeout(() => {
                            dispatch(logout());

                            toast({
                              title: "Logged out",
                              description:
                                "You have been logged out successfully.",
                              className:
                                "bg-black/90 text-white border border-gray-500 shadow-xl",
                            });

                            setShowLogoutDialog(false);
                            setIsLoggingOut(false);
                            navigate("/");
                            setIsMenuOpen(false);
                          }, 2500);
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mb-4" />
                    <p className="text-white font-semibold">
                      Processing logout...
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {createPortal(
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0  z-[99999] flex items-start justify-center p-6"
            >
              {/* Search Box */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 150 }}
                className="w-full max-w-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl rounded-2xl p-6 mt-20 text-white"
              >
                {/* Close Button */}
                <button
                  className="absolute !font-extrabold right-6 top-6 text-white/80 bg-black/80 p-1 rounded-2xl !px-2 !text-xl"
                  onClick={() => setIsSearchOpen(false)}
                >
                  ✕
                </button>

                {/* Title */}
                <h3 className="text-2xl text-amber-700 font-bold mb-4 ">
                  Search Products :
                </h3>

                {/* Search Input */}
                <div className="relative flex items-center gap-2">
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") triggerSearch();
                    }}
                    placeholder="Search for shoes, brands, etc..."
                    className="w-full px-4 py-3 rounded-xl text-black/60 !font-semibold focus:outline-none border-2 "
                  />

                  <button
                    onClick={triggerSearch}
                    className="p-3 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 
             text-black font-bold hover:brightness-110 transition-all shadow-lg flex items-center justify-center"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>

                {/* RESULTS */}
                <div className="mt-6 max-h-[400px] overflow-y-auto space-y-3">
                  {searchResults.length === 0 && searchQuery.length > 0 ? (
                    <p className="text-gray-300 text-center">
                      No results found...
                    </p>
                  ) : (
                    searchResults.map((product) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 flex gap-4 cursor-pointer hover:bg-white/20 transition"
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate(`/product/${product._id}`);
                        }}
                      >
                        <img
                          src={
                            product.imageURL ||
                            product.image ||
                            product.mainImage
                          }
                          className="w-16 h-16 rounded-lg object-cover"
                          alt=""
                        />
                        <div>
                          <h4 className="text-lg font-semibold">
                            {product.name}
                          </h4>
                          <p className="text-yellow-300 font-medium">
                            {product.brand}
                          </p>
                          <p className="font-bold text-white">
                            ₹{product.price}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </nav>
  );
};

export default Navigation;
