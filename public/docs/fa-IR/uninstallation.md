## حذف برنامه

### ویندوز

- کافی است به پوشه نصب بروید و `uninstall.exe‍` را اجرا کنید
- همچنین می توانید از حذف برنامه در تنظیمات ویندوز استفاده کنید (`افزودن یا حذف برنامه ها`)

### لینوکس

اگر از اسکریپت نصب برای لینوکس استفاده کرده اید، می توانید دستور زیر را برای حذف آن اجرا کنید

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/amir1376/ab-download-manager/master/scripts/uninstall.sh)
```

### Homebrew (مک‌او‌اس و لینوکس)

اگر برنامه را با استفاده از Homebrew نصب کرده اید، می توانید دستور زیر را برای حذف آن اجرا کنید

```bash
brew uninstall --cask --zap ab-download-manager && brew untap amir1376/tap
```

### حذف دستی

اگر پس از حذف پوشه برنامه، برنامه را به صورت دستی از طریق فایل `zip` یا `tar.gz` نصب کردید، فایل ها و پوشه های زیر را نیز حذف کنید.

- `abdm~/.` (پیکربندی برنامه/دایرکتوری کش)
- `config/autostart/com.abdownloadmanager.desktop~/.` (فایل راه‌اندازی هنگام بوت)
- `local/share/applications/com.abdownloadmanager.desktop~/.` (فایل ورودی دسکتاپ)
