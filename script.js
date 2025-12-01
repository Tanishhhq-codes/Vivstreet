// Wait for window to load
window.addEventListener('load', () => {
    // 1. Remove Preloader after 1.5 seconds
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hide-preloader');
    }, 1500);

    // 2. Custom Cursor Logic (only for non-touch devices)
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    // Check if device supports touch
    const isTouchDevice = ('ontouchstart' in window) || 
                          (navigator.maxTouchPoints > 0) || 
                          (navigator.msMaxTouchPoints > 0);
    
    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            // Move the small dot instantly
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Move the circle with a slight delay (smooth effect)
            setTimeout(() => {
                follower.style.left = (e.clientX - 20) + 'px'; // -20 to center it (half width)
                follower.style.top = (e.clientY - 20) + 'px';
            }, 50);
        });
    }

    // 3. Form Handling
    const form = document.getElementById('subscribeForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('successMessage');
    const emailInput = document.getElementById('emailInput');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Prevent multiple submissions
        if (submitBtn.disabled) return;
        submitBtn.disabled = true;
        
        // Animation for button
        submitBtn.style.transform = "translateX(50px)";
        submitBtn.style.opacity = "0";

        setTimeout(() => {
            form.style.display = 'none';
            successMsg.classList.remove('hidden');
        }, 500);
        
        // Log for testing
        console.log("Captured: " + emailInput.value);
    });
    
    // 4. Prevent zoom on input focus for iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        }
    }
    
    // 5. Handle orientation change
    window.addEventListener('orientationchange', () => {
        // Force a small delay to allow the browser to adjust
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    });
});