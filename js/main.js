// ================================
// ENHANCED MAIN FUNCTIONALITY WITH ANIMATIONS
// ================================

class CampusFixApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupAnimations();
        this.setupEventListeners();
        this.setupParticles();
        this.setupImageLoading();
    }

    setupNavigation() {
    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Active navigation based on scroll position
    this.setupActiveNavigation();
}

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                            link.style.animation = 'bounceIn 0.6s ease';
                        }
                    });
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '-50px 0px -50px 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    setupAnimations() {
        // Initialize scroll animations
        this.initScrollAnimations();
        
        // Setup hover animations
        this.setupHoverAnimations();
        
        // Setup loading animations
        this.setupLoadingAnimations();
    }

    initScrollAnimations() {
        const scrollElements = document.querySelectorAll('.scroll-reveal');

        const elementInView = (el, dividend = 1) => {
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop <=
                (window.innerHeight || document.documentElement.clientHeight) / dividend
            );
        };

        const displayScrollElement = (element) => {
            element.classList.add('visible');
        };

        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 1.25)) {
                    displayScrollElement(el);
                }
            });
        };

        // Throttle scroll events for performance
        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScrollAnimation();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledScroll);
        
        // Initial check
        handleScrollAnimation();
    }

    setupHoverAnimations() {
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', this.createRipple);
        });

        // Add hover effects to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add icon wiggle on hover
        const wiggleIcons = document.querySelectorAll('.hover-wiggle');
        wiggleIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.animation = 'iconWiggle 0.5s ease';
            });
        });
    }

    createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    setupLoadingAnimations() {
        // Add loading animation to images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
                img.style.animation = 'fadeInUp 0.6s ease';
            });
            
            // Add loading state
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
            } else {
                img.classList.add('loaded');
            }
        });
    }

    setupParticles() {
        // Create simple particles for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            for (let i = 0; i < 15; i++) {
                this.createParticle(hero);
            }
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 3 + 1;
        
        // Random animation delay
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            left: ${posX}%;
            top: ${posY}%;
            width: ${size}px;
            height: ${size}px;
            animation-delay: ${delay}s;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        
        container.appendChild(particle);
    }

    setupImageLoading() {
        // Simulate image loading for placeholders
        const placeholders = document.querySelectorAll('.image-placeholder');
        placeholders.forEach((placeholder, index) => {
            // Simulate different loading times
            setTimeout(() => {
                placeholder.style.animation = 'scaleIn 0.6s ease';
            }, index * 200);
        });
    }

    setupEventListeners() {
        // WhatsApp button tracking with animation
        const whatsappButtons = document.querySelectorAll('[href*="wa.me"]');
        whatsappButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.trackEvent('whatsapp_click', 'Contact');
                
                // Add click animation
                button.style.animation = 'pulse 0.3s ease';
                setTimeout(() => {
                    button.style.animation = '';
                    window.open(button.href, '_blank');
                }, 300);
            });
        });

        // Phone call tracking with animation
        const phoneButtons = document.querySelectorAll('[href^="tel:"]');
        phoneButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.trackEvent('phone_click', 'Contact');
                
                // Add click animation
                button.style.animation = 'pulse 0.3s ease';
                setTimeout(() => {
                    button.style.animation = '';
                    window.open(button.href, '_blank');
                }, 300);
            });
        });

        // Service card buttons with animation
        const serviceButtons = document.querySelectorAll('.service-card .btn');
        serviceButtons.forEach(button => {
            button.addEventListener('click', () => {
                const service = button.closest('.service-card').querySelector('h3').textContent;
                this.trackEvent('service_click', service);
                
                // Add attention animation to parent card
                const card = button.closest('.service-card');
                card.style.animation = 'tada 0.6s ease';
                setTimeout(() => {
                    card.style.animation = '';
                }, 600);
            });
        });

        // Form submissions with loading states
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.style.animation = 'pulse 1s infinite';
                }
            });
        });
    }

    trackEvent(action, category) {
        // Enhanced event tracking with animations
        console.log('🎯 Event:', action, category);
        
        // Visual feedback for tracking
        if (action === 'whatsapp_click' || action === 'phone_click') {
            this.showClickFeedback();
        }
    }

    showClickFeedback() {
        // Create a quick visual feedback element
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--primary);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            z-index: 10000;
            opacity: 0;
            animation: fadeInUp 0.3s ease, fadeInUp 0.3s ease reverse 0.3s forwards;
        `;
        feedback.textContent = 'Opening...';
        
        document.body.appendChild(feedback);
        setTimeout(() => feedback.remove(), 600);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.campusFixApp = new CampusFixApp();
    console.log('🚀 CampusFix App Initialized with Animations');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page became visible - restart animations
        if (window.campusFixApp) {
            window.campusFixApp.initScrollAnimations();
        }
    }
});

// Handle page load completion
window.addEventListener('load', () => {
    // Add loaded class to body for final animations
    document.body.classList.add('loaded');
    
    // Animate in main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.animation = 'fadeInUp 0.8s ease';
    }
});