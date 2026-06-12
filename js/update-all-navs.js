
const fs = require('fs');
const path = require('path');

const dir = __dirname;

const newDropdownHTML = `            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li class="dropdown">
                    <a href="about.html">About Us ▾</a>
                    <ul class="dropdown-menu">
                        <li><a href="our-story.html">Our Story</a></li>
                        <li><a href="business.html">Business Network</a></li>
                        <li><a href="our-team.html">Our Team</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="services.html">Services ▾</a>
                    <ul class="dropdown-menu">
                        <li><a href="services.html">All Services</a></li>
                        <li><a href="airports.html">Airport Transfers</a></li>
                        <li><a href="executive-travel.html">Executive Travel</a></li>
                        <li><a href="corporate-accounts.html">Corporate Accounts</a></li>
                        <li><a href="local-taxi.html">Local Taxi</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="airports.html">Airports ▾</a>
                    <ul class="dropdown-menu">
                        <li><a href="airports.html">All Airports</a></li>
                        <li><a href="heathrow.html">Heathrow Airport</a></li>
                        <li><a href="gatwick.html">Gatwick Airport</a></li>
                        <li><a href="stansted.html">Stansted Airport</a></li>
                        <li><a href="luton.html">Luton Airport</a></li>
                        <li><a href="londoncity.html">London City Airport</a></li>
                    </ul>
                </li>
                <li><a href="fleet.html">Fleet</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>`;

fs.readdir(dir, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'index.html');

    htmlFiles.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Find the old nav links section and replace it
        const navLinkStart = content.indexOf('<ul class="nav-links">');
        if (navLinkStart !== -1) {
            let depth = 0;
            let navLinkEnd = navLinkStart;
            let i = navLinkStart;
            while (i < content.length) {
                if (content.substr(i, 3) === '<ul') depth++;
                if (content.substr(i, 4) === '</ul') {
                    depth--;
                    if (depth === 0) {
                        navLinkEnd = i + 5;
                        break;
                    }
                }
                i++;
            }
            
            if (navLinkEnd > navLinkStart) {
                const oldNavLinks = content.substring(navLinkStart, navLinkEnd);
                content = content.replace(oldNavLinks, newDropdownHTML);
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated navigation in ${file}`);
            }
        }
    });

    console.log('All pages updated!');
});
