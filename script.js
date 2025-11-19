// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Account for sticky nav
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update navigation active state on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Ensure Google Sheet and Form links work properly
    const sheetLink = document.getElementById('sheet-link');
    const formLink = document.getElementById('form-link');
    
    // Add explicit click handlers to ensure links work
    if (sheetLink) {
        sheetLink.addEventListener('click', function(e) {
            // Use window.open as fallback if target="_blank" doesn't work
            if (!this.href || this.href === '#') {
                e.preventDefault();
                return;
            }
            // If the link doesn't open, try window.open
            const opened = window.open(this.href, '_blank');
            if (!opened) {
                // Pop-up blocked, show message
                alert('Please allow pop-ups for this site, or click the link below to open the sheet directly.');
            }
        });
    }
    
    if (formLink) {
        formLink.addEventListener('click', function(e) {
            // Use window.open as fallback if target="_blank" doesn't work
            if (!this.href || this.href === '#') {
                e.preventDefault();
                return;
            }
            const opened = window.open(this.href, '_blank');
            if (!opened) {
                alert('Please allow pop-ups for this site, or click the link below to open the form directly.');
            }
        });
    }
});

