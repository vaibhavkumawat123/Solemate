import Navigation from "@/components/Navigation";
import HeroSlider from "@/components/HeroSlider";
import FeaturedBrands from "@/components/FeaturedBrands";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import HeroPage from "../components/HeroPage.jsx";
import SiteStory from "../components/SiteStory.jsx";
import SummaryPage from "../components/SummaryPage.jsx";
import ShoeSlider from "../components/ShoeSlider.jsx";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSlider />
      <HeroPage />
      <FeaturedBrands />
      <SummaryPage />
      <ShoeSlider />
      <SiteStory />
      <ProductGrid
        brands={["Nike", "Puma", "Vans", "Converse", "New Balance", "Adidas"]}
        title="An overview of the latest top branding trends"
        description="Explore the top trending branding styles dominating the market today."
      />
      <Footer />
    </div>
  );
};

export default Home;
