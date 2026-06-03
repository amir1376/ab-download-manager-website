## راهنمای نصب

شما می‌توانید AB Download Manager را با استفاده از روش‌های زیر نصب کنید.

### نصب مستقیم

- [وبسایت رسمی](https://abdownloadmanager.com/#download): آخرین نسخه پایدار را مستقیماً دانلود کنید. این ساده‌ترین گزینه برای اکثر کاربران است..
- [ریلیز های گیت‌هاب](https://github.com/amir1376/ab-download-manager/releases/latest): این قسمت شامل فایل‌ های نصب و تاریخچه کامل انتشار است.


⚠️ حل خطای رایج نصب برنامه در مک‌او‌اس

خطا:
Apple could not verify “ABDownloadManager” is free of malware that may harm your Mac or compromise your privacy.

مک‌اواس به‌طور پیش‌فرض فقط برنامه‌های تأییدشده توسط اپل را اجرا می‌کند.

راهکار:

1. به مسیر زیر بروید:
   System Settings → Privacy & Security

2. پیام «برنامه مسدود شد» را پیدا کنید.

3. روی دکمه «Open Anyway» کلیک کنید.

4. برنامه را دوباره اجرا کنید.

نکته:
اگر گزینه نمایش داده نشد، روی فایل کلیک راست کرده و Open را انتخاب کنید.


### نصب از طریق CLI

#### لینوکس (توصیه شده)
```bash
curl -fsSL https://raw.githubusercontent.com/amir1376/ab-download-manager/master/scripts/install.sh | bash
```

### پکیج منیجر

#### ویندوز

##### Winget

```bash
winget install amir1376.ABDownloadManager
```

##### Scoop:

```bash
scoop install extras/abdownloadmanager
```

#### Homebrew (برای لینوکس و مک‌اواس)

```bash
brew tap amir1376/tap && brew install --cask ab-download-manager
```
