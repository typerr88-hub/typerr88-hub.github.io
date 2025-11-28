document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       HERO SLIDER
       =========================== */
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const slider = document.querySelector('.hero-swiper');
    let slideInterval;

    // Start automatic sliding
    function startAutoSlide() {
        slideInterval = setInterval(changeSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    function changeSlide() {
        if (slides.length === 0) return;

        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function prevSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Start autoplay
    startAutoSlide();

    /* ===========================
       TOUCH SWIPE SUPPORT
       =========================== */
    if (slider) {

        let startX = 0;
        let endX = 0;

        slider.addEventListener('touchstart', function (e) {
            stopAutoSlide(); // pause when user touches
            startX = e.touches[0].clientX;
        });

        slider.addEventListener('touchmove', function (e) {
            endX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', function () {
            const diff = startX - endX;

            if (diff > 50) {
                nextSlide(); // swipe left
            } else if (diff < -50) {
                prevSlide(); // swipe right
            }

            startAutoSlide(); // resume after swipe
        });
    }

    /* ===========================
       MOBILE MENU TOGGLE
       =========================== */
   

const toggle = document.getElementById("nav-toggle");
const nav = document.getElementById("site-nav");

toggle.addEventListener("click", () => {
    nav.classList.toggle("show");

    const expanded = toggle.getAttribute("aria-expanded") === "true" || false;
    toggle.setAttribute("aria-expanded", !expanded);
});
