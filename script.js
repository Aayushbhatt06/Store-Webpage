// Product data
const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        description: "High-quality sound with noise cancellation technology",
        price: 299.99,
        emoji: "🎧"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        description: "Track your health and fitness goals with style",
        price: 399.99,
        emoji: "⌚"
    },
    {
        id: 3,
        name: "Designer Sunglasses",
        description: "UV protection with premium polarized lenses",
        price: 199.99,
        emoji: "🕶"
    },
    {
        id: 4,
        name: "Luxury Leather Bag",
        description: "Handcrafted genuine leather with elegant design",
        price: 549.99,
        emoji: "👜"
    },
    {
        id: 5,
        name: "Organic Skincare Set",
        description: "Natural ingredients for healthy, glowing skin",
        price: 129.99,
        emoji: "🧴"
    },
    {
        id: 6,
        name: "Artisan Coffee Blend",
        description: "Premium roasted beans from sustainable farms",
        price: 49.99,
        emoji: "☕"
    }
];

// Cart functionality
let cart = [];

function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id}, event)">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function addToCart(productId, event) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();

    // Add visual feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.background = '#2ecc71';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
    }, 1000);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price} × ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background: #ff4757; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Remove</button>
            </div>
        `).join('');
    }

    cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase! Total: $${total.toFixed(2)}\n\nThis is a demo - no actual payment was processed.`);

    cart = [];
    updateCartDisplay();
    toggleCart();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close cart when clicking outside
document.getElementById('cartModal').addEventListener('click', function (e) {
    if (e.target === this) {
        toggleCart();
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    renderProducts();
    updateCartDisplay();
});
