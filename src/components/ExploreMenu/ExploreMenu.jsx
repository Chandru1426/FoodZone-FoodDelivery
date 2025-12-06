import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      {/* ANIMATED TITLE */}
      <div className="section-header">
        <h1 className="section-title">
          Explore Our <span className="gradient-text">Menu</span>
          <div className="title-underline"></div>
        </h1>
        <p className="section-description">
          Choose from a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your cravings and elevate your dining experience,
          one delicious meal at a time.
        </p>
      </div>

      {/* MENU CARDS */}
      <div className="explore-menu-grid">
        {menu_list.map((item, index) => {
          const isActive = category === item.menu_name;
          
          return (
            <div
              key={index}
              className={`menu-card ${isActive ? "menu-card-active" : ""}`}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="menu-card-image">
                <img
                  src={item.menu_image}
                  alt={item.menu_name}
                />
                {isActive && <div className="active-badge">✓</div>}
              </div>
              <div className="menu-card-content">
                <h3 className="menu-card-title">{item.menu_name}</h3>
                {isActive && <div className="active-indicator"></div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* DECORATIVE DIVIDER */}
      <div className="section-divider">
        <div className="divider-line"></div>
        <div className="divider-icon">🍽️</div>
        <div className="divider-line"></div>
      </div>
    </div>
  );
};

export default ExploreMenu;
