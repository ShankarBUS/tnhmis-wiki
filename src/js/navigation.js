import { renderNavItem, renderPage } from './renderer.js';

// NOTE: navigation works through URL hash (e.g., #/{page-route})
// page-route is defined in the docs map as the `route` property (map.json).
// It can also contain nested routes separated by dots (e.g., "parent.child").
// `parent` property in the map defines the route of the parent.
// Headings within a markdown file can be navigated as `#/{page-route}?h={heading-id}`.

let docsMap = [];
let _mapLoaded = false;
let currentRoute = '';
let _hashChanging = false;

const _pageListEl = document.getElementById("pageList");

async function loadDocsMap() {
    if (_mapLoaded) return true;

    try {
        docsMap = await fetch('data/docs-map.json').then(res => res.json());
        _mapLoaded = true;
        return true;
    } catch (error) {
        console.error('Error loading docs map:', error);
    }
    return false;
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

export async function renderDocsMap() {
    if (await loadDocsMap()) {
        _pageListEl.innerHTML = "";
        docsMap.forEach(map => {
            var item = renderNavItem(map);
            _pageListEl.appendChild(item);
        });
    }
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

export function getMapEntryByRoute(route) {
    let map = null;
    if (!route || route === "") {
        map = docsMap.find(entry => entry.default === true);
    }
    else {
        map = docsMap.find(entry => entry.route === route);
    }
    return map;
}

export function getCurrentRoute() {
    return currentRoute;
}

export function navigateTo(route, headingId = null, replaceHistory = false) {
    currentRoute = route;
    const map = getMapEntryByRoute(route);
    _hashChanging = true;
    updateHash(route, headingId, replaceHistory);
    _hashChanging = false;
    if (replaceHistory) {
        renderPage(map, headingId);
    }
}

function updatePageFromHash() {
    var { route, headingId } = getNavInfoFromHash();
    setActiveNavItem(route);
    if (!_hashChanging) {
        const map = getMapEntryByRoute(route);
        renderPage(map, headingId);
    }
}

export async function initNavigation() {
    await renderDocsMap();
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