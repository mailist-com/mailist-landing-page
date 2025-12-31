/**
 * Component Loader
 * Loads reusable HTML components (header, footer) into pages
 */

async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error(`Error loading component from ${componentPath}:`, error);
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Load header
    await loadComponent('header-placeholder', 'components/header.html');

    // Load footer
    await loadComponent('footer-placeholder', 'components/footer.html');

    // Reinitialize Lucide icons after components are loaded
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
