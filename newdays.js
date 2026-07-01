// Sample menu data (in a real app, this would come from a database)
        const menuItems = [
            // Appetizers
            { id: 1, name: "Truffle Arancini", price: 14.99, category: "appetizers", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Crispy risotto balls with black truffle and melted mozzarella.", rating: 4.8, badge: "Chef's Pick" },
            { id: 2, name: "Beef Tartare", price: 16.99, category: "appetizers", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Premium beef with capers, shallots, and quail egg yolk.", rating: 4.7 },
            { id: 3, name: "Lobster Bisque", price: 13.99, category: "appetizers", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Creamy soup with fresh lobster and a touch of brandy.", rating: 4.9, badge: "Popular" },
            
            // Main Courses
            { id: 4, name: "Wagyu Beef Tenderloin", price: 42.99, category: "mains", image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Premium wagyu with truffle mashed potatoes and seasonal vegetables.", rating: 4.9, badge: "Signature" },
            { id: 5, name: "Pan-Seared Sea Bass", price: 28.99, category: "mains", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Chilean sea bass with lemon beurre blanc and asparagus.", rating: 4.8 },
            { id: 6, name: "Duck Confit", price: 26.99, category: "mains", image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Slow-cooked duck leg with cherry reduction and potato gratin.", rating: 4.7 },
            
            // Desserts
            { id: 7, name: "Chocolate Soufflé", price: 12.99, category: "desserts", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Warm chocolate soufflé with vanilla bean ice cream.", rating: 4.9, badge: "Must Try" },
            { id: 8, name: "Crème Brûlée", price: 10.99, category: "desserts", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Classic vanilla custard with caramelized sugar crust.", rating: 4.8 },
            
            // Drinks
            { id: 9, name: "Signature Cocktail", price: 14.99, category: "drinks", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Our special mix of premium spirits and fresh ingredients.", rating: 4.7 },
            { id: 10, name: "Wine Flight", price: 22.99, category: "drinks", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Three curated wine tastings from our sommelier selection.", rating: 4.8, badge: "Sommelier Pick" }
        ];

        // For demonstration, we'll duplicate items to reach more
        const allMenuItems = [];
        for (let i = 0; i < 12; i++) {
            menuItems.forEach(item => {
                allMenuItems.push({
                    ...item,
                    id: item.id + (i * menuItems.length),
                    name: `${item.name} ${i > 0 ? 'Variation' : ''}`
                });
            });
        }

        // Cart functionality
        let cart = [];
        const cartIcon = document.getElementById('cartIcon');
        const cartModal = document.getElementById('cartModal');
        const closeCartModal = document.getElementById('closeCartModal');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const menuGrid = document.getElementById('menuGrid');
        const categoryBtns = document.querySelectorAll('.category-btn');
        const orderForm = document.getElementById('orderForm');
        
        // Auth functionality
        const loginBtn = document.getElementById('loginBtn');
        const authModal = document.getElementById('authModal');
        const closeAuthModal = document.getElementById('closeAuthModal');
        const authTabs = document.querySelectorAll('.auth-tab');
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const switchToRegister = document.getElementById('switchToRegister');
        const switchToLogin = document.getElementById('switchToLogin');

        // Background slideshow
        let currentSlide = 0;
        const slides = document.querySelectorAll('.background-slide');
        
        function changeBackground() {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        // Initialize background slideshow
        setInterval(changeBackground, 5000);

        // Initialize the menu
        function initMenu() {
            displayMenuItems('all');
            
            // Add event listeners to category buttons
            categoryBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    btn.classList.add('active');
                    // Display items for selected category
                    displayMenuItems(btn.dataset.category);
                });
            });
        }

        // Display menu items based on category
        function displayMenuItems(category) {
            menuGrid.innerHTML = '';
            
            const filteredItems = category === 'all' 
                ? allMenuItems 
                : allMenuItems.filter(item => item.category === category);
            
            filteredItems.forEach(item => {
                const menuItemElement = document.createElement('div');
                menuItemElement.className = 'menu-item';
                
                let badgeHTML = '';
                if (item.badge) {
                    badgeHTML = `<div class="menu-item-badge">${item.badge}</div>`;
                }
                
                menuItemElement.innerHTML = `
                    ${badgeHTML}
                    <img src="${item.image}" alt="${item.name}" class="menu-item-img">
                    <div class="menu-item-content">
                        <div class="menu-item-header">
                            <div>
                                <h3 class="menu-item-title">${item.name}</h3>
                                <div class="menu-item-rating">
                                    ${generateStarRating(item.rating)}
                                    <span>${item.rating}</span>
                                </div>
                            </div>
                            <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                        </div>
                        <p class="menu-item-desc">${item.description}</p>
                        <div class="menu-item-footer">
                            <button class="add-to-cart" data-id="${item.id}">
                                Add to Cart <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                `;
                menuGrid.appendChild(menuItemElement);
            });
            
            // Add event listeners to "Add to Cart" buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = parseInt(e.target.closest('.add-to-cart').dataset.id);
                    addToCart(itemId);
                });
            });
            
            // Animate menu items with GSAP
            gsap.fromTo('.menu-item', 
                { opacity: 0, y: 50 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6, 
                    stagger: 0.1,
                    ease: "back.out(1.2)"
                }
            );
        }

        // Generate star rating HTML
        function generateStarRating(rating) {
            let stars = '';
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="fas fa-star"></i>';
            }
            
            if (hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            }
            
            const emptyStars = 5 - Math.ceil(rating);
            for (let i = 0; i < emptyStars; i++) {
                stars += '<i class="far fa-star"></i>';
            }
            
            return stars;
        }

        // Add item to cart
        function addToCart(itemId) {
            const item = allMenuItems.find(i => i.id === itemId);
            if (!item) return;
            
            const existingItem = cart.find(i => i.id === itemId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...item,
                    quantity: 1
                });
            }
            
            updateCart();
            
            // Animate cart icon
            gsap.fromTo('.cart-count', 
                { scale: 1.5 }, 
                { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" }
            );
            
            // Show success message
            showNotification(`${item.name} added to cart!`);
        }

        // Show notification
        function showNotification(message) {
            // Create notification element
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--primary);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: var(--shadow);
                z-index: 4000;
                font-weight: 500;
                transform: translateX(100%);
                transition: transform 0.3s;
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            // Animate out and remove
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Update cart display
        function updateCart() {
            const cartCount = document.querySelector('.cart-count');
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
            
            // Update cart items in modal
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--gray);">Your cart is empty</p>';
                cartTotal.textContent = '$0.00';
                return;
            }
            
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div class="cart-item-info">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>$${item.price.toFixed(2)} each</p>
                        </div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease" data-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                        <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                cartItems.appendChild(cartItemElement);
            });
            
            cartTotal.textContent = `$${total.toFixed(2)}`;
            
            // Add event listeners to quantity buttons
            document.querySelectorAll('.increase').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = parseInt(e.target.closest('button').dataset.id);
                    const item = cart.find(i => i.id === itemId);
                    if (item) {
                        item.quantity += 1;
                        updateCart();
                    }
                });
            });
            
            document.querySelectorAll('.decrease').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = parseInt(e.target.closest('button').dataset.id);
                    const item = cart.find(i => i.id === itemId);
                    if (item) {
                        if (item.quantity > 1) {
                            item.quantity -= 1;
                        } else {
                            cart = cart.filter(i => i.id !== itemId);
                        }
                        updateCart();
                    }
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = parseInt(e.target.closest('button').dataset.id);
                    cart = cart.filter(i => i.id !== itemId);
                    updateCart();
                    showNotification('Item removed from cart');
                });
            });
        }

        // Auth modal functionality
        function setupAuthModal() {
            // Switch between login and register tabs
            authTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    authTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    if (tab.dataset.tab === 'login') {
                        loginForm.style.display = 'block';
                        registerForm.style.display = 'none';
                    } else {
                        loginForm.style.display = 'none';
                        registerForm.style.display = 'block';
                    }
                });
            });
            
            // Switch forms via links
            switchToRegister.addEventListener('click', (e) => {
                e.preventDefault();
                authTabs.forEach(t => t.classList.remove('active'));
                document.querySelector('[data-tab="register"]').classList.add('active');
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
            });
            
            switchToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                authTabs.forEach(t => t.classList.remove('active'));
                document.querySelector('[data-tab="login"]').classList.add('active');
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
            });
            
            // Form submissions
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                // In a real app, you would send this to a server
                console.log('Login attempt:', { email, password });
                showNotification('Login successful!');
                authModal.style.display = 'none';
            });
            
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('registerName').value;
                const email = document.getElementById('registerEmail').value;
                const phone = document.getElementById('registerPhone').value;
                const password = document.getElementById('registerPassword').value;
                
                // In a real app, you would send this to a server
                console.log('Registration attempt:', { name, email, phone, password });
                showNotification('Account created successfully!');
                authModal.style.display = 'none';
            });
        }

        // Event listeners
        cartIcon.addEventListener('click', () => {
            cartModal.style.display = 'flex';
            gsap.fromTo(cartModal, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.3 }
            );
            gsap.fromTo('.cart-modal .modal-content', 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.2)" }
            );
        });

        loginBtn.addEventListener('click', () => {
            authModal.style.display = 'flex';
            gsap.fromTo(authModal, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.3 }
            );
            gsap.fromTo('#authModal .modal-content', 
                { scale: 0.8, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.2)" }
            );
        });

        closeCartModal.addEventListener('click', () => {
            gsap.to(cartModal, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    cartModal.style.display = 'none';
                }
            });
        });

        closeAuthModal.addEventListener('click', () => {
            gsap.to(authModal, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    authModal.style.display = 'none';
                }
            });
        });

        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                gsap.to(cartModal, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        cartModal.style.display = 'none';
                    }
                });
            }
            if (e.target === authModal) {
                gsap.to(authModal, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        authModal.style.display = 'none';
                    }
                });
            }
        });

        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (cart.length === 0) {
                showNotification('Your cart is empty. Please add items before placing an order.');
                return;
            }
            
            // In a real application, you would send this data to a server
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                items: cart,
                total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            };
            
            console.log('Order placed:', formData);
            showNotification('Order placed successfully! Thank you for your order.');
            
            // Reset cart and form
            cart = [];
            updateCart();
            orderForm.reset();
            cartModal.style.display = 'none';
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Initialize GSAP animations
        gsap.registerPlugin(ScrollTrigger, TextPlugin);

        // Hero animation
        gsap.timeline()
            .from('.hero-subtitle', {
                duration: 1,
                y: 30,
                opacity: 0,
                ease: "power3.out"
            })
            .from('.hero-title', {
                duration: 1.2,
                y: 50,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.5")
            .from('.hero-description', {
                duration: 1,
                y: 30,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.5")
            .from('.hero-buttons', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.3");

        // Floating elements animation
        gsap.to('.floating-element:nth-child(1)', {
            y: -20,
            rotation: 5,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to('.floating-element:nth-child(2)', {
            y: -30,
            rotation: -5,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1
        });

        gsap.to('.floating-element:nth-child(3)', {
            y: -25,
            rotation: 3,
            duration: 4.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 2
        });

        gsap.to('.floating-element:nth-child(4)', {
            y: -35,
            rotation: -3,
            duration: 5.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.5
        });

        // Section animations
        gsap.from('.section-header', {
            scrollTrigger: {
                trigger: '.section',
                start: 'top 80%'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power3.out"
        });

        // Initialize the application
        document.addEventListener('DOMContentLoaded', () => {
            initMenu();
            updateCart();
            setupAuthModal();
            
            // Animate menu items on first load
            gsap.fromTo('.menu-item', 
                { opacity: 0, y: 50 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    stagger: 0.1,
                    delay: 0.5,
                    ease: "back.out(1.2)"
                }
            );
        });