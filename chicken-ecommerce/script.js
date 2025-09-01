// Cart functionality
let cart = [];
let cartCount = 0;

// DOM Elements
const cartCountElement = document.querySelector('.cart-count');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const totalAmount = document.getElementById('totalAmount');
const closeModal = document.querySelector('.close');
const cartIcon = document.querySelector('.cart');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    startCountdown();
    updateCartDisplay();
});

// Event Listeners
function initializeEventListeners() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    // Filter tabs
    const filterTabs = document.querySelectorAll('.tab-btn');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', handleFilterProducts);
    });

    // Cart modal
    cartIcon.addEventListener('click', openCartModal);
    closeModal.addEventListener('click', closeCartModal);
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });

    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}

// Add to Cart Handler
function handleAddToCart(e) {
    const productCard = e.target.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('.current-price').textContent;
    const productImage = productCard.querySelector('img').src;
    
    // Extract price number
    const price = parseInt(productPrice.replace(/[^\d]/g, ''));
    
    // Check if product already in cart
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            image: productImage,
            quantity: 1
        });
    }
    
    cartCount++;
    updateCartDisplay();
    showAddToCartAnimation(e.target);
}

// Filter Products
function handleFilterProducts(e) {
    const filterValue = e.target.getAttribute('data-filter');
    const products = document.querySelectorAll('.product-card:not(.flash)');
    const tabs = document.querySelectorAll('.tab-btn');
    
    // Update active tab
    tabs.forEach(tab => tab.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter products
    products.forEach(product => {
        if (filterValue === 'all') {
            product.style.display = 'block';
        } else {
            const category = product.getAttribute('data-category');
            product.style.display = category === filterValue ? 'block' : 'none';
        }
    });
}

// Search Handler
function handleSearch() {
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase();
    const products = document.querySelectorAll('.product-card:not(.flash)');
    
    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
            product.style.order = '-1'; // Move matching products to top
        } else {
            product.style.display = searchTerm === '' ? 'block' : 'none';
        }
    });
    
    if (searchTerm !== '') {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    }
}

// Cart Modal Functions
function openCartModal() {
    cartModal.style.display = 'block';
    renderCartItems();
}

function closeCartModal() {
    cartModal.style.display = 'none';
}

function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Keranjang Anda kosong</p>';
        return;
    }
    
    let cartHTML = '';
    cart.forEach((item, index) => {
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">Rp ${item.price.toLocaleString()}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        <button class="btn-remove" onclick="removeFromCart(${index})" title="Hapus">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = cartHTML;
}

function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        updateCartCount();
        updateCartDisplay();
        renderCartItems();
    }
}

function removeFromCart(index) {
    if (cart[index]) {
        cartCount -= cart[index].quantity;
        cart.splice(index, 1);
        updateCartDisplay();
        renderCartItems();
    }
}

function updateCartCount() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartDisplay() {
    cartCountElement.textContent = cartCount;
    
    // Update total amount
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = total.toLocaleString();
    
    // Hide cart count if empty
    if (cartCount === 0) {
        cartCountElement.style.display = 'none';
    } else {
        cartCountElement.style.display = 'flex';
    }
}

// Add to Cart Animation
function showAddToCartAnimation(button) {
    const originalText = button.textContent;
    button.textContent = '✓ Ditambahkan';
    button.style.background = '#28a745';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '#ee4d2d';
    }, 1500);
}

// Countdown Timer for Flash Sale
function startCountdown() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    let hours = 5;
    let minutes = 23;
    let seconds = 45;
    
    setInterval(() => {
        seconds--;
        
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        
        if (minutes < 0) {
            minutes = 59;
            hours--;
        }
        
        if (hours < 0) {
            hours = 5;
            minutes = 23;
            seconds = 45;
        }
        
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Smooth fade-in animation for products
function animateProducts() {
    const products = document.querySelectorAll('.product-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    products.forEach(product => {
        product.style.opacity = '0';
        product.style.transform = 'translateY(30px)';
        product.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(product);
    });
}

// Initialize animations when page loads
window.addEventListener('load', animateProducts);

// Wishlist functionality
function toggleWishlist(button) {
    button.classList.toggle('active');
    if (button.classList.contains('active')) {
        button.style.color = '#ee4d2d';
        showNotification('Ditambahkan ke wishlist');
    } else {
        button.style.color = '#666';
        showNotification('Dihapus dari wishlist');
    }
}

// Compare functionality
function addToCompare(button) {
    showNotification('Ditambahkan ke perbandingan');
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 140px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .btn-wishlist.active {
        background: #ee4d2d !important;
        color: white !important;
    }
`;
document.head.appendChild(style);

// Add event listeners for wishlist and compare buttons
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-wishlist')) {
        e.preventDefault();
        toggleWishlist(e.target.closest('.btn-wishlist'));
    }
    
    if (e.target.closest('.btn-compare')) {
        e.preventDefault();
        addToCompare(e.target.closest('.btn-compare'));
    }
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, #ee4d2d, #ff6b35)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #ee4d2d, #ff6b35)';
        header.style.backdropFilter = 'none';
    }
});

// Product image lazy loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Analytics Dashboard Functions
function initializeCharts() {
    createSalesChart();
    createCategoryChart();
    animateProgressBars();
    animateCounters();
}

// Sales Line Chart
function createSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
            datasets: [{
                label: 'Penjualan (Juta Rupiah)',
                data: [4.2, 4.8, 3.9, 5.1, 5.8, 4.5, 3.8],
                borderColor: '#ee4d2d',
                backgroundColor: 'rgba(238, 77, 45, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ee4d2d',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f0f0f0'
                    },
                    ticks: {
                        callback: function(value) {
                            return 'Rp ' + value + 'M';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                point: {
                    hoverBackgroundColor: '#ff6b35'
                }
            }
        }
    });
}

// Category Pie Chart
function createCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Ayam Potong', 'Ayam Utuh', 'Ayam Bakar', 'Ayam Frozen'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: [
                    '#FF6B6B',
                    '#4ECDC4', 
                    '#45B7D1',
                    '#96CEB4'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            cutout: '70%'
        }
    });
}

// Animate Progress Bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.fill, .perf-fill, .bar-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width || bar.getAttribute('style').match(/width:\s*(\d+%)/)?.[1];
                const height = bar.style.height || bar.getAttribute('style').match(/height:\s*(\d+%)/)?.[1];
                
                // Reset animation
                if (width) {
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                }
                
                if (height) {
                    bar.style.height = '0%';
                    setTimeout(() => {
                        bar.style.height = height;
                    }, 100);
                }
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Animate Counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-info h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                
                // Extract number from text
                const numberMatch = target.match(/[\d,\.]+/);
                if (numberMatch) {
                    const targetNumber = parseFloat(numberMatch[0].replace(/,/g, ''));
                    const prefix = target.split(numberMatch[0])[0];
                    const suffix = target.split(numberMatch[0])[1];
                    
                    animateValue(counter, 0, targetNumber, 2000, prefix, suffix);
                }
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Value Animation Function
function animateValue(element, start, end, duration, prefix = '', suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        
        let displayValue = current.toLocaleString();
        if (end >= 1000000) {
            displayValue = (current / 1000000).toFixed(1) + 'M';
        } else if (end >= 1000) {
            displayValue = (current / 1000).toFixed(0) + 'K';
        }
        
        element.textContent = prefix + displayValue + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            // Set final value
            let finalValue = end.toLocaleString();
            if (suffix.includes('M')) {
                finalValue = prefix + (end / 1000000).toFixed(1) + 'M' + suffix.replace(/[0-9,\.M]+/, '');
            } else if (end >= 1000) {
                finalValue = prefix + end.toLocaleString() + suffix;
            } else {
                finalValue = prefix + end + suffix;
            }
            element.textContent = finalValue;
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    startCountdown();
    updateCartDisplay();
    
    // Initialize charts with delay to ensure DOM is ready
    setTimeout(initializeCharts, 500);
});

// Chart period buttons functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('period-btn')) {
        // Remove active class from all period buttons
        const periodButtons = document.querySelectorAll('.period-btn');
        periodButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Update chart data based on selected period
        updateChartData(e.target.textContent);
    }
});

// Update chart data based on period
function updateChartData(period) {
    // This would typically fetch new data from API
    // For demo purposes, we'll use different dummy data
    
    let newData;
    switch(period) {
        case '7 Hari':
            newData = [4.2, 4.8, 3.9, 5.1, 5.8, 4.5, 3.8];
            break;
        case '30 Hari':
            newData = [3.8, 4.2, 4.5, 5.0, 5.3, 4.8, 5.1, 4.9, 5.2, 4.7];
            break;
        case '90 Hari':
            newData = [3.5, 3.8, 4.1, 4.3, 4.6, 4.8, 5.0, 5.2, 5.1, 4.9];
            break;
        default:
            newData = [4.2, 4.8, 3.9, 5.1, 5.8, 4.5, 3.8];
    }
    
    // Update chart if it exists
    const salesChart = Chart.getChart('salesChart');
    if (salesChart) {
        salesChart.data.datasets[0].data = newData;
        salesChart.update('active');
    }
}
