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
    // ENHANCED QUOTE CALCULATOR SYSTEM - FIXED
    // ================================

    setupQuoteCalculator() {
        console.log('🔧 Setting up enhanced quote calculator...');
        
        const brandSelect = document.getElementById('calcBrand');
        const modelSelect = document.getElementById('calcModel');
        const repairSelect = document.getElementById('calcRepair');
        const calculateBtn = document.getElementById('calculateQuote');
        
        if (brandSelect && modelSelect && repairSelect && calculateBtn) {
            console.log('✅ All quote calculator elements found');
            
            // Initialize dropdowns
            this.initializeDropdowns();
            
            // Brand change event
            brandSelect.addEventListener('change', (e) => {
                const brand = e.target.value;
                console.log('📱 Brand selected:', brand);
                this.populateModels(brand);
                this.updateQuoteButtonState();
            });
            
            // Model change event
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
            
            console.log('✅ Enhanced quote calculator setup complete');
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
        console.log('🧮 Calculating enhanced quote...');
        
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
        // Enhanced price matrix with model-specific pricing for all brands
        const priceMatrix = {
            'Tecno': {
                'Spark Series (Spark 20/19/18)': {
                    'screen': { min: 180, max: 280, time: '2-3 hours', urgency: 'Budget' },
                    'battery': { min: 70, max: 120, time: '1-2 hours', urgency: 'Fast' },
                    'charging': { min: 50, max: 90, time: '2-3 hours', urgency: 'Standard' },
                    'camera': { min: 80, max: 150, time: '2-3 hours', urgency: 'Expert' },
                    'backglass': { min: 60, max: 100, time: '1-2 hours', urgency: 'Standard' },
                    'speaker': { min: 40, max: 70, time: '1-2 hours', urgency: 'Fast' }
                },
                'Camon Series (Camon 20/19/18)': {
                    'screen': { min: 220, max: 350, time: '2-3 hours', urgency: 'Popular' },
                    'battery': { min: 90, max: 150, time: '1-2 hours', urgency: 'Fast' },
                    'charging': { min: 65, max: 110, time: '2-3 hours', urgency: 'Standard' },
                    'camera': { min: 100, max: 200, time: '2-3 hours', urgency: 'Expert' },
                    'backglass': { min: 70, max: 130, time: '1-2 hours', urgency: 'Standard' },
                    'speaker': { min: 45, max: 80, time: '1-2 hours', urgency: 'Fast' }
                },
                'Phantom Series (Phantom X2/V)': {
                    'screen': { min: 320, max: 500, time: '2-4 hours', urgency: 'Premium' },
                    'battery': { min: 120, max: 200, time: '1-2 hours', urgency: 'Fast' },
                    'charging': { min: 85, max: 150, time: '2-3 hours', urgency: 'Expert' },
                    'camera': { min: 140, max: 280, time: '2-4 hours', urgency: 'Expert' },
                    'backglass': { min: 100, max: 180, time: '2-3 hours', urgency: 'Premium' },
                    'speaker': { min: 60, max: 100, time: '1-2 hours', urgency: 'Fast' }
                },
                'Pova Series (Pova 5/4/3)': {
                    'screen': { min: 200, max: 320, time: '2-3 hours', urgency: 'Popular' },
                    'battery': { min: 80, max: 140, time: '1-2 hours', urgency: 'Fast' },
                    'charging': { min: 60, max: 100, time: '2-3 hours', urgency: 'Standard' },
                    'camera': { min: 90, max: 170, time: '2-3 hours', urgency: 'Expert' },
                    'backglass': { min: 65, max: 110, time: '1-2 hours', urgency: 'Standard' }
                },
                'Pop Series (Pop 8/7/6)': {
                    'screen': { min: 150, max: 240, time: '2-3 hours', urgency: 'Budget' },
                    'battery': { min: 60, max: 100, time: '1-2 hours', urgency: 'Fast' },
                    'charging': { min: 45, max: 80, time: '2-3 hours', urgency: 'Standard' },
                    'camera': { min: 70, max: 120, time: '2-3 hours', urgency: 'Expert' },
                    'backglass': { min: 50, max: 85, time: '1-2 hours', urgency: 'Standard' }
                }
            },
            'Infinix': {
                'Note Series (Note 40/30/20)': {
                    'screen': { min: 200, max: 320, time: '2-3 hours', urgency: 'Popular' },
                    'battery': { min: 85, max: 140, time: '1-2 hours', urgency: 'Fast' },
                    'charging': { min: 60, max: 110, time: '2-3 hours', urgency: 'Standard' },
                    'camera': { min: 95, max: 180, time: '2-3 hours', urgency: 'Expert' },
                    'backglass': { min: 70, max: 120, time: '1-2 hours', urgency: 'Standard' }
                },
                'Hot Series (Hot 40/30/20)': {
                    'screen': { min: 170, max: 270, time: '2-3 hours', urgency: 'Budget' },
                    'battery': { min: 75, max: 120, time: '1-2 hours', urgency: 'Fast' },
                    'charging': { min: 55, max: 95, time: '2-3 hours', urgency: 'Standard' },
                    'camera': { min: 80, max: 150, time: '2-3 hours', urgency: 'Expert' },
                    'backglass': { min: 60, max: 100, time: '1-2 hours', urgency: 'Standard' }
                },
                'Zero Series (Zero 30/20/X)': {
                    'screen': { min: 280, max: 450, time: '2-4 hours', urgency: 'Premium' },
                    'battery': { min: 110, max: 180, time: '1-2 hours', urgency: 'Fast' },
                    'charging': { min: 80, max: 140, time: '2-3 hours', urgency: 'Expert' },
                    'camera': { min: 130, max: 250, time: '2-4 hours', urgency: 'Expert' },
                    'backglass': { min: 90, max: 160, time: '2-3 hours', urgency: 'Premium' }
                }
            },
            'Itel': {
                'Vision Series (Vision 5/4/3)': {
                    'screen': { min: 120, max: 190, time: '2-3 hours', urgency: 'Budget' },
                    'battery': { min: 50, max: 80, time: '1-2 hours', urgency: 'Fast' },
                    'charging': { min: 40, max: 65, time: '2-3 hours', urgency: 'Standard' },
                    'camera': { min: 60, max: 100, time: '2-3 hours', urgency: 'Expert' },
                    'backglass': { min: 45, max: 70, time: '1-2 hours', urgency: 'Standard' }
                },
                'S Series (S23/S22/S21)': {
                    'screen': { min: 140, max: 220, time: '2-3 hours', urgency: 'Standard' },
                    'battery': { min: 60, max: 95, time: '1-2 hours', urgency: 'Fast' },
                    'charging': { min: 45, max: 75, time: '2-3 hours', urgency: 'Standard' },
                    'camera': { min: 70, max: 120, time: '2-3 hours', urgency: 'Expert' },
                    'backglass': { min: 50, max: 85, time: '1-2 hours', urgency: 'Standard' }
                }
            },
            'iPhone': {
                'iPhone 15 Pro Series (Pro/Pro Max)': {
                    'screen': { min: 900, max: 1500, time: '3-5 hours', urgency: 'Premium' },
                    'battery': { min: 280, max: 450, time: '2-3 hours', urgency: 'Standard' },
                    'charging': { min: 180, max: 320, time: '2-4 hours', urgency: 'Expert' },
                    'camera': { min: 400, max: 750, time: '3-5 hours', urgency: 'Expert' },
                    'backglass': { min: 350, max: 600, time: '2-4 hours', urgency: 'Premium' }
                },
                'iPhone 15 Series (15/15 Plus)': {
                    'screen': { min: 700, max: 1100, time: '3-4 hours', urgency: 'Premium' },
                    'battery': { min: 220, max: 350, time: '2-3 hours', urgency: 'Standard' },
                    'charging': { min: 150, max: 250, time: '2-3 hours', urgency: 'Expert' },
                    'camera': { min: 320, max: 600, time: '3-4 hours', urgency: 'Expert' },
                    'backglass': { min: 280, max: 480, time: '2-3 hours', urgency: 'Premium' }
                },
                'iPhone 14 Series (14/14 Plus)': {
                    'screen': { min: 600, max: 1000, time: '2-4 hours', urgency: 'Popular' },
                    'battery': { min: 200, max: 320, time: '2-3 hours', urgency: 'Standard' },
                    'charging': { min: 130, max: 220, time: '2-3 hours', urgency: 'Expert' },
                    'camera': { min: 280, max: 500, time: '2-4 hours', urgency: 'Expert' },
                    'backglass': { min: 220, max: 400, time: '2-3 hours', urgency: 'Standard' }
                }
            },
            'Samsung': {
                'Galaxy S Ultra (S24/S23 Ultra)': {
                    'screen': { min: 850, max: 1400, time: '3-4 hours', urgency: 'Premium' },
                    'battery': { min: 260, max: 420, time: '2-3 hours', urgency: 'Standard' },
                    'charging': { min: 170, max: 300, time: '2-4 hours', urgency: 'Expert' },
                    'camera': { min: 380, max: 700, time: '3-4 hours', urgency: 'Expert' },
                    'backglass': { min: 320, max: 550, time: '2-3 hours', urgency: 'Premium' }
                },
                'Galaxy S Series (S24/S23/S22)': {
                    'screen': { min: 650, max: 1000, time: '2-4 hours', urgency: 'Popular' },
                    'battery': { min: 210, max: 330, time: '2-3 hours', urgency: 'Standard' },
                    'charging': { min: 140, max: 240, time: '2-3 hours', urgency: 'Expert' },
                    'camera': { min: 300, max: 550, time: '2-4 hours', urgency: 'Expert' },
                    'backglass': { min: 240, max: 420, time: '2-3 hours', urgency: 'Standard' }
                },
                'Galaxy A Series (A54/A34/A14)': {
                    'screen': { min: 350, max: 550, time: '2-3 hours', urgency: 'Popular' },
                    'battery': { min: 120, max: 200, time: '1-2 hours', urgency: 'Fast' },
                    'charging': { min: 90, max: 160, time: '2-3 hours', urgency: 'Standard' },
                    'camera': { min: 150, max: 280, time: '2-3 hours', urgency: 'Expert' },
                    'backglass': { min: 100, max: 180, time: '1-2 hours', urgency: 'Standard' }
                }
            },
            'Default': {
                'screen': { min: 200, max: 350, time: '2-3 hours', urgency: 'Standard' },
                'battery': { min: 80, max: 140, time: '1-2 hours', urgency: 'Fast' },
                'charging': { min: 60, max: 110, time: '2-3 hours', urgency: 'Standard' },
                'camera': { min: 100, max: 200, time: '2-3 hours', urgency: 'Expert' },
                'backglass': { min: 70, max: 130, time: '1-2 hours', urgency: 'Standard' },
                'speaker': { min: 50, max: 90, time: '1-2 hours', urgency: 'Fast' },
                'water': { min: 150, max: 300, time: '1-2 days', urgency: 'Complex' },
                'software': { min: 40, max: 80, time: '1-2 hours', urgency: 'Fast' },
                'motherboard': { min: 250, max: 600, time: '2-3 days', urgency: 'Expert' }
            }
        };

        // Get price for specific model or use default
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
            time: priceData.time,
            urgency: priceData.urgency,
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
            
            // Send to WhatsApp
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

    createBooking(code, data) {
        return {
            code: code,
            ...data,
            status: 'received',
            progress: 10,
            createdAt: new Date().toISOString(),
            steps: {
                received: { 
                    time: new Date().toLocaleString('en-GB', { 
                        weekday: 'short', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    }), 
                    completed: true 
                },
                diagnosis: { time: 'Pending', completed: false },
                parts: { time: 'Pending', completed: false },
                repair: { time: 'Pending', completed: false },
                testing: { time: 'Pending', completed: false },
                quality: { time: 'Pending', completed: false },
                ready: { time: 'Pending', completed: false }
            },
            notes: [
                `Device received: ${data.device}`,
                `Issue reported: ${data.issue}`
            ],
            estimatedCompletion: this.calculateEstimatedCompletion(data.urgency)
        };
    }

    calculateEstimatedCompletion(urgency) {
        const now = new Date();
        const completionTimes = {
            'emergency': 6, // hours
            'express': 24, // hours
            'standard': 72 // hours
        };
        
        const hours = completionTimes[urgency] || 72;
        const completionDate = new Date(now.getTime() + hours * 60 * 60 * 1000);
        
        return completionDate.toLocaleString('en-GB', {
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    sendBookingToWhatsApp(booking) {
        console.log('📤 Sending booking to WhatsApp...', booking);
        
        // Format the message
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
• ⏰ *Estimated Completion:* ${booking.estimatedCompletion}

🔧 *ISSUE DESCRIPTION:*
${booking.issue}

📍 *ACTION REQUIRED:*
• Contact customer within 30 minutes
• Arrange hostel pickup
• Confirm repair timeline

💬 *I'm ready for pickup!*`;

        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/233246912468?text=${encodeURIComponent(message)}`;
        
        console.log('🔗 WhatsApp URL created:', whatsappUrl);
        
        // Open WhatsApp
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

                    <div style="background: rgba(245, 158, 11, 0.1); padding: 15px; border-radius: 12px; margin-bottom: 20px; border: 1px solid rgba(245, 158, 11, 0.3);">
                        <h4 style="color: #f59e0b; margin-bottom: 10px; font-size: 16px;">
                            <i class="fas fa-info-circle"></i> Track Your Repair
                        </h4>
                        <p style="color: #cbd5e1; font-size: 14px; margin: 0;">
                            Use code <strong style="color: #f59e0b;">${booking.code}</strong> to check repair status anytime on our website
                        </p>
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

    generateBookingCode() {
        const counter = parseInt(localStorage.getItem('bookingCounter') || '0') + 1;
        localStorage.setItem('bookingCounter', counter.toString());
        return `CF-${new Date().getFullYear()}-${counter.toString().padStart(4, '0')}`;
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
    // ENHANCED STATUS CHECKER SYSTEM
    // ================================

    setupStatusChecker() {
        const checkBtn = document.getElementById('checkStatus');
        console.log('🔧 Setting up enhanced status checker...', checkBtn);
        
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
                exists: true,
                status: 'In Progress',
                progress: 60,
                device: 'iPhone 13 Pro',
                customerName: 'Kwame Asante',
                issue: 'Screen replacement - cracked display',
                urgency: 'express',
                steps: {
                    received: { time: 'Today, 10:30 AM', completed: true },
                    diagnosis: { time: 'Today, 11:15 AM', completed: true },
                    parts: { time: 'Parts ordered - arriving tomorrow', completed: false },
                    repair: { time: 'In Progress', completed: false },
                    testing: { time: 'Pending', completed: false },
                    quality: { time: 'Pending', completed: false },
                    ready: { time: 'Pending', completed: false }
                },
                notes: [
                    'Original screen ordered',
                    'Minor frame damage noted - will fix during repair',
                    'Battery health checked - 85% (good condition)'
                ],
                estimatedCompletion: 'Tomorrow, 3:00 PM',
                isDemo: true
            },
            'CF-2024-1924': {
                exists: true,
                status: 'Completed',
                progress: 100,
                device: 'Samsung Galaxy S21',
                customerName: 'Abena Kumi',
                issue: 'Battery replacement - draining quickly',
                urgency: 'standard',
                steps: {
                    received: { time: 'Yesterday, 9:00 AM', completed: true },
                    diagnosis: { time: 'Yesterday, 9:45 AM', completed: true },
                    parts: { time: 'Yesterday, 10:15 AM', completed: true },
                    repair: { time: 'Yesterday, 10:30 AM', completed: true },
                    testing: { time: 'Yesterday, 2:00 PM', completed: true },
                    quality: { time: 'Yesterday, 2:15 PM', completed: true },
                    ready: { time: 'Yesterday, 3:00 PM', completed: true }
                },
                notes: [
                    'Original Samsung battery installed',
                    'Device cleaned internally',
                    'Charging port checked - working perfectly',
                    '6-month warranty provided'
                ],
                estimatedCompletion: 'Completed - Yesterday, 3:00 PM',
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
                    <div class="status-header error">
                        <div class="status-code">${code}</div>
                        <div class="status-error">
                            <i class="fas fa-exclamation-triangle"></i>
                            Repair Code Not Found
                        </div>
                    </div>
                    <p style="color: var(--gray-400); text-align: center; margin-bottom: var(--space-lg);">
                        Please check your code and try again. If you just booked, allow 30 minutes for processing.
                    </p>
                    <div style="text-align: center;">
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
                    <div class="status-main-info">
                        <div class="status-code">${status.code}</div>
                        <div class="status-badge ${statusClass}">${status.status}</div>
                        ${status.isDemo ? '<div class="demo-badge"><i class="fas fa-info-circle"></i> Demo Repair</div>' : ''}
                    </div>
                    
                    <div class="customer-info">
                        <div class="info-item">
                            <strong>Customer:</strong> ${status.customerName}
                        </div>
                        <div class="info-item">
                            <strong>Device:</strong> ${status.device}
                        </div>
                        <div class="info-item">
                            <strong>Issue:</strong> ${status.issue}
                        </div>
                        <div class="info-item">
                            <strong>Urgency:</strong> ${this.getUrgencyDisplay(status.urgency)}
                        </div>
                    </div>
                </div>

                <!-- Progress Bar -->
                <div class="progress-section">
                    <div class="progress-header">
                        <span>Overall Progress</span>
                        <span class="progress-percent">${progressPercent}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercent};"></div>
                    </div>
                </div>

                <!-- Estimated Completion -->
                ${status.estimatedCompletion ? `
                    <div class="completion-estimate">
                        <i class="fas fa-clock"></i>
                        <strong>Estimated Completion:</strong> ${status.estimatedCompletion}
                    </div>
                ` : ''}

                <!-- Repair Timeline -->
                <div class="timeline-section">
                    <h4>Repair Progress</h4>
                    <div class="status-timeline">
                        ${this.generateTimelineHTML(status.steps)}
                    </div>
                </div>

                <!-- Technician Notes -->
                ${status.notes && status.notes.length > 0 ? `
                    <div class="technician-notes">
                        <h4>Technician Notes</h4>
                        <div class="notes-list">
                            ${status.notes.map(note => `
                                <div class="note-item">
                                    <i class="fas fa-sticky-note"></i>
                                    <span>${note}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Action Buttons -->
                <div class="status-actions">
                    <a href="https://wa.me/233246912468" class="btn btn-primary hover-scale">
                        <i class="fab fa-whatsapp"></i> Message Technician
                    </a>
                    <button class="btn btn-outline" onclick="this.innerHTML='<i class=\\'fas fa-sync-alt fa-spin\\'></i> Refreshing...'; setTimeout(()=>window.campusFixSystems.checkRepairStatus(), 1000)">
                        <i class="fas fa-sync-alt"></i> Refresh Status
                    </button>
                </div>

                <!-- Help Text -->
                <div class="status-help">
                    <p><i class="fas fa-info-circle"></i> Status updates every 2 hours. Contact us if you need immediate assistance.</p>
                </div>
            </div>
        `;
    }

    generateTimelineHTML(steps) {
        const stepConfig = [
            { key: 'received', label: 'Device Received', icon: 'fa-box' },
            { key: 'diagnosis', label: 'Diagnosis Complete', icon: 'fa-search' },
            { key: 'parts', label: 'Parts Ready', icon: 'fa-cogs' },
            { key: 'repair', label: 'Repair in Progress', icon: 'fa-tools' },
            { key: 'testing', label: 'Quality Testing', icon: 'fa-check-double' },
            { key: 'quality', label: 'Final Quality Check', icon: 'fa-award' },
            { key: 'ready', label: 'Ready for Pickup', icon: 'fa-phone' }
        ];

        return stepConfig.map((step, index) => {
            const stepData = steps[step.key];
            const isCompleted = stepData?.completed;
            const isCurrent = stepData?.time === 'In Progress' || 
                             (stepData?.time && stepData?.time.includes('Progress'));
            
            let markerClass = '';
            let statusText = '';
            
            if (isCompleted) {
                markerClass = 'completed';
                statusText = `<div class="step-status completed">Completed</div>`;
            } else if (isCurrent) {
                markerClass = 'current';
                statusText = `<div class="step-status current">In Progress</div>`;
            } else {
                markerClass = 'pending';
                statusText = `<div class="step-status pending">Pending</div>`;
            }

            return `
                <div class="timeline-step ${markerClass}">
                    <div class="step-marker ${markerClass}">
                        <i class="fas ${step.icon}"></i>
                    </div>
                    <div class="step-content">
                        <div class="step-label">${step.label}</div>
                        <div class="step-time">${stepData?.time || 'Waiting...'}</div>
                        ${statusText}
                    </div>
                </div>
            `;
        }).join('');
    }

    // ================================
    // ADMIN STATUS UPDATE SYSTEM
    // ================================

    updateRepairStatus(code, updates) {
        const bookings = JSON.parse(localStorage.getItem('campusFixBookings') || '{}');
        const booking = bookings[code];
        
        if (booking) {
            // Update the booking with new status
            Object.assign(booking, updates);
            bookings[code] = booking;
            localStorage.setItem('campusFixBookings', JSON.stringify(bookings));
            
            console.log('✅ Repair status updated:', code, updates);
            this.showNotification(`Repair ${code} status updated successfully!`, 'success');
            return true;
        }
        
        this.showNotification(`Repair code ${code} not found!`, 'error');
        return false;
    }

    // Example status update functions
    markDiagnosisComplete(code, diagnosisNotes = []) {
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
            },
            notes: [
                'Diagnosis completed',
                ...diagnosisNotes
            ]
        };
        return this.updateRepairStatus(code, updates);
    }

    markRepairInProgress(code, repairNotes = []) {
        const updates = {
            status: 'In Progress',
            progress: 60,
            steps: {
                received: { time: 'Completed', completed: true },
                diagnosis: { time: 'Completed', completed: true },
                parts: { time: 'Parts available', completed: true },
                repair: { time: 'In Progress', completed: false },
                testing: { time: 'Pending', completed: false },
                quality: { time: 'Pending', completed: false },
                ready: { time: 'Pending', completed: false }
            },
            notes: [
                'Repair work started',
                ...repairNotes
            ]
        };
        return this.updateRepairStatus(code, updates);
    }

    markRepairCompleted(code, completionNotes = []) {
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
            },
            notes: [
                'Repair completed successfully',
                'Device ready for pickup',
                ...completionNotes
            ],
            estimatedCompletion: 'Completed - ' + new Date().toLocaleString('en-GB')
        };
        return this.updateRepairStatus(code, updates);
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
        } else {
            console.error('❌ Quote calculator elements missing');
        }
    }, 1000);
});

// Admin functions for easy status updates
window.updateRepairStatus = function(code, status, notes = []) {
    return window.campusFixSystems.updateRepairStatus(code, { status, notes });
};

window.markDiagnosisComplete = function(code, notes = []) {
    return window.campusFixSystems.markDiagnosisComplete(code, notes);
};

window.markRepairInProgress = function(code, notes = []) {
    return window.campusFixSystems.markRepairInProgress(code, notes);
};

window.markRepairCompleted = function(code, notes = []) {
    return window.campusFixSystems.markRepairCompleted(code, notes);
};