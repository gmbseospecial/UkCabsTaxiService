
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const floatingButtonHTML = `    <!-- Floating Support Button -->
    <a href="tel:+442071234567" class="floating-support">
        <span class="support-icon">💬</span>
        <span class="support-text">Need Support?</span>
    </a>

`;

fs.readdir(dir, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    const htmlFiles = files.filter(file => file.endsWith('.html'));

    htmlFiles.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Check if floating button is already added
        if (content.includes('Floating Support Button')) {
            console.log(`Skipping ${file} - already has floating button`);
            return;
        }

        // Replace before </footer> + script
        const scriptTag = `    <script src="js/main.js"></script>`;
        if (content.includes(scriptTag)) {
            content = content.replace(scriptTag, floatingButtonHTML + scriptTag);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Added floating button to ${file}`);
        }
    });

    console.log('Done!');
});

