const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})

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

// Also ensure scroll to top on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Initialize slider
    initializeSlider();
});
