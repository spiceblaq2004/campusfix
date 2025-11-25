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
    // BOOKING SYSTEM - WORKING VERSION
    // ================================

    setupBookingSystem() {
        const bookingForm = document.getElementById('bookingForm');
        console.log('🔧 Setting up booking system...', bookingForm);
        
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBookingSubmission();
            });
        }
    }

    handleBookingSubmission() {
        console.log('📦 Handling booking submission...');
        
        const formData = this.getBookingFormData();
        
        if (!this.validateBookingForm(formData)) {
            this.showNotification('Please fill in all required fields correctly', 'error');
            return;
        }

        // Add loading state to button
        const submitBtn = document.querySelector('#bookingForm button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing WhatsApp...';
        submitBtn.disabled = true;

        try {
            // Generate booking confirmation
            const bookingCode = this.generateBookingCode();
            const booking = this.createBooking(bookingCode, formData);
            
            // Save to localStorage
            this.saveBooking(booking);
            
            // 🚀 SEND TO WHATSAPP - THIS IS WHAT MATTERS
            this.sendBookingToWhatsApp(booking);
            
            // Track booking
            this.trackEvent('booking_created', formData.device);
            
        } catch (error) {
            console.error('Booking error:', error);
            this.showNotification('Error creating booking. Please try again.', 'error');
        } finally {
            // Restore button after a short delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    }

    getBookingFormData() {
        return {
            name: document.getElementById('bookingName')?.value.trim() || '',
            phone: document.getElementById('bookingPhone')?.value.trim() || '',
            hostel: document.getElementById('bookingHostel')?.value.trim() || '',
            device: document.getElementById('bookingDevice')?.value.trim() || '',
            issue: document.getElementById('bookingIssue')?.value.trim() || '',
            urgency: document.getElementById('bookingUrgency')?.value || 'standard',
            timestamp: new Date().toLocaleString('en-GB')
        };
    }

    validateBookingForm(data) {
        const errors = [];
        
        if (!data.name) errors.push('Name is required');
        if (!data.phone) errors.push('Phone number is required');
        if (!data.hostel) errors.push('Hostel information is required');
        if (!data.device) errors.push('Device model is required');
        if (!data.issue) errors.push('Issue description is required');
        
        // Validate phone number format
        if (data.phone && !/^(0|\+233)[0-9]{9,}$/.test(data.phone.replace(/\s/g, ''))) {
            errors.push('Please enter a valid Ghana phone number');
        }
        
        if (errors.length > 0) {
            this.showNotification(errors.join(', '), 'error');
            return false;
        }
        
        return true;
    }

    sendBookingToWhatsApp(booking) {
        console.log('📤 Sending booking to WhatsApp...', booking);
        
        // Format the message EXACTLY as you want it
        const message = `📱 *NEW PHONE REPAIR BOOKING - CampusFix UENR* 📱

👤 *CUSTOMER INFORMATION*
• 🔢 *Booking Code:* ${booking.code}
• 📛 *Full Name:* ${booking.name}
• 📞 *Phone:* ${booking.phone}
• 🏠 *Hostel:* ${booking.hostel}

📋 *REPAIR DETAILS* 
• 📱 *Device:* ${booking.device}
• ⚡ *Urgency:* ${this.getUrgencyDisplay(booking.urgency)}
• 🕒 *Booked:* ${booking.timestamp}

🔧 *ISSUE DESCRIPTION:*
${booking.issue}

📍 *ACTION REQUIRED:*
• Contact customer within 30 minutes
• Arrange hostel pickup
• Confirm repair timeline

💬 *I'm ready for pickup!*`;

        // Create WhatsApp URL - USING YOUR ACTUAL NUMBER
        const whatsappUrl = `https://wa.me/233246912468?text=${encodeURIComponent(message)}`;
        
        console.log('🔗 WhatsApp URL created:', whatsappUrl);
        
        // 🎯 THIS IS WHAT SENDS IT TO YOUR WHATSAPP
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        this.showNotification(`✅ Booking ${booking.code} sent to WhatsApp!`, 'success');
        
        // Show customer confirmation
        this.showCustomerConfirmation(booking);
    }

    getUrgencyDisplay(urgency) {
        const urgencyMap = {
            'standard': 'Standard (2-3 days)',
            'express': 'Express (Same day) +GH₵20',
            'emergency': 'Emergency (4-6 hours) +GH₵50'
        };
        return urgencyMap[urgency] || urgency;
    }

    showCustomerConfirmation(booking) {
        const confirmationHTML = `
            <div class="booking-confirmation-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); display: flex; align-items: center; justify-content: center; z-index: 10000; padding: 20px;">
                <div class="booking-confirmation" style="background: #1e293b; padding: 30px; border-radius: 20px; max-width: 500px; width: 100%; border: 2px solid #6366f1; text-align: center; position: relative;">
                    <button class="close-confirmation" style="position: absolute; top: 15px; right: 15px; background: none; border: none; color: #94a3b8; font-size: 24px; cursor: pointer; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">×</button>
                    
                    <div style="font-size: 60px; color: #10b981; margin-bottom: 20px;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    
                    <h2 style="margin-bottom: 15px; color: #10b981; font-size: 28px;">Booking Confirmed! 🎉</h2>
                    
                    <div style="background: rgba(99, 102, 241, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 25px; border: 1px solid rgba(99, 102, 241, 0.3);">
                        <div style="font-size: 32px; font-weight: 800; color: #6366f1; margin-bottom: 10px;">
                            ${booking.code}
                        </div>
                        <p style="color: #cbd5e1; margin-bottom: 15px; font-size: 18px;">
                            Your repair booking has been received
                        </p>
                    </div>
                    
                    <div style="text-align: left; background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                        <h4 style="margin-bottom: 15px; color: #f8fafc;">What happens next:</h4>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; padding: 10px; background: rgba(255,255,255,0.02); border-radius: 8px;">
                            <i class="fas fa-clock" style="color: #6366f1; width: 20px;"></i>
                            <span>We'll contact you within 30 minutes</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; padding: 10px; background: rgba(255,255,255,0.02); border-radius: 8px;">
                            <i class="fas fa-home" style="color: #6366f1; width: 20px;"></i>
                            <span>Free pickup from ${booking.hostel}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; padding: 10px; background: rgba(255,255,255,0.02); border-radius: 8px;">
                            <i class="fas fa-tools" style="color: #6366f1; width: 20px;"></i>
                            <span>${this.getUrgencyTime(booking.urgency)} repair service</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 15px; margin-bottom: 20px; flex-direction: column;">
                        <button class="btn btn-secondary" id="closeConfirmation" style="padding: 15px; border: none; border-radius: 12px; background: #475569; color: white; font-weight: 600; cursor: pointer;">
                            Close & Continue Browsing
                        </button>
                        <a href="https://wa.me/233246912468" class="btn btn-primary" style="padding: 15px; border: none; border-radius: 12px; background: #6366f1; color: white; text-decoration: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;">
                            <i class="fab fa-whatsapp"></i> Message Now
                        </a>
                    </div>
                    
                    <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
                        <small style="color: #64748b;">
                            Need immediate help? Call <strong style="color: #6366f1;">(024) 691-2468</strong>
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
            // Clear the form
            const form = document.getElementById('bookingForm');
            if (form) {
                form.reset();
            }
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

    getUrgencyTime(urgency) {
        const timeMap = {
            'standard': '2-3 days',
            'express': 'Same day',
            'emergency': '4-6 hours'
        };
        return timeMap[urgency] || '2-3 days';
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
            progress: 10,
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
        try {
            const bookings = JSON.parse(localStorage.getItem('campusFixBookings') || '{}');
            bookings[booking.code] = booking;
            localStorage.setItem('campusFixBookings', JSON.stringify(bookings));
            console.log('💾 Booking saved:', booking.code);
        } catch (error) {
            console.error('Error saving booking:', error);
        }
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