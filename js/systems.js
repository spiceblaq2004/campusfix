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