import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./homepage/Home";
import PaymentGateway from "./homepage/payment-Gateway/PaymentGateway";
import Successfull from "./homepage/payment-success/Successfull";
import About from "./homepage/about/about";
import Login from "./components/auth/Login";
import Contact from "./homepage/contact/contact";
import Loader from "./components/Loader";
import ProductPage from "./homepage/ProductPage";
import Cart from "./homepage/Cart";

// AppWrapper handles loading screen and routes
const AppWrapper = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Show loader on route change

  if (loading) {
    return <Loader />; // Show loader while loading
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/payment-gateway" element={<PaymentGateway />} />
      <Route path="/successfull" element={<Successfull />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

// Main App
const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
};

export default App;
