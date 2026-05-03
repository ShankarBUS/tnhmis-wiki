import { renderDocsMap, renderPage } from './renderer.js';

// NOTE: navigation works through URL hash (e.g., #/{route})
// Route is defined in the docs map as the `route` property (map.json).
// It can also contain nested routes separated by dots (e.g., "parent.child").
// Pages can be nested using the `children[]` property.
// Headings within a markdown file can be navigated as `#/{route}?h={headingId}`.

let docsMap = []; // A hierarchical map of all the docs and their nested children.
let routeMap = null; // A flattened dictionary of {route, map}.
let defaultPage = null; // home.
let _mapLoaded = false;
let currentRoute = '';
let _hashChanging = false;

const _pageListEl = document.getElementById("pageList");

export async function getDocsMap() {
    if (_mapLoaded) return docsMap;

    try {
        docsMap = await fetch('data/docs-map.json').then(res => res.json());
        _mapLoaded = true;
        routeMap = flattenMap(docsMap);
        return docsMap;
    } catch (error) {
        console.error('Error loading docs map:', error);
    }
    return [];
}

function flattenMap(pages, routes = {}) {
    if (!pages) return routes;

    pages.forEach(page => {
        if (!defaultPage && page.default === true) defaultPage = page;
        routes[page.route] = page;
        if (page.children && page.children.length > 0)
            flattenMap(page.children, routes)
    });

    return routes;
}

function setActiveNavItem(route) {
    const items = _pageListEl.querySelectorAll(".navitem");
    items.forEach(item => {
        if (item.dataset.route === route) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

function getNavInfoFromHash() {
    let hash = window.location.hash;
    hash = hash.substring(2); // Remove the '#/' characters
    var parts = hash.split('?');
    var route = parts[0];
    var headingId = parts[1] ? parts[1].substring(2) : null; // Remove the 'h=' prefix
    return { route, headingId };
}

export function getHashForRoute(route, headingId = null) {
    let hash = `#/${route}`;
    if (headingId) {
        hash += `?h=${headingId}`;
    }
    return hash;
}

function updateHash(route, headingId = null, replace = false) {
    let hash = getHashForRoute(route, headingId);
    if (replace) {
        window.history.replaceState(null, null, hash);
    }
    else {
        window.location.hash = hash;
    }
}

export function getPageByRoute(route) {
    return (!route || route === "") ? defaultPage : routeMap[route];
}

export function getCurrentRoute() {
    return currentRoute;
}

export function navigateTo(route, headingId = null, replaceHistory = false) {
    currentRoute = route;
    const page = getPageByRoute(route);
    _hashChanging = true;
    updateHash(route, headingId, replaceHistory);
    _hashChanging = false;
    if (page)
        document.title = "TN HMIS Wiki - " + page.title;
    if (replaceHistory) {
        renderPage(page, headingId);
    }
}

function updatePageFromHash() {
    var { route, headingId } = getNavInfoFromHash();
    setActiveNavItem(route);
    if (!_hashChanging) {
        const page = getPageByRoute(route);
        renderPage(page, headingId);
    }
}

export async function initNavigation() {
    await renderDocsMap(_pageListEl);
    window.addEventListener("hashchange", updatePageFromHash);

    var { route, headingId } = getNavInfoFromHash();
    navigateTo(route, headingId, true);

    document.addEventListener("click", (e) => {
        const target = e.target;
        if (!target) return;
        if (target.closest("#navMenuBtn")) return toggleNav();
        if (!isWide()) {
            if (target.closest("#navCloseBtn")) return closeNav();
            if (
                document.documentElement.classList.contains("nav-open") &&
                !target.closest("#navBar")
            )
                closeNav();
        }
    });

    window.addEventListener("keydown", (e) => {
        if (
            !isWide() &&
            e.key === "Escape" &&
            document.documentElement.classList.contains("nav-open")
        )
            closeNav();
    });

    window.addEventListener("resize", () => {
        if (isWide()) document.documentElement.classList.remove("nav-open");
        updateNav();
    });
}

const NAV_WIDE_BREAKPOINT = 1000; // px

function isWide() {
    return window.innerWidth >= NAV_WIDE_BREAKPOINT;
}

function updateNav() {
    const nav = document.getElementById("navBar");
    if (!nav) return;
    if (isWide()) nav.setAttribute("aria-hidden", "false");
    else
        nav.setAttribute(
            "aria-hidden",
            document.documentElement.classList.contains("nav-open") ? "false" : "true"
        );
}

function openNav() {
    if (!isWide()) document.documentElement.classList.add("nav-open");
    updateNav();
}

function closeNav() {
    if (!isWide()) document.documentElement.classList.remove("nav-open");
    updateNav();
}

function toggleNav() {
    if (isWide()) return;
    document.documentElement.classList.contains("nav-open")
        ? closeNav()
        : openNav();
}