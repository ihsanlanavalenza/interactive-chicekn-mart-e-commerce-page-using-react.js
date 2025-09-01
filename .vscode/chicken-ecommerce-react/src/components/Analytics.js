import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { FaChartLine, FaUsers, FaShoppingCart, FaDollarSign } from 'react-icons/fa';
import './Analytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  // Data untuk chart penjualan
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    datasets: [
      {
        label: 'Penjualan (Juta Rupiah)',
        data: [12, 19, 15, 25, 22, 30],
        backgroundColor: 'rgba(255, 107, 53, 0.8)',
        borderColor: 'rgba(255, 107, 53, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Data untuk chart produk terlaris
  const productData = {
    labels: ['Ayam Broiler', 'Ayam Kampung', 'Telur', 'Produk Olahan'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          '#ff6b35',
          '#f7931e',
          '#ffeb3b',
          '#4caf50',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const stats = [
    {
      icon: <FaDollarSign />,
      title: 'Total Penjualan',
      value: 'Rp 125.5M',
      percentage: '+15.2%',
      color: '#4caf50'
    },
    {
      icon: <FaShoppingCart />,
      title: 'Total Pesanan',
      value: '3,247',
      percentage: '+8.7%',
      color: '#ff6b35'
    },
    {
      icon: <FaUsers />,
      title: 'Pelanggan Aktif',
      value: '1,856',
      percentage: '+12.3%',
      color: '#2196f3'
    },
    {
      icon: <FaChartLine />,
      title: 'Konversi Rate',
      value: '3.42%',
      percentage: '+2.1%',
      color: '#9c27b0'
    }
  ];

  return (
    <section className="analytics">
      <div className="container">
        <h2 className="section-title">Dashboard Analytics</h2>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <h3>{stat.title}</h3>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-change" style={{ color: stat.color }}>
                  {stat.percentage} dari bulan lalu
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Trend Penjualan Bulanan</h3>
            <div className="chart-container">
              <Bar data={salesData} options={chartOptions} />
            </div>
          </div>
          
          <div className="chart-card">
            <h3>Distribusi Produk Terlaris</h3>
            <div className="chart-container">
              <Doughnut data={productData} options={doughnutOptions} />
            </div>
          </div>
        </div>
        
        <div className="performance-cards">
          <div className="performance-card">
            <h4>Performa Penjualan Hari Ini</h4>
            <div className="performance-stats">
              <div className="perf-item">
                <span className="perf-label">Target Harian</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '75%' }}></div>
                </div>
                <span className="perf-value">75% (Rp 4.5M dari Rp 6M)</span>
              </div>
              <div className="perf-item">
                <span className="perf-label">Pesanan Baru</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '60%' }}></div>
                </div>
                <span className="perf-value">60% (36 dari 60 target)</span>
              </div>
              <div className="perf-item">
                <span className="perf-label">Tingkat Kepuasan</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '92%' }}></div>
                </div>
                <span className="perf-value">92% (Rating 4.6/5)</span>
              </div>
            </div>
          </div>
          
          <div className="performance-card">
            <h4>Top Performing Products</h4>
            <div className="top-products">
              <div className="top-product">
                <span className="rank">1</span>
                <span className="product">Ayam Broiler Segar</span>
                <span className="sales">1,247 terjual</span>
              </div>
              <div className="top-product">
                <span className="rank">2</span>
                <span className="product">Telur Kampung</span>
                <span className="sales">892 terjual</span>
              </div>
              <div className="top-product">
                <span className="rank">3</span>
                <span className="product">Ayam Kampung</span>
                <span className="sales">567 terjual</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
