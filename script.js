let lastScrollTop = 0;
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const scrollThreshold = 5; // Minimum scroll amount to trigger the effect
let isScrolling = false;

// Show navigation by default, but without background
header.classList.add('nav-visible');

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            const heroHeight = hero.offsetHeight;
            
            // Add or remove background based on hero section
            if (currentScroll <= heroHeight - 100) {
                header.classList.remove('with-background');
            } else {
                header.classList.add('with-background');
            }

            // Only handle hide/show after hero section
            if (currentScroll > heroHeight) {
                if (Math.abs(lastScrollTop - currentScroll) <= scrollThreshold) {
                    isScrolling = false;
                    return;
                }

                if (currentScroll > lastScrollTop) {
                    // Scrolling down after hero
                    header.classList.remove('nav-visible');
                    header.classList.add('nav-hidden');
                } else {
                    // Scrolling up after hero
                    header.classList.remove('nav-hidden');
                    header.classList.add('nav-visible');
                }
            } else {
                // Always show nav in hero section
                header.classList.remove('nav-hidden');
                header.classList.add('nav-visible');
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
            isScrolling = false;
        });
    }
    isScrolling = true;
}); 