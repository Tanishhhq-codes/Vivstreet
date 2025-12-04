// Wait for window to load
window.addEventListener('load', () => {
    
    // =========================================
    // 1. PRELOADER LOGIC
    // =========================================
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if(preloader) preloader.classList.add('hide-preloader');
    }, 1500);

    // =========================================
    // 2. MODAL (GLASS OVERLAY) LOGIC
    // =========================================
    const openBtn = document.getElementById('openFormBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('modalOverlay');

    // Function to close modal
    const closeModal = () => {
        if(modal) modal.classList.remove('active');
    };

    // Open Modal
    if(openBtn) {
        openBtn.addEventListener('click', () => {
            if(modal) modal.classList.add('active');
        });
    }

    // Close Modal (Click X)
    if(closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close Modal (Click Outside the glass card)
    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close Modal (Press Escape Key)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // =========================================
    // 3. FORM HANDLING & GOOGLE SHEETS
    // =========================================
    const form = document.getElementById('subscribeForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('successMessage');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('phoneInput');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get values trimming whitespace
            const email = emailInput.value.trim();
            const phone = phoneInput.value.trim();

            // --- VALIDATION: Check if BOTH are empty ---
            if (!email && !phone) {
                // Shake button / Feedback
                const originalText = submitBtn.innerText;
                submitBtn.innerText = "FILL ONE FIELD";
                submitBtn.style.color = "var(--accent)"; // Red color
                
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.color = "black"; // Back to normal
                }, 1500);
                return; // Stop here
            }
            
            // Prevent multiple clicks
            if (submitBtn.disabled) return;
            
            // Lock the button
            submitBtn.disabled = true;
            submitBtn.innerText = "PROCESSING..."; 
            
            // --- GOOGLE SHEETS CONNECTION START ---
            
            // 1. Prepare Data
            const data = new FormData();
            data.append('email', email);
            data.append('phone', phone);
            // We append a date timestamp in the script, so no need to send it here.

            // 2. Send Data to Google Script
            // ⚠️ PASTE YOUR GOOGLE DEPLOYMENT URL INSIDE THESE QUOTES ⚠️
            const scriptURL = 'https://script.google.com/macros/s/AKfycbxiCR1aiMtols1-8oJ618TeGQsg-2I0LX2UigdksFQlQr0DMk_Ui8ocQ-uvmwVjSNf_/exec';

            fetch(scriptURL, { method: 'POST', body: data })
                .then(response => {
                    // Success!
                    console.log('Success!', response);
                    
                    // Hide Form & Show Success Message
                    form.style.display = 'none'; 
                    successMsg.classList.remove('hidden');
                    
                    // Reset everything after 3 seconds (ready for next user)
                    setTimeout(() => {
                        form.reset();
                        form.style.display = 'flex'; // Bring form back (but keep modal closed)
                        successMsg.classList.add('hidden');
                        submitBtn.disabled = false;
                        submitBtn.innerText = "SUBMIT";
                        closeModal(); // Close the modal automatically
                    }, 3000);
                })
                .catch(error => {
                    // Error Handling
                    console.error('Error!', error.message);
                    submitBtn.innerText = "ERROR - TRY AGAIN";
                    submitBtn.style.color = "var(--accent)";
                    
                    // Reset button after error
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerText = "SUBMIT";
                        submitBtn.style.color = "black";
                    }, 2000);
                });
            // --- GOOGLE SHEETS CONNECTION END ---
        });
    }
    
    // =========================================
    // 4. MOBILE OPTIMIZATIONS
    // =========================================
    
    // Prevent zoom on input focus for iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        }
    }
    
    // Handle orientation change (fix scroll bugs)
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    });
});