import Navigation from "../components/Navigation.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Footer from "../components/Footer.jsx";

const NewArrivalsPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ProductGrid
          filterNewArrival={true}
          title="New Arrivals"
          description="Latest arrivals picked just for you"
        />
      </div>
      <Footer />
    </div>
  );
};

export default NewArrivalsPage;
