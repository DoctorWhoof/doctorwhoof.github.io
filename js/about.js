// About page functionality

class AboutPage {
    constructor() {
        this.init();
    }

    init() {
        this.loadContent();
    }

    async loadContent() {
        await ContentLoader.loadAboutContent();
    }
}

// Initialize about page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AboutPage();
});