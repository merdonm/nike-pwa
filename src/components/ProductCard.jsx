import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/features/cartSlice";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <motion.div
      className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur hover:shadow-xl hover:shadow-green-500/10 transition cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
      whileHover={{ y: -5 }}
    >
      <img src={product.image} className="h-40 object-contain mx-auto mb-4" />

      <h3 className="font-semibold text-lg">{product.name}</h3>

      <p className="text-green-400 font-bold mt-1">₹{product.price}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(addToCart(product));
        }}
        className="mt-4 w-full bg-green-500 py-2 rounded-lg hover:scale-105 transition"
      >
        Add to Cart
      </button>
    </motion.div>
  );
}
