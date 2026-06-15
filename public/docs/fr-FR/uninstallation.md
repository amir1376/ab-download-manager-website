## Désinstallation

### Windows

- Allez simplement dans le dossier d'installation et exécutez `uninstall.exe`
- Vous pouvez également désinstaller l'application dans les paramètres Windows (`Ajouter ou supprimer des programmes`)

### Linux

Si vous avez utilisé le script d'installation pour Linux, vous pouvez exécuter la commande ci-dessous pour la désinstaller

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/amir1376/ab-download-manager/master/scripts/uninstall.sh)
```

### Homebrew (macOS & Linux)

Si vous avez installé l'application en utilisant Homebrew, vous pouvez exécuter la commande ci-dessous pour la désinstaller

```bash
brew uninstall --cask --zap ab-download-manager && brew untap amir1376/tap
```

### Désinstallation manuelle

Si vous avez installé l'application manuellement (fichier `.zip` ou `tar.gz`), après avoir supprimé le dossier de l'application, supprimez également les fichiers/dossiers suivants.

- `~/.abdm` (répertoire de configuration/cache de l'application)
- `~/.config/autostart/com.abdownloadmanager.desktop` (fichier de démarrage au boot)
- `~/.local/share/applications/com.abdownloadmanager.desktop` (fichier d'entrée du bureau)
