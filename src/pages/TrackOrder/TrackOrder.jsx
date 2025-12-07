import React, { useState } from 'react';
import './TrackOrder.css';
import { assets } from '../../assets/assets';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      // Mock logic: randomly assign a status for demo purposes
      // In real app, fetch from API
      // 0: Order Placed, 1: Preparing, 2: Out for Delivery, 3: Delivered
      setOrderStatus(2); 
    }
  };

  const steps = [
    { label: "Order Placed", icon: "📝" },
    { label: "Preparing", icon: "🍳" },
    { label: "Out for Delivery", icon: "🛵" },
    { label: "Delivered", icon: "✅" }
  ];

  return (
    <div className="track-order-page">
      <div className="track-order-container">
        <h2>Track Your Order</h2>
        <form onSubmit={handleTrack} className="track-form">
          <input 
            type="text" 
            placeholder="Enter Order ID" 
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
          <button type="submit">Track Order</button>
        </form>

        {orderStatus !== null && (
          <div className="order-status-timeline">
            {steps.map((step, index) => (
              <div key={index} className={`timeline-step ${index <= orderStatus ? 'active' : ''}`}>
                <div className="step-icon">{step.icon}</div>
                <div className="step-label">{step.label}</div>
                {index < steps.length - 1 && <div className="step-line"></div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
