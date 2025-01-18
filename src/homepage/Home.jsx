import { useState, useEffect } from "react";
import "./home.css";
import PaymentGateway from "./payment-Gateway/PaymentGateway";
import Navbar from "./navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import ImageSlider from "./slider/imageSlider";
import productData from "../mock-data/product.json";

const Home = () => {
  const slides = [
    {
      url: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/56cb2ccc444c9596.jpeg?q=20",
      title: "beach",
    },
    {
      url: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/1e5209f72f68798b.jpeg?q=20",
      title: "boat",
    },
    {
      url: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/54b578159b0db6ae.jpg?q=20",
      title: "forest",
    },
    {
      url: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/abf1dbfce2cd6e44.jpg?q=20",
      title: "city",
    },
    {
      url: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/8d126c44366f256b.jpeg?q=20",
      title: "italy",
    },
  ];
  const containerStyles = {
    // width: "92vw",
    height: "38vh",
    margin: "0 0 40px 0",
  };

  const initialItems = productData;

  const [items] = useState(initialItems);
  const [filteredItems, setFilteredItems] = useState(initialItems);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(1000);
  const [rating, setRating] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  // Add theme state
  const [showPayment, setShowPayment] = useState(false); // State to toggle Payment Gateway
  const [paymentMessage, setPaymentMessage] = useState(""); // For payment status messages

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll(".item-card");
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          item.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
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

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    const totalPrice = getTotalPrice();
    const url = `/payment-gateway?totalPrice=${totalPrice}`;
    window.open(url, "_blank", "width=600,height=700");
  };
  const handlePaymentSuccess = (message) => {
    setPaymentMessage(message);
    setShowPayment(false);
    setCart([]); // Clear the cart after successful payment
  };

  const handlePaymentError = (message) => {
    setPaymentMessage(message);
    setShowPayment(false);
  };

  return (
    <div className={`container`}>
      <Navbar />

      <header>
        <h1>WELCOME</h1>
      </header>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>

      <input
        type="text"
        placeholder="Search for items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="filters">
        <div className="filter-group">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
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
          />
          <span>Price: ${price}</span>
        </div>
        <div className="filter-group">
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
      </div>

      <div className="item-list">
        {filteredItems.map((item) => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-name">{item.name}</div>
            <div className="item-price">${item.price}</div>
            <div className="item-rating">{"★".repeat(item.rating)}</div>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div>{item.name}</div>
              <div>${item.price}</div>
              <div>
                <button onClick={() => handleDecreaseQuantity(item.id)}>
                  -
                </button>
                {item.quantity}
                <button onClick={() => handleIncreaseQuantity(item.id)}>
                  +
                </button>
              </div>
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))
        )}

        <div>Total: ${getTotalPrice()}</div>
        {cartItems.length > 0 && (
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        )}
      </div>

      {showPayment && (
        <PaymentGateway
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      )}

      {paymentMessage && (
        <div className="payment-message">{paymentMessage}</div>
      )}
    </div>
  );
};

export default Home;
