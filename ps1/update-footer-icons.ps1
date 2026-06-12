$oldFooterSocial = @"
                    <div class="footer-social">
                        <a href="#">📘</a>
                        <a href="#">🐦</a>
                        <a href="#">📷</a>
                        <a href="#">💼</a>
                    </div>
"@

$newFooterSocial = @"
                    <div class="footer-social">
                        <a href="#" aria-label="Facebook">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                        <a href="#" aria-label="Instagram">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="#" aria-label="Reddit">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <circle cx="8" cy="12" r="1"></circle>
                                <circle cx="16" cy="12" r="1"></circle>
                                <path d="M12 20a8 8 0 0 0 8-8"></path>
                            </svg>
                        </a>
                        <a href="#" aria-label="LinkedIn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                    </div>
"@

# List of files to update
$files = @(
    "londoncity.html",
    "luton.html",
    "gatwick.html",
    "heathrow.html",
    "stansted.html",
    "local-taxi.html",
    "corporate-accounts.html",
    "executive-travel.html",
    "airports.html",
    "services.html",
    "our-team.html",
    "business.html",
    "our-story.html",
    "about.html",
    "contact.html",
    "book.html",
    "privacy.html",
    "terms.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -match [regex]::Escape($oldFooterSocial)) {
            $content = $content -replace [regex]::Escape($oldFooterSocial), $newFooterSocial
            Set-Content $file -Value $content -NoNewline
            Write-Host "Updated $file"
        } else {
            Write-Host "No match in $file"
        }
    } else {
        Write-Host "$file not found"
    }
}
