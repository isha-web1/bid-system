import { useState, useEffect } from "react";
import HeroSection from "../HeroSection/HeroSection";
import LatestProducts from "../LatestProducts/LatestProducts";
import Loading from "../Loading/Loading";


export default function Home() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "http://localhost:3000/latest-products"
        );
        const data = await res.json();
        setLatestProducts(data);
      } catch (error) {
        console.error("Error fetching latest products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <div>
        <HeroSection/>
         {loading ? (
        <div className="py-16">
          <Loading />
        </div>
      ) : (
        <LatestProducts latestProducts={latestProducts} />
      )}
    </div>
  );
};