
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const correctNavCTA = `            <div class="nav-cta">
                <a href="tel:+442071234567" class="phone-link">📞 +44 20 7123 4567</a>
                <a href="book.html" class="btn btn-primary">Book Now</a>
            </div>
            <div class="mobile-nav-actions">
                <a href="tel:+442071234567" class="mobile-call-btn">📞</a>
                <button class="mobile-menu-btn">☰</button>
            </div>`;

const correctFooterBottom = `            <div class="footer-bottom">
                <p>&copy; 2026 UK Cabs Taxi Service. All rights reserved. | <a href="privacy.html" style="color: var(--gold);">Privacy Policy</a> | <a href="terms.html" style="color: var(--gold);">Terms of Service</a></p>
            </div>`;

const correctFloatingMenu = `    <div class="floating-menu">
        <input type="checkbox" id="floating-toggle">
        <label for="floating-toggle" class="floating-toggle">
            <span class="toggle-icon toggle-icon-default">🚕</span>
            <span class="toggle-icon toggle-icon-active">+</span>
        </label>
        <div class="floating-options">
            <div class="floating-header">
                <span>Now Start Your Ride</span>
            </div>
            <a href="book.html" class="floating-option" title="Book Now">
                <span class="option-icon">🚕</span>
                <span class="option-text">Book a Ride</span>
            </a>
            <a href="mailto:info@ukcabstaxiservice.co.uk" class="floating-option" title="Email Us">
                <span class="option-icon">✉️</span>
                <span class="option-text">info@ukcabstaxiservice.co.uk</span>
            </a>
            <a href="tel:+442071234567" class="floating-option" title="Call Us">
                <span class="option-icon">📞</span>
                <span class="option-text">+44 20 7123 4567</span>
            </a>
        </div>
    </div>`;

fs.readdir(dir, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    const htmlFiles = files.filter(file => file.endsWith('.html'));

    htmlFiles.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Fix nav-cta section
        const navCTAPattern = /<div class="nav-cta">[\s\S]*?<button class="mobile-menu-btn">☰<\/button>/;
        if (navCTAPattern.test(content)) {
            content = content.replace(navCTAPattern, correctNavCTA);
            console.log(`Fixed nav-cta in ${file}`);
        }
        
        // Fix footer bottom
        const footerBottomPattern = /<div class="footer-bottom">[\s\S]*?<\/div>/;
        if (footerBottomPattern.test(content)) {
            content = content.replace(footerBottomPattern, correctFooterBottom);
            console.log(`Fixed footer in ${file}`);
        }
        
        // Remove any old floating support button and add new floating menu if needed
        const hasNewFloatingMenu = content.includes('<div class="floating-menu">');
        const hasOldFloatingSupport = content.includes('class="floating-support"');
        
        if (hasOldFloatingSupport) {
            content = content.replace(/<!-- Floating Support Button -->[\s\S]*?<a href="tel:[\s\S]*?<\/a>/, '');
            console.log(`Removed old floating support in ${file}`);
        }
        
        if (!hasNewFloatingMenu) {
            // Find the script tag and add floating menu before it
            const scriptTagIndex = content.lastIndexOf('<script src="js/main.js"></script>');
            if (scriptTagIndex !== -1) {
                content = content.substring(0, scriptTagIndex) + correctFloatingMenu + '\n\n' + content.substring(scriptTagIndex);
                console.log(`Added floating menu to ${file}`);
            }
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
    });

    console.log('All pages fixed!');
});
