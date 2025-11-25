// ================================
// SIMPLE MAIN FUNCTIONALITY
// ================================

class CampusFixApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupAnimations();
        this.setupEventListeners();
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
            });
        }

        // Close mobile menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
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
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }

    setupAnimations() {
        // Initialize scroll animations
        this.initScrollAnimations();
    }

    initScrollAnimations() {
        const scrollElements = document.querySelectorAll('.service-card, .process-step, .testimonial-card');

        const elementInView = (el) => {
            const elementTop = el.getBoundingClientRect().top;
            return elementTop <= (window.innerHeight || document.documentElement.clientHeight) * 0.85;
        };

        const displayScrollElement = (element) => {
            element.classList.add('animate-fadeInUp');
        };

        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el)) {
                    displayScrollElement(el);
                }
            });
        };

        window.addEventListener('scroll', handleScrollAnimation);
        // Initial check
        handleScrollAnimation();
    }

    setupEventListeners() {
        // WhatsApp button tracking
        const whatsappButtons = document.querySelectorAll('[href*="wa.me"]');
        whatsappButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.trackEvent('whatsapp_click', 'Contact');
            });
        });

        // Phone call tracking
        const phoneButtons = document.querySelectorAll('[href^="tel:"]');
        phoneButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.trackEvent('phone_click', 'Contact');
            });
        });

        // Service card buttons
        const serviceButtons = document.querySelectorAll('.service-card .btn');
        serviceButtons.forEach(button => {
            button.addEventListener('click', () => {
                const service = button.closest('.service-card').querySelector('h3').textContent;
                this.trackEvent('service_click', service);
            });
        });
    }

    trackEvent(action, category) {
        // Simple event tracking
        console.log('Event:', action, category);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.campusFixApp = new CampusFixApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page became visible
        if (window.campusFixApp) {
            window.campusFixApp.initScrollAnimations();
        }
    }
});
