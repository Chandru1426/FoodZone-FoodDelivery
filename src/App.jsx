// App.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
// import LoginPopup (removed)
import Login from "./pages/Login/Login";
import TrackOrder from "./pages/TrackOrder/TrackOrder";
import MyOrders from "./pages/MyOrders/MyOrders";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import ChatBot from "./components/ChatBot/ChatBot";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    // Apply dark mode to body element
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>

      <div className={`app ${darkMode ? "dark" : "light"}`}>
        <Navbar
          setShowLogin={setShowLogin}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/myorders/:id" element={<OrderDetails />} />
          </Routes>
        </div>
      </div>
      <Footer />
      <ChatBot />
      <ScrollToTop />
    </>
  );
};

export default App;
