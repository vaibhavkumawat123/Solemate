import Navigation from '@/components/Navigation';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';

const BigBrands = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-16 space-y-24">
        <ProductGrid 
          brand="Nike" 
          title="Nike Collection" 
          description="Step into innovation with Nike – unmatched comfort and legendary style."
        />
        <ProductGrid 
          brand="Puma" 
          title="Puma Collection" 
          description="Feel the power of speed and comfort with Puma footwear."
        />
        <ProductGrid 
          brand="Adidas" 
          title="Adidas Collection" 
          description="Adidas blends performance with street style for every athlete."
        />
        <ProductGrid 
          brand="Vans" 
          title="Vans Originals" 
          description="Skateboard culture meets timeless design in Vans classics."
        />
        <ProductGrid 
          brand="Converse" 
          title="Converse All Stars" 
          description="Heritage style that never fades – Converse for every generation."
        />
        <ProductGrid 
          brand="New Balance" 
          title="New Balance" 
          description="Performance-driven design with a focus on comfort and quality."
        />
      </div>

      <Footer />
    </div>
  );
};

export default BigBrands;
