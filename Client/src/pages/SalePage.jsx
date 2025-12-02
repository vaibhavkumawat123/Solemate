import Navigation from "@/components/Navigation";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const SalePage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ProductGrid
          brands={["Nike", "Puma", "Vans", "Converse", "New Balance", "Adidas"]}
          title="All Top Brands"
          description="Top sales of shoe brands handpicked just for you"
        />
      </div>
      <Footer />
    </div>
  );
};

export default SalePage;
