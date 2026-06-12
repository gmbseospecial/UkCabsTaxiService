const fs = require('fs');
const path = require('path');

const htmlFiles = [
    'about.html',
    'airports.html',
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
    'services.html',
    'stansted.html'
];

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Replace class="hero" with class="hero page-hero"
        content = content.replace(/class="hero"/g, 'class="hero page-hero"');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${file}`);
    }
});

console.log('Done!');
