import Navigation from "@/components/Navigation";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const SalePage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ProductGrid
          filterBestSeller={true}
          title="Best Sellers"
          description="Top-selling shoes handpicked just for you"
        />
      </div>
      <Footer />
    </div>
  );
};

export default SalePage;
