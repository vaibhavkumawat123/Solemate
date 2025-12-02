import Navigation from "@/components/Navigation";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const MenPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ProductGrid
          brand={["Nike", "Puma", "Vans", "Converse", "New Balance", "Adidas"]}
          gender="Men"
          title="Elevate Every Step: Elite Shoes for Men"
          description="Discover the finest collection of men’s shoes from top global brands. Whether you're chasing comfort, performance, or bold style — our curated range has the perfect pair for every step you take."
        />
      </div>
      <Footer />
    </div>
  );
};

export default MenPage;