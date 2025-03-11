let lastScroll = 0;
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const heroHeight = hero.offsetHeight;

// Show navigation by default, but without background
header.classList.add('nav-visible');

// Add background to header when scrolled past hero
function updateHeaderBackground() {
    const currentScroll = window.pageYOffset;
    
    // Add/remove background based on scroll position
    if (currentScroll > 0) {
        header.classList.add('with-background');
    } else {
        header.classList.remove('with-background');
    }

    // Show/hide header based on scroll direction
    if (currentScroll <= heroHeight) {
        header.classList.remove('nav-hidden');
        header.classList.add('nav-visible');
        return;
    }

    if (currentScroll > lastScroll) {
        // Scrolling down
        header.classList.add('nav-hidden');
        header.classList.remove('nav-visible');
    } else {
        // Scrolling up
        header.classList.remove('nav-hidden');
        header.classList.add('nav-visible');
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
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    requestAnimationFrame(updateHeaderBackground);
}); 