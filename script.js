let lastScroll = 0;
let isAutoScrolling = false;
let isInHeroSection = true;
let isTransitioningToAbout = false;
let isTransitioningToHero = false;
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const about = document.querySelector('#about');
const heroHeight = hero.offsetHeight;

// Show navigation by default, but without background
header.classList.add('nav-visible');

// Function to smoothly scroll to about section
function scrollToAbout() {
    isAutoScrolling = true;
    isTransitioningToAbout = true;
    isTransitioningToHero = false;
    
    const headerHeight = header.offsetHeight;
    const targetPosition = about.offsetTop - headerHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });

    // Reset auto-scrolling flag after animation
    setTimeout(() => {
        isAutoScrolling = false;
        isInHeroSection = false;
        isTransitioningToAbout = false;
    }, 1000);
}

// Function to smoothly scroll to hero section
function scrollToHero() {
    isAutoScrolling = true;
    isTransitioningToHero = true;
    isTransitioningToAbout = false;
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Reset auto-scrolling flag after animation
    setTimeout(() => {
        isAutoScrolling = false;
        isInHeroSection = true;
        isTransitioningToHero = false;
    }, 1000);
}

// Function to update header background
function updateHeaderBackground() {
    const currentScroll = window.pageYOffset;
    
    // Add/remove background based on scroll position
    if (currentScroll > 0) {
        header.classList.add('with-background');
    } else {
        header.classList.remove('with-background');
    }

    // Update hero section state
    if (currentScroll <= 50) {
        isInHeroSection = true;
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

// Handle wheel events for scrolling between hero and about
window.addEventListener('wheel', (e) => {
    // Prevent any scroll if transitioning
    if (isTransitioningToAbout || isTransitioningToHero) {
        e.preventDefault();
        return;
    }

    const currentScroll = window.pageYOffset;
    const isNearHeroAboutBoundary = currentScroll < heroHeight + 100 && currentScroll > 0;

    // If in hero section and scrolling down, transition to about
    if (isInHeroSection && e.deltaY > 0) {
        e.preventDefault();
        scrollToAbout();
    }
    // If near hero-about boundary and scrolling up, transition to hero
    else if (isNearHeroAboutBoundary && e.deltaY < 0) {
        e.preventDefault();
        scrollToHero();
    }
}, { passive: false });

// Handle touch events for mobile
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchmove', (e) => {
    // Prevent any touch move if transitioning
    if (isTransitioningToAbout || isTransitioningToHero) {
        e.preventDefault();
        return;
    }

    const currentScroll = window.pageYOffset;
    const isNearHeroAboutBoundary = currentScroll < heroHeight + 100 && currentScroll > 0;
    const touchY = e.touches[0].clientY;
    const isScrollingUp = touchY > touchStartY;
    const isScrollingDown = touchY < touchStartY;

    if ((isInHeroSection && isScrollingDown) || (isNearHeroAboutBoundary && isScrollingUp)) {
        e.preventDefault();
        if (isScrollingDown) {
            scrollToAbout();
        } else {
            scrollToHero();
        }
    }
}, { passive: false });

// Prevent scroll during transition
window.addEventListener('scroll', (e) => {
    if (isTransitioningToAbout) {
        const headerHeight = header.offsetHeight;
        const targetPosition = about.offsetTop - headerHeight;
        window.scrollTo(0, targetPosition);
    } else if (isTransitioningToHero) {
        window.scrollTo(0, 0);
    }
});

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
            }, 1000);
        }
    });
});

// Add scroll event listener with requestAnimationFrame for better performance
window.addEventListener('scroll', () => {
    requestAnimationFrame(updateHeaderBackground);
}); 