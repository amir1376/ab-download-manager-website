## Eltávolítás

### Windows

- Egyszerűen lépjen a telepítési mappába, és futtassa az `uninstall.exe` fájlt.
- Az alkalmazás eltávolítását a Windows beállításainál is használhatja (`Programok hozzáadása vagy eltávolítása`)

### Linux

Ha a Linux telepítőszkriptjét használta, végrehajthatja az alábbi parancsot az eltávolításhoz:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/amir1376/ab-download-manager/master/scripts/uninstall.sh)
```

### Homebrew (macOS és Linux)

Ha az alkalmazást a Homebrew segítségével telepítette, az alábbi parancs végrehajtásával távolítsa el:

```bash
brew uninstall --cask --zap ab-download-manager && brew untap amir1376/tap
```

### Kézi eltávolítás

ha manuálisan telepítette az alkalmazást (a ".zip" vagy "tar.gz" fájlt) az alkalmazásmappa törlése után, törölje a következő fájl(oka)t/mappákat is:

- `~/.abdm` (az alkalmazás config/cache könyvtára)
- `~/.config/autostart/com.abdownloadmanager.desktop` (indítsa el a rendszerindító fájlt)
- `~/.local/share/applications/com.abdownloadmanager.desktop` (asztali bejegyzés fájl)
