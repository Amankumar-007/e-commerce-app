

import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Home from "./homepage/Home";
import PaymentGateway from "./homepage/payment-Gateway/PaymentGateway";
import Successfull from "./homepage/payment-success/Successfull";
import About from "./homepage/about/about";
import Login from "./components/auth/Login";
import Contact from "./homepage/contact/contact";


const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/payment-gateway" element={<PaymentGateway />} />
          <Route path="/successfull" element={<Successfull />} />
          <Route path="/about" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
