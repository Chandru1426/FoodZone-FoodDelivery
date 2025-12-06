import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
import { deliveryFee } from "../Cart/Cart";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (paymentMethod === "Visa") {
      // basic dummy validation
      if (
        !cardDetails.cardNumber ||
        !cardDetails.expiry ||
        !cardDetails.cvv
      ) {
        alert("Please enter card details.");
        return;
      }
    }

    setOrderPlaced(true);

    setTimeout(() => {
      alert("✅ Your order has been placed via " + paymentMethod);
      setCartItems({});
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <button className="GoBack" onClick={() => navigate("/cart")}>
        ⬅️ Go Back to Cart Page
      </button>

      <form className="place-order" onSubmit={handlePlaceOrder}>
        <div className="place-order-left">
          <h2 className="title">Delivery Information</h2>
          <div className="multi-fields">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>
          <input type="email" placeholder="Email Address" required />
          <input type="text" placeholder="Street" required />
          <div className="multi-fields">
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="State" required />
          </div>
          <div className="multi-fields">
            <input type="number" placeholder="Zip Code" required />
            <input type="text" placeholder="Country" required />
          </div>
          <input type="number" placeholder="Phone" required />

          {/* Payment Section */}
          <div className="payment-section">
            <h2>Payment Method</h2>
            <label>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Visa"
                checked={paymentMethod === "Visa"}
                onChange={() => setPaymentMethod("Visa")}
              />
              Visa Card
            </label>

            {paymentMethod === "Visa" && (
              <div className="card-form">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardDetails.cardNumber}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                />
              </div>
            )}
          </div>
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2 className="title">Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>Rs{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>Rs{getTotalCartAmount() === 0 ? 0 : deliveryFee}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  Rs
                  {getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + deliveryFee}
                </b>
              </div>
            </div>

            {orderPlaced && (
              <div className="order-confirmation">
                ✅ Processing your order...
              </div>
            )}

            <button
              type="submit"
              className="place-order-btn"
              disabled={getTotalCartAmount() === 0 || orderPlaced}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
