import React from 'react';

function Header({ onSearch }) {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <header className="header">
      <h1>WEBBYFOODY</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="search for foods"
          onChange={handleSearchChange}
          aria-label="Search for foods"
        />
      </div>
    </header>
  );
}

export default Header;
