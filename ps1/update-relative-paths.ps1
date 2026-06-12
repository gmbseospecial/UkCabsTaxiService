$folders = Get-ChildItem -Directory | Where-Object { $_.Name -notin @("assets", "css", "images", "js", "ps1") }

foreach ($folder in $folders) {
    $htmlFile = Join-Path $folder.FullName "index.html"
    if (Test-Path $htmlFile) {
        $content = Get-Content $htmlFile -Raw
        
        # Update paths that start with css/, js/, images/, assets/ to ../css/, etc.
        $content = $content -replace 'href="css/', 'href="../css/'
        $content = $content -replace 'src="css/', 'src="../css/'
        $content = $content -replace 'href="js/', 'href="../js/'
        $content = $content -replace 'src="js/', 'src="../js/'
        $content = $content -replace 'href="images/', 'href="../images/'
        $content = $content -replace 'src="images/', 'src="../images/'
        $content = $content -replace 'href="assets/', 'href="../assets/'
        $content = $content -replace 'src="assets/', 'src="../assets/'
        
        # Also check for single quotes
        $content = $content -replace "href='css/", "href='../css/"
        $content = $content -replace "src='css/", "src='../css/"
        $content = $content -replace "href='js/", "href='../js/"
        $content = $content -replace "src='js/", "src='../js/"
        $content = $content -replace "href='images/", "href='../images/"
        $content = $content -replace "src='images/", "src='../images/"
        $content = $content -replace "href='assets/", "href='../assets/"
        $content = $content -replace "src='assets/", "src='../assets/"
        
        Set-Content $htmlFile -Value $content -NoNewline
        Write-Host "Updated paths in $($folder.Name)/index.html"
    }
}

Write-Host "All relative paths updated!"
