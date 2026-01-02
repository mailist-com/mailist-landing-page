(function(window) {
  'use strict';

  // ============================================================================
  // KONFIGURACJA DOMYŚLNA
  // ============================================================================

  const DEFAULT_CONFIG = {
    texts: {
      banner: {
        title: "🍪 Używamy plików cookies",
        description: "Nasza strona wykorzystuje pliki cookies w celu zapewnienia prawidłowego działania, analizy ruchu oraz personalizacji treści. Klikając „Akceptuj wszystkie", wyrażasz zgodę na używanie wszystkich cookies. Możesz też dostosować swoje preferencje.",
        acceptAll: "Akceptuj wszystkie",
        rejectAll: "Odrzuć wszystkie",
        customize: "Dostosuj preferencje",
        privacyLinkText: "Polityka prywatności"
      },
      modal: {
        title: "Centrum preferencji cookies",
        description: "Zarządzaj swoimi preferencjami dotyczącymi plików cookies. Możesz włączyć lub wyłączyć poszczególne kategorie. Pamiętaj, że wyłączenie niektórych cookies może wpłynąć na działanie strony.",
        save: "Zapisz preferencje",
        acceptAll: "Akceptuj wszystkie",
        rejectAll: "Odrzuć wszystkie",
        close: "Zamknij",
        alwaysActive: "Zawsze aktywne",
        cookieTableHeaders: {
          name: "Nazwa",
          provider: "Dostawca",
          purpose: "Cel",
          expiry: "Wygasa"
        }
      },
      categories: {
        necessary: {
          title: "Niezbędne",
          description: "Te cookies są konieczne do prawidłowego funkcjonowania strony i nie mogą być wyłączone. Są ustawiane w odpowiedzi na działania użytkownika, takie jak ustawienie preferencji prywatności, logowanie czy wypełnianie formularzy."
        },
        analytics: {
          title: "Analityczne",
          description: "Te cookies pozwalają nam liczyć wizyty i źródła ruchu, dzięki czemu możemy mierzyć i poprawiać wydajność naszej strony. Pomagają nam określić, które strony są najbardziej i najmniej popularne."
        },
        marketing: {
          title: "Marketingowe",
          description: "Te cookies mogą być ustawiane przez naszych partnerów reklamowych za pośrednictwem naszej strony. Mogą być używane do budowania profilu zainteresowań i wyświetlania odpowiednich reklam na innych stronach."
        },
        functional: {
          title: "Funkcjonalne",
          description: "Te cookies umożliwiają rozszerzoną funkcjonalność i personalizację, taką jak czaty na żywo, filmy i mapy. Mogą być ustawiane przez nas lub zewnętrznych dostawców, których usługi dodaliśmy do naszych stron."
        }
      },
      floatingButton: {
        tooltip: "Zarządzaj cookies"
      }
    },
    cookies: {
      necessary: [
        {
          name: "cookie_consent",
          provider: "Ta strona",
          purpose: "Przechowuje preferencje zgody użytkownika",
          expiry: "1 rok"
        }
      ],
      analytics: [
        {
          name: "_ga",
          provider: "Google",
          purpose: "Rozróżnianie użytkowników w Google Analytics",
          expiry: "2 lata"
        },
        {
          name: "_gid",
          provider: "Google",
          purpose: "Rozróżnianie użytkowników w Google Analytics",
          expiry: "24 godziny"
        }
      ],
      marketing: [
        {
          name: "_fbp",
          provider: "Facebook",
          purpose: "Śledzenie konwersji Facebook Pixel",
          expiry: "3 miesiące"
        }
      ],
      functional: []
    },
    options: {
      consentExpiry: 365,
      policyVersion: "1.0",
      privacyPolicyUrl: "/polityka-prywatnosci",
      showFloatingIcon: true,
      floatingIconPosition: "left",
      overlayEnabled: true,
      autoBlockScripts: true,
      debug: false,
      defaultCategories: {
        necessary: true,
        analytics: false,
        marketing: false,
        functional: false
      }
    },
    onInit: null,
    onAccept: null,
    onReject: null,
    onChange: null
  };

  // ============================================================================
  // KLASA GŁÓWNA
  // ============================================================================

  class CookieConsentManager {
    constructor() {
      this.config = null;
      this.consentState = null;
      this.elements = {};
      this.eventListeners = {};
      this.focusTrap = null;
      this.lastFocusedElement = null;
    }

    // ========================================================================
    // INICJALIZACJA
    // ========================================================================

    init(userConfig = {}) {
      this.config = this._mergeConfig(DEFAULT_CONFIG, userConfig);
      this._log('Inicjalizacja Cookie Consent Manager', this.config);

      // Załaduj zapisane zgody
      this.consentState = this._loadConsent();

      // Renderuj UI
      this._renderUI();

      // Sprawdź czy pokazać banner
      if (this._shouldShowBanner()) {
        this.show();
      } else {
        if (this.config.options.showFloatingIcon) {
          this._showFloatingIcon();
        }
        this._loadConsentedScripts();
      }

      // Wywołaj callback
      if (this.config.onInit) {
        this.config.onInit();
      }

      // Dispatch event
      this._dispatchEvent('init', { config: this.config });

      return this;
    }

    // ========================================================================
    // PUBLICZNE API - STEROWANIE UI
    // ========================================================================

    show() {
      const banner = this.elements.banner;
      if (banner) {
        banner.classList.remove('cc-hidden');
        banner.classList.add('cc-visible');
        this._dispatchEvent('show', { type: 'banner' });
      }
    }

    hide() {
      const banner = this.elements.banner;
      if (banner) {
        banner.classList.remove('cc-visible');
        banner.classList.add('cc-hidden');
        this._dispatchEvent('hide', { type: 'banner' });

        if (this.config.options.showFloatingIcon) {
          this._showFloatingIcon();
        }
      }
    }

    showPreferences() {
      const modal = this.elements.modal;
      if (modal) {
        this.lastFocusedElement = document.activeElement;
        modal.classList.remove('cc-hidden');
        modal.classList.add('cc-visible');

        // Focus trap
        this._setupFocusTrap(modal);

        // Focus na pierwszym elementie
        const firstFocusable = modal.querySelector('button, [tabindex="0"]');
        if (firstFocusable) {
          setTimeout(() => firstFocusable.focus(), 100);
        }

        this._dispatchEvent('show', { type: 'modal' });
      }
    }

    hidePreferences() {
      const modal = this.elements.modal;
      if (modal) {
        modal.classList.remove('cc-visible');
        modal.classList.add('cc-hidden');

        // Zwróć focus
        if (this.lastFocusedElement) {
          this.lastFocusedElement.focus();
        }

        // Usuń focus trap
        this._removeFocusTrap();

        this._dispatchEvent('hide', { type: 'modal' });
      }
    }

    // ========================================================================
    // PUBLICZNE API - ZARZĄDZANIE ZGODAMI
    // ========================================================================

    acceptAll() {
      const categories = {
        necessary: true,
        analytics: true,
        marketing: true,
        functional: true
      };
      this._updateConsent(categories);
      this.hide();
      this.hidePreferences();

      if (this.config.onAccept) {
        this.config.onAccept(categories);
      }

      this._dispatchEvent('accept', { categories, all: true });
    }

    rejectAll() {
      const categories = { ...this.config.options.defaultCategories };
      this._updateConsent(categories);
      this.hide();
      this.hidePreferences();

      if (this.config.onReject) {
        this.config.onReject();
      }

      this._dispatchEvent('reject', { categories });
    }

    acceptCategory(category) {
      if (!this.consentState) {
        this.consentState = this._createConsentState(this.config.options.defaultCategories);
      }

      const previous = { ...this.consentState.categories };
      this.consentState.categories[category] = true;
      this._saveConsent(this.consentState);
      this._loadConsentedScripts();

      if (this.config.onChange) {
        this.config.onChange(previous, this.consentState.categories);
      }

      this._dispatchEvent('update', { previous, current: this.consentState.categories });
    }

    rejectCategory(category) {
      if (category === 'necessary') {
        this._log('Nie można odrzucić kategorii "necessary"', 'warn');
        return;
      }

      if (!this.consentState) {
        this.consentState = this._createConsentState(this.config.options.defaultCategories);
      }

      const previous = { ...this.consentState.categories };
      this.consentState.categories[category] = false;
      this._saveConsent(this.consentState);

      if (this.config.onChange) {
        this.config.onChange(previous, this.consentState.categories);
      }

      this._dispatchEvent('update', { previous, current: this.consentState.categories });
    }

    savePreferences() {
      // Pobierz stan toggles z UI
      const categories = this._getTogglesState();
      this._updateConsent(categories);
      this.hidePreferences();

      if (this.config.onChange) {
        this.config.onChange(this.consentState.categories, categories);
      }

      this._dispatchEvent('update', {
        previous: this.consentState.categories,
        current: categories
      });
    }

    // ========================================================================
    // PUBLICZNE API - POBIERANIE STANU
    // ========================================================================

    getConsent() {
      return this.consentState;
    }

    hasConsent(category) {
      return this.consentState && this.consentState.categories[category] === true;
    }

    isConsentValid() {
      if (!this.consentState) return false;

      const expiryDate = new Date(this.consentState.meta.expiryDate);
      const now = new Date();

      return expiryDate > now &&
             this.consentState.meta.policyVersion === this.config.options.policyVersion;
    }

    // ========================================================================
    // PUBLICZNE API - UTILITIES
    // ========================================================================

    reset() {
      localStorage.removeItem('cookieConsent');
      this._deleteCookie('cookie_consent');
      this.consentState = null;
      this._log('Zgody zostały zresetowane');

      // Ukryj floating icon, pokaż banner
      if (this.elements.floatingIcon) {
        this.elements.floatingIcon.remove();
      }
      this.show();
    }

    exportConsent() {
      return JSON.stringify(this.consentState, null, 2);
    }

    on(eventName, callback) {
      if (!this.eventListeners[eventName]) {
        this.eventListeners[eventName] = [];
      }
      this.eventListeners[eventName].push(callback);
    }

    // ========================================================================
    // PRYWATNE METODY - ZARZĄDZANIE ZGODAMI
    // ========================================================================

    _updateConsent(categories) {
      const previous = this.consentState ? { ...this.consentState.categories } : null;

      this.consentState = this._createConsentState(categories);
      this._saveConsent(this.consentState);
      this._loadConsentedScripts();

      // Zaktualizuj UI toggles
      this._updateToggles(categories);
    }

    _createConsentState(categories) {
      const now = new Date();
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + this.config.options.consentExpiry);

      return {
        categories: { ...categories },
        meta: {
          consentId: this._generateUUID(),
          consentDate: now.toISOString(),
          lastUpdated: now.toISOString(),
          policyVersion: this.config.options.policyVersion,
          expiryDate: expiry.toISOString()
        }
      };
    }

    _saveConsent(consentState) {
      // Zapisz do localStorage
      try {
        localStorage.setItem('cookieConsent', JSON.stringify(consentState));
      } catch (e) {
        this._log('Błąd zapisu do localStorage: ' + e.message, 'error');
      }

      // Zapisz do cookie
      const cookieValue = this._serializeConsentCookie(consentState);
      const expiry = this.config.options.consentExpiry;
      this._setCookie('cookie_consent', cookieValue, expiry);

      this._log('Zgody zapisane', consentState);
    }

    _loadConsent() {
      try {
        const stored = localStorage.getItem('cookieConsent');
        if (stored) {
          const consent = JSON.parse(stored);
          this._log('Zgody załadowane z localStorage', consent);
          return consent;
        }
      } catch (e) {
        this._log('Błąd odczytu z localStorage: ' + e.message, 'error');
      }
      return null;
    }

    _shouldShowBanner() {
      if (!this.consentState) {
        this._log('Brak zapisanych zgód - pokazuję banner');
        return true;
      }

      if (!this.isConsentValid()) {
        this._log('Zgoda wygasła lub nieaktualna wersja - pokazuję banner');
        this._dispatchEvent('expired', { lastConsentDate: this.consentState.meta.consentDate });
        return true;
      }

      this._log('Zgoda ważna - ukrywam banner');
      return false;
    }

    // ========================================================================
    // PRYWATNE METODY - BLOKOWANIE SKRYPTÓW
    // ========================================================================

    _loadConsentedScripts() {
      if (!this.config.options.autoBlockScripts) return;

      const categories = ['necessary', 'analytics', 'marketing', 'functional'];

      categories.forEach(category => {
        if (this.hasConsent(category)) {
          this._loadScriptsForCategory(category);
        }
      });
    }

    _loadScriptsForCategory(category) {
      const scripts = document.querySelectorAll(`script[type="text/plain"][data-category="${category}"]`);

      scripts.forEach(script => {
        // Sprawdź czy już załadowany
        if (script.dataset.loaded === 'true') return;

        const newScript = document.createElement('script');

        // Kopiuj atrybuty
        Array.from(script.attributes).forEach(attr => {
          if (attr.name !== 'type' && attr.name !== 'data-category') {
            newScript.setAttribute(attr.name, attr.value);
          }
        });

        // data-src -> src
        if (script.dataset.src) {
          newScript.src = script.dataset.src;
        } else {
          // Inline script
          newScript.textContent = script.textContent;
        }

        newScript.type = 'text/javascript';

        // Wstaw zaraz po oryginalnym
        script.parentNode.insertBefore(newScript, script.nextSibling);

        // Oznacz jako załadowany
        script.dataset.loaded = 'true';

        this._log(`Załadowano skrypt dla kategorii: ${category}`, script.dataset.src || 'inline');
        this._dispatchEvent('scriptLoaded', {
          category,
          scriptSrc: script.dataset.src || 'inline'
        });
      });
    }

    // ========================================================================
    // PRYWATNE METODY - RENDEROWANIE UI
    // ========================================================================

    _renderUI() {
      // Stwórz container
      const container = document.createElement('div');
      container.id = 'cookie-consent-container';
      container.innerHTML = this._getHTML();
      document.body.appendChild(container);

      // Zapisz referencje do elementów
      this.elements.banner = document.getElementById('cc-banner');
      this.elements.modal = document.getElementById('cc-modal');
      this.elements.overlay = document.getElementById('cc-modal-overlay');

      // Podepnij event listenery
      this._attachEventListeners();

      this._log('UI zrenderowane');
    }

    _getHTML() {
      return `
        ${this._getBannerHTML()}
        ${this._getModalHTML()}
      `;
    }

    _getBannerHTML() {
      const t = this.config.texts.banner;
      return `
        <div id="cc-banner" class="cc-banner cc-hidden" role="region" aria-label="Cookie consent banner">
          ${this.config.options.overlayEnabled ? '<div class="cc-overlay"></div>' : ''}
          <div class="cc-banner-content">
            <div class="cc-banner-text">
              <h2 class="cc-banner-title">${t.title}</h2>
              <p class="cc-banner-description">
                ${t.description}
                <a href="${this.config.options.privacyPolicyUrl}" class="cc-link" target="_blank" rel="noopener">
                  ${t.privacyLinkText}
                </a>
              </p>
            </div>
            <div class="cc-banner-actions">
              <button type="button" class="cc-btn cc-btn-primary" data-action="accept-all">
                ${t.acceptAll}
              </button>
              <button type="button" class="cc-btn cc-btn-secondary" data-action="reject-all">
                ${t.rejectAll}
              </button>
              <button type="button" class="cc-btn cc-btn-tertiary" data-action="customize">
                ${t.customize}
              </button>
            </div>
          </div>
        </div>
      `;
    }

    _getModalHTML() {
      const t = this.config.texts.modal;
      return `
        <div id="cc-modal" class="cc-modal cc-hidden" role="dialog" aria-modal="true" aria-labelledby="cc-modal-title">
          <div id="cc-modal-overlay" class="cc-modal-overlay"></div>
          <div class="cc-modal-content">
            <div class="cc-modal-header">
              <h2 id="cc-modal-title" class="cc-modal-title">${t.title}</h2>
              <button type="button" class="cc-modal-close" data-action="close-modal" aria-label="${t.close}">
                <svg class="cc-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div class="cc-modal-body">
              <p class="cc-modal-description">${t.description}</p>

              <div class="cc-categories">
                ${this._getCategoriesHTML()}
              </div>
            </div>

            <div class="cc-modal-footer">
              <button type="button" class="cc-btn cc-btn-primary" data-action="save-preferences">
                ${t.save}
              </button>
              <button type="button" class="cc-btn cc-btn-secondary" data-action="accept-all">
                ${t.acceptAll}
              </button>
              <button type="button" class="cc-btn cc-btn-tertiary" data-action="reject-all">
                ${t.rejectAll}
              </button>
            </div>
          </div>
        </div>
      `;
    }

    _getCategoriesHTML() {
      const categories = ['necessary', 'analytics', 'marketing', 'functional'];
      return categories.map(cat => this._getCategoryHTML(cat)).join('');
    }

    _getCategoryHTML(category) {
      const t = this.config.texts.categories[category];
      const cookies = this.config.cookies[category] || [];
      const isNecessary = category === 'necessary';
      const isChecked = this.consentState ? this.consentState.categories[category] : isNecessary;

      return `
        <div class="cc-category">
          <div class="cc-category-header">
            <button
              type="button"
              class="cc-category-toggle-btn"
              data-category="${category}"
              aria-expanded="false"
              aria-controls="cc-category-content-${category}"
            >
              <div class="cc-category-title-group">
                <span class="cc-category-title">${t.title}</span>
                ${cookies.length > 0 ? `<span class="cc-category-count">${cookies.length} cookies</span>` : ''}
              </div>
              <svg class="cc-category-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <div class="cc-category-switch">
              ${isNecessary ?
                `<span class="cc-always-active">${this.config.texts.modal.alwaysActive}</span>` :
                this._getToggleSwitchHTML(category, isChecked)
              }
            </div>
          </div>

          <div id="cc-category-content-${category}" class="cc-category-content cc-hidden" aria-hidden="true">
            <p class="cc-category-description">${t.description}</p>
            ${cookies.length > 0 ? this._getCookieTableHTML(cookies) : ''}
          </div>
        </div>
      `;
    }

    _getToggleSwitchHTML(category, isChecked) {
      return `
        <button
          type="button"
          role="switch"
          aria-checked="${isChecked}"
          aria-label="Włącz cookies ${this.config.texts.categories[category].title.toLowerCase()}"
          class="cc-toggle ${isChecked ? 'cc-toggle-on' : 'cc-toggle-off'}"
          data-toggle="${category}"
        >
          <span class="cc-toggle-slider"></span>
        </button>
      `;
    }

    _getCookieTableHTML(cookies) {
      const headers = this.config.texts.modal.cookieTableHeaders;
      return `
        <table class="cc-cookie-table">
          <thead>
            <tr>
              <th>${headers.name}</th>
              <th>${headers.provider}</th>
              <th>${headers.purpose}</th>
              <th>${headers.expiry}</th>
            </tr>
          </thead>
          <tbody>
            ${cookies.map(cookie => `
              <tr>
                <td><code>${cookie.name}</code></td>
                <td>${cookie.provider}</td>
                <td>${cookie.purpose}</td>
                <td>${cookie.expiry}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    _showFloatingIcon() {
      // Usuń istniejącą ikonę jeśli istnieje
      if (this.elements.floatingIcon) {
        this.elements.floatingIcon.remove();
      }

      const position = this.config.options.floatingIconPosition;
      const icon = document.createElement('button');
      icon.className = `cc-floating-icon cc-floating-icon-${position}`;
      icon.setAttribute('aria-label', this.config.texts.floatingButton.tooltip);
      icon.innerHTML = '🍪';
      icon.dataset.action = 'show-preferences';

      // Tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'cc-tooltip';
      tooltip.textContent = this.config.texts.floatingButton.tooltip;
      icon.appendChild(tooltip);

      document.body.appendChild(icon);
      this.elements.floatingIcon = icon;

      // Event listener
      icon.addEventListener('click', () => this.showPreferences());

      // Animacja pulse na początku
      setTimeout(() => icon.classList.add('cc-pulse'), 500);
      setTimeout(() => icon.classList.remove('cc-pulse'), 3000);
    }

    // ========================================================================
    // PRYWATNE METODY - EVENT LISTENERS
    // ========================================================================

    _attachEventListeners() {
      // Delegacja zdarzeń na document
      document.addEventListener('click', (e) => {
        const action = e.target.closest('[data-action]')?.dataset.action;
        if (!action) return;

        switch (action) {
          case 'accept-all':
            this.acceptAll();
            break;
          case 'reject-all':
            this.rejectAll();
            break;
          case 'customize':
            this.showPreferences();
            break;
          case 'save-preferences':
            this.savePreferences();
            break;
          case 'close-modal':
            this.hidePreferences();
            break;
          case 'show-preferences':
            this.showPreferences();
            break;
        }
      });

      // Toggle switches
      document.addEventListener('click', (e) => {
        const toggle = e.target.closest('[data-toggle]');
        if (!toggle) return;

        const category = toggle.dataset.toggle;
        const currentState = toggle.getAttribute('aria-checked') === 'true';
        const newState = !currentState;

        toggle.setAttribute('aria-checked', newState);
        toggle.classList.toggle('cc-toggle-on', newState);
        toggle.classList.toggle('cc-toggle-off', !newState);
      });

      // Accordion categories
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('.cc-category-toggle-btn');
        if (!btn) return;

        const category = btn.dataset.category;
        const content = document.getElementById(`cc-category-content-${category}`);
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        btn.setAttribute('aria-expanded', !isExpanded);
        content.classList.toggle('cc-hidden', isExpanded);
        content.setAttribute('aria-hidden', isExpanded);
        btn.querySelector('.cc-category-arrow').classList.toggle('cc-rotated', !isExpanded);
      });

      // Overlay click
      if (this.elements.overlay) {
        this.elements.overlay.addEventListener('click', () => {
          this.hidePreferences();
        });
      }

      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (this.elements.modal && !this.elements.modal.classList.contains('cc-hidden')) {
            this.hidePreferences();
          }
        }
      });

      this._log('Event listeners podpięte');
    }

    // ========================================================================
    // PRYWATNE METODY - FOCUS TRAP
    // ========================================================================

    _setupFocusTrap(modal) {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      this.focusTrap = (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      modal.addEventListener('keydown', this.focusTrap);
    }

    _removeFocusTrap() {
      if (this.focusTrap && this.elements.modal) {
        this.elements.modal.removeEventListener('keydown', this.focusTrap);
        this.focusTrap = null;
      }
    }

    // ========================================================================
    // PRYWATNE METODY - UTILITIES
    // ========================================================================

    _getTogglesState() {
      const categories = {};
      ['necessary', 'analytics', 'marketing', 'functional'].forEach(cat => {
        const toggle = document.querySelector(`[data-toggle="${cat}"]`);
        categories[cat] = cat === 'necessary' ? true : (toggle ? toggle.getAttribute('aria-checked') === 'true' : false);
      });
      return categories;
    }

    _updateToggles(categories) {
      Object.keys(categories).forEach(cat => {
        const toggle = document.querySelector(`[data-toggle="${cat}"]`);
        if (toggle) {
          const state = categories[cat];
          toggle.setAttribute('aria-checked', state);
          toggle.classList.toggle('cc-toggle-on', state);
          toggle.classList.toggle('cc-toggle-off', !state);
        }
      });
    }

    _serializeConsentCookie(consentState) {
      const cats = consentState.categories;
      return `necessary:${cats.necessary?1:0}|analytics:${cats.analytics?1:0}|marketing:${cats.marketing?1:0}|functional:${cats.functional?1:0}|v:${consentState.meta.policyVersion}`;
    }

    _setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = `expires=${date.toUTCString()}`;
      const secure = window.location.protocol === 'https:' ? ';Secure' : '';
      document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax${secure}`;
    }

    _deleteCookie(name) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }

    _generateUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    _mergeConfig(defaultConfig, userConfig) {
      const merged = JSON.parse(JSON.stringify(defaultConfig));

      // Deep merge
      const merge = (target, source) => {
        Object.keys(source).forEach(key => {
          if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            merge(target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        });
      };

      merge(merged, userConfig);
      return merged;
    }

    _dispatchEvent(eventName, detail = {}) {
      const event = new CustomEvent(`cookieConsent:${eventName}`, { detail });
      document.dispatchEvent(event);

      // Wywołaj custom listeners
      if (this.eventListeners[eventName]) {
        this.eventListeners[eventName].forEach(callback => callback(detail));
      }
    }

    _log(message, type = 'log', data = null) {
      if (!this.config || !this.config.options.debug) return;

      const style = 'color: #4F46E5; font-weight: bold;';
      console[type](`%c[CookieConsent]`, style, message, data || '');
    }
  }

  // ============================================================================
  // EKSPORT GLOBALNY
  // ============================================================================

  const instance = new CookieConsentManager();

  window.CookieConsent = {
    init: (config) => instance.init(config),
    show: () => instance.show(),
    hide: () => instance.hide(),
    showPreferences: () => instance.showPreferences(),
    hidePreferences: () => instance.hidePreferences(),
    acceptAll: () => instance.acceptAll(),
    rejectAll: () => instance.rejectAll(),
    acceptCategory: (cat) => instance.acceptCategory(cat),
    rejectCategory: (cat) => instance.rejectCategory(cat),
    savePreferences: () => instance.savePreferences(),
    getConsent: () => instance.getConsent(),
    hasConsent: (cat) => instance.hasConsent(cat),
    isConsentValid: () => instance.isConsentValid(),
    reset: () => instance.reset(),
    exportConsent: () => instance.exportConsent(),
    on: (event, callback) => instance.on(event, callback)
  };

})(window);
