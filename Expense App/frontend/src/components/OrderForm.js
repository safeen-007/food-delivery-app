import React, { useState } from 'react';
import axios from 'axios';

function OrderForm({ restaurant, onBack }) {
  const [order, setOrder] = useState({ items: '', address: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/orders', { ...order, restaurantId: restaurant.id })
      .then(response => {
        alert('Order placed successfully! Contact us at 9384798122');
        onBack();
      })
      .catch(error => console.error('Error placing order:', error));
  };

  return (
    <div>
      <h2>Order from {restaurant.name}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Items:
          <input type="text" value={order.items} onChange={(e) => setOrder({...order, items: e.target.value})} required />
        </label>
        <label>
          Address:
          <input type="text" value={order.address} onChange={(e) => setOrder({...order, address: e.target.value})} required />
        </label>
        <label>
          Phone:
          <input type="tel" value={order.phone} onChange={(e) => setOrder({...order, phone: e.target.value})} required />
        </label>
        <button type="submit" className="btn">Place Order</button>
        <button type="button" className="btn" onClick={onBack}>Back</button>
      </form>
    </div>
  );
}

export default OrderForm;
