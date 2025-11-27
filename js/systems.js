// ================================
// FRONTEND-ONLY SYSTEMS - FIXED VERSION
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
    // FIXED QUOTE CALCULATOR SYSTEM
    // ================================

    setupQuoteCalculator() {
        console.log('🔧 Setting up fixed quote calculator...');
        
        const brandSelect = document.getElementById('calcBrand');
        const modelSelect = document.getElementById('calcModel');
        const repairSelect = document.getElementById('calcRepair');
        const calculateBtn = document.getElementById('calculateQuote');
        
        if (brandSelect && modelSelect && repairSelect && calculateBtn) {
            console.log('✅ All quote calculator elements found');
            
            // Initialize dropdowns
            this.initializeDropdowns();
            
            // Brand change event - FIXED
            brandSelect.addEventListener('change', (e) => {
                const brand = e.target.value;
                console.log('📱 Brand selected:', brand);
                this.populateModels(brand);
                this.updateQuoteButtonState();
            });
            
            // Model change event - FIXED
            modelSelect.addEventListener('change', (e) => {
                const model = e.target.value;
                console.log('📱 Model selected:', model);
                this.populateRepairs(model);
                this.updateQuoteButtonState();
            });
            
            // Repair change event
            repairSelect.addEventListener('change', () => {
                console.log('🔧 Repair selected:', repairSelect.value);
                this.updateQuoteButtonState();
            });
            
            // Calculate button click
            calculateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.calculateQuote();
            });
            
            console.log('✅ Fixed quote calculator setup complete');
        } else {
            console.error('❌ Quote calculator elements not found:', {
                brandSelect: !!brandSelect,
                modelSelect: !!modelSelect,
                repairSelect: !!repairSelect,
                calculateBtn: !!calculateBtn
            });
        }
    }

    initializeDropdowns() {
        const brandSelect = document.getElementById('calcBrand');
        const modelSelect = document.getElementById('calcModel');
        const repairSelect = document.getElementById('calcRepair');
        
        // Reset all dropdowns to initial state
        brandSelect.value = '';
        modelSelect.innerHTML = '<option value="">Select Brand First</option>';
        modelSelect.disabled = true;
        repairSelect.innerHTML = '<option value="">Select Model First</option>';
        repairSelect.disabled = true;
        
        this.updateQuoteButtonState();
    }

    populateModels(brand) {
        const modelSelect = document.getElementById('calcModel');
        const repairSelect = document.getElementById('calcRepair');
        
        console.log('🔄 Populating models for brand:', brand);
        
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
        
        console.log('✅ Models populated:', models.length, 'options');
    }

    populateRepairs(model) {
        const repairSelect = document.getElementById('calcRepair');
        
        console.log('🔄 Populating repairs for model:', model);
        
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
        console.log('✅ Repairs populated:', repairs.length, 'options');
    }

    getModelsByBrand(brand) {
        const models = {
            'Tecno': [
                'Spark Series (Spark 20/19/18)',
                'Camon Series (Camon 20/19/18)',
                'Phantom Series (Phantom X2/V)',
                'Pova Series (Pova 5/4/3)',
                'Pop Series (Pop 8/7/6)',
                'Tecno Megabook',
                'Other Tecno Model'
            ],
            'Infinix': [
                'Note Series (Note 40/30/20)',
                'Hot Series (Hot 40/30/20)',
                'Zero Series (Zero 30/20/X)',
                'Smart Series (Smart 8/7/6)',
                'Infinix GT Series',
                'Infinix Book',
                'Other Infinix Model'
            ],
            'Itel': [
                'Vision Series (Vision 5/4/3)',
                'S Series (S23/S22/S21)',
                'P Series (P40/P37/P32)',
                'A Series (A70/A60/A50)',
                'Itel Prime Series',
                'Itel Power Series',
                'Other Itel Model'
            ],
            'iPhone': [
                'iPhone 15 Series (15/15 Plus)',
                'iPhone 15 Pro Series (Pro/Pro Max)',
                'iPhone 14 Series (14/14 Plus)',
                'iPhone 14 Pro Series (Pro/Pro Max)',
                'iPhone 13 Series (13/13 Mini)',
                'iPhone 12 Series (12/12 Mini)',
                'iPhone 11 & Older Models'
            ],
            'Samsung': [
                'Galaxy S Series (S24/S23/S22)',
                'Galaxy S Ultra (S24/S23 Ultra)',
                'Galaxy A Series (A54/A34/A14)',
                'Galaxy M Series (M54/M34/M14)',
                'Galaxy Note Series',
                'Galaxy Z Fold/Flip',
                'Other Samsung Model'
            ],
            'Nokia': [
                'Nokia G Series (G42/G22)',
                'Nokia C Series (C32/C22)',
                'Nokia X Series (X30/X20)',
                'Nokia 5.4 / 6.2 / 7.2',
                'Nokia 3.4 / 2.4',
                'Nokia 1.4 / 1.3',
                'Other Nokia Model'
            ],
            'Xiaomi': [
                'Redmi Note Series (13/12/11)',
                'Redmi Series (13/12/11)',
                'Poco X Series (X6/X5/X4)',
                'Poco M Series (M6/M5/M4)',
                'Xiaomi 13/12/11 Series',
                'Xiaomi Pad Series',
                'Other Xiaomi Model'
            ],
            'Other': [
                'Oppo Reno Series',
                'Oppo A Series',
                'Realme Number Series',
                'Realme Narzo Series',
                'Vivo V Series',
                'Vivo Y Series',
                'Other Brand Model'
            ]
        };
        
        return models[brand] || ['Other Model'];
    }

    getRepairsByModel(model) {
        // All models get these basic repairs
        const basicRepairs = [
            { key: 'screen', name: 'Screen Replacement' },
            { key: 'battery', name: 'Battery Replacement' },
            { key: 'charging', name: 'Charging Port Repair' },
            { key: 'camera', name: 'Camera Repair' },
            { key: 'backglass', name: 'Back Glass Replacement' },
            { key: 'speaker', name: 'Speaker/Microphone Repair' }
        ];
        
        // High-end models get additional repairs
        const premiumRepairs = [
            ...basicRepairs,
            { key: 'water', name: 'Water Damage Repair' },
            { key: 'software', name: 'Software Issues' },
            { key: 'motherboard', name: 'Motherboard Repair' }
        ];
        
        // Determine if it's a premium model
        const premiumKeywords = ['Pro', 'Max', 'Ultra', 'Note', 'Phantom', 'Find', 'Mate', 'Reno', 'GT', 'Prime'];
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
            
            if (!brand) {
                calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Select Phone Brand';
            } else if (!model) {
                calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Select Phone Model';
            } else {
                calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Select Repair Type';
            }
        }
    }

    calculateQuote() {
        console.log('🧮 Calculating quote...');
        
        const brand = document.getElementById('calcBrand')?.value;
        const model = document.getElementById('calcModel')?.value;
        const repair = document.getElementById('calcRepair')?.value;
        
        console.log('📱 Selected:', { brand, model, repair });
        
        if (!brand || !model || !repair) {
            this.showNotification('Please select brand, model and repair type', 'error');
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
                const quote = this.getEnhancedQuotePrice(brand, model, repair);
                this.displayEnhancedQuote(quote, brand, model, repair);
                
                // Track quote calculation
                this.trackEvent('quote_calculated', `${brand}_${model}_${repair}`);
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

    getEnhancedQuotePrice(brand, model, repair) {
        // Price matrix implementation remains the same as your original
        // ... (keep your existing price matrix code here)
        
        // For now, return a default price
        return {
            min: 100,
            max: 300,
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
        const badgeElement = document.getElementById('resultBadge');
        const deviceBrand = document.getElementById('deviceBrand');
        const deviceModel = document.getElementById('deviceModel');
        const deviceRepair = document.getElementById('deviceRepair');
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
        
        // Update device info
        deviceBrand.textContent = brand;
        deviceModel.textContent = model;
        deviceRepair.textContent = this.getRepairDisplayName(repair);
        
        // Update WhatsApp link with detailed info
        if (whatsappBtn) {
            const repairName = this.getRepairDisplayName(repair);
            const message = `Hello! I'd like a quote for:\n\n📱 *Repair Details:*\n• Brand: ${brand}\n• Model: ${model}\n• Repair: ${repairName}\n• Estimated Cost: GH₵ ${quote.min}-${quote.max}\n• Time: ${quote.time}\n\nPlease provide exact pricing and availability.`;
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
                this.initializeDropdowns();
            };
        }
        
        // Scroll to result smoothly
        setTimeout(() => {
            resultDiv.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 300);
        
        console.log('✅ Enhanced quote displayed successfully:', quote);
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
            'speaker': 'Speaker/Microphone Repair',
            'motherboard': 'Motherboard Repair'
        };
        return names[repair] || repair;
    }

    // ... (rest of your existing methods remain the same)

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

    // ... (rest of your existing methods)

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
        const modelSelect = document.getElementById('calcModel');
        const repairSelect = document.getElementById('calcRepair');
        const calculateBtn = document.getElementById('calculateQuote');
        
        console.log('🧪 Element check:', {
            brandSelect: !!brandSelect,
            modelSelect: !!modelSelect,
            repairSelect: !!repairSelect,
            calculateBtn: !!calculateBtn
        });
        
        if (brandSelect && modelSelect) {
            console.log('✅ Quote calculator elements found');
            
            // Test dropdown functionality
            brandSelect.addEventListener('change', function() {
                console.log('🎯 Brand change test:', this.value);
            });
        } else {
            console.error('❌ Quote calculator elements missing');
        }
    }, 1000);
});