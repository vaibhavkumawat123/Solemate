import Navigation from "@/components/Navigation";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const WomenPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ProductGrid
          brand={["Nike", "Puma", "Vans", "Converse", "New Balance", "Adidas"]}
          gender="women"
          title="Walk Like You Own It"
          description="Discover women’s shoes that fuse fashion, comfort, and confidence. From everyday chic to statement styles — we’ve got your stride covered."
        />
      </div>
      <Footer />
    </div>
  );
};

export default WomenPage;
