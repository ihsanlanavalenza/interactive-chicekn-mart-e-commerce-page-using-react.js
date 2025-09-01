import React, { useState, useEffect } from 'react';
import { FaFire, FaClock } from 'react-icons/fa';
import ImagePlaceholder from './ImagePlaceholder';
import './FlashSale.css';

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  const flashProducts = [
    {
      id: 1,
      name: "Ayam Broiler Segar 1kg",
      originalPrice: 35000,
      discountPrice: 28000,
      discount: 20,
      type: 'broiler',
      sold: 45,
      stock: 100
    },
    {
      id: 2,
      name: "Ayam Kampung Organik 1kg",
      originalPrice: 75000,
      discountPrice: 60000,
      discount: 20,
      type: 'kampung',
      sold: 28,
      stock: 50
    },
    {
      id: 3,
      name: "Telur Ayam Kampung 1kg",
      originalPrice: 45000,
      discountPrice: 36000,
      discount: 20,
      type: 'telur',
      sold: 67,
      stock: 80
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flash-sale">
      <div className="container">
        <div className="flash-sale-header">
          <div className="flash-title">
            <FaFire className="fire-icon" />
            <h2>FLASH SALE</h2>
          </div>
          <div className="countdown">
            <FaClock />
            <span>Berakhir dalam:</span>
            <div className="time-blocks">
              <span className="time-block">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="separator">:</span>
              <span className="time-block">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="separator">:</span>
              <span className="time-block">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
        
        <div className="flash-products">
          {flashProducts.map(product => (
            <div key={product.id} className="flash-product">
              <div className="product-image">
                <ImagePlaceholder 
                  type={product.type}
                  width={280}
                  height={200}
                  text={product.name}
                />
                <div className="discount-badge">-{product.discount}%</div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="price-info">
                  <span className="discount-price">Rp {product.discountPrice.toLocaleString()}</span>
                  <span className="original-price">Rp {product.originalPrice.toLocaleString()}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(product.sold / product.stock) * 100}%` }}
                  ></div>
                </div>
                <div className="sold-info">Terjual {product.sold}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
