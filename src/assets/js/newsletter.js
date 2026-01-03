/*
Newsletter Subscription Handler
Integrates with Mailist API for subscriber management
*/

class NewsletterSubscription {
    constructor() {
        // Use runtime configuration from window object
        const config = window.MAILIST_CONFIG || {};
        this.apiUrl = 'https://api.mailist.pl/api/v1/contacts';
        this.apiKey = 'ml_live_eRxe48waUhiB-AZqPvYKEPP9f8BijkSAk6NOK04Kal8';
        this.listName = 'Mailist - Newsletter';
        this.form = null;
        this.emailInput = null;
        this.submitButton = null;
    }

    /**
     * Initialize the newsletter subscription functionality
     */
    init() {
        // Find all newsletter forms on the page
        const newsletterForms = document.querySelectorAll('.newsletter-form');

        newsletterForms.forEach(form => {
            this.setupForm(form);
        });
    }

    /**
     * Setup individual form
     */
    setupForm(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button[type="submit"]');

        if (!emailInput || !submitButton) {
            console.error('Newsletter form is missing required elements');
            return;
        }

        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleSubmit(emailInput, submitButton, form);
        });

        // Allow submission with Enter key
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleSubmit(emailInput, submitButton, form);
            }
        });
    }

    /**
     * Handle form submission
     */
    async handleSubmit(emailInput, submitButton, form) {
        const email = emailInput.value.trim();

        // Validate email
        if (!this.validateEmail(email)) {
            this.showMessage(form, 'Proszę podać prawidłowy adres email', 'error');
            return;
        }

        // Check if API is configured
        if (!this.apiUrl || !this.apiKey) {
            this.showMessage(form, 'Błąd konfiguracji. Skontaktuj się z administratorem.', 'error');
            console.error('Newsletter API not configured in config.js');
            return;
        }

        // Disable button during submission
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Zapisywanie...';

        try {
            await this.subscribe(email);
            this.showMessage(form, 'Dziękujemy! Zostałeś zapisany do newslettera.', 'success');
            emailInput.value = '';
        } catch (error) {
            this.showMessage(form, this.getErrorMessage(error), 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    }

    /**
     * Subscribe email to newsletter via Mailist API
     */
    async subscribe(email) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': this.apiKey
            },
            body: JSON.stringify({
                email: email,
                list_name: this.listName,
                tags: ['LANDING_PAGE']
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    /**
     * Validate email format
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Get user-friendly error message
     */
    getErrorMessage(error) {
        const errorMessage = error.message.toLowerCase();

        if (errorMessage.includes('already exists') || errorMessage.includes('duplicate')) {
            return 'Ten adres email jest już zapisany do newslettera.';
        }

        if (errorMessage.includes('invalid email')) {
            return 'Podany adres email jest nieprawidłowy.';
        }

        if (errorMessage.includes('permission') || errorMessage.includes('403')) {
            return 'Błąd autoryzacji. Skontaktuj się z administratorem.';
        }

        return 'Wystąpił błąd podczas zapisu. Spróbuj ponownie później.';
    }

    /**
     * Show message to user
     */
    showMessage(form, message, type) {
        // Remove existing messages
        const existingMessage = form.querySelector('.newsletter-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `newsletter-message mt-2 text-sm ${
            type === 'success' ? 'text-green-400' : 'text-red-400'
        }`;
        messageDiv.textContent = message;

        // Insert after the form
        form.appendChild(messageDiv);

        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }
    }
}

// Initialize newsletter subscription when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const newsletter = new NewsletterSubscription();
    newsletter.init();
});

// Also reinitialize when components are dynamically loaded
// This handles cases where footer is loaded asynchronously (regulamin, polityka-prywatnosci pages)
document.addEventListener('componentsLoaded', function() {
    const newsletter = new NewsletterSubscription();
    newsletter.init();
});
