
const fs = require('fs');
const path = require('path');

const dir = __dirname;

fs.readdir(dir, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    const htmlFiles = files.filter(file => file.endsWith('.html'));

    htmlFiles.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Fix footer bottom indentation
        const badFooterBottom = /\s+<div class="footer-bottom">[\s\S]*?<\/div>/;
        const goodFooterBottom = `            <div class="footer-bottom">
                <p>&copy; 2026 UK Cabs Taxi Service. All rights reserved. | <a href="privacy.html" style="color: var(--gold);">Privacy Policy</a> | <a href="terms.html" style="color: var(--gold);">Terms of Service</a></p>
            </div>`;
        
        content = content.replace(badFooterBottom, goodFooterBottom);
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed footer indentation in ${file}`);
    });

    console.log('All footers fixed!');
});
