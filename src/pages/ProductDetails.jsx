import { useNavigate, useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { addToCart } from "../app/features/cartSlice";
import { useDispatch } from "react-redux";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <h2>Product not found</h2>;

  return (
    <motion.div
      className="product-page container"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="bg-white/5 p-6 rounded-2xl">
          <img src={product.image} className="w-full object-contain" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-green-400 text-2xl mt-2">₹{product.price}</p>

          <p className="text-gray-400 mt-4">
            High quality Nike shoe with premium comfort 👟
          </p>

          <button
            className="mt-6 bg-green-500 px-6 py-3 rounded-lg hover:scale-105 transition"
            onClick={() => {
              dispatch(addToCart(product));
              navigate("/cart");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
