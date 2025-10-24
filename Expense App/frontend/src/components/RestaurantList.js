import React from 'react';

function RestaurantList({ restaurants, onSelect }) {
  return (
    <div>
      <h2>Fast Foods</h2>
      <div className="restaurant-grid">
        {restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <div className="restaurant-3d">
              <img src={restaurant.image} alt={restaurant.name} loading="lazy" />
            </div>
            <h3>{restaurant.name}</h3>
            <p>{restaurant.cuisine || 'Delicious Food'}</p>
            <p>Rating: {restaurant.rating} ⭐</p>
            <button className="btn" onClick={() => onSelect(restaurant)}>Order Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;
