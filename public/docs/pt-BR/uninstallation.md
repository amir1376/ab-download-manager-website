## Desinstalação

### Windows

- Acesse a pasta em que o aplicativo foi instalado e execute `uninstall.exe`.
- Você também pode desinstalá-lo pelas configurações do Windows, em **Adicionar ou remover programas**.

### Linux

Se você instalou o aplicativo usando o script de instalação para Linux, execute o seguinte comando para desinstalá-lo:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/amir1376/ab-download-manager/master/scripts/uninstall.sh)
```

### Homebrew (macOS e Linux)

Se você instalou o aplicativo usando o Homebrew, execute o seguinte comando para desinstalá-lo:

```bash
brew uninstall --cask --zap ab-download-manager && brew untap amir1376/tap
```

### Desinstalação manual

Se você instalou o aplicativo manualmente (a partir de um arquivo `.zip` ou `.tar.gz`), exclua a pasta do aplicativo e, em seguida, remova também os seguintes arquivos e pastas:

- `~/.abdm` (diretório de configurações e cache do aplicativo)
- `~/.config/autostart/com.abdownloadmanager.desktop` (arquivo de inicialização automática)
- `~/.local/share/applications/com.abdownloadmanager.desktop` (arquivo de atalho do aplicativo)
