// ================================
// FRONTEND-ONLY SYSTEMS
// ================================

class CampusFixSystems {
    constructor() {
        this.repairData = this.initializeRepairData();
        this.initializeSystems();
    }

    initializeSystems() {
        this.setupQuoteCalculator();
        this.setupBookingSystem();
        this.setupStatusChecker();
        this.setupNotifications();
        this.setupAnalytics();
    }

    // ================================
    // QUOTE CALCULATOR SYSTEM
    // ================================

    setupQuoteCalculator() {
        const calculateBtn = document.getElementById('calculateQuote');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                this.calculateQuote();
            });
        }
    }

    calculateQuote() {
        const brand = document.getElementById('calcBrand').value;
        const repair = document.getElementById('calcRepair').value;
        
        if (!brand || !repair) {
            this.showNotification('Please select both phone brand and repair type', 'error');
            return;
        }

        const quote = this.getQuotePrice(brand, repair);
        this.displayQuote(quote);
        
        // Track quote calculation
        this.trackEvent('quote_calculated', `${brand}_${repair}`);
    }

    getQuotePrice(brand, repair) {
        const priceMatrix = {
            'iPhone': {
                'screen': { min: 300, max: 450, time: '3-5 hours' },
                'battery': { min: 120, max: 180, time: '1-2 hours' },
                'charging': { min: 80, max: 150, time: '2-3 hours' },
                'camera': { min: 120, max: 300, time: '2-4 hours' }
            },
            'Samsung': {
                'screen': { min: 250, max: 400, time: '3-5 hours' },
                'battery': { min: 100, max: 160, time: '1-2 hours' },
                'charging': { min: 70, max: 130, time: '2-3 hours' },
                'camera': { min: 100, max: 280, time: '2-4 hours' }
            },
            'Other': {
                'screen': { min: 200, max: 380, time: '3-5 hours' },
                'battery': { min: 80, max: 150, time: '1-2 hours' },
                'charging': { min: 60, max: 120, time: '2-3 hours' },
                'camera': { min: 90, max: 250, time: '2-4 hours' }
            }
        };

        const price = priceMatrix[brand]?.[repair] || { min: 100, max: 200, time: '2-4 hours' };
        const averagePrice = Math.round((price.min + price.max) / 2);
        
        return {
            min: price.min,
            max: price.max,
            average: averagePrice,
            time: price.time
        };
    }

    displayQuote(quote) {
        const resultDiv = document.getElementById('quoteResult');
        const priceElement = document.getElementById('estimatedPrice');
        const timeElement = document.getElementById('estimatedTime');
        
        priceElement.textContent = `GH₵ ${quote.min} - GH₵ ${quote.max}`;
        timeElement.textContent = quote.time;
        
        resultDiv.classList.remove('hidden');
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // ================================
    // BOOKING SYSTEM
    // ================================

    setupBookingSystem() {
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBookingSubmission();
            });
        }
    }

    handleBookingSubmission() {
        const formData = this.getBookingFormData();
        
        if (!this.validateBookingForm(formData)) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Generate booking confirmation
        const bookingCode = this.generateBookingCode();
        const booking = this.createBooking(bookingCode, formData);
        
        // Save to localStorage
        this.saveBooking(booking);
        
        // Show success and open WhatsApp
        this.showBookingSuccess(booking);
        
        // Track booking
        this.trackEvent('booking_created', formData.device);
    }

    getBookingFormData() {
        return {
            name: document.getElementById('bookingName').value.trim(),
            phone: document.getElementById('bookingPhone').value.trim(),
            hostel: document.getElementById('bookingHostel').value.trim(),
            device: document.getElementById('bookingDevice').value.trim(),
            issue: document.getElementById('bookingIssue').value.trim(),
            urgency: document.getElementById('bookingUrgency').value
        };
    }

    validateBookingForm(data) {
        return data.name && data.phone && data.hostel && data.device && data.issue;
    }

    generateBookingCode() {
        const counter = parseInt(localStorage.getItem('bookingCounter') || '0') + 1;
        localStorage.setItem('bookingCounter', counter.toString());
        return `CF-${new Date().getFullYear()}-${counter.toString().padStart(4, '0')}`;
    }

    createBooking(code, data) {
        return {
            code: code,
            ...data,
            status: 'pending',
            progress: 0,
            createdAt: new Date().toISOString(),
            steps: {
                received: new Date().toLocaleTimeString(),
                diagnosis: 'Pending',
                repair: 'Pending',
                quality: 'Pending',
                ready: 'Pending'
            }
        };
    }

    saveBooking(booking) {
        const bookings = JSON.parse(localStorage.getItem('campusFixBookings') || '{}');
        bookings[booking.code] = booking;
        localStorage.setItem('campusFixBookings', JSON.stringify(bookings));
    }

    showBookingSuccess(booking) {
        const message = `📱 *New Repair Booking - CampusFix UENR*\n\n` +
                       `🆔 *Booking Code:* ${booking.code}\n` +
                       `👤 *Name:* ${booking.name}\n` +
                       `📞 *Phone:* ${booking.phone}\n` +
                       `🏠 *Hostel:* ${booking.hostel}\n` +
                       `📱 *Device:* ${booking.device}\n` +
                       `🔧 *Issue:* ${booking.issue}\n` +
                       `⚡ *Urgency:* ${booking.urgency}\n\n` +
                       `*I'll contact you within 30 minutes to arrange pickup!*`;
        
        const whatsappUrl = `https://wa.me/233246912468?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        this.showNotification('Booking created! Opening WhatsApp to send details...', 'success');
        
        // Clear form
        document.getElementById('bookingForm').reset();
    }

    // ================================
    // STATUS CHECKER SYSTEM
    // ================================

    setupStatusChecker() {
        const checkBtn = document.getElementById('checkStatus');
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                this.checkRepairStatus();
            });
        }

        // Enter key support
        const statusInput = document.getElementById('statusCode');
        if (statusInput) {
            statusInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.checkRepairStatus();
                }
            });
        }
    }

    checkRepairStatus() {
        const code = document.getElementById('statusCode').value.trim();
        
        if (!code) {
            this.showNotification('Please enter a repair code', 'error');
            return;
        }

        const status = this.getRepairStatus(code);
        this.displayStatus(status, code);
        
        // Track status check
        this.trackEvent('status_checked', code);
    }

    getRepairStatus(code) {
        // Check for demo codes first
        const demoStatus = this.getDemoStatus(code);
        if (demoStatus) return demoStatus;

        // Check actual bookings
        const bookings = JSON.parse(localStorage.getItem('campusFixBookings') || '{}');
        const booking = bookings[code];
        
        if (booking) {
            return {
                exists: true,
                code: code,
                status: booking.status,
                progress: booking.progress,
                device: booking.device,
                steps: booking.steps,
                isDemo: false
            };
        }

        return { exists: false, code: code };
    }

    getDemoStatus(code) {
        const demoData = {
            'CF-2024-2581': {
                exists: true,
                status: 'In Progress',
                progress: 60,
                device: 'iPhone 13 Pro',
                steps: {
                    received: '10:30 AM',
                    diagnosis: '11:15 AM',
                    repair: 'In Progress',
                    quality: 'Pending',
                    ready: 'Pending'
                },
                isDemo: true
            },
            'CF-2024-1924': {
                exists: true,
                status: 'Completed',
                progress: 100,
                device: 'Samsung Galaxy S21',
                steps: {
                    received: '9:00 AM',
                    diagnosis: '9:45 AM',
                    repair: '10:30 AM',
                    quality: '2:15 PM',
                    ready: '3:00 PM'
                },
                isDemo: true
            }
        };

        return demoData[code] || null;
    }

    displayStatus(status, code) {
        const resultDiv = document.getElementById('statusResult');
        
        if (!status.exists) {
            resultDiv.innerHTML = `
                <div class="status-card">
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
                </div>
            `;
            return;
        }

        const statusClass = status.status.toLowerCase().replace(' ', '-');
        const progressPercent = status.progress + '%';

        resultDiv.innerHTML = `
            <div class="status-card">
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

                <div style="margin-top: var(--space-xl); text-align: center;">
                    <a href="https://wa.me/233246912468" class="btn btn-primary">
                        <i class="fab fa-whatsapp"></i> Contact Technician
                    </a>
                </div>
            </div>
        `;
    }

    generateTimelineHTML(steps) {
        const stepConfig = [
            { key: 'received', label: 'Received', isCurrent: steps.repair === 'In Progress' && steps.quality === 'Pending' },
            { key: 'diagnosis', label: 'Diagnosis', isCurrent: false },
            { key: 'repair', label: 'Repair', isCurrent: steps.repair === 'In Progress' },
            { key: 'quality', label: 'Quality Check', isCurrent: steps.quality === 'In Progress' },
            { key: 'ready', label: 'Ready', isCurrent: steps.ready !== 'Pending' && steps.ready !== 'In Progress' }
        ];

        return stepConfig.map(step => {
            const isCompleted = steps[step.key] !== 'Pending' && steps[step.key] !== 'In Progress';
            const isCurrent = step.isCurrent;
            
            let markerClass = '';
            if (isCompleted) markerClass = 'completed';
            else if (isCurrent) markerClass = 'current';

            return `
                <div class="timeline-step">
                    <div class="step-marker ${markerClass}"></div>
                    <div class="step-content">
                        <div class="step-label">${step.label}</div>
                        <div class="step-time">${steps[step.key]}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // ================================
    // NOTIFICATION SYSTEM
    // ================================

    setupNotifications() {
        // Notification container will be created when needed
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

        return {
            bookings: JSON.parse(localStorage.getItem('campusFixBookings') || '{}'),
            analytics: {
                pageViews: parseInt(localStorage.getItem('pageViews') || '0'),
                firstVisit: localStorage.getItem('firstVisit')
            }
        };
    }

    // ================================
    // UTILITY METHODS
    // ================================

    formatPhone(phone) {
        return phone.replace(/\D/g, '');
    }

    validatePhone(phone) {
        const cleaned = this.formatPhone(phone);
        return /^(\+233|0)[235]\d{8}$/.test(cleaned);
    }
}

// Initialize systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.campusFixSystems = new CampusFixSystems();
    console.log('🚀 CampusFix Systems Initialized');
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CampusFixSystems;
}