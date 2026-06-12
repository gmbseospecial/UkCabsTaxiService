
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const newHTML = `<!-- Floating Menu -->
<div class="floating-menu">
    <input type="checkbox" id="floating-toggle">
    <label for="floating-toggle" class="floating-toggle">
        <span class="toggle-icon">🚕</span>
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

<script src="js/main.js"></script>`;

fs.readdir(dir, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'index.html');

    htmlFiles.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        const scriptStart = content.lastIndexOf('<script src="js/main.js"></script>');
        if (scriptStart !== -1) {
            const beforeScript = content.substring(0, scriptStart).trim();
            content = beforeScript + '\n\n' + newHTML;
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file}`);
        }
    });

    console.log('All files updated!');
});
