import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../app/features/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cartSlice.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log({ cart });

  return (
    <div className="container">
      <h1>Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white/5 p-4 rounded-xl"
          >
            <div className="flex items-center gap-2">
              <img src={item.image} alt={item.name} className="size-20 " />
              <div>
                <h3>{item.name}</h3>
                <p className="text-green-400">₹{item.price}</p>
              </div>
            </div>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-400 hover:text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        disabled={cart.length === 0}
        onClick={() => navigate("/checkout")}
        className="mt-6 w-full bg-green-500 py-3 rounded-xl"
      >
        Checkout
      </button>
    </div>
  );
};
export default Cart;
