import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";
import { motion, AnimatePresence } from "framer-motion";

const Cart = ({ onClose }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full sm:w-96 bg-white p-6 rounded-l-2xl shadow-lg overflow-y-auto relative"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
            onClick={onClose}
          >
            ❌
          </button>

          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border rounded-lg p-3 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-contain mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-700 truncate">{item.name}</h4>
                    <p className="text-indigo-600 font-bold">${item.price}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="mt-2 text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Total Price */}
          {cartItems.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Total: <span className="text-green-600">${getTotalPrice()}</span>
              </h3>
              <button
                className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                onClick={() => alert("Checkout coming soon!")}
              >
                Checkout
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Cart;
