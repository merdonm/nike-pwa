import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import { useEffect } from "react";
import { getOrders, clearOrders } from "./db/orderDB";
import Navbar from "./components/Navbar";

export default function App() {
  useEffect(() => {
    const syncOrders = async () => {
      const orders = await getOrders();

      if (orders.length > 0 && navigator.onLine) {
        console.log("🔄 Syncing orders...", orders);

        // simulate API call
        await new Promise((res) => setTimeout(res, 1000));

        await clearOrders();

        console.log("✅ Orders synced");
      }
    };

    syncOrders();
    window.addEventListener("online", syncOrders);

    return () => {
      window.removeEventListener("online", syncOrders);
    };
  }, []);
  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>{" "}
      </div>
    </div>
  );
}
