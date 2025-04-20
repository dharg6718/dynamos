// Language switcher functionality
const translations = {
    en: {
        home: "Home",
        services: "Services",
        about: "About",
        languages: "Languages",
        heroHeading: "Empowering Tamil Nadu Farmers with Smart Agriculture",
        heroSubheading: "Get real-time weather, crop advice, and government scheme help.",
        getStarted: "Get Started",
        login: "Login",
        logout: "Logout",
        featuresTitle: "Our Features",
        weatherDetails: "Weather Details",
        cropDisease: "Detect Crop Disease",
        marketPrices: "Latest Market Prices",
        govtSchemes: "Government Schemes",
        youtubeRefs: "YouTube References",
        expertSuggestions: "Expert Suggestions",
        aboutText: "This web app empowers Tamil Nadu farmers by providing agriculture insights, weather forecasts, government schemes, and expert help in their own language. Built with care, it brings tradition and technology together for a better future.",
        footerQuote: "Ready to <span class='highlight'>elevate</span> your farming? Join our <span class='highlight'>community</span> of Tamil Nadu farmers using <span class='highlight'>technology</span> to boost yields and income.",
        weatherAlert: "Weather Alert: Moderate rainfall expected in delta regions",
        newSubsidies: "Tamil Nadu announces new subsidies for organic farming",
        pestResistant: "New pest-resistant rice variety developed at TNAU",
        mspIncrease: "Government increases minimum support price for paddy by 5%",
        solarIrrigation: "Solar-powered irrigation systems now available with 50% subsidy"
    },
    ta: {
        home: "முகப்பு",
        services: "சேவைகள்",
        about: "எங்களை பற்றி",
        languages: "மொழிகள்",
        heroHeading: "தமிழக விவசாயிகளை நவீன விவசாயத்துடன் மேம்படுத்துதல்",
        heroSubheading: "தற்போதைய வானிலை, பயிர் ஆலோசனை, மற்றும் அரசு திட்ட உதவி பெறுங்கள்.",
        getStarted: "தொடங்குங்கள்",
        login: "உள்நுழைய",
        logout: "வெளியேறு",
        featuresTitle: "எங்கள் அம்சங்கள்",
        weatherDetails: "வானிலை விவரங்கள்",
        cropDisease: "பயிர் நோய் கண்டறிதல்",
        marketPrices: "சந்தை விலைகள்",
        govtSchemes: "அரசு திட்டங்கள்",
        youtubeRefs: "யூடியூப் குறிப்புகள்",
        expertSuggestions: "நிபுணர் ஆலோசனைகள்",
        aboutText: "இந்த வலைத்தளம் தமிழக விவசாயிகளுக்கு விவசாய தகவல்கள், வானிலை முன்னறிவிப்புகள், அரசு திட்டங்கள், மற்றும் நிபுணர் உதவிகளை அவர்களின் சொந்த மொழியில் வழங்குகிறது. கவனத்துடன் உருவாக்கப்பட்ட இது, பாரம்பரியத்தையும் தொழில்நுட்பத்தையும் இணைத்து சிறந்த எதிர்காலத்தை உருவாக்குகிறது.",
        footerQuote: "உங்கள் விவசாயத்தை <span class='highlight'>உயர்த்த</span> தயாரா? <span class='highlight'>தொழில்நுட்பத்தைப்</span> பயன்படுத்தி மகசூலையும் வருமானத்தையும் அதிகரிக்கும் தமிழக விவசாயிகளின் <span class='highlight'>சமூகத்தில்</span> இணையுங்கள்.",
        weatherAlert: "வானிலை எச்சரிக்கை: டெல்டா பகுதிகளில் மிதமான மழைக்கு வாய்ப்பு",
        newSubsidies: "தமிழக அரசு இயற்கை விவசாயத்திற்கு புதிய மானியங்களை அறிவித்துள்ளது",
        pestResistant: "தமிழ்நாடு வேளாண் பல்கலைக்கழகத்தில் புதிய பூச்சி எதிர்ப்பு நெல் ரகம் உருவாக்கப்பட்டுள்ளது",
        mspIncrease: "நெல்லுக்கான குறைந்தபட்ச ஆதார விலையை 5% அரசு உயர்த்தியுள்ளது",
        solarIrrigation: "சூரிய சக்தி பாசன அமைப்புகள் இப்போது 50% மானியத்துடன் கிடைக்கின்றன"
    }
};

// Application state management
const AgriApp = {
    state: {
        currentLanguage: localStorage.getItem('agri-lang') || 'en',
        hasVisited: localStorage.getItem('agri-visited') || false,
        isLoading: true,
        scrollY: 0,
        activeSection: 'home',
        isLoggedIn: localStorage.getItem('agri-isLoggedIn') === 'true'
    },
    
    elements: {
        preloader: null,
        navbar: null,
        navItems: null,
        languageDropdown: null,
        languageOptions: null,
        heroSection: null,
        heroHeading: null,
        heroSubheading: null,
        getStartedBtn: null,
        sectionTitle: null,
        featureCards: null,
        featureTitles: null,
        aboutText: null,
        footerQuote: null,
        newsTickerContent: null,
        accountIcon: null
    },
    
    init() {
        this.cacheElements();
        this.createPreloader();
        this.setupEventListeners();
        this.checkSavedLanguage();
        this.updateLoginStatus();
        
        // Initialize components
        this.initNewsTickerContent();
        this.detectReducedMotion();
        
        window.addEventListener('load', () => {
            this.handlePageLoaded();
        });
    },
    
    cacheElements() {
        // Cache DOM elements for better performance
        this.elements.navbar = document.querySelector('.navbar');
        this.elements.navItems = document.querySelectorAll('.navbar-menu .menu-item:not(.language-dropdown)');
        this.elements.languageDropdown = document.querySelector('.language-dropdown .menu-item');
        this.elements.languageOptions = document.querySelectorAll('.lang-option');
        this.elements.heroSection = document.querySelector('.hero-section');
        this.elements.heroHeading = document.querySelector('.hero-heading');
        this.elements.heroSubheading = document.querySelector('.hero-subheading');
        this.elements.getStartedBtn = document.querySelector('.btn-get-started');
        this.elements.sectionTitle = document.querySelector('.section-title');
        this.elements.featureCards = document.querySelectorAll('.feature-card');
        this.elements.featureTitles = document.querySelectorAll('.feature-title');
        this.elements.aboutText = document.querySelector('.about-text p');
        this.elements.footerQuote = document.querySelector('.footer-quote p');
        this.elements.newsTickerContent = document.querySelector('.ticker-content');
        this.elements.accountIcon = document.querySelector('.account-icon a');
    },
    
    createPreloader() {
        // Create preloader element
        this.elements.preloader = document.createElement('div');
        this.elements.preloader.className = 'preloader';
        this.elements.preloader.innerHTML = '<div class="preloader-spinner"></div>';
        document.body.appendChild(this.elements.preloader);
    },
    
    handlePageLoaded() {
        // Delay for smoother preloader effect
        setTimeout(() => {
            this.elements.preloader.classList.add('fade-out');
            
            setTimeout(() => {
                this.elements.preloader.style.display = 'none';
                this.state.isLoading = false;
                
                // Initialize scroll animations and first-time user experience
                this.initScrollAnimations();
                this.staggerFeatureCardAnimations();
                
                if (!this.state.hasVisited) {
                    this.showWelcomeToast();
                    localStorage.setItem('agri-visited', 'true');
                    this.state.hasVisited = true;
                }
            }, 500);
        }, 800);
    },
    
    setupEventListeners() {
        // Setup navigation scroll behavior
        this.setupSmoothScrolling();
        
        // Setup language switcher
        this.elements.languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = option.getAttribute('data-lang');
                if (lang !== this.state.currentLanguage) {
                    this.switchLanguage(lang);
                }
            });
        });
        
        // Add scroll event for navbar and section highlighting
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
        
        // Add resize event for responsive adjustments
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
        
        // Add keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
        
        // Add parallax effect to hero section
        if (this.elements.heroSection && !this.prefersReducedMotion) {
            window.addEventListener('scroll', () => {
                this.handleHeroParallax();
            });
        }
        
        // Setup account icon behavior
        if (this.elements.accountIcon) {
            this.elements.accountIcon.addEventListener('click', (e) => {
                if (this.state.isLoggedIn) {
                    e.preventDefault();
                    this.handleLogout();
                }
            });
        }
        
        // Setup get started button
        if (this.elements.getStartedBtn) {
            // If logged in, redirect to dashboard instead of login
            if (this.state.isLoggedIn && this.elements.getStartedBtn.getAttribute('href') === 'login.html') {
                this.elements.getStartedBtn.setAttribute('href', 'dashboard.html');
                this.elements.getStartedBtn.textContent = this.state.currentLanguage === 'en' ? 'Go to Dashboard' : 'டாஷ்போர்டுக்குச் செல்லவும்';
            }
        }
    },
    
    handleScroll() {
        this.state.scrollY = window.scrollY;
        
        // Handle fixed navbar and active state
        if (this.state.scrollY > 50) {
            this.elements.navbar.classList.add('scrolled');
        } else {
            this.elements.navbar.classList.remove('scrolled');
        }
        
        // Handle active section based on scroll position
        this.updateActiveSection();
    },
    
    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = this.state.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if (this.state.activeSection !== sectionId) {
                    this.state.activeSection = sectionId;
                    this.updateActiveMenuItem(sectionId);
                }
            }
        });
        
        // Handle top of page (home section)
        if (scrollPosition < 200 && this.state.activeSection !== 'home') {
            this.state.activeSection = 'home';
            this.updateActiveMenuItem('home');
        }
    },
    
    updateActiveMenuItem(sectionId) {
        this.elements.navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href && href === `#${sectionId}`) {
                item.classList.add('active');
            }
        });
    },
    
    handleHeroParallax() {
        if (this.state.scrollY < window.innerHeight) {
            const parallaxOffset = this.state.scrollY * 0.4;
            this.elements.heroSection.style.backgroundPositionY = `-${parallaxOffset}px`;
        }
    },
    
    handleResize() {
        // Adjust any layout elements that need to be responsive beyond CSS
        // For now, just update the active section
        this.updateActiveSection();
    },
    
    handleKeyboardNavigation(e) {
        // Add keyboard navigation for accessibility
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
        
        // Escape key closes dropdowns
        if (e.key === 'Escape') {
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
            
            // Return focus to parent
            setTimeout(() => {
                document.querySelectorAll('.language-dropdown').forEach(dropdown => {
                    dropdown.querySelector('.menu-item').focus();
                });
            }, 10);
        }
    },
    
    checkSavedLanguage() {
        // Check for saved language preference
        const savedLang = localStorage.getItem('agri-lang');
        if (savedLang && (savedLang === 'en' || savedLang === 'ta')) {
            this.state.currentLanguage = savedLang;
            this.updateLanguage(savedLang);
        }
    },
    
    updateLoginStatus() {
        // Update account icon/login status based on localStorage
        if (this.elements.accountIcon) {
            if (this.state.isLoggedIn) {
                // Update icon to show logged in state
                this.elements.accountIcon.innerHTML = '<i class="fas fa-user-check"></i>';
                this.elements.accountIcon.setAttribute('title', this.state.currentLanguage === 'en' ? 'Logout' : 'வெளியேறு');
                this.elements.accountIcon.setAttribute('href', '#');
                this.elements.accountIcon.classList.add('logged-in');
                
                // Update Get Started button if it exists
                if (this.elements.getStartedBtn) {
                    this.elements.getStartedBtn.setAttribute('href', 'dashboard.html');
                    this.elements.getStartedBtn.textContent = this.state.currentLanguage === 'en' ? 'Go to Dashboard' : 'டாஷ்போர்டுக்குச் செல்லவும்';
                }
            } else {
                // Reset to login state
                this.elements.accountIcon.innerHTML = '<i class="fas fa-user-circle"></i>';
                this.elements.accountIcon.setAttribute('title', this.state.currentLanguage === 'en' ? 'Login' : 'உள்நுழைய');
                this.elements.accountIcon.setAttribute('href', 'login.html');
                this.elements.accountIcon.classList.remove('logged-in');
                
                // Reset Get Started button if it exists
                if (this.elements.getStartedBtn) {
                    this.elements.getStartedBtn.setAttribute('href', 'login.html');
                    this.elements.getStartedBtn.textContent = translations[this.state.currentLanguage].getStarted;
                }
            }
        }
    },
    
    handleLogout() {
        // Confirm before logout
        const confirmLogout = confirm(this.state.currentLanguage === 'en' ? 
            'Are you sure you want to logout?' : 
            'நீங்கள் வெளியேற விரும்புகிறீர்களா?');
            
        if (confirmLogout) {
            // Clear login state
            localStorage.removeItem('agri-isLoggedIn');
            this.state.isLoggedIn = false;
            this.updateLoginStatus();
            
            // Show logout notification
            this.showToast(this.state.currentLanguage === 'en' ? 
                'Logged out successfully' : 
                'வெற்றிகரமாக வெளியேறியது');
                
            // Redirect to home if needed
            setTimeout(() => {
                if (window.location.pathname.includes('dashboard')) {
                    window.location.href = 'index.html';
                }
            }, 1500);
        }
    },
    
    switchLanguage(lang) {
        // Animate the transition
        document.body.style.opacity = '0.8';
        
        setTimeout(() => {
            this.state.currentLanguage = lang;
            this.updateLanguage(lang);
            document.body.style.opacity = '1';
            
            // Update localStorage
            localStorage.setItem('agri-lang', lang);
            
            // Show user feedback
            this.showToast(lang === 'en' ? 'Language changed to English' : 'மொழி தமிழாக மாற்றப்பட்டது');
            
            // Update news ticker for new language
            this.updateNewsTickerForLanguage();
            
            // Update login status with new language
            this.updateLoginStatus();
        }, 200);
    },
    
    updateLanguage(lang) {
        // Update navigation items
        this.elements.navItems.forEach((item, index) => {
            if (index === 0) item.textContent = translations[lang].home;
            if (index === 1) item.textContent = translations[lang].services;
            if (index === 2) item.textContent = translations[lang].about;
        });
        
        // Update language dropdown
        if (this.elements.languageDropdown) {
            this.elements.languageDropdown.innerHTML = translations[lang].languages + ' <i class="fas fa-chevron-down"></i>';
        }
        
        // Update hero section
        this.elements.heroHeading.textContent = translations[lang].heroHeading;
        this.elements.heroSubheading.textContent = translations[lang].heroSubheading;
        
        // Only update the button text if not logged in
        if (this.elements.getStartedBtn && !this.state.isLoggedIn) {
            this.elements.getStartedBtn.textContent = translations[lang].getStarted;
        } else if (this.elements.getStartedBtn && this.state.isLoggedIn) {
            this.elements.getStartedBtn.textContent = lang === 'en' ? 'Go to Dashboard' : 'டாஷ்போர்டுக்குச் செல்லவும்';
        }
        
        // Update features section
        this.elements.sectionTitle.textContent = translations[lang].featuresTitle;
        
        // Update feature titles
        this.elements.featureTitles.forEach((title, index) => {
            if (index === 0) title.textContent = translations[lang].weatherDetails;
            if (index === 1) title.textContent = translations[lang].cropDisease;
            if (index === 2) title.textContent = translations[lang].marketPrices;
            if (index === 3) title.textContent = translations[lang].govtSchemes;
            if (index === 4) title.textContent = translations[lang].youtubeRefs;
            if (index === 5) title.textContent = translations[lang].expertSuggestions;
        });
        
        // Update about section
        this.elements.aboutText.textContent = translations[lang].aboutText;
        
        // Update footer
        this.elements.footerQuote.innerHTML = translations[lang].footerQuote;
    },
    
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                
                // Handle home link
                if (targetId === '#') {
                    window.scrollTo({
                        top: 0,
                        behavior: this.prefersReducedMotion ? 'auto' : 'smooth'
                    });
                    return;
                }
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Account for fixed header
                    const headerOffset = this.elements.navbar.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset - 20;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: this.prefersReducedMotion ? 'auto' : 'smooth'
                    });
                    
                    // Set focus for accessibility
                    setTimeout(() => {
                        targetElement.setAttribute('tabindex', '-1');
                        targetElement.focus();
                    }, 1000);
                }
            });
        });
    },
    
    initScrollAnimations() {
        if (this.prefersReducedMotion) return;
        
        const elementsToAnimate = [
            this.elements.sectionTitle,
            document.querySelector('.about-text'),
            document.querySelector('.about-image')
        ];
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        );
        
        elementsToAnimate.forEach(el => {
            if (el) observer.observe(el);
        });
    },
    
    staggerFeatureCardAnimations() {
        if (this.prefersReducedMotion) {
            // Make all cards visible immediately for reduced motion preference
            this.elements.featureCards.forEach(card => {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            });
            return;
        }
        
        // Setup feature card observer
        const featureObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.animation = `slide-up 0.6s ease-out forwards`;
                        }, index * 100);
                        featureObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        this.elements.featureCards.forEach(card => {
            featureObserver.observe(card);
        });
    },
    
    initNewsTickerContent() {
        this.updateNewsTickerForLanguage();
    },
    
    updateNewsTickerForLanguage() {
        if (!this.elements.newsTickerContent) return;
        
        const lang = this.state.currentLanguage;
        const newsItems = [
            translations[lang].weatherAlert,
            translations[lang].newSubsidies,
            translations[lang].pestResistant,
            translations[lang].mspIncrease,
            translations[lang].solarIrrigation
        ];
        
        this.elements.newsTickerContent.innerHTML = '';
        newsItems.forEach(item => {
            const span = document.createElement('span');
            span.textContent = item;
            this.elements.newsTickerContent.appendChild(span);
        });
    },
    
    showWelcomeToast() {
        const welcomeMsg = this.state.currentLanguage === 'en' 
            ? 'Welcome to AgriAssist! 🌱' 
            : 'அக்ரி அசிஸ்ட்க்கு வரவேற்கிறோம்! 🌱';
            
        this.showToast(welcomeMsg, 5000);
    },
    
    showToast(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas fa-info-circle"></i>${message}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);
        
        // Get existing toasts to stack them
        const existingToasts = document.querySelectorAll('.toast:not(.removing)');
        if (existingToasts.length > 0) {
            const lastToast = existingToasts[existingToasts.length - 1];
            const lastToastHeight = lastToast.offsetHeight;
            toast.style.bottom = `${parseInt(window.getComputedStyle(lastToast).bottom) + lastToastHeight + 10}px`;
        }
        
        // Show toast with slight delay for transition
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Hide toast after duration
        setTimeout(() => {
            toast.classList.add('removing');
            toast.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 500);
        }, duration);
    },
    
    detectReducedMotion() {
        // Check if user prefers reduced motion
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (this.prefersReducedMotion) {
            // Apply reduced motion styles
            document.documentElement.classList.add('reduced-motion');
        }
    },
    
    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    AgriApp.init();
}); 