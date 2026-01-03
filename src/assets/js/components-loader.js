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

// Function to reinitialize all interactive components
function reinitializeComponents() {
    // Wait a bit for DOM to settle
    setTimeout(() => {
        // Reinitialize Lucide icons for ALL elements on the page (including dynamically loaded components)
        if (typeof window.lucideCreateIcons === 'function') {
            window.lucideCreateIcons();
        }

        // Reinitialize Preline UI components
        if (window.HSStaticMethods) {
            window.HSStaticMethods.autoInit();
        }

        // Also try to reinitialize specific components
        if (window.HSOverlay) {
            window.HSOverlay.autoInit();
        }
        if (window.HSDropdown) {
            window.HSDropdown.autoInit();
        }
    }, 150);
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Load header
    await loadComponent('header-placeholder', 'components/header.html');

    // Load footer
    await loadComponent('footer-placeholder', 'components/footer.html');

    // Reinitialize all interactive components (icons + Preline)
    reinitializeComponents();
});
