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
   
    // MOBILE NAV TOGGLE - Now works at all screen sizes
    const navToggle = document.getElementById('nav-toggle');
    const siteNav = document.getElementById('site-nav');

    if (navToggle && siteNav) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            siteNav.classList.toggle('show');
            
            // Update aria-expanded for accessibility
            const isExpanded = siteNav.classList.contains('show');
            navToggle.setAttribute('aria-expanded', isExpanded);
            
            // Prevent body scrolling when menu is open
            document.body.classList.toggle('menu-open', isExpanded);
        });
        
        // Close menu when clicking on a link
        const navLinks = siteNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                siteNav.classList.remove('show');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !siteNav.contains(e.target)) {
                navToggle.classList.remove('active');
                siteNav.classList.remove('show');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    /* ===========================
       HEADER SCROLL EFFECT
       =========================== */
    const header = document.querySelector('.site-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    /* ===========================
       PARTNER CARDS INTERACTION
       =========================== */
    const partnerCards = document.querySelectorAll('.partner-card');
    
    partnerCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add a subtle pulse effect to the logo when hovering
            const logo = card.querySelector('.partner-logo');
            if (logo) {
                logo.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset logo scale
            const logo = card.querySelector('.partner-logo');
            if (logo) {
                logo.style.transform = 'scale(1)';
            }
        });
    });

    /* ===========================
       SMOOTH SCROLLING FOR ANCHOR LINKS
       =========================== */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ===========================
       PRODUCT FILTERING
       =========================== */
    window.filterProducts = function() {
        const selectedBrand = document.getElementById('brandFilter').value;
        const thumbnails = document.querySelectorAll('.product-thumbnail');
        const cards = document.querySelectorAll('.product-card');
        
        // Handle thumbnail grid (legacy)
        thumbnails.forEach(product => {
            const productBrand = product.dataset.brand;
            
            if (selectedBrand === 'all' || productBrand === selectedBrand) {
                product.classList.remove('hidden');
            } else {
                product.classList.add('hidden');
            }
        });
        
        // Handle service-style cards (new)
        cards.forEach(product => {
            const productBrand = product.dataset.brand;
            
            if (selectedBrand === 'all' || productBrand === selectedBrand) {
                product.classList.remove('hidden');
            } else {
                product.classList.add('hidden');
            }
        });
    };

});

