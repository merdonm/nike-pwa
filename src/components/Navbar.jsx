import usePWAInstall from "../hooks/usePWAInstall";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const cart = useSelector((state) => state.cartSlice.items);

  const { isInstallable, install } = usePWAInstall();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between py-5 sticky top-0 z-50 backdrop-blur bg-[#0b1220]/70 border-b border-white/10">
      {/* Logo */}
      <h2
        onClick={() => navigate("/")}
        className="text-xl font-bold tracking-wider cursor-pointer"
      >
        NIKE
      </h2>

      {/* Links */}
      <div className="hidden md:flex gap-8 text-sm text-gray-300">
        <span className="hover:text-white cursor-pointer">Home</span>
        <span className="hover:text-white cursor-pointer">Running</span>
        <span className="hover:text-white cursor-pointer">Casual</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div
          onClick={() => navigate("/cart")}
          className="cursor-pointer relative"
        >
          🛒
          <span className="absolute -top-2 -right-2 text-xs bg-green-500 px-1 rounded">
            {cart.length}
          </span>
        </div>

        {isInstallable && (
          <button className="bg-white text-black px-4 py-1 rounded-full text-sm hover:scale-105 transition">
            Install
          </button>
        )}
      </div>
    </nav>
  );
}
