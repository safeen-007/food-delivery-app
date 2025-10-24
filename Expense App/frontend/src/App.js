import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import RestaurantList from './components/RestaurantList';
import OrderForm from './components/OrderForm';
import './App.css';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/restaurants')
      .then(response => {
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
      })
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  useEffect(() => {
    const filtered = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  }, [searchTerm, restaurants]);

  return (
    <div className="App">
      <Header onSearch={setSearchTerm} />
      <main>
        {!selectedRestaurant ? (
          <RestaurantList restaurants={filteredRestaurants} onSelect={setSelectedRestaurant} />
        ) : (
          <OrderForm restaurant={selectedRestaurant} onBack={() => setSelectedRestaurant(null)} />
        )}
      </main>
    </div>
  );
}

export default App;
