## 卸载

### Windows

- 只需进入安装文件夹并运行 `uninstall.exe`
- 您也可以通过 Windows 设置（`添加或删除程序`）卸载该应用

### Linux

如果您使用了 Linux 安装脚本，可以执行以下命令进行卸载

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/amir1376/ab-download-manager/master/scripts/uninstall.sh)
```

### Homebrew（macOS 和 Linux）

如果您是通过 Homebrew 安装的，请执行以下命令进行卸载

```bash
brew uninstall --cask --zap ab-download-manager && brew untap amir1376/tap
```

### 手动卸载

如果您是手动安装的（使用 `.zip` 或 `tar.gz` 文件），在删除应用程序文件夹后，请一并删除以下文件/文件夹：

- `~/.abdm`（应用的配置/缓存目录）
- `~/.config/autostart/com.abdownloadmanager.desktop`（开机自启文件）
- `~/.local/share/applications/com.abdownloadmanager.desktop`（桌面快捷方式）
