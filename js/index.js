function initializeNavigation() {
    console.log('Initializing navigation...');
    
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');
    const body = document.body;

    console.log('Nav toggle found:', !!navToggle);
    console.log('Nav links found:', navLinks.length);

    // Check if elements exist before adding event listeners
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav toggle clicked');
            body.classList.toggle('nav-open');
        });

        // Also add keyboard support
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                body.classList.toggle('nav-open');
            }
        });
    } else {
        console.warn('Nav toggle button not found');
    }

    if (navLinks && navLinks.length > 0) {
        navLinks.forEach(function(link, index) {
            link.addEventListener('click', function() {
                console.log('Nav link clicked:', index);
                body.classList.remove('nav-open');
            });
        });
    } else {
        console.warn('Nav links not found');
    }

    // Add escape key to close nav
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && body.classList.contains('nav-open')) {
            body.classList.remove('nav-open');
        }
    });
}

// Portfolio Slider Functionality
let currentSlideIndex = 0;
let slides, indicators, totalSlides;

function initializeSlider() {
    slides = document.querySelectorAll('.slide');
    indicators = document.querySelectorAll('.indicator');
    totalSlides = slides.length;
    
    if (slides.length > 0) {
        showSlide(0);
    }
}

function showSlide(index) {
    if (!slides || !indicators) return;
    
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
}

// Make functions global so they can be called from onclick attributes
window.changeSlide = function(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    showSlide(currentSlideIndex);
}

window.currentSlide = function(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-slide functionality (optional)
function autoSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}

// Auto-sliding every 5 seconds (uncomment to enable)
// setInterval(autoSlide, 5000);

// Disable browser scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Ensure page starts at top on load/refresh
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// Force scroll to top on page load
window.addEventListener('load', function() {
    // Small delay to ensure page is fully loaded
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, 50);
});

// Multiple initialization attempts to ensure compatibility across deployments
let navigationInitialized = false;

function performInitialization() {
    if (navigationInitialized) return;
    
    console.log('Performing initialization...');
    
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize slider
    initializeSlider();
    
    navigationInitialized = true;
}

// Try DOM Content Loaded first
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', performInitialization);
} else {
    // DOM is already ready
    performInitialization();
}

// Fallback for window load event
window.addEventListener('load', function() {
    if (!navigationInitialized) {
        console.log('Fallback initialization on window load');
        performInitialization();
    }
});

// Additional safety check after a delay
setTimeout(function() {
    if (!navigationInitialized) {
        console.log('Final fallback initialization attempt');
        performInitialization();
    }
}, 1000);
