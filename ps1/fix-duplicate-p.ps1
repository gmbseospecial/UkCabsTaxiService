
$htmlFiles = Get-ChildItem -Path "d:\Websites\UK Cabs Taxi Service" -Filter "*.html" -File | Where-Object { $_.Name -ne "index.html" -and $_.Name -ne "about.html" }

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    # Fix the duplicate p tag: <p style="margin-top: 1.2rem;">\s*<p> becomes <p style="margin-top: 1.2rem;">
    $content = $content -replace '(?s)<p style="margin-top: 1\.2rem;">\s*<p>', '<p style="margin-top: 1.2rem;">'
    Set-Content $file.FullName -Value $content -NoNewline
    Write-Host "Fixed duplicate p tag in: $($file.Name)"
}

Write-Host "All duplicate p tags fixed!"
