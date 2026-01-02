/**
 * Cookie Consent Manager
 * GDPR-compliant cookie consent system
 */

(function() {
    'use strict';

    // Cookie consent state
    const consentState = {
        categories: {
            necessary: true,
            analytics: true,   // Domyślnie zaznaczone
            marketing: true,   // Domyślnie zaznaczone
            functional: true   // Domyślnie zaznaczone
        },
        meta: {
            consentId: null,
            consentDate: null,
            lastUpdated: null,
            policyVersion: '1.0',
            expiryDate: null
        }
    };

    // Configuration
    const config = {
        consentExpiry: 365, // days
        policyVersion: '1.0',
        cookieName: 'cookie_consent',
        storageKey: 'mailist_cookie_consent'
    };

    // DOM elements
    let elements = {};

    /**
     * Initialize the cookie consent system
     */
    function init() {
        // Cache DOM elements
        cacheElements();

        // Setup event listeners
        setupEventListeners();

        // Check if consent exists
        const savedConsent = getStoredConsent();

        if (shouldShowBanner(savedConsent)) {
            showBanner();
        } else {
            // Load saved preferences
            if (savedConsent) {
                Object.assign(consentState.categories, savedConsent.categories);
                Object.assign(consentState.meta, savedConsent.meta);
                loadConsentedScripts();
            }
            showFloatingIcon();
        }

        // Update modal toggles based on saved state
        updateModalToggles();
    }

    /**
     * Cache DOM elements
     */
    function cacheElements() {
        elements = {
            banner: document.getElementById('cookie-banner'),
            bannerOverlay: document.getElementById('cookie-banner-overlay'),
            modal: document.getElementById('cookie-modal'),
            modalOverlay: document.getElementById('cookie-modal-overlay'),
            modalClose: document.getElementById('cookie-modal-close'),
            floatingIcon: document.getElementById('cookie-floating-icon'),

            // Banner buttons
            acceptAll: document.getElementById('accept-all-cookies'),
            rejectAll: document.getElementById('reject-all-cookies'),
            customize: document.getElementById('customize-cookies'),

            // Modal buttons
            savePreferences: document.getElementById('save-preferences'),
            modalAcceptAll: document.getElementById('modal-accept-all'),
            modalRejectAll: document.getElementById('modal-reject-all'),

            // Footer link
            manageLink: document.getElementById('manage-cookies-link'),

            // Category elements
            categoryHeaders: document.querySelectorAll('.cookie-category-header'),
            toggleSwitches: document.querySelectorAll('.toggle-switch')
        };
    }

    /**
     * Setup all event listeners
     */
    function setupEventListeners() {
        // Banner buttons
        elements.acceptAll.addEventListener('click', acceptAllCookies);
        elements.rejectAll.addEventListener('click', rejectAllCookies);
        elements.customize.addEventListener('click', showPreferencesModal);

        // Modal buttons
        elements.savePreferences.addEventListener('click', savePreferences);
        elements.modalAcceptAll.addEventListener('click', () => {
            acceptAllCookies();
            hidePreferencesModal();
        });
        elements.modalRejectAll.addEventListener('click', () => {
            rejectAllCookies();
            hidePreferencesModal();
        });

        // Modal close
        elements.modalClose.addEventListener('click', hidePreferencesModal);
        elements.modalOverlay.addEventListener('click', hidePreferencesModal);

        // Floating icon
        elements.floatingIcon.addEventListener('click', showPreferencesModal);

        // Footer link
        if (elements.manageLink) {
            elements.manageLink.addEventListener('click', (e) => {
                e.preventDefault();
                showPreferencesModal();
            });
        }

        // Category accordion
        elements.categoryHeaders.forEach(header => {
            header.addEventListener('click', toggleCategoryContent);
        });

        // Toggle switches
        elements.toggleSwitches.forEach(toggle => {
            toggle.addEventListener('click', handleToggleClick);
            toggle.addEventListener('keydown', handleToggleKeydown);
        });

        // Keyboard support for modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.modal.classList.contains('show')) {
                hidePreferencesModal();
            }
        });
    }

    /**
     * Show the cookie banner
     */
    function showBanner() {
        elements.banner.classList.add('show');
        elements.bannerOverlay.classList.add('show');
    }

    /**
     * Hide the cookie banner
     */
    function hideBanner() {
        elements.banner.classList.remove('show');
        elements.bannerOverlay.classList.remove('show');
    }

    /**
     * Show the preferences modal
     */
    function showPreferencesModal() {
        elements.modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Focus trap
        const focusableElements = elements.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }

    /**
     * Hide the preferences modal
     */
    function hidePreferencesModal() {
        elements.modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    /**
     * Show floating cookie icon
     */
    function showFloatingIcon() {
        elements.floatingIcon.classList.add('show');
    }

    /**
     * Hide floating cookie icon
     */
    function hideFloatingIcon() {
        elements.floatingIcon.classList.remove('show');
    }

    /**
     * Accept all cookies
     */
    function acceptAllCookies() {
        consentState.categories = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true
        };

        updateConsentMeta();
        saveConsent();
        loadConsentedScripts();
        updateModalToggles();

        hideBanner();
        showFloatingIcon();

        dispatchConsentEvent('accept', { all: true });
    }

    /**
     * Reject all optional cookies
     */
    function rejectAllCookies() {
        consentState.categories = {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false
        };

        updateConsentMeta();
        saveConsent();
        updateModalToggles();

        hideBanner();
        showFloatingIcon();

        dispatchConsentEvent('reject');
    }

    /**
     * Save user preferences
     */
    function savePreferences() {
        updateConsentMeta();
        saveConsent();
        loadConsentedScripts();

        hideBanner();
        hidePreferencesModal();
        showFloatingIcon();

        dispatchConsentEvent('update');
    }

    /**
     * Toggle category accordion content
     */
    function toggleCategoryContent(e) {
        const header = e.currentTarget;
        const content = header.nextElementSibling;

        header.classList.toggle('expanded');
        content.classList.toggle('show');
    }

    /**
     * Handle toggle switch click
     */
    function handleToggleClick(e) {
        const toggle = e.currentTarget;
        const category = toggle.dataset.category;

        if (category === 'necessary') return; // Can't toggle necessary

        const isActive = toggle.classList.contains('active');
        toggle.classList.toggle('active');
        toggle.setAttribute('aria-checked', !isActive);

        consentState.categories[category] = !isActive;
    }

    /**
     * Handle toggle switch keyboard interaction
     */
    function handleToggleKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggleClick(e);
        }
    }

    /**
     * Update modal toggles to reflect current state
     */
    function updateModalToggles() {
        elements.toggleSwitches.forEach(toggle => {
            const category = toggle.dataset.category;
            const isActive = consentState.categories[category];

            if (isActive) {
                toggle.classList.add('active');
                toggle.setAttribute('aria-checked', 'true');
            } else {
                toggle.classList.remove('active');
                toggle.setAttribute('aria-checked', 'false');
            }
        });
    }

    /**
     * Update consent metadata
     */
    function updateConsentMeta() {
        const now = new Date().toISOString();

        if (!consentState.meta.consentId) {
            consentState.meta.consentId = generateUUID();
            consentState.meta.consentDate = now;
        }

        consentState.meta.lastUpdated = now;
        consentState.meta.policyVersion = config.policyVersion;

        // Set expiry date (365 days from now)
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + config.consentExpiry);
        consentState.meta.expiryDate = expiryDate.toISOString();
    }

    /**
     * Save consent to localStorage and cookie
     */
    function saveConsent() {
        // Save to localStorage
        try {
            localStorage.setItem(config.storageKey, JSON.stringify(consentState));
        } catch (e) {
            console.error('Failed to save consent to localStorage:', e);
        }

        // Save to cookie (for server-side access)
        const cookieValue = [
            `necessary:${consentState.categories.necessary ? 1 : 0}`,
            `analytics:${consentState.categories.analytics ? 1 : 0}`,
            `marketing:${consentState.categories.marketing ? 1 : 0}`,
            `functional:${consentState.categories.functional ? 1 : 0}`,
            `v:${config.policyVersion}`
        ].join('|');

        const expires = new Date();
        expires.setDate(expires.getDate() + config.consentExpiry);

        document.cookie = `${config.cookieName}=${cookieValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    }

    /**
     * Get stored consent from localStorage
     */
    function getStoredConsent() {
        try {
            const stored = localStorage.getItem(config.storageKey);
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            console.error('Failed to read consent from localStorage:', e);
            return null;
        }
    }

    /**
     * Check if banner should be shown
     */
    function shouldShowBanner(savedConsent) {
        if (!savedConsent) return true;

        // Check if consent expired
        if (isConsentExpired(savedConsent)) return true;

        // Check if policy version changed
        if (savedConsent.meta.policyVersion !== config.policyVersion) return true;

        return false;
    }

    /**
     * Check if consent has expired
     */
    function isConsentExpired(savedConsent) {
        if (!savedConsent.meta.expiryDate) return true;

        const expiryDate = new Date(savedConsent.meta.expiryDate);
        return expiryDate < new Date();
    }

    /**
     * Load scripts for consented categories
     */
    function loadConsentedScripts() {
        Object.keys(consentState.categories).forEach(category => {
            if (consentState.categories[category]) {
                loadScriptsForCategory(category);
            }
        });
    }

    /**
     * Load scripts for a specific category
     */
    function loadScriptsForCategory(category) {
        const scripts = document.querySelectorAll(`script[data-category="${category}"]`);

        scripts.forEach(script => {
            if (script.type === 'text/plain') {
                const newScript = document.createElement('script');

                // Copy attributes
                if (script.dataset.src) {
                    newScript.src = script.dataset.src;
                } else {
                    newScript.textContent = script.textContent;
                }

                // Copy other attributes
                Array.from(script.attributes).forEach(attr => {
                    if (attr.name !== 'type' && attr.name !== 'data-category' && attr.name !== 'data-src') {
                        newScript.setAttribute(attr.name, attr.value);
                    }
                });

                newScript.type = 'text/javascript';

                // Replace old script with new one
                script.parentNode.replaceChild(newScript, script);

                dispatchConsentEvent('scriptLoaded', { category, scriptSrc: newScript.src });
            }
        });
    }

    /**
     * Dispatch custom event
     */
    function dispatchConsentEvent(eventType, detail = {}) {
        const event = new CustomEvent(`cookieConsent:${eventType}`, {
            detail: {
                ...detail,
                categories: { ...consentState.categories },
                timestamp: new Date().toISOString()
            }
        });

        document.dispatchEvent(event);
    }

    /**
     * Generate UUID v4
     */
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Public API
     */
    window.CookieConsent = {
        // Show/hide controls
        showBanner: showBanner,
        hideBanner: hideBanner,
        showPreferences: showPreferencesModal,
        hidePreferences: hidePreferencesModal,

        // Consent management
        acceptAll: acceptAllCookies,
        rejectAll: rejectAllCookies,
        acceptCategory: (category) => {
            if (consentState.categories.hasOwnProperty(category)) {
                consentState.categories[category] = true;
                saveConsent();
                loadScriptsForCategory(category);
                updateModalToggles();
            }
        },
        rejectCategory: (category) => {
            if (category !== 'necessary' && consentState.categories.hasOwnProperty(category)) {
                consentState.categories[category] = false;
                saveConsent();
                updateModalToggles();
            }
        },

        // Get consent state
        getConsent: () => ({ ...consentState }),
        hasConsent: (category) => consentState.categories[category] || false,
        isConsentValid: () => !isConsentExpired(consentState),

        // Utilities
        reset: () => {
            localStorage.removeItem(config.storageKey);
            document.cookie = `${config.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            location.reload();
        },
        exportConsent: () => JSON.stringify(consentState, null, 2)
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
