/**
 * Language Initialization Script
 * This script ensures consistent language across all pages
 */

// Language initialization object
const LanguageManager = {
    // Translations for navigation items
    translations: {
        en: {
            // Navigation
            home: "Home",
            services: "Services",
            about: "About",
            languages: "Languages",
            login: "Login",
            
            // Hero Section
            heroHeading: "Empowering Tamil Nadu Farmers with Smart Agriculture",
            heroSubheading: "Get real-time weather, crop advice, and government scheme help.",
            getStarted: "Get Started",
            
            // Features Section
            featuresTitle: "Our Features",
            weatherDetails: "Weather Details",
            weatherDetailsDesc: "Get accurate weather forecasts specific to your location and plan your farming activities accordingly.",
            cropDisease: "Detect Crop Disease",
            cropDiseaseDesc: "Use your smartphone to scan plants and identify diseases with our AI-powered detection system.",
            marketPrices: "Latest Market Prices",
            marketPricesDesc: "Stay informed about current market prices for your crops and find the best places to sell.",
            govtSchemes: "Government Schemes",
            govtSchemesDesc: "Learn about all available government schemes and subsidies that can help your farming business.",
            youtubeRefs: "YouTube References",
            youtubeRefsDesc: "Watch educational videos about modern farming techniques and best practices in agriculture.",
            expertSuggestions: "Expert Suggestions",
            expertSuggestionsDesc: "Connect with agricultural experts who can provide personalized advice for your specific needs.",
            
            // About Section
            aboutText: "This web app empowers Tamil Nadu farmers by providing agriculture insights, weather forecasts, government schemes, and expert help in their own language. Built with care, it brings tradition and technology together for a better future.",
            
            // Footer
            footerQuote: "Ready to <span class=\"highlight\">elevate</span> your farming? Join our <span class=\"highlight\">community</span> of Tamil Nadu farmers using <span class=\"highlight\">technology</span> to boost yields and income.",
            privacyPolicy: "Privacy Policy",
            termsOfService: "Terms of Service",
            contactUs: "Contact Us"
        },
        ta: {
            // Navigation
            home: "முகப்பு",
            services: "சேவைகள்",
            about: "எங்களை பற்றி",
            languages: "மொழிகள்",
            login: "உள்நுழைக",
            
            // Hero Section
            heroHeading: "சிந்தனை விவசாயத்துடன் தமிழ்நாடு விவசாயிகளை மேம்படுத்துதல்",
            heroSubheading: "நேரடி வானிலை, பயிர் ஆலோசனைகள் மற்றும் அரசு திட்ட உதவிகளை பெறுங்கள்.",
            getStarted: "தொடங்குங்கள்",
            
            // Features Section
            featuresTitle: "எங்கள் அம்சங்கள்",
            weatherDetails: "வானிலை விவரங்கள்",
            weatherDetailsDesc: "உங்கள் இருப்பிடத்திற்கு ஏற்ப துல்லியமான வானிலை முன்னறிவிப்புகளை பெறுங்கள் மற்றும் உங்கள் விவசாய நடவடிக்கைகளை திட்டமிடுங்கள்.",
            cropDisease: "பயிர் நோயை கண்டறியுங்கள்",
            cropDiseaseDesc: "உங்கள் ஸ்மார்ட்போனைப் பயன்படுத்தி தாவரங்களை ஸ்கேன் செய்து, எங்கள் AI-ஆல் இயக்கப்படும் கண்டறிதல் முறை மூலம் நோய்களை அடையாளம் காணுங்கள்.",
            marketPrices: "சமீபத்திய சந்தை விலைகள்",
            marketPricesDesc: "உங்கள் பயிர்களின் தற்போதைய சந்தை விலைகளைப் பற்றி தகவல் பெறுங்கள் மற்றும் சிறந்த விற்பனை இடங்களைக் கண்டறியுங்கள்.",
            govtSchemes: "அரசு திட்டங்கள்",
            govtSchemesDesc: "உங்கள் விவசாய வணிகத்திற்கு உதவக்கூடிய அனைத்து கிடைக்கக்கூடிய அரசு திட்டங்கள் மற்றும் மானியங்களைப் பற்றி அறியுங்கள்.",
            youtubeRefs: "யூடியூப் குறிப்புகள்",
            youtubeRefsDesc: "நவீன விவசாய நுட்பங்கள் மற்றும் விவசாயத்தில் சிறந்த நடைமுறைகள் பற்றி கல்வி வீடியோக்களைப் பாருங்கள்.",
            expertSuggestions: "நிபுணர் பரிந்துரைகள்",
            expertSuggestionsDesc: "உங்கள் குறிப்பிட்ட தேவைகளுக்கு தனிப்பயனாக்கப்பட்ட ஆலோசனையை வழங்கக்கூடிய விவசாய நிபுணர்களுடன் இணைக்கவும்.",
            
            // About Section
            aboutText: "இந்த வலை செயலி, விவசாய நுண்ணறிவுகள், வானிலை முன்னறிவிப்புகள், அரசு திட்டங்கள் மற்றும் நிபுணர் உதவிகளை அவர்களின் சொந்த மொழியில் வழங்குவதன் மூலம் தமிழ்நாடு விவசாயிகளை மேம்படுத்துகிறது. அக்கறையுடன் கட்டப்பட்டது, இது சிறந்த எதிர்காலத்திற்காக பாரம்பரியம் மற்றும் தொழில்நுட்பத்தை ஒன்றாக கொண்டு வருகிறது.",
            
            // Footer
            footerQuote: "உங்கள் விவசாயத்தை <span class=\"highlight\">மேம்படுத்த</span> தயாரா? தமிழ்நாடு விவசாயிகளின் <span class=\"highlight\">சமூகத்தில்</span> சேர்ந்து, <span class=\"highlight\">தொழில்நுட்பத்தை</span> பயன்படுத்தி மகசூல் மற்றும் வருமானத்தை அதிகரிக்கவும்.",
            privacyPolicy: "தனியுரிமைக் கொள்கை",
            termsOfService: "சேவை விதிமுறைகள்",
            contactUs: "தொடர்பு கொள்ளுங்கள்"
        }
    },
    
    // Initialize language settings
    init: function() {
        // Get language from localStorage or cookie
        const savedLang = localStorage.getItem('agri-lang') || this.getCookie('agri-lang') || 'en';
        
        // Set the language attribute on the body
        document.body.setAttribute('data-lang', savedLang);
        
        // Update all translatable elements immediately
        this.updateAllTranslatableElements(savedLang);
        
        // Listen for language change events
        window.addEventListener('languageChanged', (event) => {
            const newLang = event.detail.language;
            document.body.setAttribute('data-lang', newLang);
            
            // Update all translatable elements
            this.updateAllTranslatableElements(newLang);
            
            // If we're on a page with its own language handling, let it know
            if (window.MarketPricesApp) {
                window.MarketPricesApp.state.currentLanguage = newLang;
                window.MarketPricesApp.applyLanguage();
            }
            
            // If we're on the home page
            if (window.HomeApp) {
                window.HomeApp.state.currentLanguage = newLang;
                window.HomeApp.applyLanguage();
            }
            
            // Add more page-specific handlers as needed
        });
        
        // Add language switcher event listeners if they exist
        this.setupLanguageSwitchers();
    },
    
    // Update all translatable elements based on language
    updateAllTranslatableElements: function(lang) {
        // Update elements with data-translate attribute
        const translatableElements = document.querySelectorAll('[data-translate]');
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[lang][key]) {
                // Check if this is an input element with a placeholder
                if (element.tagName === 'INPUT' && element.getAttribute('placeholder')) {
                    element.setAttribute('placeholder', this.translations[lang][key]);
                } else {
                    // For regular elements, update text content
                    element.textContent = this.translations[lang][key];
                }
            }
        });
        
        // Update elements with data-translate-html attribute (for HTML content)
        const htmlTranslatableElements = document.querySelectorAll('[data-translate-html]');
        htmlTranslatableElements.forEach(element => {
            const key = element.getAttribute('data-translate-html');
            if (this.translations[lang][key]) {
                element.innerHTML = this.translations[lang][key];
            }
        });
        
        // Update elements with data-translate-attr attribute (for attributes)
        const attrTranslatableElements = document.querySelectorAll('[data-translate-attr]');
        attrTranslatableElements.forEach(element => {
            const attrConfig = element.getAttribute('data-translate-attr');
            const [attrName, translationKey] = attrConfig.split(':');
            
            if (this.translations[lang][translationKey]) {
                element.setAttribute(attrName, this.translations[lang][translationKey]);
            }
        });
        
        // Legacy support for navigation items without data attributes
        this.updateLegacyNavigationItems(lang);
    },
    
    // Legacy support for navigation items
    updateLegacyNavigationItems: function(lang) {
        // Update main navigation items
        const navItems = document.querySelectorAll('.navbar-menu .menu-item:not(.language-dropdown .menu-item)');
        navItems.forEach(item => {
            const text = item.textContent.trim().toLowerCase();
            if (text === 'home' || text === 'முகப்பு') {
                item.textContent = this.translations[lang].home;
            } else if (text === 'services' || text === 'சேவைகள்') {
                item.textContent = this.translations[lang].services;
            } else if (text === 'about' || text === 'பற்றி') {
                item.textContent = this.translations[lang].about;
            }
        });
        
        // Update language dropdown separately
        const languageDropdown = document.querySelector('.language-dropdown .menu-item');
        if (languageDropdown) {
            languageDropdown.innerHTML = `${this.translations[lang].languages} <i class="fas fa-chevron-down"></i>`;
        }
        
        // Update account icon tooltip
        const accountIcon = document.querySelector('.account-icon .tooltip');
        if (accountIcon) {
            const isLoggedIn = document.querySelector('.account-icon a[href="logout.html"]') !== null;
            accountIcon.textContent = isLoggedIn ? this.translations[lang].logout : this.translations[lang].login;
        }
        
        // Update account icon title and aria-label
        const accountIconLink = document.querySelector('.account-icon a');
        if (accountIconLink) {
            const isLoggedIn = accountIconLink.getAttribute('href') === 'logout.html';
            const loginStatus = isLoggedIn ? this.translations[lang].logout : this.translations[lang].login;
            accountIconLink.setAttribute('title', loginStatus);
            accountIconLink.setAttribute('aria-label', loginStatus);
        }
    },
    
    // Set up language switcher buttons
    setupLanguageSwitchers: function() {
        const langSwitchers = document.querySelectorAll('.lang-option');
        if (langSwitchers.length > 0) {
            langSwitchers.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = option.getAttribute('data-lang');
                    
                    // Update localStorage and cookie
                    localStorage.setItem('agri-lang', lang);
                    document.cookie = `agri-lang=${lang}; path=/; max-age=31536000`;
                    
                    // Update all translatable elements immediately
                    this.updateAllTranslatableElements(lang);
                    
                    // Dispatch language change event
                    const event = new CustomEvent('languageChanged', { detail: { language: lang } });
                    window.dispatchEvent(event);
                    
                    // If we're on a page with its own language handling, let it know
                    if (window.MarketPricesApp) {
                        window.MarketPricesApp.switchLanguage(lang);
                    }
                    
                    // If we're on the home page
                    if (window.HomeApp) {
                        window.HomeApp.switchLanguage(lang);
                    }
                    
                    // Add more page-specific handlers as needed
                });
            });
        }
    },
    
    // Helper function to get cookie value
    getCookie: function(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    },
    
    // Helper function to get translation
    getTranslation: function(key, lang) {
        return this.translations[lang][key] || key;
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    LanguageManager.init();
});