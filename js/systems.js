// ================================
// FRONTEND-ONLY SYSTEMS - COMPLETE FIXED VERSION
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
    // QUOTE CALCULATOR SYSTEM - COMPLETELY FIXED
    // ================================

    setupQuoteCalculator() {
        console.log('🔧 Setting up fixed quote calculator...');
        
        const calculateBtn = document.getElementById('calculateQuote');
        const brandSelect = document.getElementById('calcBrand');
        const repairSelect = document.getElementById('calcRepair');
        
        if (calculateBtn && brandSelect && repairSelect) {
            // Add event listeners
            brandSelect.addEventListener('change', () => {
                this.updateQuoteButtonState();
            });
            
            repairSelect.addEventListener('change', () => {
                this.updateQuoteButtonState();
            });
            
            calculateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.calculateQuote();
            });
            
            // Initialize button state
            this.updateQuoteButtonState();
            
            console.log('✅ Quote calculator setup complete');
        } else {
            console.error('❌ Quote calculator elements not found');
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
            calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Calculate Repair Cost';
        } else {
            calculateBtn.disabled = true;
            calculateBtn.classList.add('btn-disabled');
            calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Select Options First';
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
        calculateBtn.classList.add('btn-loading');
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
                calculateBtn.classList.remove('btn-loading');
                calculateBtn.innerHTML = originalText;
                calculateBtn.disabled = false;
                this.updateQuoteButtonState();
            }
        }, 1000);
    }

    getQuotePrice(brand, repair) {
        // Enhanced price matrix with more brands and repairs
        const priceMatrix = {
            'iPhone': {
                'screen': { min: 300, max: 600, time: '2-4 hours', urgency: 'Popular' },
                'battery': { min: 120, max: 250, time: '1-2 hours', urgency: 'Fast' },
                'charging': { min: 80, max: 180, time: '2-3 hours', urgency: 'Standard' },
                'camera': { min: 150, max: 400, time: '2-4 hours', urgency: 'Expert' },
                'water': { min: 200, max: 500, time: '1-2 days', urgency: 'Complex' },
                'software': { min: 50, max: 150, time: '1-2 hours', urgency: 'Fast' },
                'backglass': { min: 100, max: 300, time: '2-3 hours', urgency: 'Standard' },
                'speaker': { min: 60, max: 150, time: '1-2 hours', urgency: 'Fast' }
            },
            'Samsung': {
                'screen': { min: 250, max: 500, time: '2-4 hours', urgency: 'Popular' },
                'battery': { min: 100, max: 200, time: '1-2 hours', urgency: 'Fast' },
                'charging': { min: 70, max: 150, time: '2-3 hours', urgency: 'Standard' },
                'camera': { min: 120, max: 300, time: '2-4 hours', urgency: 'Expert' },
                'water': { min: 150, max: 400, time: '1-2 days', urgency: 'Complex' },
                'software': { min: 40, max: 120, time: '1-2 hours', urgency: 'Fast' },
                'backglass': { min: 80, max: 200, time: '2-3 hours', urgency: 'Standard' },
                'speaker': { min: 50, max: 120, time: '1-2 hours', urgency: 'Fast' }
            },
            'Huawei': {
                'screen': { min: 200, max: 450, time: '2-4 hours', urgency: 'Popular' },
                'battery': { min: 90, max: 180, time: '1-2 hours', urgency: 'Fast' },
                'charging': { min: 60, max: 130, time: '2-3 hours', urgency: 'Standard' },
                'camera': { min: 100, max: 280, time: '2-4 hours', urgency: 'Expert' },
                'water': { min: 120, max: 350, time: '1-2 days', urgency: 'Complex' },
                'software': { min: 40, max: 100, time: '1-2 hours', urgency: 'Fast' },
                'backglass': { min: 70, max: 180, time: '2-3 hours', urgency: 'Standard' },
                'speaker': { min: 45, max: 110, time: '1-2 hours', urgency: 'Fast' }
            },
            'Tecno': {
                'screen': { min: 180, max: 350, time: '2-4 hours', urgency: 'Popular' },
                'battery': { min: 80, max: 150, time: '1-2 hours', urgency: 'Fast' },
                'charging': { min: 50, max: 120, time: '2-3 hours', urgency: 'Standard' },
                'camera': { min: 90, max: 220, time: '2-4 hours', urgency: 'Expert' },
                'water': { min: 100, max: 300, time: '1-2 days', urgency: 'Complex' },
                'software': { min: 30, max: 80, time: '1-2 hours', urgency: 'Fast' },
                'backglass': { min: 60, max: 150, time: '2-3 hours', urgency: 'Standard' },
                'speaker': { min: 40, max: 90, time: '1-2 hours', urgency: 'Fast' }
            },
            'Other': {
                'screen': { min: 150, max: 400, time: '2-4 hours', urgency: 'Popular' },
                'battery': { min: 70, max: 160, time: '1-2 hours', urgency: 'Fast' },
                'charging': { min: 55, max: 130, time: '2-3 hours', urgency: 'Standard' },
                'camera': { min: 80, max: 250, time: '2-4 hours', urgency: 'Expert' },
                'water': { min: 90, max: 320, time: '1-2 days', urgency: 'Complex' },
                'software': { min: 35, max: 90, time: '1-2 hours', urgency: 'Fast' },
                'backglass': { min: 65, max: 170, time: '2-3 hours', urgency: 'Standard' },
                'speaker': { min: 35, max: 100, time: '1-2 hours', urgency: 'Fast' }
            }
        };

        const brandData = priceMatrix[brand] || priceMatrix['Other'];
        const repairKey = repair;
        
        if (!brandData) {
            return { 
                min: 100, 
                max: 200, 
                time: '2-4 hours', 
                urgency: 'Standard',
                brand: brand, 
                repair: repair 
            };
        }

        const price = brandData[repairKey] || { min: 100, max: 200, time: '2-4 hours', urgency: 'Standard' };
        
        return {
            min: price.min,
            max: price.max,
            time: price.time,
            urgency: price.urgency,
            brand: brand,
            repair: repair
        };
    }

    displayQuote(quote) {
        const resultDiv = document.getElementById('quoteResult');
        const priceElement = document.getElementById('estimatedPrice');
        const timeElement = document.getElementById('estimatedTime');
        const badgeElement = document.getElementById('resultBadge');
        const whatsappBtn = document.getElementById('whatsappQuote');
        
        if (!resultDiv || !priceElement || !timeElement) {
            console.error('❌ Quote result elements not found!');
            this.showNotification('Error displaying quote result', 'error');
            return;
        }

        // Update content
        priceElement.textContent = `GH₵ ${quote.min} - GH₵ ${quote.max}`;
        timeElement.textContent = quote.time;
        badgeElement.textContent = `${quote.urgency} Repair`;
        
        // Update WhatsApp link with quote info
        if (whatsappBtn) {
            const repairName = this.getRepairDisplayName(quote.repair);
            const message = `Hello! I'd like a quote for:\n\n📱 *Repair Details:*\n• Phone: ${quote.brand}\n• Repair: ${repairName}\n• Estimated Cost: GH₵ ${quote.min}-${quote.max}\n• Time: ${quote.time}\n\nPlease provide exact pricing and availability.`;
            whatsappBtn.href = `https://wa.me/233246912468?text=${encodeURIComponent(message)}`;
        }
        
        // Show result with animation
        resultDiv.classList.remove('hidden');
        resultDiv.style.animation = 'fadeInUp 0.6s ease';
        
        // Add calculate again button functionality
        const calculateAgainBtn = document.getElementById('calculateAgain');
        if (calculateAgainBtn) {
            calculateAgainBtn.onclick = () => {
                resultDiv.classList.add('hidden');
                document.getElementById('calcBrand').value = '';
                document.getElementById('calcRepair').value = '';
                this.updateQuoteButtonState();
            };
        }
        
        // Scroll to result smoothly
        setTimeout(() => {
            resultDiv.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 300);
        
        console.log('✅ Quote displayed successfully:', quote);
    }

    getRepairDisplayName(repair) {
        const names = {
            'screen': 'Screen Replacement',
            'battery': 'Battery Replacement',
            'charging': 'Charging Port Repair',
            'camera': 'Camera Repair',
            'water': 'Water Damage Repair',
            'software': 'Software Issues',
            'backglass': 'Back Glass Replacement',
            'speaker': 'Speaker/Microphone Repair'
        };
        return names[repair] || repair;
    }

    // ================================
// ENHANCED BOOKING SYSTEM - WHATSAPP INTEGRATION
// ================================

setupBookingSystem() {
    const bookingForm = document.getElementById('bookingForm');
    console.log('🔧 Setting up enhanced booking system...', bookingForm);
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleBookingSubmission();
        });
    }

    // Add real-time validation
    this.setupBookingFormValidation();
}

setupBookingFormValidation() {
    const form = document.getElementById('bookingForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            this.validateBookingField(input);
        });
        
        input.addEventListener('input', () => {
            this.updateBookingButtonState();
        });
    });
}

validateBookingField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    
    // Remove any existing error states
    field.classList.remove('error');
    this.removeFieldError(fieldId);
    
    if (field.required && !value) {
        this.showFieldError(fieldId, 'This field is required');
        return false;
    }
    
    // Specific validations
    switch(fieldId) {
        case 'bookingPhone':
            if (!/^[0-9+\-\s()]{10,}$/.test(value)) {
                this.showFieldError(fieldId, 'Please enter a valid phone number');
                return false;
            }
            break;
        case 'bookingName':
            if (value.length < 2) {
                this.showFieldError(fieldId, 'Please enter your full name');
                return false;
            }
            break;
    }
    
    return true;
}

showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('error');
    
    // Remove existing error message
    this.removeFieldError(fieldId);
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.id = `${fieldId}-error`;
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: var(--error);
        font-size: var(--text-sm);
        margin-top: var(--space-xs);
        display: flex;
        align-items: center;
        gap: var(--space-xs);
    `;
    
    field.parentNode.appendChild(errorElement);
}

removeFieldError(fieldId) {
    const existingError = document.getElementById(`${fieldId}-error`);
    if (existingError) {
        existingError.remove();
    }
}

updateBookingButtonState() {
    const form = document.getElementById('bookingForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const requiredFields = form.querySelectorAll('[required]');
    
    let allValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            allValid = false;
        }
    });
    
    if (allValid) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-disabled');
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.add('btn-disabled');
    }
}

handleBookingSubmission() {
    const formData = this.getBookingFormData();
    
    if (!this.validateBookingForm(formData)) {
        return;
    }

    // Add loading state to button
    const submitBtn = document.querySelector('#bookingForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing WhatsApp...';
    submitBtn.disabled = true;

    // Generate booking confirmation
    const bookingCode = this.generateBookingCode();
    const booking = this.createBooking(bookingCode, formData);
    
    // Save to localStorage
    this.saveBooking(booking);
    
    // 🚀 SEND TO WHATSAPP - This is the main functionality
    this.sendBookingToWhatsApp(booking);
    
    // Track booking
    this.trackEvent('booking_created', formData.device);
    
    // Restore button after a short delay
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        this.updateBookingButtonState();
    }, 2000);
}

getBookingFormData() {
    return {
        name: document.getElementById('bookingName').value.trim(),
        phone: document.getElementById('bookingPhone').value.trim(),
        hostel: document.getElementById('bookingHostel').value.trim(),
        device: document.getElementById('bookingDevice').value.trim(),
        issue: document.getElementById('bookingIssue').value.trim(),
        urgency: document.getElementById('bookingUrgency').value,
        timestamp: new Date().toLocaleString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
}

validateBookingForm(data) {
    const errors = [];
    
    // Required field validation
    if (!data.name) errors.push('Full name is required');
    if (!data.phone) errors.push('Phone number is required');
    if (!data.hostel) errors.push('Hostel information is required');
    if (!data.device) errors.push('Device model is required');
    if (!data.issue) errors.push('Issue description is required');
    
    // Format validation
    if (data.phone && !/^[0-9+\-\s()]{10,}$/.test(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    if (data.name && data.name.length < 2) {
        errors.push('Please enter your full name');
    }
    
    if (errors.length > 0) {
        this.showNotification(errors.join(', '), 'error');
        return false;
    }
    
    return true;
}

sendBookingToWhatsApp(booking) {
    // Format the message with all booking details
    const message = `📱 *NEW PHONE REPAIR BOOKING - CampusFix UENR* 📱

👤 *CUSTOMER INFORMATION*
• 🔢 **Booking Code:** ${booking.code}
• 📛 **Full Name:** ${booking.name}
• 📞 **Phone Number:** ${booking.phone}
• 🏠 **Hostel & Room:** ${booking.hostel}

📋 *REPAIR DETAILS*
• 📱 **Device Model:** ${booking.device}
• ⚡ **Urgency Level:** ${this.getUrgencyDisplay(booking.urgency)}
• 🕒 **Booking Time:** ${booking.timestamp}

🔧 *ISSUE DESCRIPTION*
${booking.issue}

📍 *NEXT STEPS REQUIRED*
1. 📞 Contact customer to confirm details
2. 🏠 Arrange hostel pickup
3. ⚡ Prioritize based on urgency level
4. 🔧 Confirm repair timeline

💬 *QUICK ACTIONS*
• Call customer: ${booking.phone}
• View booking: ${booking.code}
• Estimated: ${this.getUrgencyTime(booking.urgency)}`;

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/233246912468?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    this.showNotification(`✅ Booking ${booking.code} created! Opening WhatsApp...`, 'success');
    
    // Show customer confirmation
    this.showCustomerConfirmation(booking);
}

getUrgencyDisplay(urgency) {
    const urgencyMap = {
        'standard': '🟢 Standard (2-3 days)',
        'express': '🟡 Express (Same day) +GH₵20',
        'emergency': '🔴 Emergency (4-6 hours) +GH₵50'
    };
    return urgencyMap[urgency] || urgency;
}

getUrgencyTime(urgency) {
    const timeMap = {
        'standard': '2-3 days',
        'express': 'Same day',
        'emergency': '4-6 hours'
    };
    return timeMap[urgency] || '2-3 days';
}

showCustomerConfirmation(booking) {
    const confirmationHTML = `
        <div class="booking-confirmation-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); display: flex; align-items: center; justify-content: center; z-index: 10000; padding: var(--space-md);">
            <div class="booking-confirmation" style="background: var(--gray-800); padding: var(--space-2xl); border-radius: var(--radius-xl); max-width: 500px; width: 100%; border: 2px solid var(--primary); text-align: center; position: relative;">
                <button class="close-confirmation" style="position: absolute; top: 20px; right: 20px; background: none; border: none; color: var(--gray-400); font-size: 1.5rem; cursor: pointer;">×</button>
                
                <div style="font-size: 4rem; color: var(--success); margin-bottom: var(--space-lg);">
                    <i class="fas fa-check-circle"></i>
                </div>
                
                <h2 style="margin-bottom: var(--space-md); color: var(--success); font-size: var(--text-2xl);">Booking Confirmed! 🎉</h2>
                
                <div style="background: rgba(99, 102, 241, 0.1); padding: var(--space-lg); border-radius: var(--radius-lg); margin-bottom: var(--space-xl); border: 1px solid rgba(99, 102, 241, 0.3);">
                    <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: var(--space-sm);">
                        ${booking.code}
                    </div>
                    <p style="color: var(--gray-300); margin-bottom: var(--space-md); font-size: var(--text-lg);">
                        Your repair booking has been received
                    </p>
                </div>
                
                <div style="text-align: left; background: rgba(255,255,255,0.05); padding: var(--space-lg); border-radius: var(--radius-md); margin-bottom: var(--space-xl);">
                    <h4 style="margin-bottom: var(--space-md); color: var(--light);">What happens next:</h4>
                    <div style="display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-sm); padding: var(--space-sm); background: rgba(255,255,255,0.02); border-radius: var(--radius-sm);">
                        <i class="fas fa-clock" style="color: var(--primary); width: 20px;"></i>
                        <span>We'll contact you within 30 minutes</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-sm); padding: var(--space-sm); background: rgba(255,255,255,0.02); border-radius: var(--radius-sm);">
                        <i class="fas fa-home" style="color: var(--primary); width: 20px;"></i>
                        <span>Free pickup from ${booking.hostel}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: var(--space-sm); padding: var(--space-sm); background: rgba(255,255,255,0.02); border-radius: var(--radius-sm);">
                        <i class="fas fa-tools" style="color: var(--primary); width: 20px;"></i>
                        <span>${this.getUrgencyTime(booking.urgency)} repair service</span>
                    </div>
                </div>
                
                <div style="display: flex; gap: var(--space-md); margin-bottom: var(--space-lg);">
                    <button class="btn btn-secondary" id="closeConfirmation" style="flex: 1; padding: var(--space-md);">
                        Close & Continue Browsing
                    </button>
                    <a href="https://wa.me/233246912468" class="btn btn-primary" style="flex: 1; padding: var(--space-md); text-decoration: none; display: flex; align-items: center; justify-content: center; gap: var(--space-sm);">
                        <i class="fab fa-whatsapp"></i> Message Now
                    </a>
                </div>
                
                <div style="margin-top: var(--space-lg); padding-top: var(--space-md); border-top: 1px solid rgba(255,255,255,0.1);">
                    <small style="color: var(--gray-500);">
                        Need immediate help? Call <strong style="color: var(--primary);">(024) 691-2468</strong>
                    </small>
                </div>
            </div>
        </div>
    `;

    const confirmationElement = document.createElement('div');
    confirmationElement.innerHTML = confirmationHTML;
    document.body.appendChild(confirmationElement);

    // Add close events
    const closeConfirmation = () => {
        confirmationElement.remove();
        document.getElementById('bookingForm').reset();
        this.updateBookingButtonState();
    };

    document.getElementById('closeConfirmation').addEventListener('click', closeConfirmation);
    document.querySelector('.close-confirmation').addEventListener('click', closeConfirmation);
    
    // Close when clicking outside
    confirmationElement.addEventListener('click', (e) => {
        if (e.target === confirmationElement) {
            closeConfirmation();
        }
    });
}

    // ================================
    // STATUS CHECKER SYSTEM
    // ================================

    setupStatusChecker() {
        const checkBtn = document.getElementById('checkStatus');
        console.log('🔧 Setting up status checker...', checkBtn);
        
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
        const code = document.getElementById('statusCode').value.trim().toUpperCase();
        
        if (!code) {
            this.showNotification('Please enter a repair code', 'error');
            return;
        }

        // Add loading state
        const checkBtn = document.getElementById('checkStatus');
        const originalText = checkBtn.innerHTML;
        checkBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
        checkBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            const status = this.getRepairStatus(code);
            this.displayStatus(status, code);
            
            // Restore button
            checkBtn.innerHTML = originalText;
            checkBtn.disabled = false;
            
            // Track status check
            this.trackEvent('status_checked', code);
        }, 800);
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

                <div style="margin-top: var(--space-xl); text-align: center;">
                    <a href="https://wa.me/233246912468" class="btn btn-primary hover-scale">
                        <i class="fab fa-whatsapp"></i> Contact Technician
                    </a>
                </div>
            </div>
        `;
    }

    generateTimelineHTML(steps) {
        const stepConfig = [
            { key: 'received', label: 'Received' },
            { key: 'diagnosis', label: 'Diagnosis' },
            { key: 'repair', label: 'Repair' },
            { key: 'quality', label: 'Quality Check' },
            { key: 'ready', label: 'Ready' }
        ];

        return stepConfig.map((step, index) => {
            const stepTime = steps[step.key];
            const isCompleted = stepTime !== 'Pending' && stepTime !== 'In Progress';
            const isCurrent = stepTime === 'In Progress';
            
            let markerClass = '';
            if (isCompleted) markerClass = 'completed';
            else if (isCurrent) markerClass = 'current';

            return `
                <div class="timeline-step">
                    <div class="step-marker ${markerClass}"></div>
                    <div class="step-content">
                        <div class="step-label">${step.label}</div>
                        <div class="step-time">${stepTime}</div>
                    </div>
                </div>
            `;
        }).join('');
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

        console.log('💾 Data systems initialized');

        return {
            bookings: JSON.parse(localStorage.getItem('campusFixBookings') || '{}'),
            analytics: {
                pageViews: parseInt(localStorage.getItem('pageViews') || '0'),
                firstVisit: localStorage.getItem('firstVisit')
            }
        };
    }

    // ================================
    // FEEDBACK SYSTEM
    // ================================

    setupFeedbackSystem() {
        console.log('🔧 Setting up feedback system...');
    }
}

// Initialize systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.campusFixSystems = new CampusFixSystems();
    console.log('🚀 CampusFix Systems Initialized');

    // Test if systems are loading properly
    console.log('🔧 Testing systems initialization...');

    // Test quote calculator elements
    setTimeout(() => {
        const brandSelect = document.getElementById('calcBrand');
        const repairSelect = document.getElementById('calcRepair');
        const calculateBtn = document.getElementById('calculateQuote');
        
        console.log('🧪 Element check:', {
            brandSelect: !!brandSelect,
            repairSelect: !!repairSelect,
            calculateBtn: !!calculateBtn
        });
        
        if (brandSelect && repairSelect) {
            console.log('✅ Quote calculator elements found');
        } else {
            console.error('❌ Quote calculator elements missing');
        }
    }, 1000);
});