import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Pages
import Home from "../pages/Home";
import MenPage from "../pages/MenPage";
import WomenPage from "../pages/WomenPage";
import BrandsPage from "../pages/BrandsPage";
import SalePage from "../pages/SalePage";
import NewArrivalsPage from "../pages/NewArrivalsPage";
import BigBrands from "../pages/Bigbrands";
import BrandGrid from "../components/BrandGrid";
import ProductDetails from "../pages/ProductDetails";
import NotFound from "../pages/NotFound";
import { useParams } from "react-router-dom";
import CreateReview from "../pages/CreateReview";
import CartPage from "../pages/CartPage";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";
import EditProfile from "./EditProfile";
import Wishlist from "../pages/Wishlist";
import SearchResults from "../pages/SearchResults";
import NikePage from "../pages/NikePage";
import PumaPage from "../pages/PumaPage";
import AdidasPage from "../pages/AdidasPage";
import ConversePage from "../pages/ConversePage";
import VansPage from "../pages/VansPage";
import NewBalancePage from "../pages/NewBalancePage";

const ProductDetailsWrapper = () => {
  const { productId } = useParams();
  return <ProductDetails key={productId} />;
};

const AppContent = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<MenPage />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/brands/big" element={<BigBrands />} />
          <Route path="/brand" element={<BrandGrid />} />
          <Route path="/wishlist-page" element={<Wishlist />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/nike" element={<NikePage />} />
          <Route path="/puma" element={<PumaPage />} />
          <Route path="/adidas" element={<AdidasPage />} />
          <Route path="/converse" element={<ConversePage />} />
          <Route path="/vans" element={<VansPage />} />
          <Route path="/new-balance" element={<NewBalancePage />} />
          <Route
            path="/product/:productId"
            element={<ProductDetailsWrapper />}
          />
          <Route path="/create-review" element={<CreateReview />} />
          <Route path="/user" element={<Auth />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default AppContent;
