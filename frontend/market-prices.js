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
        queryForm: null
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
            avg: "Avg"
        },
        ta: {
            backToHome: "முதல் பக்கத்திற",
            marketTitle: "தமிழ்நாடு நேரடி விளையாட்டு செல்வாக்குகள்",
            marketSubtitle: "மாநிலத்தின் அனைத்து பகுதிகளிலிருந்து உண்மையான சந்தை தரவுடன் ஒவ்வொரு மணிநேரமும் புதுப்பிக்கப்படுகிறது",
            selectDistrict: "மாவட்டத்தைத் தேர்வு செய்க",
            selectCrop: "விளையாட்டைத் தேர்வு செய்க",
            timePeriod: "கால வரையறை",
            updatePrices: "விலைகளை புதுப்பிக்கவும்",
            readAloud: "குரலில் ஓதுக",
            savePdf: "PDF க்காக சேமிக்கவும்",
            priceTrend: "விலை பரவல்",
            seasonalPattern: "ஆண்டுவார வரையறை",
            recommendation: "பரிந்துரை",
            queryTitle: "உங்கள் விளையாட்டை அல்லது விலையை காணவில்லையா?",
            querySubtitle: "வினவலை சமர்ப்பிக்கவும், உங்களுக்கு தேவையான தகவலுடன் எங்கள் குழு உங்களிடம் திரும்பி வருவது.",
            submitQuery: "வினவலை சமர்ப்பிக்கவும்",
            priceInsight: {
                rising: "↑ ஏறும்",
                falling: "↓ குறையும்",
                stable: "→ நிலையான"
            },
            lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது: ",
            minutesAgo: " நிமிடங்களுக்கு முன்",
            hoursAgo: " மணி நேரம் முன்",
            perQuintal: "பர கின்டலுக்கு",
            trendChart: "விலை பரவல் (கடந்த {} நாட்கள்)",
            districtChart: "மாவட்டு ஒப்பீடு",
            voiceStart: "குரல் வாய்ச்சாட்டு தொடங்குகிறது",
            voiceStop: "குரல் வாய்ச்சாட்டு நிறுத்துகிறது",
            pdfGenerated: "PDF வெற்றிகரமாக உருவாக்கப்பட்டது",
            querySubmitted: "வினவலை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது",
            allTamilNadu: "அனைத்து தமிழ்நாடு",
            min: "குறைந்தபட்சம்",
            max: "அதிகபட்சம்",
            avg: "சராசரி"
        }
    },
    
    // Apply the selected language
    applyLanguage: function() {
        // Update texts that need translation
        document.querySelector('.back-button a').textContent = this.getText('backToHome');
        document.querySelector('.market-title').textContent = this.getText('marketTitle');
        document.querySelector('.market-subtitle').textContent = this.getText('marketSubtitle');
        
        document.querySelector('label[for="district-select"]').textContent = this.getText('selectDistrict');
        document.querySelector('label[for="crop-select"]').textContent = this.getText('selectCrop');
        document.querySelector('label[for="date-range"]').textContent = this.getText('timePeriod');
        
        this.elements.updateBtn.innerHTML = `<i class="fas fa-sync-alt"></i> ${this.getText('updatePrices')}`;
        this.elements.voiceBtn.innerHTML = `<i class="fas fa-volume-up"></i> ${this.getText('readAloud')}`;
        this.elements.pdfBtn.innerHTML = `<i class="fas fa-file-pdf"></i> ${this.getText('savePdf')}`;
        
        // Update chart titles
        document.querySelectorAll('.chart-card h3')[0].textContent = 
            this.getText('trendChart').replace('{}', this.state.dateRange);
        document.querySelectorAll('.chart-card h3')[1].textContent = 
            this.getText('districtChart');
        
        // Update insights section
        document.querySelectorAll('.insight-card h3')[0].textContent = this.getText('priceTrend');
        document.querySelectorAll('.insight-card h3')[1].textContent = this.getText('seasonalPattern');
        document.querySelectorAll('.insight-card h3')[2].textContent = this.getText('recommendation');
        
        // Update query section
        document.querySelector('.query-section h2').textContent = this.getText('queryTitle');
        document.querySelector('.query-section > p').textContent = this.getText('querySubtitle');
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
    showToast: function(message) {
        // Check if toast container exists, if not create it
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Show toast with animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove toast after timeout
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
                
                // Remove container if empty
                if (toastContainer.children.length === 0) {
                    toastContainer.remove();
                }
            }, 300);
        }, 3000);
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