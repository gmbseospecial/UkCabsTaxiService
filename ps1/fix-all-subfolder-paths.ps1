$folders = Get-ChildItem -Directory | Where-Object { $_.Name -notin @("assets", "css", "images", "js", "ps1") }

foreach ($folder in $folders) {
    $htmlFile = Join-Path $folder.FullName "index.html"
    if (Test-Path $htmlFile) {
        $content = Get-Content $htmlFile -Raw
        
        # Update logo link from "index" to "/"
        $content = $content -replace 'href="index"', 'href="/"'
        
        # Update all other links (about, services, etc.) to start with /
        $content = $content -replace 'href="about"', 'href="/about"'
        $content = $content -replace 'href="services"', 'href="/services"'
        $content = $content -replace 'href="airports"', 'href="/airports"'
        $content = $content -replace 'href="fleet"', 'href="/fleet"'
        $content = $content -replace 'href="contact"', 'href="/contact"'
        $content = $content -replace 'href="book"', 'href="/book"'
        $content = $content -replace 'href="business"', 'href="/business"'
        $content = $content -replace 'href="our-story"', 'href="/our-story"'
        $content = $content -replace 'href="our-team"', 'href="/our-team"'
        $content = $content -replace 'href="corporate-accounts"', 'href="/corporate-accounts"'
        $content = $content -replace 'href="executive-travel"', 'href="/executive-travel"'
        $content = $content -replace 'href="local-taxi"', 'href="/local-taxi"'
        $content = $content -replace 'href="heathrow"', 'href="/heathrow"'
        $content = $content -replace 'href="gatwick"', 'href="/gatwick"'
        $content = $content -replace 'href="stansted"', 'href="/stansted"'
        $content = $content -replace 'href="luton"', 'href="/luton"'
        $content = $content -replace 'href="londoncity"', 'href="/londoncity"'
        $content = $content -replace 'href="privacy"', 'href="/privacy"'
        $content = $content -replace 'href="terms"', 'href="/terms"'
        
        # Also fix single quotes if any
        $content = $content -replace "href='index'", "href='/'"
        $content = $content -replace "href='about'", "href='/about'"
        $content = $content -replace "href='services'", "href='/services'"
        $content = $content -replace "href='airports'", "href='/airports'"
        $content = $content -replace "href='fleet'", "href='/fleet'"
        $content = $content -replace "href='contact'", "href='/contact'"
        $content = $content -replace "href='book'", "href='/book'"
        $content = $content -replace "href='business'", "href='/business'"
        $content = $content -replace "href='our-story'", "href='/our-story'"
        $content = $content -replace "href='our-team'", "href='/our-team'"
        $content = $content -replace "href='corporate-accounts'", "href='/corporate-accounts'"
        $content = $content -replace "href='executive-travel'", "href='/executive-travel'"
        $content = $content -replace "href='local-taxi'", "href='/local-taxi'"
        $content = $content -replace "href='heathrow'", "href='/heathrow'"
        $content = $content -replace "href='gatwick'", "href='/gatwick'"
        $content = $content -replace "href='stansted'", "href='/stansted'"
        $content = $content -replace "href='luton'", "href='/luton'"
        $content = $content -replace "href='londoncity'", "href='/londoncity'"
        $content = $content -replace "href='privacy'", "href='/privacy'"
        $content = $content -replace "href='terms'", "href='/terms'"
        
        Set-Content $htmlFile -Value $content -NoNewline
        Write-Host "Updated paths in $($folder.Name)/index.html"
    }
}

Write-Host "All subfolder links updated!"
