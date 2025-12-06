import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './OrderDetails.css';
import { myOrdersData } from '../../assets/myOrdersData';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Simulate fetching order by ID
    const foundOrder = myOrdersData.find(o => o.id === id);
    setOrder(foundOrder);
  }, [id]);

  if (!order) return <div className="details-loading">Loading order details...</div>;

  // Timeline steps
  const steps = [
    { label: "Order Placed", icon: "📝" },
    { label: "Cooking", icon: "🍳" },
    { label: "Out for Delivery", icon: "🛵" },
    { label: "Delivered", icon: "✅" }
  ];

  return (
    <div className="order-details-page">
      <div className="details-container">
        {/* Header */}
        <div className="details-header">
          <Link to="/myorders" className="back-link">← Back to Orders</Link>
          <div className="header-title">
            <h2>Order Details</h2>
            <span className="details-id">#{order.id}</span>
          </div>
          <button className="download-btn">Download Invoice ⬇</button>
        </div>

        {/* Live Status Content (only if active) */}
        {order.status === "In Progress" && (
          <div className="live-status-section">
            <h3>Live Status</h3>
            <div className="status-progress-bar">
              {steps.map((step, index) => (
                <div key={index} className={`progress-step ${index <= order.trackingStep ? 'completed' : ''}`}>
                  <div className="step-circle">{step.icon}</div>
                  <div className="step-text">{step.label}</div>
                  {index < steps.length - 1 && <div className="step-connector"></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="details-grid">
          {/* Order Items */}
          <div className="details-card items-card">
            <h3>Items from {order.restaurant}</h3>
            <div className="items-list">
              {order.items.map((item, idx) => (
                <div key={idx} className="item-row">
                  <div className="item-info">
                    <span className="item-qty">{item.quantity}x</span>
                    <span className="item-name">{item.name}</span>
                  </div>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="bill-summary">
              <div className="bill-row">
                <span>Item Total</span>
                <span>${(order.amount - order.deliveryFee - order.tax).toFixed(2)}</span>
              </div>
              <div className="bill-row">
                <span>Delivery Fee</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="bill-row">
                <span>Taxes & Charges</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="bill-row total-row">
                <span>Grand Total</span>
                <span>${order.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment Info */}
          <div className="info-column">
            <div className="details-card">
              <h3>Delivery Address</h3>
              <p className="address-text">
                {order.address.street}<br/>
                {order.address.city}, {order.address.zip}
              </p>
            </div>
            <div className="details-card">
              <h3>Payment Information</h3>
              <p className="payment-text">
                {order.paymentMethod}<br/>
                Status: <strong>Paid</strong>
              </p>
            </div>
            <button className="reorder-btn">🔄 Reorder</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
