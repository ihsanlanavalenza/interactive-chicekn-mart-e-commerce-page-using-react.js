import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import seaborn as sns
from datetime import datetime, timedelta
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots

# Set style untuk plotting
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

# Data dummy untuk e-commerce ayam
np.random.seed(42)

# 1. Data Penjualan Harian
dates = pd.date_range(start='2024-08-01', end='2024-08-31', freq='D')
daily_sales = np.random.normal(100, 20, len(dates))
daily_sales = np.maximum(daily_sales, 30)  # Minimum 30 ayam per hari

# 2. Data Kategori Produk
categories = ['Ayam Potong', 'Ayam Utuh', 'Ayam Bakar', 'Ayam Frozen']
category_sales = [450, 300, 150, 100]
category_colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']

# 3. Data Pelanggan
customer_segments = ['Pelanggan Baru', 'Pelanggan Setia', 'Pelanggan VIP']
customer_counts = [1200, 800, 567]
customer_percentages = [round(x/sum(customer_counts)*100, 1) for x in customer_counts]

# 4. Data Rating dan Review
ratings = [5, 4, 3, 2, 1]
rating_counts = [850, 120, 20, 8, 2]
rating_percentages = [round(x/sum(rating_counts)*100, 1) for x in rating_counts]

# 5. Data Penjualan per Wilayah
regions = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Semarang']
region_sales = [350, 280, 230, 180, 160]

print("=== DASHBOARD ANALYTICS TOKO AYAM ONLINE ===\n")

# Membuat visualisasi dengan matplotlib
def create_matplotlib_charts():
    fig, axes = plt.subplots(2, 3, figsize=(18, 12))
    fig.suptitle('Dashboard Analytics - ChickenMart', fontsize=20, fontweight='bold')
    
    # 1. Grafik Penjualan Harian
    axes[0,0].plot(dates, daily_sales, linewidth=3, color='#ee4d2d', marker='o', markersize=4)
    axes[0,0].set_title('Penjualan Harian (Agustus 2024)', fontweight='bold')
    axes[0,0].set_xlabel('Tanggal')
    axes[0,0].set_ylabel('Jumlah Ayam Terjual')
    axes[0,0].grid(True, alpha=0.3)
    axes[0,0].fill_between(dates, daily_sales, alpha=0.3, color='#ee4d2d')
    
    # 2. Pie Chart Kategori Produk
    wedges, texts, autotexts = axes[0,1].pie(category_sales, labels=categories, colors=category_colors, 
                                            autopct='%1.1f%%', startangle=90, explode=(0.05, 0.05, 0.05, 0.05))
    axes[0,1].set_title('Distribusi Penjualan per Kategori', fontweight='bold')
    
    # 3. Bar Chart Pelanggan
    bars = axes[0,2].bar(customer_segments, customer_counts, color=['#667eea', '#f093fb', '#43e97b'])
    axes[0,2].set_title('Segmentasi Pelanggan', fontweight='bold')
    axes[0,2].set_ylabel('Jumlah Pelanggan')
    
    # Tambahkan persentase di atas bar
    for i, (bar, percentage) in enumerate(zip(bars, customer_percentages)):
        height = bar.get_height()
        axes[0,2].text(bar.get_x() + bar.get_width()/2., height + 20,
                      f'{percentage}%', ha='center', va='bottom', fontweight='bold')
    
    # 4. Rating Distribution
    bars = axes[1,0].barh(ratings, rating_counts, color='#ffd700')
    axes[1,0].set_title('Distribusi Rating Pelanggan', fontweight='bold')
    axes[1,0].set_xlabel('Jumlah Review')
    axes[1,0].set_ylabel('Rating (Bintang)')
    
    # Tambahkan persentase
    for i, (count, percentage) in enumerate(zip(rating_counts, rating_percentages)):
        axes[1,0].text(count + 20, i, f'{percentage}%', va='center', fontweight='bold')
    
    # 5. Penjualan per Wilayah
    bars = axes[1,1].bar(regions, region_sales, color=['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'])
    axes[1,1].set_title('Penjualan per Wilayah', fontweight='bold')
    axes[1,1].set_ylabel('Jumlah Ayam Terjual')
    axes[1,1].tick_params(axis='x', rotation=45)
    
    # 6. Tren Pertumbuhan Mingguan
    weeks = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4']
    growth_rates = [8.5, 12.3, 15.7, 22.1]
    
    bars = axes[1,2].bar(weeks, growth_rates, color='#2ed573')
    axes[1,2].set_title('Pertumbuhan Penjualan Mingguan (%)', fontweight='bold')
    axes[1,2].set_ylabel('Persentase Pertumbuhan')
    axes[1,2].tick_params(axis='x', rotation=45)
    
    # Tambahkan nilai di atas bar
    for bar, rate in zip(bars, growth_rates):
        height = bar.get_height()
        axes[1,2].text(bar.get_x() + bar.get_width()/2., height + 0.5,
                      f'+{rate}%', ha='center', va='bottom', fontweight='bold')
    
    plt.tight_layout()
    plt.show()

# Membuat visualisasi interaktif dengan Plotly
def create_plotly_dashboard():
    # Create subplots
    fig = make_subplots(
        rows=2, cols=2,
        subplot_titles=('Penjualan Harian', 'Kategori Produk', 'Rating Pelanggan', 'Penjualan Wilayah'),
        specs=[[{"secondary_y": False}, {"type": "domain"}],
               [{"type": "bar"}, {"type": "bar"}]]
    )
    
    # 1. Line chart penjualan harian
    fig.add_trace(
        go.Scatter(x=dates, y=daily_sales, mode='lines+markers',
                  name='Penjualan Harian', line=dict(color='#ee4d2d', width=3),
                  fill='tonexty', fillcolor='rgba(238, 77, 45, 0.2)'),
        row=1, col=1
    )
    
    # 2. Pie chart kategori
    fig.add_trace(
        go.Pie(labels=categories, values=category_sales, 
               marker_colors=category_colors, hole=0.5),
        row=1, col=2
    )
    
    # 3. Bar chart rating
    fig.add_trace(
        go.Bar(x=ratings, y=rating_counts, name='Rating Distribution',
               marker_color='#ffd700', text=[f'{p}%' for p in rating_percentages],
               textposition='outside'),
        row=2, col=1
    )
    
    # 4. Bar chart wilayah
    fig.add_trace(
        go.Bar(x=regions, y=region_sales, name='Penjualan Wilayah',
               marker_color=['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']),
        row=2, col=2
    )
    
    # Update layout
    fig.update_layout(
        title_text="Dashboard Penjualan ChickenMart - Agustus 2024",
        title_x=0.5,
        title_font_size=20,
        showlegend=False,
        height=800
    )
    
    fig.show()

# Statistik dan Metrik Performa
def display_key_metrics():
    print("📊 METRIK UTAMA PERFORMA TOKO")
    print("=" * 50)
    
    # Hitung metrik
    total_sales = sum(daily_sales)
    avg_daily_sales = np.mean(daily_sales)
    best_day_sales = np.max(daily_sales)
    worst_day_sales = np.min(daily_sales)
    
    avg_rating = sum(r * c for r, c in zip(ratings, rating_counts)) / sum(rating_counts)
    total_customers = sum(customer_counts)
    
    print(f"🐔 Total Ayam Terjual (Agustus): {total_sales:.0f} ekor")
    print(f"📈 Rata-rata Penjualan Harian: {avg_daily_sales:.1f} ekor")
    print(f"🏆 Penjualan Terbaik: {best_day_sales:.0f} ekor")
    print(f"📉 Penjualan Terendah: {worst_day_sales:.0f} ekor")
    print(f"⭐ Rating Rata-rata: {avg_rating:.2f}/5.0")
    print(f"👥 Total Pelanggan: {total_customers:,} orang")
    
    print(f"\n💰 ESTIMASI PENDAPATAN")
    print("=" * 30)
    avg_price = 35000  # Harga rata-rata per ayam
    total_revenue = total_sales * avg_price
    print(f"💵 Total Pendapatan: Rp {total_revenue:,.0f}")
    print(f"📊 Pendapatan Rata-rata Harian: Rp {total_revenue/len(dates):,.0f}")
    
    print(f"\n🎯 PERSENTASE PERFORMA")
    print("=" * 30)
    print(f"✅ Tingkat Kepuasan (Rating 4-5): {sum(rating_percentages[:2]):.1f}%")
    print(f"🚀 Pertumbuhan Pelanggan VIP: +15.2%")
    print(f"⚡ Tingkat Respon: 95%")
    print(f"🎯 Ketepatan Waktu Pengiriman: 92%")
    print(f"🏅 Kualitas Produk: 98%")

# Analisis Tren dan Prediksi
def sales_analysis():
    print(f"\n📈 ANALISIS TREN PENJUALAN")
    print("=" * 40)
    
    # Tren mingguan
    weekly_sales = []
    for i in range(0, len(daily_sales), 7):
        week_total = sum(daily_sales[i:i+7])
        weekly_sales.append(week_total)
    
    print("📅 Penjualan Mingguan:")
    for i, week_sale in enumerate(weekly_sales, 1):
        print(f"   Minggu {i}: {week_sale:.0f} ekor")
    
    # Kategori terlaris
    print(f"\n🏆 KATEGORI TERLARIS")
    print("=" * 25)
    for i, (cat, sales) in enumerate(zip(categories, category_sales), 1):
        percentage = (sales / sum(category_sales)) * 100
        print(f"   {i}. {cat}: {sales} ekor ({percentage:.1f}%)")
    
    # Wilayah terbaik
    print(f"\n🌍 PERFORMA WILAYAH")
    print("=" * 25)
    for i, (region, sales) in enumerate(zip(regions, region_sales), 1):
        percentage = (sales / sum(region_sales)) * 100
        print(f"   {i}. {region}: {sales} ekor ({percentage:.1f}%)")

# Rekomendasi Bisnis
def business_recommendations():
    print(f"\n💡 REKOMENDASI BISNIS")
    print("=" * 30)
    
    best_category = categories[category_sales.index(max(category_sales))]
    worst_category = categories[category_sales.index(min(category_sales))]
    best_region = regions[region_sales.index(max(region_sales))]
    
    print(f"🎯 Fokus pada kategori '{best_category}' (paling laris)")
    print(f"📊 Tingkatkan promosi untuk '{worst_category}' (perlu peningkatan)")
    print(f"🌟 Ekspansi di wilayah '{best_region}' (potensi terbaik)")
    print(f"⭐ Pertahankan rating tinggi dengan kualitas produk")
    print(f"🚀 Target pertumbuhan 25% untuk bulan depan")

# Main function
def main():
    print("🐔 MEMULAI ANALISIS DATA PENJUALAN AYAM...")
    print("=" * 60)
    
    # Tampilkan metrik utama
    display_key_metrics()
    
    # Analisis tren
    sales_analysis()
    
    # Rekomendasi
    business_recommendations()
    
    print(f"\n📊 MEMBUAT VISUALISASI...")
    print("=" * 30)
    
    # Buat chart matplotlib
    create_matplotlib_charts()
    
    # Buat dashboard plotly interaktif
    print("🎨 Membuat dashboard interaktif...")
    create_plotly_dashboard()
    
    print("\n✅ ANALISIS SELESAI!")
    print("Dashboard visual telah dibuat dengan data dummy yang realistis.")

if __name__ == "__main__":
    main()
