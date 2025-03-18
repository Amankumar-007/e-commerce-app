import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity, removeFromCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "../components/Footer/Footer";
import PaymentGateway from "./payment-Gateway/PaymentGateway";
import { motion } from "framer-motion";
import "./slider/imageSlider"; // Ensure this path is correct

const slides = [
  { url: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/56cb2ccc444c9596.jpeg?q=20" },
  { url: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/1e5209f72f68798b.jpeg?q=20" },
  { url: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/54b578159b0db6ae.jpg?q=20" },
  { url: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/abf1dbfce2cd6e44.jpg?q=20" },
  { url: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/8d126c44366f256b.jpeg?q=20" },
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
      <img
        src={slides[currentIndex].url}
        alt="slide"
        className="w-full h-full object-cover transition duration-700 ease-in-out"
      />
      <div className="absolute bottom-2 right-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
        {currentIndex + 1} / {slides.length}
      </div>
    </div>
  );
};

const Home = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(1000);
  const [rating, setRating] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

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
        setItems(formatted);
        setFilteredItems(formatted);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  useEffect(() => {
    let filtered = items;
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }
    filtered = filtered.filter((item) => item.price <= price);
    if (rating) {
      filtered = filtered.filter((item) => item.rating === parseInt(rating));
    }
    setFilteredItems(filtered);
  }, [searchTerm, category, price, rating, items]);

  const handleAddToCart = (item) => dispatch(addToCart(item));
  const handleRemoveFromCart = (id) => dispatch(removeFromCart(id));
  const handleIncreaseQuantity = (id) => dispatch(increaseQuantity(id));
  const handleDecreaseQuantity = (id) => dispatch(decreaseQuantity(id));

  const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const totalPrice = getTotalPrice();
    window.open(`/payment-gateway?totalPrice=${totalPrice}`, "_blank", "width=600,height=700");
  };

  const handlePaymentSuccess = (msg) => {
    setPaymentMessage(msg);
    setShowPayment(false);
    setCart([]);
  };

  const handlePaymentError = (msg) => {
    setPaymentMessage(msg);
    setShowPayment(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <header className="text-center py-6">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Our Store</h1>
      </header>

      <div className="max-w-6xl mx-auto mb-8 px-4">
        <ImageSlider />
      </div>

      <div className="max-w-4xl mx-auto px-4 mb-8">
        <input
          type="text"
          placeholder="Search for items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <div className="flex flex-wrap gap-4 mb-4">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
            <option value="">Category</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Apparel">Apparel</option>
            <option value="Computers">Computers</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Furniture">Furniture</option>
            <option value="Electronics">Electronics</option>
            <option value="Decor">Decor</option>
          </select>

          <input
            type="range"
            min="0"
            max="1000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-48"
          />
          <span>Price: ${price}</span>

          <select value={rating} onChange={(e) => setRating(e.target.value)} className="p-2 border rounded">
            <option value="">Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mb-8">
        {filteredItems.slice(0, 8).map((item) => (
          <motion.div
            key={item.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <img src={item.image} alt={item.name} className="w-full h-40 object-contain mb-2" />
            <div className="font-semibold text-lg mb-1">{item.name}</div>
            <div className="text-gray-700 mb-1">${item.price}</div>
            <div className="text-yellow-500 mb-2">{"★".repeat(item.rating)}</div>
            <button onClick={() => handleAddToCart(item)} className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
          </motion.div>
        ))}
      </div>

      <div className="text-center mb-12">
        <button onClick={() => navigate("/products")} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">See More</button>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
