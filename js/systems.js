// ================================
// FRONTEND-ONLY SYSTEMS - COMPLETE INTEGRATED VERSION
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
    // QUOTE CALCULATOR SYSTEM
    // ================================

    setupQuoteCalculator() {
        console.log('🔧 Setting up quote calculator...');
        
        const brandSelect = document.getElementById('calcBrand');
        const modelSelect = document.getElementById('calcModel');
        const repairSelect = document.getElementById('calcRepair');
        const calculateBtn = document.getElementById('calculateQuote');
        
        if (brandSelect && modelSelect && repairSelect && calculateBtn) {
            console.log('✅ All quote calculator elements found');
            
            this.initializeDropdowns();
            
            brandSelect.addEventListener('change', (e) => {
                const brand = e.target.value;
                console.log('📱 Brand selected:', brand);
                this.populateModels(brand);
                this.updateQuoteButtonState();
            });
            
            modelSelect.addEventListener('change', (e) => {
                const model = e.target.value;
                console.log('📱 Model selected:', model);
                this.populateRepairs(model);
                this.updateQuoteButtonState();
            });
            
            repairSelect.addEventListener('change', () => {
                console.log('🔧 Repair selected:', repairSelect.value);
                this.updateQuoteButtonState();
            });
            
            calculateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.calculateQuote();
            });
            
            console.log('✅ Quote calculator setup complete');
        } else {
            console.error('❌ Quote calculator elements not found');
        }
    }

    initializeDropdowns() {
        const brandSelect = document.getElementById('calcBrand');
        const modelSelect = document.getElementById('calcModel');
        const repairSelect = document.getElementById('calcRepair');
        
        if (brandSelect && modelSelect && repairSelect) {
            brandSelect.value = '';
            modelSelect.innerHTML = '<option value="">Select Brand First</option>';
            modelSelect.disabled = true;
            repairSelect.innerHTML = '<option value="">Select Model First</option>';
            repairSelect.disabled = true;
            this.updateQuoteButtonState();
        }
    }

    populateModels(brand) {
        const modelSelect = document.getElementById('calcModel');
        const repairSelect = document.getElementById('calcRepair');
        
        if (!modelSelect || !repairSelect) return;
        
        if (!brand) {
            modelSelect.innerHTML = '<option value="">Select Brand First</option>';
            modelSelect.disabled = true;
            repairSelect.innerHTML = '<option value="">Select Model First</option>';
            repairSelect.disabled = true;
            return;
        }
        
        const models = this.getModelsByBrand(brand);
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
        
        modelSelect.disabled = false;
        repairSelect.innerHTML = '<option value="">Select Model First</option>';
        repairSelect.disabled = true;
    }

    populateRepairs(model) {
        const repairSelect = document.getElementById('calcRepair');
        if (!repairSelect) return;
        
        if (!model) {
            repairSelect.innerHTML = '<option value="">Select Model First</option>';
            repairSelect.disabled = true;
            return;
        }
        
        const repairs = this.getRepairsByModel(model);
        repairSelect.innerHTML = '<option value="">Select Repair Type</option>';
        
        repairs.forEach(repair => {
            const option = document.createElement('option');
            option.value = repair.key;
            option.textContent = repair.name;
            repairSelect.appendChild(option);
        });
        
        repairSelect.disabled = false;
    }

    getModelsByBrand(brand) {
        const models = {
            'Tecno': ['Spark Series (Spark 20/19/18)', 'Camon Series (Camon 20/19/18)', 'Phantom Series (Phantom X2/V)', 'Pova Series (Pova 5/4/3)', 'Pop Series (Pop 8/7/6)', 'Other Tecno Model'],
            'Infinix': ['Note Series (Note 40/30/20)', 'Hot Series (Hot 40/30/20)', 'Zero Series (Zero 30/20/X)', 'Smart Series (Smart 8/7/6)', 'Other Infinix Model'],
            'Itel': ['Vision Series (Vision 5/4/3)', 'S Series (S23/S22/S21)', 'P Series (P40/P37/P32)', 'Other Itel Model'],
            'iPhone': ['iPhone 15 Series (15/15 Plus)', 'iPhone 15 Pro Series (Pro/Pro Max)', 'iPhone 14 Series (14/14 Plus)', 'iPhone 13 Series', 'iPhone 12 Series', 'iPhone 11 & Older'],
            'Samsung': ['Galaxy S Series (S24/S23/S22)', 'Galaxy S Ultra (S24/S23 Ultra)', 'Galaxy A Series (A54/A34/A14)', 'Galaxy M Series', 'Other Samsung Model'],
            'Other': ['Oppo Series', 'Realme Series', 'Vivo Series', 'Other Brand Model']
        };
        return models[brand] || ['Other Model'];
    }

    getRepairsByModel(model) {
        const basicRepairs = [
            { key: 'screen', name: 'Screen Replacement' },
            { key: 'battery', name: 'Battery Replacement' },
            { key: 'charging', name: 'Charging Port Repair' },
            { key: 'camera', name: 'Camera Repair' },
            { key: 'backglass', name: 'Back Glass Replacement' }
        ];
        
        const premiumRepairs = [
            ...basicRepairs,
            { key: 'water', name: 'Water Damage Repair' },
            { key: 'software', name: 'Software Issues' }
        ];
        
        const premiumKeywords = ['Pro', 'Max', 'Ultra', 'Note', 'Phantom'];
        const isPremium = premiumKeywords.some(keyword => model.includes(keyword));
        
        return isPremium ? premiumRepairs : basicRepairs;
    }

    updateQuoteButtonState() {
        const brand = document.getElementById('calcBrand')?.value;
        const model = document.getElementById('calcModel')?.value;
        const repair = document.getElementById('calcRepair')?.value;
        const calculateBtn = document.getElementById('calculateQuote');
        
        if (!calculateBtn) return;
        
        if (brand && model && repair) {
            calculateBtn.disabled = false;
            calculateBtn.classList.remove('btn-disabled');
            calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Calculate Repair Cost';
        } else {
            calculateBtn.disabled = true;
            calculateBtn.classList.add('btn-disabled');
            calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Select Options to Calculate';
        }
    }

    calculateQuote() {
        const brand = document.getElementById('calcBrand')?.value;
        const model = document.getElementById('calcModel')?.value;
        const repair = document.getElementById('calcRepair')?.value;
        
        if (!brand || !model || !repair) {
            this.showNotification('Please select brand, model and repair type', 'error');
            return;
        }

        const calculateBtn = document.getElementById('calculateQuote');
        const originalText = calculateBtn.innerHTML;
        calculateBtn.classList.add('btn-loading');
        calculateBtn.disabled = true;

        setTimeout(() => {
            try {
                const quote = this.getEnhancedQuotePrice(brand, model, repair);
                this.displayEnhancedQuote(quote, brand, model, repair);
                this.trackEvent('quote_calculated', `${brand}_${model}_${repair}`);
            } catch (error) {
                console.error('Quote calculation error:', error);
                this.showNotification('Error calculating quote. Please try again.', 'error');
            } finally {
                calculateBtn.classList.remove('btn-loading');
                calculateBtn.innerHTML = originalText;
                calculateBtn.disabled = false;
                this.updateQuoteButtonState();
            }
        }, 1000);
    }

    getEnhancedQuotePrice(brand, model, repair) {
        const priceMatrix = {
            'Tecno': {
                'Spark Series (Spark 20/19/18)': { 'screen': { min: 180, max: 280 }, 'battery': { min: 70, max: 120 } },
                'Camon Series (Camon 20/19/18)': { 'screen': { min: 220, max: 350 }, 'battery': { min: 90, max: 150 } }
            },
            'iPhone': {
                'iPhone 15 Pro Series (Pro/Pro Max)': { 'screen': { min: 900, max: 1500 }, 'battery': { min: 280, max: 450 } },
                'iPhone 14 Series (14/14 Plus)': { 'screen': { min: 600, max: 1000 }, 'battery': { min: 200, max: 320 } }
            },
            'Default': {
                'screen': { min: 200, max: 350 }, 'battery': { min: 80, max: 140 }, 'charging': { min: 60, max: 110 },
                'camera': { min: 100, max: 200 }, 'backglass': { min: 70, max: 130 }
            }
        };

        const brandData = priceMatrix[brand];
        let priceData;
        
        if (brandData && brandData[model] && brandData[model][repair]) {
            priceData = brandData[model][repair];
        } else if (brandData && brandData[repair]) {
            priceData = brandData[repair];
        } else {
            priceData = priceMatrix['Default'][repair] || priceMatrix['Default']['screen'];
        }

        return {
            min: priceData.min,
            max: priceData.max,
            time: '2-3 hours',
            urgency: 'Standard',
            brand: brand,
            model: model,
            repair: repair
        };
    }

    displayEnhancedQuote(quote, brand, model, repair) {
        const resultDiv = document.getElementById('quoteResult');
        const priceElement = document.getElementById('estimatedPrice');
        const timeElement = document.getElementById('estimatedTime');
        
        if (!resultDiv || !priceElement || !timeElement) {
            console.error('❌ Quote result elements not found!');
            return;
        }

        priceElement.textContent = `GH₵ ${quote.min} - GH₵ ${quote.max}`;
        timeElement.textContent = quote.time;
        
        const deviceBrand = document.getElementById('deviceBrand');
        const deviceModel = document.getElementById('deviceModel');
        const deviceRepair = document.getElementById('deviceRepair');
        
        if (deviceBrand) deviceBrand.textContent = brand;
        if (deviceModel) deviceModel.textContent = model;
        if (deviceRepair) deviceRepair.textContent = this.getRepairDisplayName(repair);
        
        const whatsappBtn = document.getElementById('whatsappQuote');
        if (whatsappBtn) {
            const repairName = this.getRepairDisplayName(repair);
            const message = `Hello! I'd like a quote for:\n\n📱 *Repair Details:*\n• Brand: ${brand}\n• Model: ${model}\n• Repair: ${repairName}\n• Estimated Cost: GH₵ ${quote.min}-${quote.max}\n\nPlease provide exact pricing.`;
            whatsappBtn.href = `https://wa.me/233246912468?text=${encodeURIComponent(message)}`;
        }
        
        resultDiv.classList.remove('hidden');
        
        const calculateAgainBtn = document.getElementById('calculateAgain');
        if (calculateAgainBtn) {
            calculateAgainBtn.onclick = () => {
                resultDiv.classList.add('hidden');
                this.initializeDropdowns();
            };
        }
    }

    getRepairDisplayName(repair) {
        const names = {
            'screen': 'Screen Replacement', 'battery': 'Battery Replacement',
            'charging': 'Charging Port Repair', 'camera': 'Camera Repair',
            'backglass': 'Back Glass Replacement', 'water': 'Water Damage Repair'
        };
        return names[repair] || repair;
    }

    // ================================
    // BOOKING SYSTEM - INTEGRATED WITH ADMIN
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
            return;
        }

        const submitBtn = document.querySelector('#bookingForm button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing WhatsApp...';
        submitBtn.disabled = true;

        try {
            const bookingCode = this.generateBookingCode();
            const booking = this.createBooking(bookingCode, formData);
            
            this.saveBooking(booking);
            this.sendBookingToWhatsApp(booking);
            this.trackEvent('booking_created', formData.device);
            
        } catch (error) {
            console.error('Booking error:', error);
            this.showNotification('Error creating booking. Please try again.', 'error');
        } finally {
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
        
        if (data.phone && !/^(0|\+233)[0-9]{9,}$/.test(data.phone.replace(/\s/g, ''))) {
            errors.push('Please enter a valid Ghana phone number');
        }
        
        if (errors.length > 0) {
            this.showNotification(errors.join(', '), 'error');
            return false;
        }
        
        return true;
    }

    createBooking(code, data) {
        const now = new Date();
        const completionTimes = { 'emergency': 6, 'express': 24, 'standard': 72 };
        const hours = completionTimes[data.urgency] || 72;
        const completionDate = new Date(now.getTime() + hours * 60 * 60 * 1000);
        
        return {
            code: code,
            ...data,
            status: 'Received',
            progress: 10,
            createdAt: now.toISOString(),
            steps: {
                received: { time: now.toLocaleString('en-GB'), completed: true },
                diagnosis: { time: 'Pending', completed: false },
                parts: { time: 'Pending', completed: false },
                repair: { time: 'Pending', completed: false },
                testing: { time: 'Pending', completed: false },
                quality: { time: 'Pending', completed: false },
                ready: { time: 'Pending', completed: false }
            },
            notes: [
                `Device: ${data.device}`,
                `Issue: ${data.issue}`
            ],
            estimatedCompletion: completionDate.toLocaleString('en-GB', {
                weekday: 'long',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    }

    sendBookingToWhatsApp(booking) {
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

📍 *Track Repair Status:*
Use code *${booking.code}* on our website to check progress

💬 *I'm ready for pickup!*`;

        const whatsappUrl = `https://wa.me/233246912468?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        this.showNotification(`✅ Booking ${booking.code} sent to WhatsApp!`, 'success');
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
                <div style="background: #1e293b; padding: 30px; border-radius: 20px; max-width: 500px; width: 100%; border: 2px solid #6366f1; text-align: center; position: relative;">
                    <button class="close-confirmation" style="position: absolute; top: 15px; right: 15px; background: none; border: none; color: #94a3b8; font-size: 24px; cursor: pointer;">×</button>
                    
                    <div style="font-size: 60px; color: #10b981; margin-bottom: 20px;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    
                    <h2 style="margin-bottom: 15px; color: #10b981; font-size: 28px;">Booking Confirmed! 🎉</h2>
                    
                    <div style="background: rgba(99, 102, 241, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                        <div style="font-size: 32px; font-weight: 800; color: #6366f1; margin-bottom: 10px;">
                            ${booking.code}
                        </div>
                        <p style="color: #cbd5e1; margin-bottom: 15px;">
                            Use this code to track your repair status
                        </p>
                    </div>
                    
                    <div style="margin-bottom: 25px;">
                        <a href="https://wa.me/233246912468" class="btn btn-primary" style="padding: 15px; border: none; border-radius: 12px; background: #6366f1; color: white; text-decoration: none; font-weight: 600; display: block; margin-bottom: 10px;">
                            <i class="fab fa-whatsapp"></i> Message Now
                        </a>
                        <button class="btn btn-secondary" onclick="this.closest('.booking-confirmation-overlay').remove(); document.getElementById('bookingForm').reset();" style="padding: 15px; border: none; border-radius: 12px; background: #475569; color: white; font-weight: 600; width: 100%;">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;

        const confirmationElement = document.createElement('div');
        confirmationElement.innerHTML = confirmationHTML;
        document.body.appendChild(confirmationElement);

        const closeBtn = confirmationElement.querySelector('.close-confirmation');
        closeBtn.onclick = () => {
            confirmationElement.remove();
            document.getElementById('bookingForm').reset();
        };
    }

    generateBookingCode() {
    try {
        // Get current counter or start from a high number
        let counter = parseInt(localStorage.getItem('bookingCounter') || '2580');
        
        // Increment counter
        counter++;
        
        // Save back to localStorage
        localStorage.setItem('bookingCounter', counter.toString());
        
        // Generate code with year and padded number
        const code = `CF-${new Date().getFullYear()}-${counter.toString().padStart(4, '0')}`;
        
        console.log('🎫 Generated booking code:', code);
        return code;
        
    } catch (error) {
        console.error('Error generating booking code:', error);
        // Fallback code with timestamp
        return `CF-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;
    }
}

    saveBooking(booking) {
        try {
            const bookings = JSON.parse(localStorage.getItem('campusFixBookings') || '{}');
            bookings[booking.code] = booking;
            localStorage.setItem('campusFixBookings', JSON.stringify(bookings));
            console.log('💾 Booking saved:', booking.code);
            
            // Trigger storage event for admin panel
            window.dispatchEvent(new Event('storage'));
        } catch (error) {
            console.error('Error saving booking:', error);
        }
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

        const checkBtn = document.getElementById('checkStatus');
        const originalText = checkBtn.innerHTML;
        checkBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
        checkBtn.disabled = true;

        setTimeout(() => {
            const status = this.getRepairStatus(code);
            this.displayStatus(status, code);
            checkBtn.innerHTML = originalText;
            checkBtn.disabled = false;
        }, 800);
    }

    getRepairStatus(code) {
        // Check demo codes
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
                customerName: booking.name,
                issue: booking.issue,
                urgency: booking.urgency,
                steps: booking.steps,
                notes: booking.notes || [],
                estimatedCompletion: booking.estimatedCompletion,
                isDemo: false
            };
        }

        return { exists: false, code: code };
    }

    getDemoStatus(code) {
        const demoData = {
            'CF-2024-2581': {
                exists: true, status: 'In Progress', progress: 60,
                device: 'iPhone 13 Pro', customerName: 'Kwame Asante',
                issue: 'Screen replacement - cracked display', urgency: 'express',
                steps: {
                    received: { time: 'Today, 10:30 AM', completed: true },
                    diagnosis: { time: 'Today, 11:15 AM', completed: true },
                    parts: { time: 'Parts ordered', completed: false },
                    repair: { time: 'In Progress', completed: false },
                    testing: { time: 'Pending', completed: false },
                    quality: { time: 'Pending', completed: false },
                    ready: { time: 'Pending', completed: false }
                },
                notes: ['Original screen ordered', 'Battery health: 85%'],
                estimatedCompletion: 'Tomorrow, 3:00 PM', isDemo: true
            },
            'CF-2024-1924': {
                exists: true, status: 'Completed', progress: 100,
                device: 'Samsung Galaxy S21', customerName: 'Abena Kumi',
                issue: 'Battery replacement', urgency: 'standard',
                steps: {
                    received: { time: 'Yesterday, 9:00 AM', completed: true },
                    diagnosis: { time: 'Yesterday, 9:45 AM', completed: true },
                    parts: { time: 'Yesterday, 10:15 AM', completed: true },
                    repair: { time: 'Yesterday, 10:30 AM', completed: true },
                    testing: { time: 'Yesterday, 2:00 PM', completed: true },
                    quality: { time: 'Yesterday, 2:15 PM', completed: true },
                    ready: { time: 'Yesterday, 3:00 PM', completed: true }
                },
                notes: ['Original battery installed', 'Device cleaned'],
                estimatedCompletion: 'Completed', isDemo: true
            }
        };
        return demoData[code] || null;
    }

    displayStatus(status, code) {
        const resultDiv = document.getElementById('statusResult');
        if (!resultDiv) return;
        
        if (!status.exists) {
            resultDiv.innerHTML = `
                <div class="status-card">
                    <div style="text-align: center; color: var(--error);">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Repair Code Not Found</h3>
                    </div>
                    <p style="text-align: center;">Code: ${code}</p>
                    <a href="https://wa.me/233246912468" class="btn btn-primary" style="display: block; text-align: center;">
                        <i class="fab fa-whatsapp"></i> Contact Support
                    </a>
                </div>
            `;
            return;
        }

        const progressPercent = status.progress + '%';
        resultDiv.innerHTML = `
            <div class="status-card">
                <div class="status-header">
                    <div class="status-code">${status.code}</div>
                    <div class="status-badge">${status.status}</div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <strong>Device:</strong> ${status.device}<br>
                    <strong>Customer:</strong> ${status.customerName}
                </div>

                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercent};"></div>
                </div>
                <div style="text-align: center; margin-bottom: 20px;">
                    Progress: ${progressPercent}
                </div>

                ${status.estimatedCompletion ? `
                    <div style="background: rgba(99, 102, 241, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
                        <i class="fas fa-clock"></i>
                        <strong>Estimated Completion:</strong> ${status.estimatedCompletion}
                    </div>
                ` : ''}

                <div style="text-align: center; margin-top: 20px;">
                    <a href="https://wa.me/233246912468" class="btn btn-primary">
                        <i class="fab fa-whatsapp"></i> Contact Technician
                    </a>
                </div>
            </div>
        `;
    }

// ================================
// ADMIN FUNCTIONS - FIXED VERSION
// ================================

updateRepairStatus(code, updates) {
    try {
        console.log('🔄 Updating repair status:', code, updates);
        
        const bookings = JSON.parse(localStorage.getItem('campusFixBookings') || '{}');
        const booking = bookings[code];
        
        if (!booking) {
            console.error('❌ Repair not found:', code);
            return false;
        }
        
        // Merge updates with existing booking
        Object.assign(booking, updates);
        bookings[code] = booking;
        
        // Save back to localStorage
        localStorage.setItem('campusFixBookings', JSON.stringify(bookings));
        
        console.log('✅ Repair status updated successfully:', code);
        
        // Trigger storage event for real-time updates
        window.dispatchEvent(new Event('storage'));
        
        return true;
        
    } catch (error) {
        console.error('❌ Error updating repair status:', error);
        return false;
    }
}

markDiagnosisComplete(code, notes = []) {
    console.log('🔧 Marking diagnosis complete for:', code);
    
    const updates = {
        status: 'Diagnosis Complete',
        progress: 30,
        steps: {
            received: { time: 'Completed', completed: true },
            diagnosis: { time: new Date().toLocaleString('en-GB'), completed: true },
            parts: { time: 'Pending', completed: false },
            repair: { time: 'Pending', completed: false },
            testing: { time: 'Pending', completed: false },
            quality: { time: 'Pending', completed: false },
            ready: { time: 'Pending', completed: false }
        }
    };
    
    // Add notes if provided
    if (notes.length > 0) {
        updates.notes = [...(updates.notes || []), ...notes];
    }
    
    return this.updateRepairStatus(code, updates);
}

markRepairInProgress(code, notes = []) {
    console.log('🔧 Marking repair in progress for:', code);
    
    const updates = {
        status: 'Repair In Progress',
        progress: 60,
        steps: {
            received: { time: 'Completed', completed: true },
            diagnosis: { time: 'Completed', completed: true },
            parts: { time: 'Parts Available', completed: true },
            repair: { time: 'In Progress', completed: false },
            testing: { time: 'Pending', completed: false },
            quality: { time: 'Pending', completed: false },
            ready: { time: 'Pending', completed: false }
        }
    };
    
    if (notes.length > 0) {
        updates.notes = [...(updates.notes || []), ...notes];
    }
    
    return this.updateRepairStatus(code, updates);
}

markRepairCompleted(code, notes = []) {
    console.log('🔧 Marking repair completed for:', code);
    
    const updates = {
        status: 'Completed',
        progress: 100,
        steps: {
            received: { time: 'Completed', completed: true },
            diagnosis: { time: 'Completed', completed: true },
            parts: { time: 'Completed', completed: true },
            repair: { time: 'Completed', completed: true },
            testing: { time: 'Completed', completed: true },
            quality: { time: 'Completed', completed: true },
            ready: { time: new Date().toLocaleString('en-GB'), completed: true }
        }
    };
    
    if (notes.length > 0) {
        updates.notes = [...(updates.notes || []), 'Repair completed successfully', ...notes];
    } else {
        updates.notes = [...(updates.notes || []), 'Repair completed successfully'];
    }
    
    return this.updateRepairStatus(code, updates);
}

    // ================================
    // NOTIFICATION SYSTEM
    // ================================

    setupNotifications() {
        console.log('🔧 Notification system ready');
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed; top: 20px; right: 20px; background: var(--success);
                    color: white; padding: 15px 20px; border-radius: 12px; z-index: 10000;
                    transform: translateX(400px); transition: transform 0.3s ease; max-width: 400px;
                }
                .notification.show { transform: translateX(0); }
                .notification.error { background: var(--error); }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    getNotificationIcon(type) {
        return type === 'error' ? 'exclamation-triangle' : 'check-circle';
    }

    // ================================
    // ANALYTICS & DATA
    // ================================

    setupAnalytics() {
        this.trackPageView();
        console.log('📊 Analytics system initialized');
    }

    trackPageView() {
        const pageViews = parseInt(localStorage.getItem('pageViews') || '0') + 1;
        localStorage.setItem('pageViews', pageViews.toString());
    }

    trackEvent(action, label) {
        const events = JSON.parse(localStorage.getItem('trackingEvents') || '[]');
        events.push({ action, label, timestamp: new Date().toISOString() });
        localStorage.setItem('trackingEvents', JSON.stringify(events));
    }

    initializeRepairData() {
        if (!localStorage.getItem('campusFixBookings')) {
            localStorage.setItem('campusFixBookings', JSON.stringify({}));
        }
        if (!localStorage.getItem('bookingCounter')) {
            localStorage.setItem('bookingCounter', '2580');
        }
        console.log('💾 Data systems initialized');
        return { bookings: {} };
    }

    setupFeedbackSystem() {
        console.log('🔧 Feedback system ready');
    }
}

// Initialize main systems
document.addEventListener('DOMContentLoaded', () => {
    window.campusFixSystems = new CampusFixSystems();
    console.log('🚀 CampusFix Systems Initialized');
});

// ================================
// GLOBAL ADMIN FUNCTIONS - FIXED
// ================================

window.updateRepairStatus = function(code, status, notes = []) {
    console.log('🌐 Global updateRepairStatus called:', code, status);
    
    if (window.campusFixSystems) {
        const updates = typeof status === 'object' ? status : { status };
        if (notes.length > 0) {
            updates.notes = notes;
        }
        return window.campusFixSystems.updateRepairStatus(code, updates);
    } else {
        console.error('❌ CampusFix systems not loaded');
        return false;
    }
};

window.markDiagnosisComplete = function(code, notes = []) {
    console.log('🌐 Global markDiagnosisComplete called:', code);
    
    if (window.campusFixSystems) {
        return window.campusFixSystems.markDiagnosisComplete(code, notes);
    } else {
        console.error('❌ CampusFix systems not loaded');
        return false;
    }
};

window.markRepairInProgress = function(code, notes = []) {
    console.log('🌐 Global markRepairInProgress called:', code);
    
    if (window.campusFixSystems) {
        return window.campusFixSystems.markRepairInProgress(code, notes);
    } else {
        console.error('❌ CampusFix systems not loaded');
        return false;
    }
};

window.markRepairCompleted = function(code, notes = []) {
    console.log('🌐 Global markRepairCompleted called:', code);
    
    if (window.campusFixSystems) {
        return window.campusFixSystems.markRepairCompleted(code, notes);
    } else {
        console.error('❌ CampusFix systems not loaded');
        return false;
    }
};

// Enhanced storage event listener
window.addEventListener('storage', function() {
    console.log('📦 Storage updated - refreshing repairs list');
    if (window.admin && typeof window.admin.loadRepairs === 'function') {
        window.admin.loadRepairs();
    }
});

// Also listen for custom events for same-tab updates
window.addEventListener('repairUpdated', function() {
    console.log('🔧 Repair updated via custom event');
    if (window.admin && typeof window.admin.loadRepairs === 'function') {
        window.admin.loadRepairs();
    }
});