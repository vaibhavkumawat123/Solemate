import Navigation from "../components/Navigation.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Footer from "../components/Footer.jsx";

const NewArrivalsPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ProductGrid
          brands={["Nike", "Puma", "Vans", "Converse", "New Balance", "Adidas"]}
          title="All Top Brands"
          description="Top shoe brands handpicked just for you"
        />
      </div>
      <Footer />
    </div>
  );
};

export default NewArrivalsPage;
