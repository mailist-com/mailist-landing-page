/**
 * Cookie Consent Manager - TypeScript Definitions
 * @version 1.0.0
 * @description TypeScript type definitions dla Cookie Consent Manager
 */

// ============================================================================
// TYPY PODSTAWOWE
// ============================================================================

/**
 * Kategorie cookies
 */
export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'functional';

/**
 * Stan zgód na poszczególne kategorie
 */
export interface ConsentCategories {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

/**
 * Metadata zgody
 */
export interface ConsentMeta {
  /** Unikalny identyfikator zgody (UUID v4) */
  consentId: string;
  /** Data wyrażenia zgody (ISO 8601) */
  consentDate: string;
  /** Data ostatniej aktualizacji (ISO 8601) */
  lastUpdated: string;
  /** Wersja polityki cookies */
  policyVersion: string;
  /** Data wygaśnięcia zgody (ISO 8601) */
  expiryDate: string;
}

/**
 * Kompletny stan zgody
 */
export interface ConsentState {
  categories: ConsentCategories;
  meta: ConsentMeta;
}

/**
 * Definicja pojedynczego cookie
 */
export interface CookieDefinition {
  /** Nazwa cookie */
  name: string;
  /** Dostawca (np. "Google", "Facebook") */
  provider: string;
  /** Cel użycia cookie */
  purpose: string;
  /** Czas wygaśnięcia (np. "1 rok", "Sesja") */
  expiry: string;
}

/**
 * Event detail dla custom events
 */
export interface CookieConsentEventDetail {
  init?: { config: CookieConsentConfig };
  show?: { type: 'banner' | 'modal' };
  hide?: { type: 'banner' | 'modal' };
  accept?: { categories: ConsentCategories; all: boolean };
  reject?: { categories: ConsentCategories };
  update?: { previous: ConsentCategories; current: ConsentCategories };
  scriptLoaded?: { category: CookieCategory; scriptSrc: string };
  expired?: { lastConsentDate: string };
}

// ============================================================================
// KONFIGURACJA
// ============================================================================

/**
 * Teksty bannera
 */
export interface BannerTexts {
  title: string;
  description: string;
  acceptAll: string;
  rejectAll: string;
  customize: string;
  privacyLinkText: string;
}

/**
 * Teksty modala
 */
export interface ModalTexts {
  title: string;
  description: string;
  save: string;
  acceptAll: string;
  rejectAll: string;
  close: string;
  alwaysActive: string;
  cookieTableHeaders: {
    name: string;
    provider: string;
    purpose: string;
    expiry: string;
  };
}

/**
 * Teksty dla kategorii cookies
 */
export interface CategoryTexts {
  title: string;
  description: string;
}

/**
 * Teksty floating button
 */
export interface FloatingButtonTexts {
  tooltip: string;
}

/**
 * Wszystkie teksty
 */
export interface CookieConsentTexts {
  banner: BannerTexts;
  modal: ModalTexts;
  categories: {
    necessary: CategoryTexts;
    analytics: CategoryTexts;
    marketing: CategoryTexts;
    functional: CategoryTexts;
  };
  floatingButton: FloatingButtonTexts;
}

/**
 * Definicje cookies dla wszystkich kategorii
 */
export interface CookieDefinitions {
  necessary?: CookieDefinition[];
  analytics?: CookieDefinition[];
  marketing?: CookieDefinition[];
  functional?: CookieDefinition[];
}

/**
 * Opcje konfiguracyjne
 */
export interface CookieConsentOptions {
  /** Czas ważności zgody w dniach (domyślnie: 365) */
  consentExpiry?: number;
  /** Wersja polityki cookies (domyślnie: "1.0") */
  policyVersion?: string;
  /** URL do polityki prywatności */
  privacyPolicyUrl?: string;
  /** Czy pokazać floating icon po wyrażeniu zgody (domyślnie: true) */
  showFloatingIcon?: boolean;
  /** Pozycja floating icon (domyślnie: "left") */
  floatingIconPosition?: 'left' | 'right';
  /** Włącz overlay pod bannerem (domyślnie: true) */
  overlayEnabled?: boolean;
  /** Automatycznie blokuj skrypty z data-category (domyślnie: true) */
  autoBlockScripts?: boolean;
  /** Tryb debugowania - logi w konsoli (domyślnie: false) */
  debug?: boolean;
  /** Domyślne wartości kategorii */
  defaultCategories?: ConsentCategories;
}

/**
 * Pełna konfiguracja Cookie Consent
 */
export interface CookieConsentConfig {
  /** Teksty interfejsu */
  texts?: Partial<CookieConsentTexts>;
  /** Definicje cookies */
  cookies?: CookieDefinitions;
  /** Opcje */
  options?: CookieConsentOptions;
  /** Callback po inicjalizacji */
  onInit?: () => void;
  /** Callback po zaakceptowaniu */
  onAccept?: (categories: ConsentCategories) => void;
  /** Callback po odrzuceniu */
  onReject?: () => void;
  /** Callback po zmianie preferencji */
  onChange?: (previous: ConsentCategories, current: ConsentCategories) => void;
}

// ============================================================================
// API
// ============================================================================

/**
 * Publiczne API Cookie Consent Manager
 */
export interface CookieConsentAPI {
  /**
   * Inicjalizuje Cookie Consent Manager z podaną konfiguracją
   * @param config - Konfiguracja (opcjonalna, używa domyślnej jeśli nie podano)
   * @returns API instance dla łańcuchowania
   */
  init(config?: CookieConsentConfig): CookieConsentAPI;

  /**
   * Pokazuje banner cookie
   */
  show(): void;

  /**
   * Ukrywa banner cookie
   */
  hide(): void;

  /**
   * Pokazuje modal preferencji
   */
  showPreferences(): void;

  /**
   * Ukrywa modal preferencji
   */
  hidePreferences(): void;

  /**
   * Akceptuje wszystkie kategorie cookies
   */
  acceptAll(): void;

  /**
   * Odrzuca wszystkie opcjonalne kategorie (oprócz necessary)
   */
  rejectAll(): void;

  /**
   * Akceptuje konkretną kategorię cookies
   * @param category - Kategoria do zaakceptowania
   */
  acceptCategory(category: CookieCategory): void;

  /**
   * Odrzuca konkretną kategorię cookies (nie dotyczy 'necessary')
   * @param category - Kategoria do odrzucenia
   */
  rejectCategory(category: CookieCategory): void;

  /**
   * Zapisuje preferencje z UI (odczytuje stan toggles)
   */
  savePreferences(): void;

  /**
   * Zwraca pełny stan zgody
   * @returns Obiekt ConsentState lub null jeśli brak zgód
   */
  getConsent(): ConsentState | null;

  /**
   * Sprawdza czy użytkownik wyraził zgodę na daną kategorię
   * @param category - Kategoria do sprawdzenia
   * @returns true jeśli zgoda została wyrażona
   */
  hasConsent(category: CookieCategory): boolean;

  /**
   * Sprawdza czy zgoda jest nadal ważna (nie wygasła, aktualna wersja polityki)
   * @returns true jeśli zgoda jest ważna
   */
  isConsentValid(): boolean;

  /**
   * Resetuje wszystkie zgody (czyści localStorage i cookies)
   */
  reset(): void;

  /**
   * Eksportuje zgody jako JSON string (dla celów compliance)
   * @returns JSON string z zgodami
   */
  exportConsent(): string;

  /**
   * Rejestruje event listener
   * @param eventName - Nazwa eventu (bez prefiksu 'cookieConsent:')
   * @param callback - Funkcja callback
   */
  on(
    eventName: 'init' | 'show' | 'hide' | 'accept' | 'reject' | 'update' | 'scriptLoaded' | 'expired',
    callback: (detail: any) => void
  ): void;
}

// ============================================================================
// CUSTOM EVENTS
// ============================================================================

/**
 * Custom event types
 */
export interface CookieConsentEvents {
  'cookieConsent:init': CustomEvent<{ config: CookieConsentConfig }>;
  'cookieConsent:show': CustomEvent<{ type: 'banner' | 'modal' }>;
  'cookieConsent:hide': CustomEvent<{ type: 'banner' | 'modal' }>;
  'cookieConsent:accept': CustomEvent<{ categories: ConsentCategories; all: boolean }>;
  'cookieConsent:reject': CustomEvent<{ categories: ConsentCategories }>;
  'cookieConsent:update': CustomEvent<{ previous: ConsentCategories; current: ConsentCategories }>;
  'cookieConsent:scriptLoaded': CustomEvent<{ category: CookieCategory; scriptSrc: string }>;
  'cookieConsent:expired': CustomEvent<{ lastConsentDate: string }>;
}

// ============================================================================
// GLOBAL WINDOW INTERFACE
// ============================================================================

declare global {
  interface Window {
    /**
     * Globalny obiekt Cookie Consent API
     */
    CookieConsent: CookieConsentAPI;
  }

  interface DocumentEventMap extends CookieConsentEvents {}
}

// ============================================================================
// EKSPORT
// ============================================================================

/**
 * Główny export - CookieConsent API
 */
declare const CookieConsent: CookieConsentAPI;

export default CookieConsent;
