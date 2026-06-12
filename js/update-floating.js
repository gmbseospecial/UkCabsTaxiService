
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const oldHTML = `<!-- Floating Support Button -->
<a href="tel:+442071234567" class="floating-support">
    <span class="support-icon">💬</span>
    <span class="support-text">Need Support?</span>
</a>

<script src="js/main.js"></script>`;
const newHTML = `<!-- Floating Menu -->
<div class="floating-menu">
    <input type="checkbox" id="floating-toggle">
    <label for="floating-toggle" class="floating-toggle">
        <span class="toggle-icon">+</span>
    </label>
    <div class="floating-options">
        <a href="tel:+442071234567" class="floating-option" title="Call Us">
            <span class="option-icon">📞</span>
            <span class="option-text">Call</span>
        </a>
        <a href="mailto:info@ukcabstaxiservice.co.uk" class="floating-option" title="Email Us">
            <span class="option-icon">✉️</span>
            <span class="option-text">Email</span>
        </a>
        <a href="book.html" class="floating-option" title="Book Now">
            <span class="option-icon">🚕</span>
            <span class="option-text">Book</span>
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
        
        if (content.includes('Floating Support Button')) {
            content = content.replace(oldHTML, newHTML);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file}`);
        } else if (content.includes('class="floating-support"')) {
            console.log(`Skipping ${file} - already updated`);
        }
    });

    console.log('All files updated!');
});

