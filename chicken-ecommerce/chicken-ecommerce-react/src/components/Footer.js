import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🐔 ChickenMart</h3>
            <p>
              Penyedia ayam segar berkualitas tinggi dengan layanan terpercaya
              untuk kebutuhan kuliner Anda.
            </p>
            <div className="social-media">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaWhatsapp /></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Kategori Produk</h4>
            <ul>
              <li><a href="#">Ayam Broiler</a></li>
              <li><a href="#">Ayam Kampung</a></li>
              <li><a href="#">Telur Segar</a></li>
              <li><a href="#">Produk Olahan</a></li>
              <li><a href="#">Paket Hemat</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Layanan</h4>
            <ul>
              <li><a href="#">Cara Pemesanan</a></li>
              <li><a href="#">Metode Pembayaran</a></li>
              <li><a href="#">Pengiriman</a></li>
              <li><a href="#">Kebijakan Return</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Hubungi Kami</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FaPhone />
                <span>+62 821-1234-5678</span>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <span>info@chickenmart.com</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="payment-methods">
            <span>Metode Pembayaran:</span>
            <div className="payment-icons">
              <span className="payment-method">💳 Kartu Kredit</span>
              <span className="payment-method">🏪 Transfer Bank</span>
              <span className="payment-method">💰 E-Wallet</span>
              <span className="payment-method">📱 QRIS</span>
            </div>
          </div>
          
          <div className="copyright">
            <p>&copy; 2025 ChickenMart. Semua hak dilindungi.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
