// Simple markdown parser for basic formatting
// Updated: 2025-01-28 - Fixed video syntax parsing
// *** CURRENT VERSION LOADED - TEST MARKER 123 ***
function parseMarkdown(markdown) {
    console.log('*** CURRENT PARSER LOADING - TEST MARKER 123 ***');
    console.log('parseMarkdown called with:', markdown);
    
    let result = markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // HTML passthrough (preserve iframe and other HTML tags)
        .replace(/(<(?:iframe|div|span|blockquote)[^>]*>.*?<\/(?:iframe|div|span|blockquote)>)/gs, (match) => {
            console.log('HTML element preserved:', match);
            return '###HTML_PLACEHOLDER_' + btoa(match) + '###';
        })
        // Local videos (must come before links to avoid conflicts)
        .replace(/\[video\]\(([^)]+)\)/g, (match, path) => {
            console.log('Video regex matched:', match, 'path:', path);
            return '<video controls><source src="' + path + '" type="video/mp4">Your browser does not support the video tag.</video>';
        })
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
            console.log('Link regex matched:', match, 'text:', text, 'url:', url);
            return '<a href="' + url + '">' + text + '</a>';
        })
        // Images
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
        // Line breaks and paragraphs - handle double breaks as spacing, single as new paragraphs
        .replace(/\n\n/g, '</p><p class="paragraph-break">')
        .replace(/\n/g, '</p><p>')
        // Wrap in paragraphs
        .replace(/^(.+)/, '<p>$1')
        .replace(/(.+)$/, '$1</p>')
        // Add spacing for paragraph breaks
        .replace(/<p class="paragraph-break">/g, '</p><p style="margin-top: 2rem;">')
        // Lists
        .replace(/^\* (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        // Restore HTML placeholders
        .replace(/###HTML_PLACEHOLDER_([^#]+)###/g, (match, encoded) => {
            return atob(encoded);
        });
    
    console.log('parseMarkdown result:', result);
    return result;
}