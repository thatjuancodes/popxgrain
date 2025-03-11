let lastScroll = 0;
let isAutoScrolling = false;
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const heroHeight = hero.offsetHeight;

// Show navigation by default, but without background
header.classList.add('nav-visible');

// Function to update header background
function updateHeaderBackground() {
    const currentScroll = window.pageYOffset;
    
    // Add/remove background based on scroll position
    if (currentScroll > 0) {
        header.classList.add('with-background');
    } else {
        header.classList.remove('with-background');
    }

    // Hide header in hero section
    if (currentScroll <= heroHeight - 100) {
        header.classList.add('nav-hidden');
        return;
    }

    // If auto-scrolling is happening, keep the header visible
    if (isAutoScrolling) {
        header.classList.remove('nav-hidden');
        header.classList.add('nav-visible');
        return;
    }

    // Manual scrolling behavior
    if (currentScroll > lastScroll) {
        // Scrolling down - show header
        header.classList.remove('nav-hidden');
        header.classList.add('nav-visible');
    } else {
        // Scrolling up - hide header
        header.classList.add('nav-hidden');
        header.classList.remove('nav-visible');
    }

    lastScroll = currentScroll;
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            isAutoScrolling = true;
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            // Show header when clicking a link
            header.classList.remove('nav-hidden');
            header.classList.add('nav-visible');
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Reset the auto-scrolling flag after the scroll animation completes
            setTimeout(() => {
                isAutoScrolling = false;
            }, 1000); // Adjust this value based on your scroll animation duration
        }
    });
});

// Add scroll event listener with requestAnimationFrame for better performance
window.addEventListener('scroll', () => {
    requestAnimationFrame(updateHeaderBackground);
}); 