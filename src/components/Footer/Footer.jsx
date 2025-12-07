import React, { useState } from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thanks for subscribing with ${email}!`);
      setEmail("");
    }
  };

  const popularDishes = [
    { name: "Margherita Pizza", price: "₹299" },
    { name: "Chicken Burger", price: "₹199" },
    { name: "Caesar Salad", price: "₹149" },
    { name: "Sushi Platter", price: "₹599" }
  ];

  return (
    <>
      {/* Feature Banner */}
      <div className="footer-banner">
        <div className="banner-container">
          <div className="banner-section">
            <div className="banner-icon">🍕</div>
            <h3>Popular Categories</h3>
            <p>Pizza • Burger • Sushi • Salad</p>
          </div>
          <div className="banner-section">
            <div className="banner-icon">🎁</div>
            <h3>Special Offers</h3>
            <p>Up to 50% OFF on first order</p>
          </div>
          <div className="banner-section">
            <div className="banner-icon">🚀</div>
            <h3>Fast Delivery</h3>
            <p>30 minutes or it's free!</p>
          </div>
          <div className="banner-section">
            <div className="banner-icon">📱</div>
            <h3>Download App</h3>
            <p>Get exclusive app-only deals</p>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer id="footer">
        <div className="footer-content">
          {/* Column 1: About & Newsletter */}
          <div className="footer-content-left">
            <h1 className="footer-logo-text">FoodZone</h1>
            <p className="footer-description">
              Your favorite food delivered hot & fresh to your doorstep. 
              Order from 500+ restaurants with lightning-fast delivery!
            </p>

            {/* Newsletter */}
            <div className="newsletter-section">
              <h3>📧 Subscribe to Newsletter</h3>
              <p className="newsletter-subtitle">Get exclusive deals & updates</p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>

            {/* Social Icons */}
            <div className="footer-social-icons">
              <a href="https://www.facebook.com" className="social-icon">
                <img src={assets.facebook_icon} alt="facebook" />
              </a>
              <a href="https://www.twitter.com" className="social-icon">
                <img src={assets.twitter_icon} alt="twitter" />
              </a>
              <a href="https://www.linkedin.com" className="social-icon">
                <img src={assets.linkedin_icon} alt="linkedin" />
              </a>
            </div>
          </div>

          {/* Column 2: Popular Dishes */}
          <div className="footer-content-center">
            <h2>🍽️ POPULAR DISHES</h2>
            <ul className="popular-dishes">
              {popularDishes.map((dish, index) => (
                <li key={index} className="dish-item">
                  <span className="dish-name">{dish.name}</span>
                  <span className="dish-price">{dish.price}</span>
                </li>
              ))}
            </ul>

            <h2 style={{ marginTop: "30px" }}>🏢 COMPANY</h2>
            <ul>
              <li onClick={() => navigate("/")}>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="footer-content-right">
            <h2>📞 GET IN TOUCH</h2>
            <ul className="contact-list">
              <li>
                <span className="contact-icon">📱</span>
                <span>(+91) 1234567890</span>
              </li>
              <li>
                <span className="contact-icon">✉️</span>
                <span><a href="http://mailto:contact@foodzone.com">contact@foodzone.com</a></span>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span>123 Food Street, Delhi</span>
              </li>
            </ul>

            {/* Opening Hours */}
            <div className="opening-hours">
              <h2>🕐 OPENING HOURS</h2>
              <ul>
                <li>
                  <span>Monday - Friday</span>
                  <span className="hours-time">9:00 AM - 11:00 PM</span>
                </li>
                <li>
                  <span>Saturday - Sunday</span>
                  <span className="hours-time">10:00 AM - 12:00 AM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: App Download & Social Proof */}
          <div className="footer-content-extra">
            <h2>📲 DOWNLOAD APP</h2>
            <p className="app-subtitle">Get ₹100 OFF on your first order!</p>
            
            <div className="app-buttons">
              <a href="#" className="app-store-btn">
                <img src={assets.app_store} alt="App Store" />
              </a>
              <a href="#" className="play-store-btn">
                <img src={assets.play_store} alt="Play Store" />
              </a>
            </div>

            {/* Social Proof */}
            <div className="social-proof">
              <div className="proof-stat">
                <h3>10K+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="proof-stat">
                <h3>500+</h3>
                <p>Restaurants</p>
              </div>
              <div className="proof-stat">
                <h3>4.8★</h3>
                <p>Average Rating</p>
              </div>
            </div>
          </div>
        </div>

        <hr />
        
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">Copyright 2024 © FoodZone.com - All Rights Reserved</p>
          <div className="footer-links">
            <a href="#">Terms & Conditions</a>
            <span>•</span>
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
