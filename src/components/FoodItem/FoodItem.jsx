import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image, discount, rating }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [flyAnimation, setFlyAnimation] = useState(false);

  const handleAddToCart = () => {
    addToCart(id);
    // Trigger fly animation
    setFlyAnimation(true);
    setTimeout(() => setFlyAnimation(false), 800);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const discountedPrice = discount ? price - (price * discount / 100) : price;
  const actualRating = rating || (Math.random() * (5 - 4) + 4).toFixed(1);

  return (
    <>
      <div className="food-item">
        {/* DISCOUNT BADGE */}
        {discount && (
          <div className="discount-badge">
            <span>{discount}% OFF</span>
          </div>
        )}

        {/* WISHLIST BUTTON */}
        <button 
          className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
          onClick={toggleWishlist}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>

        {/* IMAGE CONTAINER */}
        <div className="food-item-img-container">
          <img src={image} alt={name} className="food-item-img" />
          
          {/* ADD TO CART BUTTON */}
          {!cartItems[id] ? (
            <button
              className="add-btn"
              onClick={handleAddToCart}
            >
              <span className="add-icon">+</span>
              <span className="add-text">Add</span>
            </button>
          ) : (
            <div className="quantity-counter">
              <button
                className="counter-btn minus"
                onClick={() => removeFromCart(id)}
              >
                −
              </button>
              <span className="counter-value">{cartItems[id]}</span>
              <button
                className="counter-btn plus"
                onClick={handleAddToCart}
              >
                +
              </button>
            </div>
          )}

          {/* FLY ANIMATION */}
          {flyAnimation && (
            <div className="cart-fly-icon">🛒</div>
          )}
        </div>

        {/* FOOD INFO */}
        <div className="food-item-info">
          <div className="food-item-header">
            <h3 className="food-item-name">{name}</h3>
            <div className="food-item-rating" onClick={() => setShowReview(true)}>
              <span className="rating-star">⭐</span>
              <span className="rating-value">{actualRating}</span>
            </div>
          </div>

          <p className="food-item-desc">{description}</p>

          <div className="food-item-footer">
            <div className="price-container">
              {discount ? (
                <>
                  <span className="original-price">Rs {price}</span>
                  <span className="discounted-price">Rs {discountedPrice.toFixed(0)}</span>
                </>
              ) : (
                <span className="food-item-price">Rs {price}</span>
              )}
            </div>
            <button className="quick-view-btn" onClick={() => setShowReview(true)}>
              👁️ View
            </button>
          </div>
        </div>
      </div>

      {/* REVIEW POPUP */}
      {showReview && (
        <div className="review-popup-overlay" onClick={() => setShowReview(false)}>
          <div className="review-popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowReview(false)}>×</button>
            
            <div className="popup-image">
              <img src={image} alt={name} />
            </div>

            <div className="popup-content">
              <h2>{name}</h2>
              <div className="popup-rating">
                <span>⭐⭐⭐⭐⭐</span>
                <span className="rating-text">{actualRating} (120 reviews)</span>
              </div>
              <p className="popup-description">{description}</p>
              
              <div className="popup-price">
                {discount ? (
                  <>
                    <span className="popup-original-price">Rs {price}</span>
                    <span className="popup-discounted-price">Rs {discountedPrice.toFixed(0)}</span>
                    <span className="popup-discount-badge">{discount}% OFF</span>
                  </>
                ) : (
                  <span className="popup-current-price">Rs {price}</span>
                )}
              </div>

              <button className="popup-add-btn" onClick={() => {
                handleAddToCart();
                setShowReview(false);
              }}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodItem;
