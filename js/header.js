// Header utility to load shared header and footer and handle active states

class HeaderManager {
    constructor(currentPage) {
        this.currentPage = currentPage;
        this.init();
    }

    async init() {
        await this.loadHeader();
        await this.loadFooter();
        this.setActiveState();
        this.setupUpButton();
    }

    async loadHeader() {
        try {
            const response = await fetch('includes/header.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const headerHTML = await response.text();
            
            // Find the header container and replace its content
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                headerContainer.innerHTML = headerHTML;
            }
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }

    async loadFooter() {
        try {
            const response = await fetch('includes/footer.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const footerHTML = await response.text();
            
            // Find the footer container and replace its content
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = footerHTML;
            }
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }

    setActiveState() {
        // Remove any existing active states
        const navLinks = document.querySelectorAll('.header-nav a');
        navLinks.forEach(link => link.classList.remove('active'));

        // Set the active state based on current page
        const activeLink = document.getElementById(`nav-${this.currentPage}`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    setupUpButton() {
        const upButton = document.getElementById('up-button');
        if (!upButton) {
            return;
        }
        
        // Show/hide up button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                upButton.classList.add('visible');
            } else {
                upButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        upButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}