$htmlFiles = Get-ChildItem -Path "d:\Websites\UK Cabs Taxi Service" -Filter "*.html" -File

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    # Replace all href="something.html" with href="something"
    $content = $content -replace 'href="([^"]+)\.html"', 'href="$1"'
    # Also replace href='something.html' with href='something'
    $content = $content -replace "href='([^']+)\.html'", "href='`$1'"
    Set-Content $file.FullName -Value $content -NoNewline
    Write-Host "Updated $($file.Name) - removed .html extensions from links"
}

Write-Host "All HTML files updated!"
