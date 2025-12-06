import React, { useContext, useState, useEffect, useRef } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import Location from "../Location/Location";

const Navbar = ({ setShowLogin, darkMode, setDarkMode }) => {
  const { getTotalQuantity } = useContext(StoreContext);
  const totalQuantity = getTotalQuantity();

  const [menu, setMenu] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartShake, setCartShake] = useState(false);
  const [notifications, setNotifications] = useState(3); // Demo notification count
  
  const profileRef = useRef(null);
  const prevQuantity = useRef(totalQuantity);
  const langRef = useRef(null);

  const [language, setLanguage] = useState("En");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const languages = [
    { code: "En", label: "English" },
    { code: "Hi", label: "Hindi" },
    { code: "Ta", label: "Tamil" },
    { code: "Te", label: "Telugu" }
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart shake animation when items added
  useEffect(() => {
    if (totalQuantity > prevQuantity.current) {
      setCartShake(true);
      setTimeout(() => setCartShake(false), 600);
    }
    prevQuantity.current = totalQuantity;
  }, [totalQuantity]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search suggestions (demo data)
  const foodSuggestions = [
    "Pizza", "Burger", "Pasta", "Salad", "Sushi", 
    "Tacos", "Sandwich", "Noodles", "Chicken", "Dessert"
  ];

  const filteredSuggestions = searchQuery
    ? foodSuggestions.filter(item => 
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className={`navbar ${darkMode ? "dark-nav" : ""} ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        {/* LOGO */}
        <Link to="/" className="logo-link">
          <span className="logo-text">FoodZone</span>
        </Link>

        {/* LOCATION */}
        <div className="location-wrapper">
          <Location />
        </div>

        {/* NAV MENU */}
        <ul className={`navbar-menu ${mobileOpen ? "mobile-show" : ""}`}>
          <li>
            <Link
              to="/"
              onClick={() => { setMenu("home"); setMobileOpen(false); }}
              className={menu === "home" ? "active" : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href="#explore-menu"
              onClick={() => { setMenu("menu"); setMobileOpen(false); }}
              className={menu === "menu" ? "active" : ""}
            >
              Menu
            </a>
          </li>
          <li>
            <a
              href="#app-download"
              onClick={() => { setMenu("mobile-app"); setMobileOpen(false); }}
              className={menu === "mobile-app" ? "active" : ""}
            >
              Mobile App
            </a>
          </li>
          <li>
            <a
              href="#footer"
              onClick={() => { setMenu("contact-us"); setMobileOpen(false); }}
              className={menu === "contact-us" ? "active" : ""}
            >
              Contact
            </a>
          </li>
        </ul>

        {/* RIGHT SECTION */}
        <div className="navbar-right">
          {/* SEARCH with Suggestions */}
          <div className={`search-container ${searchOpen ? "search-active" : ""}`}>
            <button className="search-icon-btn" onClick={() => setSearchOpen(!searchOpen)}>
              <img src={assets.search_icon} alt="search" />
            </button>
            <input 
              type="text" 
              placeholder="Search food..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchOpen && filteredSuggestions.length > 0 && (
              <div className="search-suggestions">
                {filteredSuggestions.slice(0, 5).map((item, index) => (
                  <div 
                    key={index} 
                    className="suggestion-item"
                    onClick={() => {
                      setSearchQuery(item);
                      setSearchOpen(false);
                    }}
                  >
                    🔍 {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* NOTIFICATION BELL */}
          <div className="notification-bell">
            <button className="bell-btn">
              🔔
              {notifications > 5 && (
                <span className="notification-badge">{notifications}</span>
              )}
            </button>
          </div>

          {/* CART with Shake */}
          <Link to="/cart" className="cart-link">
            <div className={`navbar-basket-icon ${cartShake ? "cart-shake" : ""}`}>
              <img src={assets.basket_icon} alt="cart" />
              {totalQuantity > 0 && (
                <span className="cart-badge">{totalQuantity}</span>
              )}
            </div>
          </Link>

          {/* LANGUAGE SELECTOR */}
          <div className="lang-dropdown-container" ref={langRef}>
            <button 
              className="lang-btn" 
              onClick={() => setShowLangDropdown(!showLangDropdown)}
            >
              <span className="globe-icon">🌐</span>
              <span className="curr-lang">{language}</span>
            </button>
            
            {showLangDropdown && (
              <div className="lang-menu">
                {languages.map((lang) => (
                  <div 
                    key={lang.code} 
                    className={`lang-item ${language === lang.code ? 'active' : ''}`}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLangDropdown(false);
                    }}
                  >
                    {lang.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DARK MODE TOGGLE */}
          <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
            <span className="toggle-icon">{darkMode ? "☀️" : "🌙"}</span>
          </button>

          {/* USER PROFILE DROPDOWN */}
          <div className="profile-dropdown" ref={profileRef}>
            <button 
              className="profile-btn" 
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="profile-avatar">👤</div>
            </button>
            
            {profileOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <div className="profile-avatar-large">👤</div>
                  <div className="profile-info">
                    <h4>Guest User</h4>
                    <p>guest@foodzone.com</p>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/signin" className="dropdown-item" style={{ textDecoration: 'none' }}>
                  🔐 Sign In
                </Link>
                <Link to="/myorders" className="dropdown-item" style={{ textDecoration: 'none' }}>
                  📦 My Orders
                </Link>
                <Link to="/track-order" className="dropdown-item" style={{ textDecoration: 'none' }}>
                  📍 Track Order
                </Link>
                <button className="dropdown-item">
                  ❤️ Favorites
                </button>
                <button className="dropdown-item">
                  ⚙️ Settings
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout">
                  🚪 Logout
                </button>
              </div>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button 
            className="hamburger-btn" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${mobileOpen ? "open" : ""}`}></span>
            <span className={`hamburger-line ${mobileOpen ? "open" : ""}`}></span>
            <span className={`hamburger-line ${mobileOpen ? "open" : ""}`}></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
