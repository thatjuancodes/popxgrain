// Text animation
let leftIndex = 0;
let rightIndex = 0;
const wordsBefore = document.querySelectorAll('.word-before');
const wordsAfter = document.querySelectorAll('.word-after');
const leftWordExposureTime = 3000; // Left words visible for exactly 3 seconds
const rightWordExposureTime = 2900; // Right words visible for exactly 2.9 seconds
const leftFadeTime = 800; // 0.8s for fade transitions
const rightFadeTime = 700; // 0.7s for fade transitions

function updateLeftText() {
    // Remove any existing classes from previous words
    wordsBefore.forEach(word => word.classList.remove('active', 'fade-out'));

    // Show new left word
    requestAnimationFrame(() => {
        wordsBefore[leftIndex].classList.add('active');
    });

    // Start fade-out after exposure time
    setTimeout(() => {
        wordsBefore[leftIndex].classList.add('fade-out');
        
        // Wait for fade-out to complete before showing next word
        setTimeout(() => {
            leftIndex = (leftIndex + 1) % wordsBefore.length;
            updateLeftText();
        }, leftFadeTime);
    }, leftWordExposureTime);
}

function updateRightText() {
    // Remove any existing classes from previous words
    wordsAfter.forEach(word => word.classList.remove('active', 'fade-out'));

    // Show new right word
    requestAnimationFrame(() => {
        wordsAfter[rightIndex].classList.add('active');
    });

    // Start fade-out after exposure time
    setTimeout(() => {
        wordsAfter[rightIndex].classList.add('fade-out');
        
        // Wait for fade-out to complete before showing next word
        setTimeout(() => {
            rightIndex = (rightIndex + 1) % wordsAfter.length;
            updateRightText();
        }, rightFadeTime);
    }, rightWordExposureTime);
}

// Show initial words immediately
wordsBefore[0].classList.add('active');
wordsAfter[0].classList.add('active');

// Start the animation cycles after initial words have been shown
setTimeout(updateLeftText, leftWordExposureTime);
setTimeout(updateRightText, rightWordExposureTime);

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
    if (isTransitioningToAbout) return;
    
    isTransitioningToAbout = true;
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
        isTransitioningToAbout = false;
        isInHeroSection = false;
    }, 1000);
}

// Function to smoothly scroll to hero section
function scrollToHero() {
    if (isTransitioningToHero) return;
    
    isTransitioningToHero = true;
    const heroSection = document.getElementById('hero');
    heroSection.scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
        isTransitioningToHero = false;
        isInHeroSection = true;
    }, 1000);
}

// Function to update header background
function updateHeaderBackground() {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        header.classList.add('with-background');
    } else {
        header.classList.remove('with-background');
    }

    // Update hero section state
    if (scrollPosition <= 50) {
        isInHeroSection = true;
    }

    // Hide header in hero section
    if (scrollPosition <= heroHeight - 100) {
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
    if (scrollPosition > lastScroll) {
        // Scrolling down - show header
        header.classList.remove('nav-hidden');
        header.classList.add('nav-visible');
    } else {
        // Scrolling up - hide header
        header.classList.add('nav-hidden');
        header.classList.remove('nav-visible');
    }

    lastScroll = scrollPosition;
}

// Handle scroll arrow click
document.querySelector('.scroll-arrow').addEventListener('click', (e) => {
    e.preventDefault();
    scrollToAbout();
});

// Handle wheel events for scrolling between hero and about
window.addEventListener('wheel', (e) => {
    if (isTransitioningToAbout || isTransitioningToHero) {
        e.preventDefault();
        return;
    }

    if (isInHeroSection && e.deltaY > 0) {
        e.preventDefault();
        scrollToAbout();
    } else if (!isInHeroSection && window.scrollY === 0 && e.deltaY < 0) {
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
    if (isTransitioningToAbout || isTransitioningToHero) {
        e.preventDefault();
        return;
    }

    const touchCurrentY = e.touches[0].clientY;
    const deltaY = touchStartY - touchCurrentY;

    if (isInHeroSection && deltaY > 0) {
        e.preventDefault();
        scrollToAbout();
    } else if (!isInHeroSection && window.scrollY === 0 && deltaY < 0) {
        e.preventDefault();
        scrollToHero();
    }
}, { passive: false });

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

// Initialize header state
updateHeaderBackground(); 