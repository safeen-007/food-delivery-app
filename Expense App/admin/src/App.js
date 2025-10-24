import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>Admin Panel - WEBBYFOODY</h1>
      </header>
      <main>
        <h2>Orders</h2>
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              Order ID: {order.id}, Items: {order.items}, Address: {order.address}, Phone: {order.phone}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
