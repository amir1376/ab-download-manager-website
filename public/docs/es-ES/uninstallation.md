## Desinstalar

### Windows

- Simplemente ve a la carpeta de instalación y ejecuta `uninstall.exe`
- También puedes desinstalar la aplicación en la configuración de Windows (`Agregar o quitar programas`)

### Linux

Si usaste el script de instalación para Linux, puedes ejecutar el siguiente comando para desinstalarlo

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/amir1376/ab-download-manager/master/scripts/uninstall.sh)
```

### Homebrew (macOS y Linux)

Si instalaste la aplicación usando Homebrew, puedes ejecutar el siguiente comando para desinstalarlo

```bash
brew uninstall --cask --zap ab-download-manager && brew untap amir1376/tap
```

### Desinstalación manual

Si instalaste la aplicación manualmente (archivo `.zip` o `tar.gz`), después de eliminar la carpeta de la aplicación, también elimina los siguientes archivo(s)/carpeta(s).

- `~/.abdm` (directorio de configuración/caché de la aplicación)
- `~/.config/autostart/com.abdownloadmanager.desktop` (archivo de inicio al encender)
- `~/.local/share/applications/com.abdownloadmanager.desktop` (archivo de entrada del escritorio)
