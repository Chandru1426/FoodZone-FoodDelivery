import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  const features = [
    { icon: "🚀", text: "Fast Delivery in 30 mins" },
    { icon: "💳", text: "Secure Payment Options" },
    { icon: "🎁", text: "Exclusive App Offers" },
    { icon: "⭐", text: "Track Your Order Live" }
  ];

  return (
    <div className="app-download" id="app-download">
      <div className="app-download-container">
        {/* LEFT SIDE - Content */}
        <div className="app-download-content">
          <div className="content-wrapper">
            <span className="badge">📱 Get the App</span>
            <h2 className="app-download-title">
              Download FoodZone
              <br />
              <span className="gradient-text">For Better Experience</span>
            </h2>
            <p className="app-download-description">
              Order food faster, track deliveries in real-time, and get exclusive app-only deals!
            </p>

            {/* Feature Bullets */}
            <div className="feature-list">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="feature-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="feature-icon">{feature.icon}</span>
                  <span className="feature-text">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="app-download-platforms">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="store-btn"
              >
                <img src={assets.play_store} alt="Play Store" />
              </a>
              <a
                href="https://www.apple.com/in/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="store-btn"
              >
                <img src={assets.app_store} alt="App Store" />
              </a>
            </div>

            {/* Stats */}
            <div className="app-stats">
              <div className="stat-item">
                <h3>500K+</h3>
                <p>Downloads</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <h3>4.8⭐</h3>
                <p>Rating</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <h3>50K+</h3>
                <p>Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Floating Phone Mockup */}
        <div className="app-download-mockup">
          <div className="phone-container">
            <div className="phone-frame">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                <div className="screen-content">
                  <div className="app-preview">
                    <div className="preview-header">
                      <div className="preview-logo">🍕</div>
                      <h4>FoodZone</h4>
                    </div>
                    <div className="preview-cards">
                      <div className="preview-card"></div>
                      <div className="preview-card"></div>
                      <div className="preview-card"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Elements */}
            <div className="float-element float-1">🍔</div>
            <div className="float-element float-2">🍕</div>
            <div className="float-element float-3">🍜</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
