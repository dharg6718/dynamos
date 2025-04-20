// Market Prices Page JavaScript

// Market data management and visualization
const MarketPricesApp = {
    state: {
        currentDistrict: 'all',
        currentCrop: 'rice',
        dateRange: '7',
        priceData: null,
        districtData: null,
        isDataLoading: true,
        currentLanguage: localStorage.getItem('agri-lang') || 'en',
        voiceSpeaking: false
    },
    
    // Chart instances for reuse
    charts: {
        trendChart: null,
        districtChart: null
    },
    
    // DOM elements
    elements: {
        districtSelect: null,
        cropSelect: null,
        dateRange: null,
        updateBtn: null,
        voiceBtn: null,
        pdfBtn: null,
        currentCrop: null,
        priceTrend: null,
        currentPrice: null,
        minPrice: null,
        maxPrice: null,
        avgPrice: null,
        lastUpdated: null,
        trendChart: null,
        districtChart: null,
        trendInsight: null,
        seasonalInsight: null,
        recommendation: null,
        queryForm: null,
        languageOptions: null
    },
    
    // Initialize the application
    init: function() {
        // Cache DOM elements
        this.cacheElements();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Check for language in localStorage or cookie
        const savedLang = localStorage.getItem('agri-lang') || this.getCookie('agri-lang') || 'en';
        
        // Apply the current language
        this.state.currentLanguage = savedLang;
        this.applyLanguage();
        
        // Load initial data
        this.loadMarketData();
        
        // Add data attribute to body
        document.body.setAttribute('data-lang', this.state.currentLanguage);
    },
    
    // Cache DOM elements
    cacheElements: function() {
        this.elements.districtSelect = document.getElementById('district-select');
        this.elements.cropSelect = document.getElementById('crop-select');
        this.elements.dateRange = document.getElementById('date-range');
        this.elements.updateBtn = document.getElementById('update-btn');
        this.elements.voiceBtn = document.getElementById('voice-btn');
        this.elements.pdfBtn = document.getElementById('pdf-btn');
        this.elements.currentCrop = document.getElementById('current-crop');
        this.elements.priceTrend = document.getElementById('price-trend');
        this.elements.currentPrice = document.getElementById('current-price');
        this.elements.minPrice = document.getElementById('min-price');
        this.elements.maxPrice = document.getElementById('max-price');
        this.elements.avgPrice = document.getElementById('avg-price');
        this.elements.lastUpdated = document.getElementById('last-updated');
        this.elements.trendChart = document.getElementById('trend-chart');
        this.elements.districtChart = document.getElementById('district-chart');
        this.elements.trendInsight = document.getElementById('trend-insight');
        this.elements.seasonalInsight = document.getElementById('seasonal-insight');
        this.elements.recommendation = document.getElementById('recommendation');
        this.elements.queryForm = document.getElementById('query-form');
        this.elements.languageOptions = document.querySelectorAll('.lang-option');
    },
    
    // Set up event listeners
    setupEventListeners: function() {
        // Language switcher
        this.elements.languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = option.getAttribute('data-lang');
                if (lang !== this.state.currentLanguage) {
                    this.switchLanguage(lang);
                }
            });
        });
        
        // Update button
        if (this.elements.updateBtn) {
            this.elements.updateBtn.addEventListener('click', () => {
                this.loadMarketData();
            });
        }
        
        // Voice button
        if (this.elements.voiceBtn) {
            this.elements.voiceBtn.addEventListener('click', () => {
                this.toggleVoiceReadout();
            });
        }
        
        // PDF button
        if (this.elements.pdfBtn) {
            this.elements.pdfBtn.addEventListener('click', () => {
                this.generatePDF();
            });
        }
        
        // Query form
        if (this.elements.queryForm) {
            this.elements.queryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitQuery();
            });
        }
    },
    
    // Switch language
    switchLanguage: function(lang) {
        // Add loading state
        document.body.classList.add('loading');
        
        // Update state
        this.state.currentLanguage = lang;
        
        // Save to localStorage with a global key that all pages can access
        localStorage.setItem('agri-lang', lang);
        
        // Set a cookie for cross-page language persistence
        document.cookie = `agri-lang=${lang}; path=/; max-age=31536000`; // 1 year expiry
        
        // Batch DOM updates
        requestAnimationFrame(() => {
            // Update navigation items with proper text content
            const navItems = document.querySelectorAll('.navbar-menu .menu-item');
            navItems.forEach(item => {
                const text = item.textContent.trim().toLowerCase();
                if (text === 'home' || text === 'முகப்பு') {
                    item.textContent = this.getText('home');
                } else if (text === 'services' || text === 'சேவைகள்') {
                    item.textContent = this.getText('services');
                } else if (text === 'about' || text === 'பற்றி') {
                    item.textContent = this.getText('about');
                }
            });

            // Update language dropdown with proper text
            const languageDropdown = document.querySelector('.language-dropdown .menu-item');
            if (languageDropdown) {
                languageDropdown.innerHTML = `${this.getText('languages')} <i class="fas fa-chevron-down"></i>`;
            }

            // Update account icon tooltip
            const accountIcon = document.querySelector('.account-icon .tooltip');
            if (accountIcon) {
                accountIcon.textContent = this.state.isLoggedIn ? this.getText('logout') : this.getText('login');
            }

            // Update account icon title and aria-label
            const accountIconLink = document.querySelector('.account-icon a');
            if (accountIconLink) {
                const loginStatus = this.state.isLoggedIn ? this.getText('logout') : this.getText('login');
                accountIconLink.setAttribute('title', loginStatus);
                accountIconLink.setAttribute('aria-label', loginStatus);
            }

            // Batch update all text elements
            const textUpdates = [
                ['.back-button a', 'backToHome'],
                ['.market-title', 'marketTitle'],
                ['.market-subtitle', 'marketSubtitle'],
                ['label[for="district-select"]', 'selectDistrict'],
                ['label[for="crop-select"]', 'selectCrop'],
                ['label[for="date-range"]', 'timePeriod'],
                ['.insights-section h2', 'farmerInsights'],
                ['.query-section h2', 'queryTitle'],
                ['label[for="name"]', 'farmerName'],
                ['label[for="crop"]', 'cropName'],
                ['label[for="location"]', 'location'],
                ['label[for="mobile"]', 'mobile'],
                ['label[for="comments"]', 'comments'],
                ['.query-form button[type="submit"]', 'submitQuery']
            ];

            textUpdates.forEach(([selector, key]) => {
                const element = document.querySelector(selector);
                if (element) {
                    element.textContent = this.getText(key);
                }
            });

            // Update select options
            this.updateSelectOptions();

            // Update action buttons
            this.updateActionButtons();

            // Update chart titles and insights
            this.updateChartsAndInsights();

            // Remove loading state
            document.body.classList.remove('loading');

            // Show feedback
            this.showToast(lang === 'en' ? 'Language changed to English' : 'மொழி தமிழாக மாற்றப்பட்டது');
            
            // Add a data attribute to the body to indicate the current language
            document.body.setAttribute('data-lang', lang);
            
            // Dispatch a custom event that other pages can listen for
            const event = new CustomEvent('languageChanged', { detail: { language: lang } });
            window.dispatchEvent(event);
        });
    },
    
    // Helper function to update select options
    updateSelectOptions: function() {
        // Update district select
        const districtSelect = document.getElementById('district-select');
        if (districtSelect) {
            districtSelect.querySelector('option[value="all"]').textContent = this.getText('allTamilNadu');
        }

        // Update crop select
        const cropSelect = document.getElementById('crop-select');
        if (cropSelect) {
            const cropOptions = {
                'rice': this.getText('rice'),
                'tomato': this.getText('tomato'),
                'onion': this.getText('onion'),
                'potato': this.getText('potato'),
                'brinjal': this.getText('brinjal'),
                'banana': this.getText('banana'),
                'sugarcane': this.getText('sugarcane'),
                'coconut': this.getText('coconut'),
                'cotton': this.getText('cotton'),
                'groundnut': this.getText('groundnut')
            };

            Array.from(cropSelect.options).forEach(option => {
                if (cropOptions[option.value]) {
                    option.textContent = cropOptions[option.value];
                }
            });
        }

        // Update date range select
        const dateRangeSelect = document.getElementById('date-range');
        if (dateRangeSelect) {
            const dateRangeOptions = {
                '7': this.getText('last7Days'),
                '30': this.getText('last30Days'),
                '90': this.getText('last3Months'),
                '180': this.getText('last6Months')
            };

            Array.from(dateRangeSelect.options).forEach(option => {
                if (dateRangeOptions[option.value]) {
                    option.textContent = dateRangeOptions[option.value];
                }
            });
        }
    },
    
    // Helper function to update action buttons
    updateActionButtons: function() {
        if (this.elements.updateBtn) {
            this.elements.updateBtn.innerHTML = `<i class="fas fa-sync-alt"></i> ${this.getText('updatePrices')}`;
        }
        if (this.elements.voiceBtn) {
            this.elements.voiceBtn.innerHTML = `<i class="fas fa-volume-up"></i> ${this.getText('readAloud')}`;
        }
        if (this.elements.pdfBtn) {
            this.elements.pdfBtn.innerHTML = `<i class="fas fa-file-pdf"></i> ${this.getText('savePdf')}`;
        }
    },
    
    // Helper function to update charts and insights
    updateChartsAndInsights: function() {
        // Update chart titles
        const chartTitles = document.querySelectorAll('.chart-card h3');
        if (chartTitles[0]) {
            chartTitles[0].textContent = this.getText('trendChart').replace('{}', this.state.dateRange);
        }
        if (chartTitles[1]) {
            chartTitles[1].textContent = this.getText('districtChart');
        }

        // Update insights
        const insightTitles = document.querySelectorAll('.insight-card h3');
        const insightTexts = [
            'priceTrend',
            'seasonalPattern',
            'recommendation'
        ];

        insightTitles.forEach((title, index) => {
            if (title) {
                title.textContent = this.getText(insightTexts[index]);
            }
        });

        // Update insight descriptions
        const insightDescriptions = document.querySelectorAll('.insight-card p');
        const descriptionTexts = [
            'priceTrendInsight',
            'seasonalPatternInsight',
            'recommendationInsight'
        ];

        insightDescriptions.forEach((desc, index) => {
            if (desc) {
                desc.textContent = this.getText(descriptionTexts[index]);
            }
        });
    },
    
    // Translations for multilingual support
    translations: {
        en: {
            backToHome: "Back to Home",
            marketTitle: "Live Crop Market Prices in Tamil Nadu",
            marketSubtitle: "Updated hourly with actual market data from across the state",
            selectDistrict: "Select District",
            selectCrop: "Select Crop",
            timePeriod: "Time Period",
            updatePrices: "Update Prices",
            readAloud: "Read Aloud",
            savePdf: "Save as PDF",
            priceTrend: "Price Trend",
            seasonalPattern: "Seasonal Pattern",
            recommendation: "Recommendation",
            queryTitle: "Didn't find your crop or price?",
            querySubtitle: "Submit a query and our team will get back to you with the information you need.",
            submitQuery: "Submit Query",
            priceInsight: {
                rising: "↑ Rising",
                falling: "↓ Falling",
                stable: "→ Stable"
            },
            lastUpdated: "Last updated: ",
            minutesAgo: " minutes ago",
            hoursAgo: " hours ago",
            perQuintal: "per quintal",
            trendChart: "Price Trends (Last {} Days)",
            districtChart: "District Comparison",
            voiceStart: "Starting voice readout",
            voiceStop: "Stopping voice readout",
            pdfGenerated: "PDF generated successfully",
            querySubmitted: "Query submitted successfully",
            allTamilNadu: "All Tamil Nadu",
            min: "Min",
            max: "Max",
            avg: "Avg",
            farmerName: "Your Name",
            cropName: "Crop Name",
            location: "Your Location",
            mobile: "Mobile Number",
            comments: "Additional Comments (Optional)",
            farmerInsights: "Farmer Insights",
            priceTrendInsight: "Prices have been steadily rising over the past 7 days, showing a 5% increase compared to last week.",
            seasonalPatternInsight: "Current prices are above the seasonal average. This is the usual pattern for this period.",
            recommendationInsight: "Consider selling now as prices are above average and showing an upward trend. Monitor for 2-3 days if you want to maximize income.",
            // Crop names
            rice: "Rice (Paddy)",
            tomato: "Tomato",
            onion: "Onion",
            potato: "Potato",
            brinjal: "Brinjal",
            banana: "Banana",
            sugarcane: "Sugarcane",
            coconut: "Coconut",
            cotton: "Cotton",
            groundnut: "Groundnut",
            // Time periods
            last7Days: "Last 7 Days",
            last30Days: "Last 30 Days",
            last3Months: "Last 3 Months",
            last6Months: "Last 6 Months"
        },
        ta: {
            backToHome: "முதல் பக்கத்திற்கு",
            marketTitle: "தமிழ்நாட்டில் நேரடி பயிர் சந்தை விலைகள்",
            marketSubtitle: "மாநிலம் முழுவதிலும் உள்ள உண்மையான சந்தை தரவுகளுடன் ஒவ்வொரு மணிநேரமும் புதுப்பிக்கப்படுகிறது",
            selectDistrict: "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",
            selectCrop: "பயிரைத் தேர்ந்தெடுக்கவும்",
            timePeriod: "கால அளவு",
            updatePrices: "விலைகளை புதுப்பிக்கவும்",
            readAloud: "குரலில் படிக்கவும்",
            savePdf: "PDF ஆக சேமிக்கவும்",
            priceTrend: "விலை போக்கு",
            seasonalPattern: "பருவகால முறை",
            recommendation: "பரிந்துரை",
            queryTitle: "உங்கள் பயிர் அல்லது விலை கிடைக்கவில்லையா?",
            querySubtitle: "வினவலை சமர்ப்பிக்கவும், எங்கள் குழு உங்களுக்கு தேவையான தகவலுடன் திரும்பி வரும்.",
            submitQuery: "வினவலை சமர்ப்பிக்கவும்",
            priceInsight: {
                rising: "↑ ஏறும்",
                falling: "↓ குறையும்",
                stable: "→ நிலையான"
            },
            lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது: ",
            minutesAgo: " நிமிடங்களுக்கு முன்",
            hoursAgo: " மணி நேரத்திற்கு முன்",
            perQuintal: "குவிண்டாலுக்கு",
            trendChart: "விலை போக்குகள் (கடந்த {} நாட்கள்)",
            districtChart: "மாவட்ட ஒப்பீடு",
            voiceStart: "குரல் வாசிப்பு தொடங்குகிறது",
            voiceStop: "குரல் வாசிப்பு நிறுத்தப்படுகிறது",
            pdfGenerated: "PDF வெற்றிகரமாக உருவாக்கப்பட்டது",
            querySubmitted: "வினவல் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது",
            allTamilNadu: "அனைத்து தமிழ்நாடு",
            min: "குறைந்தபட்சம்",
            max: "அதிகபட்சம்",
            avg: "சராசரி",
            farmerName: "உங்கள் பெயர்",
            cropName: "பயிர் பெயர்",
            location: "உங்கள் இருப்பிடம்",
            mobile: "மொபைல் எண்",
            comments: "கூடுதல் கருத்துகள் (விருப்ப)",
            farmerInsights: "விவசாயி நுண்ணறிவுகள்",
            priceTrendInsight: "கடந்த 7 நாட்களில் விலைகள் நிலையாக உயர்ந்து வருகின்றன, கடந்த வாரத்துடன் ஒப்பிடும்போது 5% உயர்வு.",
            seasonalPatternInsight: "தற்போதைய விலைகள் பருவகால சராசரியை விட அதிகம். இது இந்த காலத்திற்கான வழக்கமான முறை.",
            recommendationInsight: "விலைகள் சராசரியை விட அதிகமாகவும், மேலும் உயரும் போக்கிலும் இருப்பதால் இப்போது விற்பனை செய்வதை கருத்தில் கொள்ளவும். அதிக வருமானம் பெற விரும்பினால் 2-3 நாட்கள் கண்காணிக்கவும்.",
            // Crop names
            rice: "நெல் (பaddy)",
            tomato: "தக்காளி",
            onion: "வெங்காயம்",
            potato: "உருளைக்கிழங்கு",
            brinjal: "கத்தரி",
            banana: "வாழை",
            sugarcane: "கரும்பு",
            coconut: "தேங்காய்",
            cotton: "பருத்தி",
            groundnut: "நிலக்கடலை",
            // Time periods
            last7Days: "கடந்த 7 நாட்கள்",
            last30Days: "கடந்த 30 நாட்கள்",
            last3Months: "கடந்த 3 மாதங்கள்",
            last6Months: "கடந்த 6 மாதங்கள்"
        }
    },
    
    // Apply the selected language
    applyLanguage: function() {
        // Update navigation items
        const navItems = document.querySelectorAll('.navbar-menu .menu-item');
        navItems.forEach(item => {
            const text = item.textContent.trim().toLowerCase();
            if (text === 'home') {
                item.textContent = this.getText('home');
            } else if (text === 'services') {
                item.textContent = this.getText('services');
            } else if (text === 'about') {
                item.textContent = this.getText('about');
            }
        });

        // Update language dropdown
        const languageDropdown = document.querySelector('.language-dropdown .menu-item');
        if (languageDropdown) {
            languageDropdown.innerHTML = `${this.getText('languages')} <i class="fas fa-chevron-down"></i>`;
        }

        // Update account icon tooltip
        const accountIcon = document.querySelector('.account-icon .tooltip');
        if (accountIcon) {
            accountIcon.textContent = this.state.isLoggedIn ? this.getText('logout') : this.getText('login');
        }

        // Update account icon title and aria-label
        const accountIconLink = document.querySelector('.account-icon a');
        if (accountIconLink) {
            const loginStatus = this.state.isLoggedIn ? this.getText('logout') : this.getText('login');
            accountIconLink.setAttribute('title', loginStatus);
            accountIconLink.setAttribute('aria-label', loginStatus);
        }

        // Update texts that need translation
        document.querySelector('.back-button a').textContent = this.getText('backToHome');
        document.querySelector('.market-title').textContent = this.getText('marketTitle');
        document.querySelector('.market-subtitle').textContent = this.getText('marketSubtitle');
        
        // Update filter labels and options
        document.querySelector('label[for="district-select"]').textContent = this.getText('selectDistrict');
        document.querySelector('label[for="crop-select"]').textContent = this.getText('selectCrop');
        document.querySelector('label[for="date-range"]').textContent = this.getText('timePeriod');
        
        // Update district select options
        const districtSelect = document.getElementById('district-select');
        districtSelect.querySelector('option[value="all"]').textContent = this.getText('allTamilNadu');
        
        // Update crop select options
        const cropSelect = document.getElementById('crop-select');
        const cropOptions = {
            'rice': this.getText('rice'),
            'tomato': this.getText('tomato'),
            'onion': this.getText('onion'),
            'potato': this.getText('potato'),
            'brinjal': this.getText('brinjal'),
            'banana': this.getText('banana'),
            'sugarcane': this.getText('sugarcane'),
            'coconut': this.getText('coconut'),
            'cotton': this.getText('cotton'),
            'groundnut': this.getText('groundnut')
        };
        
        Array.from(cropSelect.options).forEach(option => {
            if (cropOptions[option.value]) {
                option.textContent = cropOptions[option.value];
            }
        });
        
        // Update date range options
        const dateRangeSelect = document.getElementById('date-range');
        const dateRangeOptions = {
            '7': this.getText('last7Days'),
            '30': this.getText('last30Days'),
            '90': this.getText('last3Months'),
            '180': this.getText('last6Months')
        };
        
        Array.from(dateRangeSelect.options).forEach(option => {
            if (dateRangeOptions[option.value]) {
                option.textContent = dateRangeOptions[option.value];
            }
        });
        
        // Update action buttons
        this.elements.updateBtn.innerHTML = `<i class="fas fa-sync-alt"></i> ${this.getText('updatePrices')}`;
        this.elements.voiceBtn.innerHTML = `<i class="fas fa-volume-up"></i> ${this.getText('readAloud')}`;
        this.elements.pdfBtn.innerHTML = `<i class="fas fa-file-pdf"></i> ${this.getText('savePdf')}`;
        
        // Update chart titles
        document.querySelectorAll('.chart-card h3')[0].textContent = 
            this.getText('trendChart').replace('{}', this.state.dateRange);
        document.querySelectorAll('.chart-card h3')[1].textContent = 
            this.getText('districtChart');
        
        // Update insights section
        document.querySelector('.insights-section h2').textContent = this.getText('farmerInsights');
        document.querySelectorAll('.insight-card h3')[0].textContent = this.getText('priceTrend');
        document.querySelectorAll('.insight-card h3')[1].textContent = this.getText('seasonalPattern');
        document.querySelectorAll('.insight-card h3')[2].textContent = this.getText('recommendation');
        
        // Update insight descriptions
        document.querySelectorAll('.insight-card p')[0].textContent = this.getText('priceTrendInsight');
        document.querySelectorAll('.insight-card p')[1].textContent = this.getText('seasonalPatternInsight');
        document.querySelectorAll('.insight-card p')[2].textContent = this.getText('recommendationInsight');
        
        // Update query section
        document.querySelector('.query-section h2').textContent = this.getText('queryTitle');
        document.querySelector('label[for="name"]').textContent = this.getText('farmerName');
        document.querySelector('label[for="crop"]').textContent = this.getText('cropName');
        document.querySelector('label[for="location"]').textContent = this.getText('location');
        document.querySelector('label[for="mobile"]').textContent = this.getText('mobile');
        document.querySelector('label[for="comments"]').textContent = this.getText('comments');
        document.querySelector('.query-form button[type="submit"]').textContent = this.getText('submitQuery');
        
        // Update range labels
        document.querySelectorAll('.range-label')[0].textContent = this.getText('min');
        document.querySelectorAll('.range-label')[1].textContent = this.getText('max');
        document.querySelectorAll('.range-label')[2].textContent = this.getText('avg');
        
        // Update unit text
        document.querySelector('.unit').textContent = this.getText('perQuintal');
        
        // Update price trend label
        this.updateUI();
    },
    
    getText: function(key, substitutions = {}) {
        const langData = this.translations[this.state.currentLanguage];
        // Handle nested keys (e.g. 'priceInsight.rising')
        const keyParts = key.split('.');
        let text = langData;
        
        for (const part of keyParts) {
            if (!text[part]) return key; // Fallback to key if translation not found
            text = text[part];
        }
        
        // Handle substitutions
        let result = text;
        for (const [key, value] of Object.entries(substitutions)) {
            result = result.replace(`{${key}}`, value);
        }
        
        return result;
    },
    
    // Show loading state
    showLoadingState: function() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="spinner"></div>
            <p>Loading market data...</p>
        `;
        
        document.querySelector('.price-display').appendChild(loadingOverlay);
    },
    
    // Hide loading state
    hideLoadingState: function() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.classList.add('fade-out');
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
    },
    
    // Show toast message
    showToast: function(message, duration = 3000) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        // Add to DOM
        document.body.appendChild(toast);
        
        // Trigger reflow for animation
        toast.offsetHeight;
        
        // Add show class for animation
            toast.classList.add('show');
        
        // Remove after duration
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300); // Match transition duration
        }, duration);
    },
    
    // Helper function to get cookie value
    getCookie: function(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    MarketPricesApp.init();
});

// Add CSS for loading overlay and toast
document.head.insertAdjacentHTML('beforeend', `
<style>
.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
    border-radius: var(--border-radius);
    transition: opacity 0.3s;
}

.loading-overlay.fade-out {
    opacity: 0;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(46, 125, 50, 0.2);
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.toast-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.toast {
    background-color: var(--success);
    color: white;
    padding: 15px 20px;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-md);
    display: flex;
    align-items: center;
    gap: 10px;
    transform: translateX(120%);
    transition: transform 0.3s ease;
    max-width: 300px;
}

.toast.show {
    transform: translateX(0);
}

.toast i {
    font-size: 18px;
}
</style>
`); 