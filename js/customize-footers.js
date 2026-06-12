const fs = require('fs');
const path = require('path');

const htmlFiles = [
    'about.html',
    'airports.html',
    'book.html',
    'business.html',
    'contact.html',
    'corporate-accounts.html',
    'executive-travel.html',
    'fleet.html',
    'gatwick.html',
    'heathrow.html',
    'local-taxi.html',
    'londoncity.html',
    'luton.html',
    'our-story.html',
    'our-team.html',
    'privacy.html',
    'services.html',
    'stansted.html',
    'terms.html'
];

// Correct floating menu (only one, with + icon)
const correctFloatingMenu = `
<!-- Floating Menu -->
<div class="floating-menu">
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
</div>
`;

// Footer templates
const footerHome = `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <img src="images/Logo.jpg" alt="UK Cabs Taxi Service">
                    <p>Premium taxi and airport transfer service in London. Committed to excellence, reliability, and customer satisfaction since 2009.</p>
                    <div class="footer-social">
                        <a href="#">📘</a>
                        <a href="#">🐦</a>
                        <a href="#">📷</a>
                        <a href="#">💼</a>
                    </div>
                </div>
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="fleet.html">Our Fleet</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Airports</h4>
                    <ul>
                        <li><a href="heathrow.html">Heathrow Airport</a></li>
                        <li><a href="gatwick.html">Gatwick Airport</a></li>
                        <li><a href="stansted.html">Stansted Airport</a></li>
                        <li><a href="luton.html">Luton Airport</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h4>Contact Us</h4>
                    <p>📍 London, United Kingdom</p>
                    <p>📞 +44 20 7123 4567</p>
                    <p>✉️ info@ukcabstaxiservice.co.uk</p>
                    <p>🕒 24/7 Available</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 UK Cabs Taxi Service. All rights reserved. | <a href="privacy.html" style="color: var(--gold);">Privacy Policy</a> | <a href="terms.html" style="color: var(--gold);">Terms of Service</a></p>
            </div>
        </div>
    </footer>
`;

const footerAirport = `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <img src="images/Logo.jpg" alt="UK Cabs Taxi Service">
                    <p>Fast, reliable airport transfers to and from all London airports. Meet & greet service included.</p>
                    <div class="footer-social">
                        <a href="#">📘</a>
                        <a href="#">🐦</a>
                        <a href="#">📷</a>
                        <a href="#">💼</a>
                    </div>
                </div>
                <div class="footer-links">
                    <h4>All Airports</h4>
                    <ul>
                        <li><a href="heathrow.html">Heathrow Airport</a></li>
                        <li><a href="gatwick.html">Gatwick Airport</a></li>
                        <li><a href="stansted.html">Stansted Airport</a></li>
                        <li><a href="luton.html">Luton Airport</a></li>
                        <li><a href="londoncity.html">London City Airport</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="book.html">Book Now</a></li>
                        <li><a href="fleet.html">Our Fleet</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h4>24/7 Support</h4>
                    <p>📍 London, United Kingdom</p>
                    <p>📞 +44 20 7123 4567</p>
                    <p>✉️ bookings@ukcabstaxiservice.co.uk</p>
                    <p>🕒 Always Available</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 UK Cabs Taxi Service. All rights reserved. | <a href="privacy.html" style="color: var(--gold);">Privacy Policy</a> | <a href="terms.html" style="color: var(--gold);">Terms of Service</a></p>
            </div>
        </div>
    </footer>
`;

const footerService = `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <img src="images/Logo.jpg" alt="UK Cabs Taxi Service">
                    <p>Comprehensive taxi services for all your transportation needs in London and beyond.</p>
                    <div class="footer-social">
                        <a href="#">📘</a>
                        <a href="#">🐦</a>
                        <a href="#">📷</a>
                        <a href="#">💼</a>
                    </div>
                </div>
                <div class="footer-links">
                    <h4>Our Services</h4>
                    <ul>
                        <li><a href="airports.html">Airport Transfers</a></li>
                        <li><a href="executive-travel.html">Executive Travel</a></li>
                        <li><a href="corporate-accounts.html">Corporate Accounts</a></li>
                        <li><a href="local-taxi.html">Local Taxi</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="book.html">Book Now</a></li>
                        <li><a href="fleet.html">Our Fleet</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h4>Get in Touch</h4>
                    <p>📍 London, United Kingdom</p>
                    <p>📞 +44 20 7123 4567</p>
                    <p>✉️ info@ukcabstaxiservice.co.uk</p>
                    <p>🕒 24/7 Available</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 UK Cabs Taxi Service. All rights reserved. | <a href="privacy.html" style="color: var(--gold);">Privacy Policy</a> | <a href="terms.html" style="color: var(--gold);">Terms of Service</a></p>
            </div>
        </div>
    </footer>
`;

const footerAbout = `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <img src="images/Logo.jpg" alt="UK Cabs Taxi Service">
                    <p>Learn more about our story, our team, and how we became London's trusted taxi service.</p>
                    <div class="footer-social">
                        <a href="#">📘</a>
                        <a href="#">🐦</a>
                        <a href="#">📷</a>
                        <a href="#">💼</a>
                    </div>
                </div>
                <div class="footer-links">
                    <h4>About Us</h4>
                    <ul>
                        <li><a href="our-story.html">Our Story</a></li>
                        <li><a href="our-team.html">Our Team</a></li>
                        <li><a href="business.html">Business Network</a></li>
                        <li><a href="about.html">About Us</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="fleet.html">Our Fleet</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h4>Contact Us</h4>
                    <p>📍 London, United Kingdom</p>
                    <p>📞 +44 20 7123 4567</p>
                    <p>✉️ info@ukcabstaxiservice.co.uk</p>
                    <p>🕒 24/7 Available</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 UK Cabs Taxi Service. All rights reserved. | <a href="privacy.html" style="color: var(--gold);">Privacy Policy</a> | <a href="terms.html" style="color: var(--gold);">Terms of Service</a></p>
            </div>
        </div>
    </footer>
`;

const footerLegal = `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <img src="images/Logo.jpg" alt="UK Cabs Taxi Service">
                    <p>Premium taxi and airport transfer service in London. Legal information and policies.</p>
                    <div class="footer-social">
                        <a href="#">📘</a>
                        <a href="#">🐦</a>
                        <a href="#">📷</a>
                        <a href="#">💼</a>
                    </div>
                </div>
                <div class="footer-links">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="privacy.html">Privacy Policy</a></li>
                        <li><a href="terms.html">Terms of Service</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="book.html">Book Now</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h4>Contact</h4>
                    <p>📍 London, United Kingdom</p>
                    <p>📞 +44 20 7123 4567</p>
                    <p>✉️ legal@ukcabstaxiservice.co.uk</p>
                    <p>🕒 24/7 Available</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 UK Cabs Taxi Service. All rights reserved. | <a href="privacy.html" style="color: var(--gold);">Privacy Policy</a> | <a href="terms.html" style="color: var(--gold);">Terms of Service</a></p>
            </div>
        </div>
    </footer>
`;

const footerOther = `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <img src="images/Logo.jpg" alt="UK Cabs Taxi Service">
                    <p>Premium taxi and airport transfer service in London. Committed to excellence since 2009.</p>
                    <div class="footer-social">
                        <a href="#">📘</a>
                        <a href="#">🐦</a>
                        <a href="#">📷</a>
                        <a href="#">💼</a>
                    </div>
                </div>
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="airports.html">Airports</a></li>
                        <li><a href="fleet.html">Our Fleet</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>More</h4>
                    <ul>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                        <li><a href="book.html">Book Now</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h4>Contact Us</h4>
                    <p>📍 London, United Kingdom</p>
                    <p>📞 +44 20 7123 4567</p>
                    <p>✉️ info@ukcabstaxiservice.co.uk</p>
                    <p>🕒 24/7 Available</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 UK Cabs Taxi Service. All rights reserved. | <a href="privacy.html" style="color: var(--gold);">Privacy Policy</a> | <a href="terms.html" style="color: var(--gold);">Terms of Service</a></p>
            </div>
        </div>
    </footer>
`;

// Page categories
const pageCategories = {
    airport: ['heathrow.html', 'gatwick.html', 'stansted.html', 'luton.html', 'londoncity.html', 'airports.html'],
    service: ['services.html', 'executive-travel.html', 'corporate-accounts.html', 'local-taxi.html'],
    about: ['about.html', 'our-story.html', 'our-team.html', 'business.html'],
    legal: ['privacy.html', 'terms.html'],
    other: ['fleet.html', 'contact.html', 'book.html']
};

function processFile(filename) {
    const filePath = path.join(__dirname, filename);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove all floating menus
    content = content.replace(/<!-- Floating Menu -->[\s\S]*?<\/div>\s*?<\/div>\s*?/g, '');
    
    // Remove all footers
    content = content.replace(/<footer class="footer">[\s\S]*?<\/footer>/g, '');
    
    // Add correct footer based on category
    let footer = footerOther;
    if (pageCategories.airport.includes(filename)) {
        footer = footerAirport;
    } else if (pageCategories.service.includes(filename)) {
        footer = footerService;
    } else if (pageCategories.about.includes(filename)) {
        footer = footerAbout;
    } else if (pageCategories.legal.includes(filename)) {
        footer = footerLegal;
    }
    
    // Insert footer before script tag
    content = content.replace(/\s*?<script src="js\/main\.js"><\/script>/, footer + '\n\n<script src="js/main.js"></script>');
    
    // Add floating menu before script tag
    content = content.replace(/\s*?<script src="js\/main\.js"><\/script>/, correctFloatingMenu + '\n\n<script src="js/main.js"></script>');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed: ${filename}`);
}

// Process all files
htmlFiles.forEach(processFile);

console.log('\n✅ All files processed successfully!');
