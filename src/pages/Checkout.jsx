import { useSelector } from "react-redux";
import { saveOrder } from "../db/orderDB";

export default function Checkout() {
  const cart = useSelector((state) => state.cartSlice.items);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("🛒 Cart is empty");
      return;
    }

    const order = {
      items: cart,
      date: Date.now(),
    };

    try {
      console.log("Online status:", navigator.onLine);

      if (!navigator.onLine) {
        console.log("📴 Offline detected");

        await saveOrder(order);

        const check = await getOrders();
        console.log("🧪 DB content:", check);

        alert("📴 Order saved offline!");

        if ("serviceWorker" in navigator && "SyncManager" in window) {
          const reg = await navigator.serviceWorker.ready;
          await reg.sync.register("sync-orders");
          console.log("🔄 Sync registered");
        }

        return; // 🔥 CRITICAL
      }

      // 🌐 Online
      await new Promise((res) => setTimeout(res, 1000));

      alert("✅ Order placed successfully!");
    } catch (err) {
      console.log("❌ Checkout error", err);
    }
  };

  return (
    <div className="container">
      <h1>Checkout 🧾</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      <div className="bg-white/5 p-6 rounded-2xl">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-3">
            <div className="flex gap-3 items-center">
              <img src={item.image} alt={item.name} className="size-20" />
              <span>{item.name}</span>
            </div>
            <span>₹{item.price}</span>
          </div>
        ))}

        <div className="border-t border-white/10 mt-4 pt-4 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-green-400">₹{total}</span>
        </div>

        <button className="mt-6 w-full bg-green-500 py-3 rounded-xl">
          Place Order 🚀
        </button>
      </div>
    </div>
  );
}
