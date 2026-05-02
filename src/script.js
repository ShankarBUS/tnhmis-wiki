import { initNavigation, navigateTo } from './js/navigation.js';
import { enableStickyHeader } from 'https://shankarbus.github.io/kaadu-ui/kaadu-ui.js';

initNavigation();
enableStickyHeader(70);

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
