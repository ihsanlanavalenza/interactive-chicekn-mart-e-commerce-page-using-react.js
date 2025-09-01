import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import FlashSale from './components/FlashSale';
import ProductGrid from './components/ProductGrid';
import Analytics from './components/Analytics';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <FlashSale />
      <ProductGrid />
      <Analytics />
      <Footer />
    </div>
  );
}

export default App;
