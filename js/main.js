document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initDropdowns();
    initBookingForm();
    initScrollAnimations();
    initMobileMenu();
});

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (navLinks.classList.contains('active')) {
                navLinks.style.top = '58px';
            }
        } else {
            navbar.classList.remove('scrolled');
            if (navLinks.classList.contains('active')) {
                navLinks.style.top = '70px';
            }
        }
    });
}

function initDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-links .dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('a');
        
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close all other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('open');
                }
            });
            
            // Toggle this dropdown
            dropdown.classList.toggle('open');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }
    });
}

function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}

function initBookingForm() {
    const forms = document.querySelectorAll('.booking-form, #bookingForm');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            showBookingConfirmation(data);
        });
    });
}

function showBookingConfirmation(data) {
    alert('Thank you for your booking! We will contact you shortly to confirm your reservation.\n\nPickup: ' + data.pickup + '\nDestination: ' + data.destination + '\nDate: ' + data.date + '\nTime: ' + data.time);
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add staggered delays
    const elements = document.querySelectorAll('.feature-card, .service-card, .fleet-card, .testimonial-card, .stat-item');
    elements.forEach((el, index) => {
        el.classList.add('fade-in-up');
        el.style.setProperty('--animation-delay', `${index * 0.08}s`);
        observer.observe(el);
    });
}
