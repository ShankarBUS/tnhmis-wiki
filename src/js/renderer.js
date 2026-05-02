import { getHashForRoute, getMapEntryByRoute, getCurrentRoute, navigateTo } from "./navigation.js";

let _renderedRoute = '';
const pageTextCache = new Map();
const _breadCrumbBar = document.getElementById("breadCrumbBar");
const _contentEl = document.getElementById("content");
const _titleEl = document.getElementById("pageTitle");
const _descEl = document.getElementById("pageDescription");
const _tocEl = document.getElementById("pageToc");

async function loadPageContent(map) {
    if (pageTextCache.has(map.route)) {
        return pageTextCache.get(map.route);
    }

    try {
        const response = await fetch(map.path);
        if (!response.ok) {
            throw new Error(`Failed to load content for ${map.title}`);
        }
        const text = await response.text();
        pageTextCache.set(map.route, text);
        return text;
    } catch (error) {
        console.error(error);
        return `# Error: Unable to load ${map.route}.`;
    }
}

export function renderNavItem(map) {
    var _title = map.title;
    var _description = map.description;
    var _route = map.route || "";
    var _parent = map.parent;

    var item = document.createElement("div");
    item.classList.add("navitem");
    if (_parent) item.classList.add(`level-${_parent.split('.').length}`);
    item.dataset.route = _route;
    item.textContent = _title;
    item.addEventListener("click", () => navigateTo(_route));

    if (item.dataset.route === getCurrentRoute()) {
        item.classList.add("active");
    }

    return item;
}

function renderBreadcrumbs(map) {
    if (!map || !map.route || !map.parent) {
        _breadCrumbBar.style.display = "none";
        return;
    }

    let routes = map.route.split('.');

    let crumbs = [];

    for (let i = 0; i < routes.length; i++) {
        let route = routes.slice(0, i + 1).join('.');
        let _m = getMapEntryByRoute(route);
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

function renderTOC(headings, map) {
    if (!headings.length) {
        _tocEl.style.display = "none";
        return;
    }

    _tocEl.innerHTML = `<h2>Table of contents</h2>`;
    const tocList = document.createElement("nav");
    tocList.classList.add("toc-list");

    headings.forEach(heading => {
        const link = document.createElement("a");
        link.href = getHashForRoute(map.route, heading.id);
        link.className = `toc-item level-${heading.level}`;
        link.textContent = heading.number + '. ' + heading.text;
        tocList.appendChild(link);
    });

    _tocEl.appendChild(tocList);
    _tocEl.style.display = "flex";
}

export async function renderPage(map, headingId = null) {
    if (!map) {
        _contentEl.innerHTML = "<p>Page not found.</p>";
        _titleEl.textContent = "Not Found";
        _breadCrumbBar.innerHTML = "";
        _descEl.textContent = "";
        _tocEl.innerHTML = "";
        return;
    }

    // Only re-render if we're navigating to a different page
    if (map.route !== _renderedRoute) {
        _renderedRoute = map.route;
        renderBreadcrumbs(map);

        const md = await loadPageContent(map);

        const { html, headings } = processMarkdown(md, map);

        _contentEl.innerHTML = html;
        _titleEl.textContent = map.title;
        renderTOC(headings, map);

        if (map.description) {
            _descEl.style.display = "block";
            _descEl.textContent = map.description;
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

function processMarkdown(md, map) {
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
            return `<h${depth} id="${id}"><a class="heading-link" href="${getHashForRoute(map.route, id)}"></a>${number + '. ' + text}</h${depth}>`;
        }
    };

    marked.use({ renderer: headingRenderer });

    const html = marked.parse(md);

    return { html, headings };
}
