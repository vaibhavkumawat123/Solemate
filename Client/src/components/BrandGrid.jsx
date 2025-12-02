import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";

const BrandGrid = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const brand = new URLSearchParams(location.search).get("name");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products?brands=${brand}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching brand products:", err));
  }, [brand]);

  return (
    <section className="px-6 py-12">
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      {description && <p className="text-gray-600 mb-6">{description}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BrandGrid;
