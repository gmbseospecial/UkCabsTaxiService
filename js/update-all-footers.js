
const fs = require('fs');
const path = require('path');

const dir = __dirname;

const goodFooter = `    <!-- Footer -->
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
    </footer>`;

fs.readdir(dir, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    const htmlFiles = files.filter(file => file.endsWith('.html'));

    htmlFiles.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace old footer with the new good footer
        const oldFooterPattern = /    <!-- Footer -->[\s\S]*?<\/footer>/;
        
        if (oldFooterPattern.test(content)) {
            content = content.replace(oldFooterPattern, goodFooter);
            console.log(`Updated footer in ${file}`);
            fs.writeFileSync(filePath, content, 'utf8');
        }
    });

    console.log('All footers updated!');
});
