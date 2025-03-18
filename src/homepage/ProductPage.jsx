import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Cart from "./Cart";
import { motion } from "framer-motion";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          id: item.id,
          name: item.title,
          image: item.image,
          price: item.price,
          category: item.category,
          rating: Math.round(item.rating.rate),
        }));
        setProducts(formatted);
      });
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Hero Heading */}
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          className="text-4xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🛍️ Explore Our Products
        </motion.h1>
        <motion.button
          onClick={() => setShowCart(!showCart)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-md"
          whileTap={{ scale: 0.95 }}
        >
          🛒 Cart
        </motion.button>
      </div>

      {/* Product Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg p-4 flex flex-col items-center text-center transition duration-300"
            whileHover={{ scale: 1.03 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 object-contain mb-4"
            />
            <h3 className="font-semibold text-lg text-gray-700 mb-2">
              {product.name}
            </h3>
            <p className="text-indigo-600 font-bold mb-1">${product.price}</p>
            <p className="text-yellow-500 mb-3">
              {"★".repeat(product.rating)}
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Add to Cart
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Cart Modal */}
      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </div>
  );
};

export default ProductPage;
