// Portfolio management functionality for the main index page

class Portfolio {
    constructor() {
        this.currentView = 'portfolio';
        this.allProjects = [];
        this.filteredProjects = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadPortfolioGrid();
        this.handleInitialState();
    }

    setupEventListeners() {
        // Back button functionality
        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPortfolio();
            });
        }

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.view === 'article') {
                this.showArticleFromState(e.state.project);
            } else {
                this.showPortfolio(false); // Don't push state when handling popstate
            }
        });
    }

    setupFilterListeners() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.filterProjects(category);
            
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }



    handleInitialState() {
        // Check if we should show an article based on URL hash
        const hash = window.location.hash;
        if (hash.startsWith('#project-')) {
            const projectId = hash.substring(9); // Remove '#project-'
            // We'll need to wait for projects to load first
            setTimeout(() => this.showArticleById(projectId), 100);
        } else {
            // Set initial state for portfolio view
            history.replaceState({ view: 'portfolio' }, '', window.location.pathname);
        }
    }

    filterProjects(category) {
        this.currentFilter = category;
    
        if (category === 'all') {
            this.filteredProjects = [...this.allProjects];
        } else {
            this.filteredProjects = this.allProjects.filter(project => 
                project.category === category
            );
        }
    
        this.renderGrid();
    }



    handleInitialState() {
        // Check if we should show an article based on URL hash
        const hash = window.location.hash;
        if (hash.startsWith('#project-')) {
            const projectId = hash.substring(9); // Remove '#project-'
            // We'll need to wait for projects to load first
            setTimeout(() => this.showArticleById(projectId), 100);
        } else {
            // Set initial state for portfolio view
            history.replaceState({ view: 'portfolio' }, '', window.location.pathname);
        }
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const thumbnailHTML = project.thumbnail 
            ? `<img src="media/thumbnails/${project.thumbnail}" alt="${project.title}">`
            : `<div class="project-thumbnail-placeholder">${project.title} - Thumbnail</div>`;

        card.innerHTML = `
            <div class="project-thumbnail">
                ${thumbnailHTML}
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-role">${project.role}</p>
                <p class="project-year">${project.year} • ${project.studio}</p>
            </div>
        `;
        
        card.addEventListener('click', () => this.showArticle(project));
        return card;
    }

    async loadPortfolioGrid() {
        const projects = await ContentLoader.loadProjects();
        this.allProjects = projects;
        this.filteredProjects = [...projects];
        
        const loading = document.getElementById('loading');
        const filterButtons = document.getElementById('filter-buttons');

        if (projects.length === 0) {
            if (loading) {
                loading.textContent = 'Error loading projects. Make sure articles/_projects.json exists.';
            }
            return;
        }

        this.renderGrid();

        if (loading) {
            loading.style.display = 'none';
        }
        
        // Setup filter listeners and show buttons after header is loaded
        setTimeout(() => {
            const filterButtons = document.getElementById('filter-buttons');
            if (filterButtons) {
                filterButtons.style.display = 'flex';
            }
            this.setupFilterListeners();
        }, 100);
    }

    renderGrid() {
        const grid = document.getElementById('portfolio-grid');
        
        if (grid) {
            grid.innerHTML = '';
            this.filteredProjects.forEach(project => {
                grid.appendChild(this.createProjectCard(project));
            });
            grid.style.display = 'grid';
        }
    }

    async showArticle(project, pushState = true) {
        const portfolioView = document.getElementById('portfolio-view');
        const articleView = document.getElementById('article-view');
        const articleContent = document.getElementById('article-content');

        if (!portfolioView || !articleView || !articleContent) return;

        // Show loading state
        articleContent.innerHTML = `
            <div class="article-header">
                <h1 class="article-title">${project.title}</h1>
                <div class="article-meta">
                    <div>${project.studio}</div>
                    <div>${project.role}</div>
                    <div>${project.year} • ${project.category}</div>
                </div>
            </div>
            <div class="article-loading">Loading article...</div>
        `;

        portfolioView.style.display = 'none';
        articleView.style.display = 'block';
        window.scrollTo(0, 0);
        this.currentView = 'article';

        // Update browser history
        if (pushState) {
            const projectId = project.filename.replace('.md', '');
            history.pushState(
                { view: 'article', project: project }, 
                project.title, 
                `#project-${projectId}`
            );
        }

        // Load article content
        const content = await ContentLoader.loadArticle(project.filename);
        articleContent.innerHTML = `
            <div class="article-header">
                <h1 class="article-title">${project.title}</h1>
                <div class="article-meta">
                    <div>${project.studio}</div>
                    <div>${project.role}</div>
                    <div>${project.year} • ${project.category}</div>
                </div>
            </div>
            <div class="article-content">
                ${content}
            </div>
        `;
    }

    async showArticleFromState(project) {
        // Show article without pushing new state (used for popstate)
        await this.showArticle(project, false);
    }

    async showArticleById(projectId) {
        // Find project by ID and show it
        const projects = await ContentLoader.loadProjects();
        const project = projects.find(p => p.filename.replace('.md', '') === projectId);
        if (project) {
            await this.showArticle(project, false); // Don't push state since we're handling initial load
        }
    }

    showPortfolio(pushState = true) {
        const portfolioView = document.getElementById('portfolio-view');
        const articleView = document.getElementById('article-view');

        if (portfolioView && articleView) {
            portfolioView.style.display = 'block';
            articleView.style.display = 'none';
            window.scrollTo(0, 0);
            this.currentView = 'portfolio';

            // Update browser history
            if (pushState) {
                history.pushState({ view: 'portfolio' }, 'Work - Leo Santos', window.location.pathname);
            }
        }
    }
}

// Initialize portfolio when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});