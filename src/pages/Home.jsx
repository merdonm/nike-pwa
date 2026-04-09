import { useEffect, useState } from "react";
import { products as staticProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

import { saveProducts, getProducts } from "../db/productDB";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const loadProducts = async () => {
      // 🔥 1. Try IndexedDB first
      const cached = await getProducts();

      if (cached.length > 0) {
        console.log("📦 Loaded from IndexedDB");
        setProducts(cached);
      } else {
        console.log("🌐 Loaded from static data");

        // 🔥 2. Fallback
        setProducts(staticProducts);

        // 🔥 3. Save to IndexedDB
        await saveProducts(staticProducts);
      }
    };

    loadProducts();
  }, []);

  // 🔥 Category filter (same logic)
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="container"
    >
      {/* Hero */}
      <section className="py-16 flex flex-col md:flex-row items-center justify-between gap-10">
        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Find Your <br />
            <span className="text-green-400">Perfect Shoe</span> 👟
          </h1>

          <p className="mt-4 text-gray-400 max-w-md">
            Performance meets street style. Discover your next favorite pair.
          </p>

          <button
            disabled
            className="mt-6 bg-green-500 px-6 py-3 rounded-full font-medium hover:scale-105 transition"
          >
            Shop Now
          </button>
        </div>

        <img src="/hero-shoe.png" className="w-[400px] drop-shadow-2xl" />
      </section>

      {/* Category Filter */}
      <CategoryFilter setCategory={setCategory} />

      {/* Products */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </section>
    </motion.div>
  );
}
