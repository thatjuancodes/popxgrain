// Text animation
let leftIndex = 0;
let rightIndex = 0;
const wordsBefore = document.querySelectorAll('.word-before');
const wordsAfter = document.querySelectorAll('.word-after');
const leftWordExposureTime = 3000; // Left words visible for exactly 3 seconds
const rightWordExposureTime = 2900; // Right words visible for exactly 2.9 seconds
const leftFadeTime = 800; // 0.8s for fade transitions
const rightFadeTime = 700; // 0.7s for fade transitions

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

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
let isInAboutSection = false;
let isInServicesSection = false;
let isInContactSection = false;
let isTransitioningToAbout = false;
let isTransitioningToHero = false;
let isTransitioningToServices = false;
let isTransitioningToContact = false;
let hasClickedMenuItem = false; // New flag to track menu item clicks
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const about = document.querySelector('#about');
const services = document.querySelector('#services');
const contact = document.querySelector('#contact');
const heroHeight = hero.offsetHeight;

// Show navigation by default, but without background
header.classList.add('nav-visible');

// Function to smoothly scroll to services section
function scrollToServices() {
    if (isTransitioningToServices) return;
    
    isTransitioningToServices = true;
    const servicesSection = document.getElementById('services');
    servicesSection.scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
        isTransitioningToServices = false;
        isInHeroSection = false;
        isInAboutSection = false;
        isInServicesSection = true;
        isInContactSection = false;
    }, 1000);
}

// Function to smoothly scroll to contact section
function scrollToContact() {
    if (isTransitioningToContact) return;
    
    isTransitioningToContact = true;
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
        isTransitioningToContact = false;
        isInHeroSection = false;
        isInAboutSection = false;
        isInServicesSection = false;
        isInContactSection = true;
    }, 1000);
}

// Update existing scrollToAbout function
function scrollToAbout() {
    if (isTransitioningToAbout) return;
    
    isTransitioningToAbout = true;
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
        isTransitioningToAbout = false;
        isInHeroSection = false;
        isInAboutSection = true;
        isInServicesSection = false;
        isInContactSection = false;
    }, 1000);
}

// Update existing scrollToHero function
function scrollToHero() {
    if (isTransitioningToHero) return;
    
    isTransitioningToHero = true;
    const heroSection = document.getElementById('hero');
    heroSection.scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
        isTransitioningToHero = false;
        isInHeroSection = true;
        isInAboutSection = false;
        isInServicesSection = false;
        isInContactSection = false;
    }, 1000);
}

// Function to update header background
function updateHeaderBackground() {
    const scrollPosition = window.scrollY;
    const aboutSection = document.querySelector('.about');
    const servicesSection = document.querySelector('.services');
    const contactSection = document.querySelector('.contact');
    const aboutTop = aboutSection.offsetTop;
    const servicesTop = servicesSection.offsetTop;
    const contactTop = contactSection.offsetTop;
    
    if (scrollPosition > 50) {
        header.classList.add('with-background');
        
        // Remove box shadow in about section, add it for services and contact
        if (scrollPosition >= aboutTop && scrollPosition < servicesTop) {
            header.classList.add('no-shadow');
        } else {
            header.classList.remove('no-shadow');
        }
    } else {
        header.classList.remove('with-background');
        header.classList.remove('no-shadow');
    }

    // Update section states based on scroll position
    if (scrollPosition < aboutTop - window.innerHeight/2) {
        isInHeroSection = true;
        isInAboutSection = false;
        isInServicesSection = false;
        isInContactSection = false;
    } else if (scrollPosition >= aboutTop - window.innerHeight/2 && scrollPosition < servicesTop - window.innerHeight/2) {
        isInHeroSection = false;
        isInAboutSection = true;
        isInServicesSection = false;
        isInContactSection = false;
    } else if (scrollPosition >= servicesTop - window.innerHeight/2 && scrollPosition < contactTop - window.innerHeight/2) {
        isInHeroSection = false;
        isInAboutSection = false;
        isInServicesSection = true;
        isInContactSection = false;
    } else {
        isInHeroSection = false;
        isInAboutSection = false;
        isInServicesSection = false;
        isInContactSection = true;
    }

    // Always hide header in hero section
    if (scrollPosition <= heroHeight - 100) {
        header.classList.add('nav-hidden');
        header.classList.remove('nav-visible');
        return;
    }

    // Handle header visibility based on scroll direction and menu click state
    if (scrollPosition > lastScroll) { // Scrolling down
        if (!isAutoScrolling) {
            header.classList.add('nav-hidden');
            header.classList.remove('nav-visible');
            hasClickedMenuItem = false; // Reset the menu click state when scrolling down
        }
    } else { // Scrolling up
        header.classList.remove('nav-hidden');
        header.classList.add('nav-visible');
    }

    lastScroll = scrollPosition;
}

// Handle scroll arrow click
document.querySelector('.scroll-arrow').addEventListener('click', (e) => {
    e.preventDefault();
    scrollToAbout();
});

// Function to check if we're near a section boundary
function isNearSectionBoundary(scrollPosition) {
    const aboutSection = document.querySelector('.about');
    const servicesSection = document.querySelector('.services');
    const contactSection = document.querySelector('.contact');
    const aboutTop = aboutSection.offsetTop;
    const servicesTop = servicesSection.offsetTop;
    const contactTop = contactSection.offsetTop;
    
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight * 0.2; // 20% of viewport height as threshold
    
    // Calculate the bottom of the viewport
    const viewportBottom = scrollPosition + viewportHeight;
    
    // Calculate the bottom of each section
    const servicesBottom = servicesTop + servicesSection.offsetHeight;

    // Special handling for hero to about transition
    const isNearAboutFromHero = isInHeroSection && 
        scrollPosition > (aboutTop - viewportHeight) * 0.8 && 
        scrollPosition < aboutTop;

    return {
        nearAbout: isNearAboutFromHero || Math.abs(scrollPosition - aboutTop) < threshold,
        nearServices: Math.abs(scrollPosition - servicesTop) < threshold,
        nearContact: Math.abs(scrollPosition - contactTop) < threshold,
        isAtServicesBottom: viewportBottom >= servicesBottom - threshold && viewportBottom <= servicesBottom + threshold,
        isInLastViewportOfServices: viewportBottom > servicesBottom - viewportHeight
    };
}

// Handle wheel events for scrolling between sections
window.addEventListener('wheel', (e) => {
    const scrollPosition = window.scrollY;
    const boundaries = isNearSectionBoundary(scrollPosition);

    // Prevent scroll handling during transitions
    if (isTransitioningToAbout || isTransitioningToHero || isTransitioningToServices || isTransitioningToContact) {
        e.preventDefault();
        return;
    }

    // Handle scrolling from about to hero (always active)
    if (isInAboutSection && e.deltaY < -25 && scrollPosition <= about.offsetTop) {
        e.preventDefault();
        scrollToHero();
        return;
    }

    // Handle section transitions
    if (e.deltaY > 50) { // Scrolling down
        if (isInHeroSection && (boundaries.nearAbout || scrollPosition > heroHeight * 0.5)) {
            e.preventDefault();
            scrollToAbout();
        } else if (isInAboutSection && boundaries.nearServices) {
            e.preventDefault();
            scrollToServices();
        } else if (isInServicesSection && boundaries.isAtServicesBottom) {
            e.preventDefault();
            scrollToContact();
        }
    } else if (e.deltaY < -25) { // Scrolling up
        if (isInContactSection && boundaries.nearContact) {
            e.preventDefault();
            scrollToServices();
        } else if (isInServicesSection && boundaries.nearServices) {
            e.preventDefault();
            scrollToAbout();
        }
    }
}, { passive: false });

// Handle touch events for mobile
let touchStartY = 0;
let touchThresholdDown = 50; // Threshold for scrolling down
let touchThresholdUp = 25;   // More sensitive threshold for scrolling up

window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchmove', (e) => {
    const scrollPosition = window.scrollY;
    const boundaries = isNearSectionBoundary(scrollPosition);
    const touchCurrentY = e.touches[0].clientY;
    const deltaY = touchStartY - touchCurrentY;

    // Prevent scroll handling during transitions
    if (isTransitioningToAbout || isTransitioningToHero || isTransitioningToServices || isTransitioningToContact) {
        e.preventDefault();
        return;
    }

    // Handle scrolling from about to hero (always active)
    if (isInAboutSection && deltaY < -touchThresholdUp && scrollPosition <= about.offsetTop) {
        e.preventDefault();
        scrollToHero();
        return;
    }

    // Handle section transitions
    if (deltaY > touchThresholdDown) { // Scrolling down
        if (isInHeroSection && (boundaries.nearAbout || scrollPosition > heroHeight * 0.5)) {
            e.preventDefault();
            scrollToAbout();
        } else if (isInAboutSection && boundaries.nearServices) {
            e.preventDefault();
            scrollToServices();
        } else if (isInServicesSection && boundaries.isAtServicesBottom) {
            e.preventDefault();
            scrollToContact();
        }
    } else if (deltaY < -touchThresholdUp) { // Scrolling up
        if (isInContactSection && boundaries.nearContact) {
            e.preventDefault();
            scrollToServices();
        } else if (isInServicesSection && boundaries.nearServices) {
            e.preventDefault();
            scrollToAbout();
        }
    }
}, { passive: false });

// Update the navigation link click handler
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            isAutoScrolling = true;
            hasClickedMenuItem = true; // Set the menu click state
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

// Add intersection observer for feature cards animation
const featureCards = document.querySelectorAll('.feature');
const aboutSection = document.querySelector('.about');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add fade-in class to all feature cards when about section is visible
            featureCards.forEach(card => card.classList.add('fade-in'));
            // Stop observing after animation is triggered
            featureObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start observing the about section
featureObserver.observe(aboutSection); 