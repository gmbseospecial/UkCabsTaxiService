
$htmlFiles = Get-ChildItem -Path "d:\Websites\UK Cabs Taxi Service" -Filter "*.html" -File | Where-Object { $_.Name -ne "index.html" }

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # 1. Update header logo to be a link
    $oldHeaderLogo = '<div class="logo">
                <img src="images/Logo.jpg" alt="UK Cabs Taxi Service Logo">
                <div class="logo-text-container">
                    <div class="logo-text">UK <span>Cabs</span></div>
                    <div class="logo-subtext">Taxi Service</div>
                </div>
            </div>'
    $newHeaderLogo = '<a href="index.html" class="logo" style="text-decoration: none;">
                <img src="images/Logo.jpg" alt="UK Cabs Taxi Service Logo">
                <div class="logo-text-container">
                    <div class="logo-text">UK <span>Cabs</span></div>
                    <div class="logo-subtext">Taxi Service</div>
                </div>
            </a>'
    $content = $content -replace [regex]::Escape($oldHeaderLogo), $newHeaderLogo
    
    # 2. Update footer logo to be a link and have the full logo text
    $oldFooterLogo = '<img src="images/Logo.jpg" alt="UK Cabs Taxi Service">'
    $newFooterLogo = '<a href="index.html" class="logo" style="text-decoration: none;">
                        <img src="images/Logo.jpg" alt="UK Cabs Taxi Service Logo">
                        <div class="logo-text-container">
                            <div class="logo-text">UK <span>Cabs</span></div>
                            <div class="logo-subtext">Taxi Service</div>
                        </div>
                    </a>
                    <p style="margin-top: 1.2rem;">'
    $content = $content -replace [regex]::Escape($oldFooterLogo), $newFooterLogo
    
    # Write back to file
    Set-Content $file.FullName -Value $content -NoNewline
    Write-Host "Updated: $($file.Name)"
}

Write-Host "All files updated successfully!"
