// ========================================
// MAILIST LANDING PAGE - INTERACTIVE FEATURES
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navButtons.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // ========================================
    // Sticky Navigation
    // ========================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (navLinks) navLinks.classList.remove('active');
                    if (navButtons) navButtons.classList.remove('active');
                    if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // ========================================
    // FAQ Accordion
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // ========================================
    // Pricing Toggle (Monthly/Yearly)
    // ========================================
    const pricingToggle = document.querySelector('.toggle-switch');
    const toggleLabels = document.querySelectorAll('.toggle-label');

    if (pricingToggle) {
        pricingToggle.addEventListener('click', function() {
            const isYearly = this.getAttribute('aria-checked') === 'true';
            this.setAttribute('aria-checked', !isYearly);

            // Update active label
            toggleLabels.forEach(label => label.classList.toggle('active'));

            // Update prices
            updatePricing(!isYearly);
        });
    }

    function updatePricing(isYearly) {
        const prices = {
            free: { monthly: 0, yearly: 0 },
            pro: { monthly: 149, yearly: 119 },
            advanced: { monthly: 299, yearly: 239 }
        };

        // Update price displays
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach((card, index) => {
            const priceAmount = card.querySelector('.price-amount');
            if (priceAmount && index > 0) {
                const plan = index === 1 ? 'pro' : 'advanced';
                const newPrice = isYearly ? prices[plan].yearly : prices[plan].monthly;

                // Animate price change
                animateValue(priceAmount, parseInt(priceAmount.textContent), newPrice, 300);
            }
        });
    }

    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16); // 60 FPS
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                element.textContent = end;
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current);
            }
        }, 16);
    }

    // ========================================
    // Email Input Validation
    // ========================================
    const emailInputs = document.querySelectorAll('.email-input');

    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateEmail(this);
        });

        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    });

    function validateEmail(input) {
        const email = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            input.style.borderColor = '#EF4444';
            return false;
        } else if (email) {
            input.style.borderColor = '#10B981';
            return true;
        }
        return false;
    }

    // ========================================
    // CTA Button Click Handlers
    // ========================================
    const ctaButtons = document.querySelectorAll('.btn-primary');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const text = this.textContent.trim();

            if (text.includes('Zacznij') || text.includes('Rozpocznij') || text.includes('Wypróbuj')) {
                // Find the nearest email input
                const heroForm = this.closest('.hero-form') || this.closest('.cta-form');
                if (heroForm) {
                    const emailInput = heroForm.querySelector('.email-input');
                    if (emailInput && validateEmail(emailInput)) {
                        e.preventDefault();
                        handleSignup(emailInput.value);
                    } else if (emailInput) {
                        e.preventDefault();
                        emailInput.focus();
                        emailInput.style.borderColor = '#EF4444';
                    }
                }
            }
        });
    });

    function handleSignup(email) {
        console.log('Signup initiated for:', email);

        // Show success message (in a real app, this would be an API call)
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        message.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <div>
                    <strong>Dziękujemy!</strong>
                    <p style="margin: 0; font-size: 0.875rem; opacity: 0.95;">Wkrótce skontaktujemy się z Tobą</p>
                </div>
            </div>
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(message);

        // Remove message after 4 seconds
        setTimeout(() => {
            message.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }, 4000);
    }

    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .feature-showcase,
        .feature-card,
        .result-card,
        .pricing-card,
        .integration-category,
        .faq-item
    `);

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(el);
    });

    // ========================================
    // Counter Animation for Stats
    // ========================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current));
            }
        }, 16);
    }

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M+';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K+';
        }
        return num.toString();
    }

    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target.querySelector('strong');
                const text = stat.textContent;

                // Extract number from text like "50K+"
                const match = text.match(/(\d+(?:\.\d+)?)/);
                if (match) {
                    let number = parseFloat(match[1]);
                    if (text.includes('K')) number *= 1000;
                    if (text.includes('M')) number *= 1000000;

                    animateCounter(stat, number);
                }

                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.trust-item').forEach(item => {
        statsObserver.observe(item);
    });

    // ========================================
    // Floating Elements Animation
    // ========================================
    const floatingElements = document.querySelectorAll('.floating-element');

    floatingElements.forEach((element, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;

        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
    });

    // ========================================
    // Language Selector (Mock)
    // ========================================
    const languageSelector = document.querySelector('.language-selector');

    if (languageSelector) {
        languageSelector.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Funkcja zmiany języka będzie dostępna wkrótce!');
        });
    }

    // ========================================
    // Feature Links Click Handler
    // ========================================
    const featureLinks = document.querySelectorAll('.feature-link');

    featureLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const featureName = this.closest('.feature-content').querySelector('h3').textContent;
            console.log('Feature clicked:', featureName);

            // In a real app, this could open a modal or navigate to a feature page
            alert(`Dowiedz się więcej o funkcji: ${featureName}`);
        });
    });

    // ========================================
    // Pricing Card Hover Effect Enhancement
    // ========================================
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // ========================================
    // Console Welcome Message
    // ========================================
    console.log('%c👋 Witaj w Mailist!', 'font-size: 24px; font-weight: bold; color: #6366F1;');
    console.log('%cJesteśmy nowoczesną platformą email marketingu.', 'font-size: 14px; color: #6B7280;');
    console.log('%cZainteresowany współpracą? Napisz do nas: hello@mailist.com', 'font-size: 12px; color: #10B981;');

    // ========================================
    // Performance Monitoring
    // ========================================
    if (window.performance) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`⚡ Strona załadowana w ${pageLoadTime}ms`);
            }, 0);
        });
    }

    // ========================================
    // Easter Egg - Konami Code
    // ========================================
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-konamiSequence.length);

        if (konamiCode.join('') === konamiSequence.join('')) {
            activateEasterEgg();
        }
    });

    function activateEasterEgg() {
        document.body.style.animation = 'rainbow 3s linear infinite';
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 Gratulacje! Odkryłeś easter egg!');
        }, 3000);
    }

    // ========================================
    // Initialize
    // ========================================
    console.log('✅ Mailist landing page loaded successfully!');
});
