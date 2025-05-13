class SiteHeader extends HTMLElement {
    connectedCallback() {
        // Find the script tag that loaded this file to determine the relative path back to root
        const scriptTag = document.querySelector('script[src$="js/header.js"]');
        let basePath = '';
        if (scriptTag) {
            const src = scriptTag.getAttribute('src');
            basePath = src.replace('js/header.js', '');
        }

        const headerHTML = `
            <header class="header">
                <div class="header-inner">
                    <a href="${basePath}index.html" class="logo">jv.</a>
                    <nav class="nav-links">
                        <a href="${basePath}index.html">about</a>
                        <a href="${basePath}software.html">software</a>
                        <a href="${basePath}gallery.html">gallery</a>
                       <!-- <a href="${basePath}blog.html">blog</a> -->
                    </nav>
                </div>
            </header>
        `;

        this.innerHTML = headerHTML;
        
        // Highlight the current active page in the navigation
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = this.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            const linkTarget = link.getAttribute('href').split('/').pop();
            if (linkTarget === currentPath) {
                link.style.color = 'var(--accent)';
            }
        });
    }
}

customElements.define('site-header', SiteHeader);

class SideNote extends HTMLElement {
    connectedCallback() {
        if (this.hasAttribute('rendered')) return;
        this.setAttribute('rendered', 'true');
        this.style.display = 'inline';

        const renderNote = () => {
            const noteId = this.getAttribute('for');
            let content = this.innerHTML;
            
            if (noteId) {
                const defElement = document.getElementById(noteId);
                if (defElement) {
                    content = defElement.innerHTML;
                }
            }
            this.innerHTML = `<span class="sidenote-number"></span><span class="sidenote">${content}</span>`;
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', renderNote);
        } else {
            renderNote();
        }
    }
}

customElements.define('side-note', SideNote);
