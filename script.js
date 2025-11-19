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

    // Placeholder for Google Sheet and Form links
    // These should be updated after setting up Google Forms/Sheets
    const sheetLink = document.getElementById('sheet-link');
    const formLink = document.getElementById('form-link');
    
    // You can update these URLs in the HTML directly, or set them here:
    // sheetLink.href = 'YOUR_GOOGLE_SHEET_URL';
    // formLink.href = 'YOUR_GOOGLE_FORM_URL';
    
    // For now, show an alert if clicked before URLs are set
    if (sheetLink && !sheetLink.href || sheetLink.href === '#') {
        sheetLink.addEventListener('click', function(e) {
            if (this.href === '#' || !this.href) {
                e.preventDefault();
                alert('Please update the Google Sheet URL in the HTML file after setting up your Google Sheet.');
            }
        });
    }
    
    if (formLink && !formLink.href || formLink.href === '#') {
        formLink.addEventListener('click', function(e) {
            if (this.href === '#' || !this.href) {
                e.preventDefault();
                alert('Please update the Google Form URL in the HTML file after setting up your Google Form.');
            }
        });
    }
});

