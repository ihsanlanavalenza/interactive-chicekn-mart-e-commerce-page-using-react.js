import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-top">
          <div className="logo">
            <h1>🐔 ChickenMart</h1>
          </div>
          
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Cari ayam segar, ayam potong, telur..." 
              className="search-input"
            />
            <button className="search-btn">
              <FaSearch />
            </button>
          </div>
          
          <div className="header-actions">
            <div className="cart-icon">
              <FaShoppingCart />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
            <div className="user-icon">
              <FaUser />
            </div>
            <button className="menu-toggle" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul>
            <li><a href="#home">Beranda</a></li>
            <li><a href="#products">Produk</a></li>
            <li><a href="#categories">Kategori</a></li>
            <li><a href="#promo">Promo</a></li>
            <li><a href="#contact">Kontak</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
