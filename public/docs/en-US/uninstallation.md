## Uninstall

### Windows

- Simply go to the installation folder and run the `uninstall.exe`
- You can also use uninstall the app in the Windows settings (`Add or remove programs`)

### Linux

if you used the installation script for Linux you can perform the below command to uninstall it

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/amir1376/ab-download-manager/master/scripts/uninstall.sh)
```

### Homebrew (macOS & Linux)

if you installed app using Homebrew you can perform below command to uninstall it

```bash
brew uninstall --cask --zap ab-download-manager && brew untap amir1376/tap
```

### Manual uninstall

if you installed the app manually (the `.zip` or `tar.gz` file) after you deleted the app folder, delete the following file(s)/folder(s) too.

- `~/.abdm` (app's config/cache directory)
- `~/.config/autostart/com.abdownloadmanager.desktop` (start on boot file)
- `~/.local/share/applications/com.abdownloadmanager.desktop` (desktop entry file)
