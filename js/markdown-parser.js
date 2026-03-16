// Simple markdown parser for basic formatting
// *** FLOAT DIAGNOSTIC BUILD - V2 ***
function parseMarkdown(markdown) {
    console.log('*** FLOAT DIAGNOSTIC BUILD - V2 ***');
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
        // Floating images: convert to unique placeholders early, before links or
        // HTML passthrough can interfere. They will be resolved last, after paragraph
        // processing, so we can strip the <p> wrapper cleanly in one step.
        .replace(/\[image-right\]\(([^)]+)\)/g, (match, path) => {
            console.log('FLOAT: created RIGHT placeholder for path:', path);
            return '###FLOAT_RIGHT_' + btoa(path) + '###';
        })
        .replace(/\[image-left\]\(([^)]+)\)/g, (match, path) => {
            console.log('FLOAT: created LEFT placeholder for path:', path);
            return '###FLOAT_LEFT_' + btoa(path) + '###';
        })
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
        // Images
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
        // Links (negative lookbehind prevents matching image syntax)
        .replace(/(?<!!)\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
            console.log('Link regex matched:', match, 'text:', text, 'url:', url);
            return '<a href="' + url + '">' + text + '</a>';
        })
        // Line breaks and paragraphs: single newline → <br>, two or more → new paragraph
        .replace(/\n{2,}/g, '</p><p>')
        .replace(/\n/g, '<br>')
        // Wrap in paragraphs
        .replace(/^(.+)/, '<p>$1')
        .replace(/(.+)$/, '$1</p>')

        // Lists
        .replace(/^\* (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        // Restore HTML placeholders
        .replace(/###HTML_PLACEHOLDER_([^#]+)###/g, (match, encoded) => {
            return atob(encoded);
        });

    // Log the HTML at this point so we can see if float placeholders survived
    console.log('FLOAT: HTML before float resolution:', result);

    result = result
        // Resolve float placeholders last: replace the entire <p>...</p> wrapper
        // that paragraph processing created around them, producing a clean <div>
        // sibling to the text paragraphs so CSS float works correctly.
        .replace(/<p[^>]*>\s*###FLOAT_RIGHT_([^#]+)###\s*<\/p>/g, (match, encoded) => {
            const src = atob(encoded);
            console.log('FLOAT: resolved RIGHT placeholder, src:', src, 'matched wrapper:', match);
            return '<div class="image-float-right"><img src="' + src + '"></div>';
        })
        .replace(/<p[^>]*>\s*###FLOAT_LEFT_([^#]+)###\s*<\/p>/g, (match, encoded) => {
            const src = atob(encoded);
            console.log('FLOAT: resolved LEFT placeholder, src:', src, 'matched wrapper:', match);
            return '<div class="image-float-left"><img src="' + src + '"></div>';
        });

    // Warn if any float placeholders were NOT resolved (e.g. not wrapped in <p> as expected)
    if (result.includes('###FLOAT_')) {
        console.warn('FLOAT: unresolved placeholder still present in output! Full result:', result);
    }

    console.log('parseMarkdown final result:', result);
    return result;
}
