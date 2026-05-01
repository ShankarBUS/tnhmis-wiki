import { initNavigation, navigateTo } from './js/navigation.js';
import { enableStickyHeader } from 'https://shankarbus.github.io/kaadu-ui/kaadu-ui.js';

initNavigation();
enableStickyHeader();


// function findPageTag(reference) {
//     const normalized = reference.trim().toLowerCase();
//     const exact = pages.find((page) => page.tag === normalized);
//     if (exact) {
//         return exact.tag;
//     }

//     const titleMatch = pages.find((page) => page.title.toLowerCase() === normalized);
//     if (titleMatch) {
//         return titleMatch.tag;
//     }

//     const fuzzyMatch = pages.find((page) => slugify(page.title) === slugify(reference));
//     if (fuzzyMatch) {
//         return fuzzyMatch.tag;
//     }

//     return slugify(reference);
// }

// function normalizeLink(link, page) {
//     if (/^(https?:|mailto:|\/)/.test(link)) {
//         return link;
//     }

//     const mdAnchorMatch = /^(.+?\.md)#(.+)$/.exec(link);
//     if (mdAnchorMatch) {
//         const tag = mdAnchorMatch[1].replace(/\.md$/, '');
//         const anchor = slugify(mdAnchorMatch[2]);
//         return `#${tag}/${anchor}`;
//     }

//     if (link.endsWith('.md')) {
//         const tag = link.replace(/\.md$/, '');
//         return `#${tag}`;
//     }

//     if (link.startsWith('#')) {
//         const target = link.slice(1);
//         return `#${page.tag}/${slugify(target)}`;
//     }

//     const base = page.path.replace(/[^\/]+$/, '');
//     return base + link;
// }

// function markdownToHtml(raw, page) {
//     // Preprocess for wiki links, images, and links
//     let preprocessed = raw
//         .replace(/\[\[([^\]]+)\]\]/g, (_, label) => {
//             const [pageRef, sectionRef] = label.split('#');
//             const tag = findPageTag(pageRef);
//             const section = sectionRef ? `/${slugify(sectionRef)}` : '';
//             const href = `#${tag}${section}`;
//             return `[${label}](${href})`;
//         })
//         .replace(/!\[([^\]]+)\]\(([^\)]+)\)/g, (_, label, target) => {
//             const normalizedTarget = normalizeLink(target, page);
//             return `![${label}](${normalizedTarget})`;
//         })
//         .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (_, label, target) => {
//             const normalizedTarget = normalizeLink(target, page);
//             return `[${label}](${normalizedTarget})`;
//         });
// }

// function searchPages(query) {
//     const normalized = query.trim().toLowerCase();
//     if (!normalized) {
//         return pages;
//     }

//     return pages.filter((page) => {
//         const content = pageTextCache.get(page.tag) || '';
//         return (
//             page.title.toLowerCase().includes(normalized) ||
//             page.description.toLowerCase().includes(normalized) ||
//             content.toLowerCase().includes(normalized)
//         );
//     });
// }

// searchInput.addEventListener('input', () => {
//     const results = searchPages(searchInput.value);
//     renderSidebar(results);
// });

homeButton.addEventListener('click', () => navigateTo(''));
ghRepoBtn.addEventListener('click', () => {
    window.open('https://github.com/ShankarBUS/tnhmis-wiki', '_blank');
});
ghProfileBtn.addEventListener('click', () => {
    window.open('https://github.com/ShankarBUS', '_blank');
});
