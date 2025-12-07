import React from 'react';
import { Link } from 'react-router-dom';
import './MyOrders.css';
import { myOrdersData } from '../../assets/myOrdersData';

const MyOrders = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'green';
      case 'In Progress': return 'orange';
      case 'Cancelled': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="my-orders-page">
      <div className="my-orders-container">
        <h2>My Orders</h2>
        <div className="orders-list">
          {myOrdersData.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-main-info">
                  <h3>{order.restaurant}</h3>
                  <span className="order-id">#{order.id}</span>
                </div>
                <div className="order-date">{order.date}</div>
              </div>

              <div className="order-summary">
                <p>
                  {order.items.map(item => item.name).join(", ").substring(0, 50)}
                  {order.items.reduce((acc, i) => acc + i.name.length, 0) > 50 ? "..." : ""}
                </p>
                <div className="order-total">${order.amount.toFixed(2)}</div>
              </div>

              <div className="order-footer">
                <span className={`order-status status-${getStatusColor(order.status)}`}>
                  ● {order.status}
                </span>
                <Link to={`/myorders/${order.id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
