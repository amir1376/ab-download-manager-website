## Odinstalowywanie

### Windows

- Wystarczy przejść do folderu instalacyjnego i uruchomić plik `uninstall.exe`
- Możesz także odinstalować aplikację przez ustawienia Windowsa (`Dodaj lub usuń programy`)

### Linux

Jeśli został użyty skrypt instalacyjny dla Linuxa, możesz uruchomić poniższą komendę, żeby odinstalować program

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/amir1376/ab-download-manager/master/scripts/uninstall.sh)
```

### Homebrew (macOS i Linux)

Jeśli aplikacja została zainstalowana przy użyciu Homebrew, możesz uruchomić poniższą komendę, żeby odinstalować program

```bash
brew uninstall --cask --zap ab-download-manager && brew untap amir1376/tap
```

### Ręczne odinstalowywanie

Jeśli zainstalowano program ręcznie (z pliku `.zip` albo `tar.gz`) po usunięciu folderu aplikacji, także usuń następujące plik(i)/folder(y).

- `~/.abdm` (konfiguracja aplikacji/katalog pamięci podręcznej)
- `~/.config/autostart/com.abdownloadmanager.desktop` (plik autostartu)
- `~/.local/share/applications/com.abdownloadmanager.desktop` (plik wpisu pulpitu)
