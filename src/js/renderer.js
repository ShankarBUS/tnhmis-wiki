import { getHashForRoute, getPageByRoute, getCurrentRoute, navigateTo, getDocsMap } from "./navigation.js";

let _renderedRoute = '';
const pageTextCache = new Map();
const _breadCrumbBar = document.getElementById("breadCrumbBar");
const _contentEl = document.getElementById("content");
const _titleEl = document.getElementById("pageTitle");
const _descEl = document.getElementById("pageDescription");
const _tocEl = document.getElementById("pageToc");

async function loadPageContent(page) {
    if (pageTextCache.has(page.route)) {
        return pageTextCache.get(page.route);
    }

    try {
        const response = await fetch(page.path);
        if (!response.ok) {
            throw new Error(`Failed to load content for ${page.title}`);
        }
        const text = await response.text();
        pageTextCache.set(page.route, text);
        return text;
    } catch (error) {
        console.error(error);
        return error.message;
    }
}

export async function renderDocsMap(container) {
    const docsMap = await getDocsMap();
    renderTreeNodes(container, docsMap);
}

function renderTreeNodes(container, pages, parent = null) {
    container.innerHTML = "";
    pages.forEach(page => {
        var item = renderNavItem(page, parent);
        container.appendChild(item);
    });
}

function renderNavItem(page, parent = null) {
    var _title = page.title;
    var _route = page.route || "";
    var hasChildren = page.children && page.children.length > 0;

    if (parent) {
        page.parent = parent;
        page.level = (parent.level) ? parent.level + 1 : 1;
    }

    var item = document.createElement("div");
    item.classList.add("navitem");
    item.dataset.route = _route;

    const header = document.createElement("div");
    header.classList.add("navitem-header");
    if (page.level) header.classList.add(`level-${page.level}`);
    if (hasChildren) {
        header.classList.add("expandable");
        const expander = document.createElement("div");
        expander.classList.add("navitem-expander");
        expander.addEventListener("click", () => {
            item.classList.toggle("expanded");
        });
        header.appendChild(expander);
    }

    const link = document.createElement("a");
    link.href = '#/' + _route;
    link.textContent = _title;
    header.appendChild(link);

    item.appendChild(header);
    if (hasChildren) {
        const container = document.createElement("div");
        container.classList.add("navitem-container");
        renderTreeNodes(container, page.children, page)
        item.appendChild(container);
    }

    if (item.dataset.route === getCurrentRoute()) {
        item.classList.add("active");
    }

    return item;
}

function renderBreadcrumbs(page) {
    if (!page || !page.route || !page.parent) {
        _breadCrumbBar.style.display = "none";
        return;
    }

    let routes = page.route.split('.');

    let crumbs = [];

    for (let i = 0; i < routes.length; i++) {
        let route = routes.slice(0, i + 1).join('.');
        let _m = getPageByRoute(route);
        if (_m) {
            crumbs.push({ title: _m.title, route: _m.route });
        }
    }

    breadCrumbBar.innerHTML = "";

    crumbs.forEach((crumb, index) => {
        const crumbEl = document.createElement("span");
        crumbEl.classList.add("breadcrumb-item");
        crumbEl.textContent = crumb.title;
        _breadCrumbBar.appendChild(crumbEl);

        if (index < crumbs.length - 1) {
            crumbEl.addEventListener("click", () => navigateTo(crumb.route));
            crumbEl.classList.add("clickable");
        }
    });
    _breadCrumbBar.style.display = "flex";
}

function renderTOC(headings, page) {
    if (!headings.length) {
        _tocEl.style.display = "none";
        return;
    }

    _tocEl.innerHTML = `<h2>Table of contents</h2>`;
    const tocList = document.createElement("nav");
    tocList.classList.add("toc-list");

    headings.forEach(heading => {
        const link = document.createElement("a");
        link.href = getHashForRoute(page.route, heading.id);
        link.className = `toc-item level-${heading.level}`;
        link.textContent = heading.number + '. ' + heading.text;
        tocList.appendChild(link);
    });

    _tocEl.appendChild(tocList);
    _tocEl.style.display = "flex";
}

export async function renderPage(page, headingId = null) {
    if (!page) {
        _contentEl.innerHTML = "<p>Page not found.</p>";
        _titleEl.textContent = "Not Found";
        _breadCrumbBar.innerHTML = "";
        _breadCrumbBar.style.display = "none";
        _descEl.textContent = "";
        _descEl.style.display = "none";
        _tocEl.innerHTML = "";
        _tocEl.style.display = "none";
        return;
    }

    // Only re-render if we're navigating to a different page
    if (page.route !== _renderedRoute) {
        _renderedRoute = page.route;
        renderBreadcrumbs(page);

        const md = await loadPageContent(page);

        const { html, headings } = processMarkdown(md, page);

        _contentEl.innerHTML = html;
        _titleEl.textContent = page.title;
        renderTOC(headings, page);

        if (page.description) {
            _descEl.style.display = "block";
            _descEl.textContent = page.description;
        } else { _descEl.style.display = "none"; }
    }

    if (headingId) {
        const headingEl = document.getElementById(headingId);
        if (headingEl) {
            headingEl.scrollIntoView({ behavior: "smooth" });
        }
    }
}

function slugify(text) {
    return text.toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

function processMarkdown(md, page) {
    // Extract headings
    const headings = [];
    const headingIdCounts = {};
    const levelIndices = [0, 0, 0, 0, 0, 0]; // To track numbering for each heading level

    function uniqueHeadingId(text) {
        const base = slugify(text);
        const count = headingIdCounts[base] || 0;
        headingIdCounts[base] = count + 1;
        return count ? `${base}-${count + 1}` : base;
    }

    const lines = md.replace(/\r/g, '').split('\n');
    for (let line of lines) {
        if (/^#{1,6}\s+/.test(line)) {
            const level = line.match(/^#{1,6}/)[0].length;
            const i = level - 1;
            levelIndices[i]++;

            // Reset the lower level indices
            for (let j = i + 1; j < levelIndices.length; j++) {
                levelIndices[j] = 0;
            }

            const number = levelIndices.slice(0, level).join('.');

            const text = line.slice(level + 1).trim();
            const id = uniqueHeadingId(text);
            headings.push({ level, text, id, number });
        }
    }

    levelIndices.fill(0); // Reset for rendering
    const headingRenderer = {
        heading({ tokens, depth }) {
            const i = depth - 1;
            levelIndices[i]++;
            for (let j = i + 1; j < levelIndices.length; j++) levelIndices[j] = 0;
            const number = levelIndices.slice(0, depth).join('.');
            const text = this.parser.parseInline(tokens);
            const id = slugify(text);
            return `<h${depth} id="${id}"><a class="heading-link" href="${getHashForRoute(page.route, id)}"></a>${number + '. ' + text}</h${depth}>`;
        }
    };

    marked.use({ renderer: headingRenderer });
    enableGFMAlerts();

    const html = marked.parse(md);

    return { html, headings };
}

function enableGFMAlerts() {
    const extension = {
        extensions: [{
            name: 'gfmAlert',
            level: 'block',
            start(src) { return src.indexOf('> [!'); },
            tokenizer(src, tokens) {
                // Updated regex to handle single or multiple lines accurately
                const rule = /^> \[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\n((?:>.*\n?)*)/;
                const match = rule.exec(src);

                if (match) {
                    const alertType = match[1].toLowerCase();
                    // Clean the '>' from each line of content
                    const content = match[2].replace(/^>\s?/gm, '');

                    const token = {
                        type: 'gfmAlert',
                        raw: match[0],
                        alertType,
                        text: content,
                        tokens: []
                    };

                    this.lexer.blockTokens(token.text, token.tokens);
                    return token;
                }
            },
            renderer(token) {
                const quote = this.parser.parse(token.tokens);
                return `<blockquote class="alert-${token.alertType}">
                            <p class="alert-title">${token.alertType.toUpperCase()}</p>
                            ${quote}
                        </blockquote>`;
            }
        }]
    };

    marked.use(extension);
}