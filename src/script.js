import { enableStickyHeader } from 'https://shankarbus.github.io/kaadu-ui/kaadu-ui.js';
import { initNoolagam, navigateTo } from 'https://shankarbus.github.io/kaadu-ui/noolagam.js';

initNoolagam({ docsMapUrl: 'data/docs-map.json' });
enableStickyHeader(70);

homeButton.addEventListener('click', () => navigateTo(''));
ghRepoBtn.addEventListener('click', () => {
    window.open('https://github.com/ShankarBUS/tnhmis-wiki', '_blank');
});
ghProfileBtn.addEventListener('click', () => {
    window.open('https://github.com/ShankarBUS', '_blank');
});
