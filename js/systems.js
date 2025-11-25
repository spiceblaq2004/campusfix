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
            this.updateRepairOptions();
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

updateRepairOptions() {
    const brand = document.getElementById('calcBrand')?.value;
    const repairSelect = document.getElementById('calcRepair');
    
    if (!repairSelect) return;
    
    // Reset to default
    repairSelect.innerHTML = `
        <option value="">Select Repair Type</option>
        <option value="screen">Screen Replacement</option>
        <option value="battery">Battery Replacement</option>
        <option value="charging">Charging Port</option>
        <option value="camera">Camera Repair</option>
        <option value="water">Water Damage</option>
        <option value="software">Software Issues</option>
        <option value="backglass">Back Glass</option>
        <option value="speaker">Speaker/Microphone</option>
    `;
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