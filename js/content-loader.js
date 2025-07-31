// Content loading utilities for loading and parsing various content types

class ContentLoader {
    static async loadJSON(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error loading JSON from ${url}:`, error);
            throw error;
        }
    }

    static async loadMarkdown(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();
            return parseMarkdown(markdown);
        } catch (error) {
            console.error(`Error loading markdown from ${url}:`, error);
            throw error;
        }
    }

    static async loadProjects() {
        try {
            const projects = await this.loadJSON('articles/_projects.json');
            // Sort projects by date (newest first)
            return projects.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        } catch (error) {
            console.error('Error loading projects:', error);
            return [];
        }
    }

    static async loadArticle(filename) {
        try {
            return await this.loadMarkdown(`articles/${filename}`);
        } catch (error) {
            console.error('Error loading article:', error);
            return '<div class="article-error">Error loading article content.</div>';
        }
    }

    static async loadAboutContent() {
        try {
            const html = await this.loadMarkdown('articles/about.md');
            const aboutElement = document.getElementById('about-content');
            if (aboutElement) {
                aboutElement.innerHTML = html;
            }
        } catch (error) {
            console.error('Error loading about content:', error);
            const aboutElement = document.getElementById('about-content');
            if (aboutElement) {
                aboutElement.innerHTML = '<div>Error loading content.</div>';
            }
        }
    }
}