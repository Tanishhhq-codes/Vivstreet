// Wait for window to load
window.addEventListener('load', () => {
    // 1. Remove Preloader after 1.5 seconds
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hide-preloader');
    }, 1500);

    // 2. Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

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

    // 3. Form Handling
    const form = document.getElementById('subscribeForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('successMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animation for button
        submitBtn.style.transform = "translateX(50px)";
        submitBtn.style.opacity = "0";

        setTimeout(() => {
            form.style.display = 'none';
            successMsg.classList.remove('hidden');
        }, 500);
        
        // Log for testing
        console.log("Captured: " + document.getElementById('emailInput').value);
    });
});