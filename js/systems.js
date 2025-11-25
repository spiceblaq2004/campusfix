// ================================
// FRONTEND-ONLY SYSTEMS - FIXED
// ================================

class CampusFixSystems {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    init() {
        try {
            this.repairData = this.initializeRepairData();
            this.initializeSystems();
            this.isInitialized = true;
            console.log('✅ All systems initialized successfully');
        } catch (error) {
            console.error('❌ System initialization failed:', error);
            this.showNotification('System initialization failed. Please refresh the page.', 'error');
        }
    }

    initializeSystems() {
        this.safeExecute(() => this.setupQuoteCalculator(), 'Quote Calculator');
        this.safeExecute(() => this.setupBookingSystem(), 'Booking System');
        this.safeExecute(() => this.setupStatusChecker(), 'Status Checker');
        this.safeExecute(() => this.setupNotifications(), 'Notifications');
        this.safeExecute(() => this.setupAnalytics(), 'Analytics');
        this.safeExecute(() => this.setupFeedbackSystem(), 'Feedback System');
    }

    safeExecute(fn, systemName) {
        try {
            fn();
            console.log(`✅ ${systemName} setup completed`);
        } catch (error) {
            console.error(`❌ ${systemName} setup failed:`, error);
        }
    }

    // ================================
    // QUOTE CALCULATOR SYSTEM - FIXED
    // ================================

    setupQuoteCalculator() {
        const calculateBtn = document.getElementById('calculateQuote');
        console.log('🔧 Setting up quote calculator...', calculateBtn);
        
        if (calculateBtn) {
            calculateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.calculateQuote();
            });
            
            // Initialize button state
            this.updateQuoteButtonState();
        }

        // Add change listeners to form fields
        const brandSelect = document.getElementById('calcBrand');
        const repairSelect = document.getElementById('calcRepair');
        
        if (brandSelect) {
            brandSelect.addEventListener('change', () => {
                this.updateQuoteButtonState();
            });
        }
        
        if (repairSelect) {
            repairSelect.addEventListener('change', () => {
                this.updateQuoteButtonState();
            });
        }
    }

    updateQuoteButtonState() {
        const brand = document.getElementById('calcBrand')?.value;
        const repair = document.getElementById('calcRepair')?.value;
        const calculateBtn = document.getElementById('calculateQuote');
        
        if (!calculateBtn) return;
        
        if (brand && repair) {
            calculateBtn.disabled = false;
            calculateBtn.classList.remove('btn-disabled');
        } else {
            calculateBtn.disabled = true;
            calculateBtn.classList.add('btn-disabled');
        }
    }

    calculateQuote() {
        console.log('🧮 Calculating quote...');
        
        const brand = document.getElementById('calcBrand')?.value;
        const repair = document.getElementById('calcRepair')?.value;
        
        console.log('📱 Selected:', { brand, repair });
        
        if (!brand || !repair) {
            this.showNotification('Please select both phone brand and repair type', 'error');
            return;
        }

        // Add loading state
        const calculateBtn = document.getElementById('calculateQuote');
        const originalText = calculateBtn.innerHTML;
        calculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
        calculateBtn.disabled = true;

        // Simulate calculation delay
        setTimeout(() => {
            try {
                const quote = this.getQuotePrice(brand, repair);
                this.displayQuote(quote);
                
                // Track quote calculation
                this.trackEvent('quote_calculated', `${brand}_${repair}`);
            } catch (error) {
                console.error('Quote calculation error:', error);
                this.showNotification('Error calculating quote. Please try again.', 'error');
            } finally {
                // Restore button
                calculateBtn.innerHTML = originalText;
                calculateBtn.disabled = false;
                this.updateQuoteButtonState();
            }
        }, 800);
    }

    getQuotePrice(brand, repair) {
        const priceMatrix = {
            'iPhone': {
                'screen': { min: 300, max: 450, time: '3-5 hours' },
                'battery': { min: 120, max: 180, time: '1-2 hours' },
                'charging': { min: 80, max: 150, time: '2-3 hours' },
                'camera': { min: 120, max: 300, time: '2-4 hours' },
                'water': { min: 150, max: 500, time: '1-2 days' },
                'software': { min: 40, max: 120, time: '1-2 hours' }
            },
            'Samsung': {
                'screen': { min: 250, max: 400, time: '3-5 hours' },
                'battery': { min: 100, max: 160, time: '1-2 hours' },
                'charging': { min: 70, max: 130, time: '2-3 hours' },
                'camera': { min: 100, max: 280, time: '2-4 hours' },
                'water': { min: 120, max: 450, time: '1-2 days' },
                'software': { min: 40, max: 100, time: '1-2 hours' }
            },
            'Other': {
                'screen': { min: 200, max: 380, time: '3-5 hours' },
                'battery': { min: 80, max: 150, time: '1-2 hours' },
                'charging': { min: 60, max: 120, time: '2-3 hours' },
                'camera': { min: 90, max: 250, time: '2-4 hours' },
                'water': { min: 100, max: 400, time: '1-2 days' },
                'software': { min: 30, max: 90, time: '1-2 hours' }
            }
        };

        const repairKey = repair;
        const brandData = priceMatrix[brand];
        
        if (!brandData) {
            return { min: 100, max: 200, time: '2-4 hours', brand, repair };
        }

        const price = brandData[repairKey] || { min: 100, max: 200, time: '2-4 hours' };
        
        return {
            min: price.min,
            max: price.max,
            time: price.time,
            brand: brand,
            repair: repair
        };
    }

    displayQuote(quote) {
        const resultDiv = document.getElementById('quoteResult');
        const priceElement = document.getElementById('estimatedPrice');
        const timeElement = document.getElementById('estimatedTime');
        
        if (!resultDiv || !priceElement || !timeElement) {
            console.error('❌ Quote result elements not found!');
            this.showNotification('Error displaying quote result', 'error');
            return;
        }

        // Add animation class
        resultDiv.classList.add('animate-bounceIn');
        
        priceElement.textContent = `GH₵ ${quote.min} - GH₵ ${quote.max}`;
        timeElement.textContent = quote.time;
        
        // Update WhatsApp link with quote info
        const whatsappBtn = resultDiv.querySelector('a.btn');
        if (whatsappBtn) {
            const repairName = this.getRepairDisplayName(quote.repair);
            const message = `Hello! I'd like a quote for:\n• ${quote.brand} ${repairName} repair\n• Estimated: GH₵ ${quote.min}-${quote.max}\n• Time: ${quote.time}\n\nPlease provide exact pricing.`;
            whatsappBtn.href = `https://wa.me/233246912468?text=${encodeURIComponent(message)}`;
        }
        
        resultDiv.classList.remove('hidden');
        
        // Scroll to result smoothly
        setTimeout(() => {
            resultDiv.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 300);

        // Remove animation class after animation completes
        setTimeout(() => {
            resultDiv.classList.remove('animate-bounceIn');
        }, 600);
        
        console.log('✅ Quote displayed successfully');
    }

    getRepairDisplayName(repair) {
        const names = {
            'screen': 'Screen',
            'battery': 'Battery',
            'charging': 'Charging Port',
            'camera': 'Camera',
            'water': 'Water Damage',
            'software': 'Software'
        };
        return names[repair] || repair;
    }

    // ================================
    // CUSTOMER FEEDBACK SYSTEM
    // ================================

    setupFeedbackSystem() {
        console.log('🔧 Setting up feedback system...');
        
        // Add feedback button to status results
        this.injectFeedbackButton();
        
        // Load existing feedback
        this.displayFeedbackStats();
    }

    injectFeedbackButton() {
        // This will be called when status results are displayed
        // We'll modify the displayStatus method to include feedback
    }

    addFeedbackToStatus(statusCode, feedback) {
        const feedbacks = JSON.parse(localStorage.getItem('campusFixFeedback') || '{}');
        
        if (!feedbacks[statusCode]) {
            feedbacks[statusCode] = [];
        }
        
        feedbacks[statusCode].push({
            ...feedback,
            timestamp: new Date().toISOString(),
            id: Date.now().toString()
        });
        
        localStorage.setItem('campusFixFeedback', JSON.stringify(feedbacks));
        console.log('💾 Feedback saved for:', statusCode);
        
        // Update display
        this.displayFeedbackStats();
    }

    displayFeedbackStats() {
        const feedbacks = JSON.parse(localStorage.getItem('campusFixFeedback') || '{}');
        const totalFeedbacks = Object.values(feedbacks).flat().length;
        
        console.log('📊 Feedback stats:', { totalFeedbacks });
        
        // You can display this in an admin panel later
        return totalFeedbacks;
    }

    getFeedbackForRepair(statusCode) {
        const feedbacks = JSON.parse(localStorage.getItem('campusFixFeedback') || '{}');
        return feedbacks[statusCode] || [];
    }

    // ================================
    // ENHANCED STATUS CHECKER WITH FEEDBACK
    // ================================

    displayStatus(status, code) {
        const resultDiv = document.getElementById('statusResult');
        
        if (!status.exists) {
            resultDiv.innerHTML = `
                <div class="status-card animate-shake">
                    <div class="status-header">
                        <div class="status-code">${code}</div>
                        <div style="color: var(--error); margin-top: var(--space-md);">
                            <i class="fas fa-exclamation-triangle"></i>
                            Repair code not found
                        </div>
                    </div>
                    <p style="color: var(--gray-400); text-align: center;">
                        Please check your code and try again, or contact us directly.
                    </p>
                    <div style="text-align: center; margin-top: var(--space-lg);">
                        <a href="https://wa.me/233246912468" class="btn btn-primary">
                            <i class="fab fa-whatsapp"></i> Contact Support
                        </a>
                    </div>
                </div>
            `;
            return;
        }

        const statusClass = status.status.toLowerCase().replace(' ', '-');
        const progressPercent = status.progress + '%';
        const feedbacks = this.getFeedbackForRepair(code);

        resultDiv.innerHTML = `
            <div class="status-card animate-scaleIn">
                <div class="status-header">
                    <div class="status-code">${status.code}</div>
                    <div class="status-badge ${statusClass}">${status.status}</div>
                    ${status.isDemo ? '<div style="color: var(--accent); margin-top: var(--space-sm); font-size: 0.9rem;"><i class="fas fa-info-circle"></i> Demo Repair</div>' : ''}
                </div>
                
                <div style="margin-bottom: var(--space-lg);">
                    <strong>Device:</strong> ${status.device}
                </div>

                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercent};"></div>
                </div>
                <div style="text-align: center; color: var(--gray-400); margin-bottom: var(--space-xl);">
                    Progress: ${progressPercent}
                </div>

                <div class="status-timeline">
                    ${this.generateTimelineHTML(status.steps)}
                </div>

                <!-- Feedback Section -->
                <div class="feedback-section" style="margin-top: var(--space-xl); padding-top: var(--space-lg); border-top: 1px solid rgba(255,255,255,0.1);">
                    <h4 style="margin-bottom: var(--space-md); text-align: center;">
                        <i class="fas fa-comment-dots"></i> Repair Feedback
                    </h4>
                    
                    ${status.status === 'Completed' ? `
                        <div style="text-align: center; margin-bottom: var(--space-md);">
                            <p style="color: var(--gray-400); margin-bottom: var(--space-md);">
                                How was your repair experience?
                            </p>
                            <div class="feedback-actions" style="display: flex; gap: var(--space-sm); justify-content: center; flex-wrap: wrap;">
                                <button class="btn btn-success feedback-btn" data-rating="5">
                                    <i class="fas fa-star"></i> Excellent
                                </button>
                                <button class="btn btn-primary feedback-btn" data-rating="4">
                                    <i class="fas fa-thumbs-up"></i> Good
                                </button>
                                <button class="btn btn-warning feedback-btn" data-rating="3">
                                    <i class="fas fa-meh"></i> Average
                                </button>
                                <button class="btn btn-secondary feedback-btn" data-rating="2">
                                    <i class="fas fa-frown"></i> Poor
                                </button>
                            </div>
                        </div>
                    ` : `
                        <div style="text-align: center;">
                            <p style="color: var(--gray-400);">
                                Feedback will be available when repair is completed
                            </p>
                        </div>
                    `}
                    
                    ${feedbacks.length > 0 ? `
                        <div class="previous-feedback" style="margin-top: var(--space-lg);">
                            <h5 style="margin-bottom: var(--space-sm); text-align: center;">Your Previous Feedback</h5>
                            ${feedbacks.map(fb => `
                                <div style="background: rgba(255,255,255,0.05); padding: var(--space-md); border-radius: var(--radius-md); margin-bottom: var(--space-sm);">
                                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: var(--space-xs);">
                                        <div style="display: flex; gap: var(--space-xs);">
                                            ${this.generateStars(fb.rating)}
                                        </div>
                                        <small style="color: var(--gray-500);">
                                            ${new Date(fb.timestamp).toLocaleDateString()}
                                        </small>
                                    </div>
                                    ${fb.comment ? `<p style="color: var(--gray-300); margin: 0;">${fb.comment}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>

                <div style="margin-top: var(--space-xl); text-align: center;">
                    <a href="https://wa.me/233246912468" class="btn btn-primary hover-scale">
                        <i class="fab fa-whatsapp"></i> Contact Technician
                    </a>
                </div>
            </div>
        `;

        // Add feedback button listeners
        this.setupFeedbackButtons(code);
    }

    setupFeedbackButtons(statusCode) {
        const feedbackBtns = document.querySelectorAll('.feedback-btn');
        feedbackBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const rating = parseInt(btn.getAttribute('data-rating'));
                this.showFeedbackForm(statusCode, rating);
            });
        });
    }

    showFeedbackForm(statusCode, rating) {
        const formHTML = `
            <div class="feedback-form-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 10000; padding: var(--space-md);">
                <div class="feedback-form" style="background: var(--gray-800); padding: var(--space-2xl); border-radius: var(--radius-xl); max-width: 500px; width: 100%; border: 1px solid rgba(255,255,255,0.1);">
                    <h3 style="margin-bottom: var(--space-lg); text-align: center;">
                        <i class="fas fa-comment-dots"></i> Repair Feedback
                    </h3>
                    
                    <div style="text-align: center; margin-bottom: var(--space-lg);">
                        <div style="display: flex; justify-content: center; gap: var(--space-xs); margin-bottom: var(--space-md);">
                            ${this.generateStars(rating)}
                        </div>
                        <p style="color: var(--gray-300);">
                            ${this.getRatingText(rating)}
                        </p>
                    </div>
                    
                    <div class="form-group">
                        <label for="feedbackComment">Additional Comments (Optional)</label>
                        <textarea id="feedbackComment" placeholder="Tell us more about your experience..." style="width: 100%; min-height: 100px; padding: var(--space-md); background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-md); color: var(--light); font-family: var(--font-family);"></textarea>
                    </div>
                    
                    <div style="display: flex; gap: var(--space-md); margin-top: var(--space-xl);">
                        <button type="button" class="btn btn-secondary" id="cancelFeedback" style="flex: 1;">
                            Cancel
                        </button>
                        <button type="button" class="btn btn-primary" id="submitFeedback" style="flex: 1;">
                            Submit Feedback
                        </button>
                    </div>
                </div>
            </div>
        `;

        const formElement = document.createElement('div');
        formElement.innerHTML = formHTML;
        document.body.appendChild(formElement);

        // Add event listeners
        document.getElementById('cancelFeedback').addEventListener('click', () => {
            formElement.remove();
        });

        document.getElementById('submitFeedback').addEventListener('click', () => {
            const comment = document.getElementById('feedbackComment').value.trim();
            this.submitFeedback(statusCode, rating, comment);
            formElement.remove();
            this.showNotification('Thank you for your feedback!', 'success');
            
            // Refresh status display to show the new feedback
            setTimeout(() => {
                this.checkRepairStatus();
            }, 1000);
        });
    }

    submitFeedback(statusCode, rating, comment = '') {
        const feedback = {
            rating,
            comment,
            statusCode,
            timestamp: new Date().toISOString()
        };

        this.addFeedbackToStatus(statusCode, feedback);
        this.trackEvent('feedback_submitted', `${statusCode}_${rating}`);
    }

    generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += `<i class="fas fa-star" style="color: var(--accent);"></i>`;
            } else {
                stars += `<i class="far fa-star" style="color: var(--gray-500);"></i>`;
            }
        }
        return stars;
    }

    getRatingText(rating) {
        const texts = {
            5: 'Excellent - Perfect service!',
            4: 'Good - Great experience',
            3: 'Average - OK service',
            2: 'Poor - Needs improvement',
            1: 'Terrible - Very dissatisfied'
        };
        return texts[rating] || 'Thanks for your feedback!';
    }

    // ================================
    // NOTIFICATION SYSTEM
    // ================================

    setupNotifications() {
        console.log('🔧 Notification system ready');
    }

    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--success);
                    color: white;
                    padding: var(--space-md) var(--space-lg);
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-xl);
                    z-index: 10000;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                    max-width: 400px;
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification.error {
                    background: var(--error);
                }
                .notification.warning {
                    background: var(--warning);
                }
                .feedback-btn {
                    padding: var(--space-sm) var(--space-md);
                    font-size: var(--text-sm);
                }
                .btn-success { background: var(--success); }
                .btn-warning { background: var(--warning); color: var(--dark); }
            `;
            document.head.appendChild(styles);
        }

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-triangle',
            warning: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // ================================
    // ANALYTICS & TRACKING
    // ================================

    setupAnalytics() {
        this.trackPageView();
        this.setupActivityTracking();
        console.log('📊 Analytics system initialized');
    }

    trackPageView() {
        const pageViews = parseInt(localStorage.getItem('pageViews') || '0') + 1;
        localStorage.setItem('pageViews', pageViews.toString());
        
        const firstVisit = localStorage.getItem('firstVisit') || new Date().toISOString();
        localStorage.setItem('firstVisit', firstVisit);
        
        console.log('📊 Analytics: Page view tracked', { pageViews, firstVisit });
    }

    trackEvent(action, label) {
        const events = JSON.parse(localStorage.getItem('trackingEvents') || '[]');
        events.push({
            action,
            label,
            timestamp: new Date().toISOString(),
            url: window.location.href
        });
        
        localStorage.setItem('trackingEvents', JSON.stringify(events));
        
        console.log('📊 Analytics: Event tracked', { action, label });
    }

    setupActivityTracking() {
        // Track time on page
        let startTime = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const timeSpent = Date.now() - startTime;
            this.trackEvent('time_spent', `${Math.round(timeSpent / 1000)}s`);
        });

        // Track clicks on important elements
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.matches('a[href*="wa.me"]')) {
                this.trackEvent('whatsapp_click', 'navigation');
            }
            else if (target.matches('a[href^="tel:"]')) {
                this.trackEvent('phone_click', 'navigation');
            }
            else if (target.matches('.service-card .btn')) {
                const service = target.closest('.service-card').querySelector('h3').textContent;
                this.trackEvent('service_interest', service);
            }
        });
    }

    // ================================
    // DATA INITIALIZATION
    // ================================

    initializeRepairData() {
        // Initialize default data if not exists
        if (!localStorage.getItem('campusFixBookings')) {
            localStorage.setItem('campusFixBookings', JSON.stringify({}));
        }
        
        if (!localStorage.getItem('bookingCounter')) {
            localStorage.setItem('bookingCounter', '2580');
        }
        
        if (!localStorage.getItem('pageViews')) {
            localStorage.setItem('pageViews', '0');
        }
        
        if (!localStorage.getItem('trackingEvents')) {
            localStorage.setItem('trackingEvents', JSON.stringify([]));
        }

        if (!localStorage.getItem('campusFixFeedback')) {
            localStorage.setItem('campusFixFeedback', JSON.stringify({}));
        }

        console.log('💾 Data systems initialized');

        return {
            bookings: JSON.parse(localStorage.getItem('campusFixBookings') || '{}'),
            feedback: JSON.parse(localStorage.getItem('campusFixFeedback') || '{}'),
            analytics: {
                pageViews: parseInt(localStorage.getItem('pageViews') || '0'),
                firstVisit: localStorage.getItem('firstVisit')
            }
        };
    }

    // ================================
    // ADMIN FEATURES - For Your Use
    // ================================

    getAdminStats() {
        const bookings = JSON.parse(localStorage.getItem('campusFixBookings') || '{}');
        const feedbacks = JSON.parse(localStorage.getItem('campusFixFeedback') || '{}');
        const events = JSON.parse(localStorage.getItem('trackingEvents') || '[]');
        
        const stats = {
            totalBookings: Object.keys(bookings).length,
            totalFeedbacks: Object.values(feedbacks).flat().length,
            totalPageViews: parseInt(localStorage.getItem('pageViews') || '0'),
            totalEvents: events.length,
            recentBookings: Object.values(bookings).slice(-5),
            averageRating: this.calculateAverageRating(feedbacks)
        };
        
        console.log('📊 Admin Stats:', stats);
        return stats;
    }

    calculateAverageRating(feedbacks) {
        const allFeedbacks = Object.values(feedbacks).flat();
        if (allFeedbacks.length === 0) return 0;
        
        const total = allFeedbacks.reduce((sum, fb) => sum + fb.rating, 0);
        return (total / allFeedbacks.length).toFixed(1);
    }

    // Method to view all feedback (for admin)
    viewAllFeedback() {
        const feedbacks = JSON.parse(localStorage.getItem('campusFixFeedback') || '{}');
        console.log('📝 All Feedback:', feedbacks);
        return feedbacks;
    }
}

// Initialize systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.campusFixSystems = new CampusFixSystems();
    console.log('🚀 CampusFix Systems Initialized');

    // Add admin console commands for easy access
    window.getCampusFixStats = () => window.campusFixSystems.getAdminStats();
    window.viewAllFeedback = () => window.campusFixSystems.viewAllFeedback();
});