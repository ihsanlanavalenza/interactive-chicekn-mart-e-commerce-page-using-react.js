import React from 'react';
import ImagePlaceholder from './ImagePlaceholder';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Ayam Segar Berkualitas Tinggi</h1>
            <p>Dapatkan ayam segar langsung dari peternak terpercaya dengan harga terbaik!</p>
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <span>Gratis Ongkir</span>
              </div>
              <div className="feature">
                <span className="feature-icon">❄️</span>
                <span>Dijamin Segar</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⭐</span>
                <span>Kualitas Terbaik</span>
              </div>
            </div>
            <button className="cta-button">Belanja Sekarang</button>
          </div>
          <div className="hero-image">
            <ImagePlaceholder 
              type="chicken" 
              width={600} 
              height={400} 
              text="ChickenMart Premium Quality"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
