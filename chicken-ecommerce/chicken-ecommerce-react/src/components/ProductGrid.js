import React, { useState } from 'react';
import { FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa';
import ImagePlaceholder from './ImagePlaceholder';
import './ProductGrid.css';

const ProductGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { id: 'all', name: 'Semua Produk' },
    { id: 'broiler', name: 'Ayam Broiler' },
    { id: 'kampung', name: 'Ayam Kampung' },
    { id: 'telur', name: 'Telur' },
    { id: 'olahan', name: 'Produk Olahan' }
  ];

  const products = [
    {
      id: 1,
      name: "Ayam Broiler Segar 1kg",
      price: 35000,
      rating: 4.8,
      reviews: 256,
      type: 'broiler',
      category: 'broiler',
      location: "Jakarta Barat",
      sold: 1200
    },
    {
      id: 2,
      name: "Ayam Kampung Organik 1kg",
      price: 75000,
      rating: 4.9,
      reviews: 189,
      type: 'kampung',
      category: 'kampung',
      location: "Bogor",
      sold: 567
    },
    {
      id: 3,
      name: "Telur Ayam Kampung 1kg",
      price: 45000,
      rating: 4.7,
      reviews: 145,
      type: 'telur',
      category: 'telur',
      location: "Bandung",
      sold: 890
    },
    {
      id: 4,
      name: "Ayam Potong Siap Masak",
      price: 40000,
      rating: 4.6,
      reviews: 98,
      type: 'broiler',
      category: 'broiler',
      location: "Tangerang",
      sold: 432
    },
    {
      id: 5,
      name: "Nugget Ayam Homemade",
      price: 25000,
      rating: 4.5,
      reviews: 76,
      type: 'olahan',
      category: 'olahan',
      location: "Jakarta Selatan",
      sold: 234
    },
    {
      id: 6,
      name: "Ayam Fillet Tanpa Tulang",
      price: 55000,
      rating: 4.8,
      reviews: 167,
      type: 'fillet',
      category: 'broiler',
      location: "Depok",
      sold: 678
    }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="product-grid-section">
      <div className="container">
        <h2 className="section-title">Produk Pilihan</h2>
        
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <ImagePlaceholder 
                  type={product.type}
                  width={280}
                  height={220}
                  text={product.name}
                />
                <button 
                  className={`favorite-btn ${favorites.includes(product.id) ? 'favorited' : ''}`}
                  onClick={() => toggleFavorite(product.id)}
                >
                  <FaHeart />
                </button>
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  Rp {product.price.toLocaleString()}
                </div>
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < Math.floor(product.rating) ? 'star filled' : 'star'} 
                      />
                    ))}
                    <span className="rating-text">{product.rating}</span>
                  </div>
                  <span className="reviews">({product.reviews} ulasan)</span>
                </div>
                <div className="product-location">{product.location}</div>
                <div className="product-sold">Terjual {product.sold}</div>
                
                <button className="add-to-cart-btn">
                  <FaShoppingCart />
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
