/*
 * Blog Vendor JS - Mailist
 * Contains necessary libraries for blog functionality
 */

// Import Preline for UI components (overlays, dropdowns, etc.)
if (typeof window.HSStaticMethods !== 'undefined') {
    window.HSStaticMethods.autoInit();
}

// Initialize Lucide icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
