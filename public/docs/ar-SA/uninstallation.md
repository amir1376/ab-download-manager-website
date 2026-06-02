## إلغاء التثبيت

### ويندوز

- ببساطة اذهب إلى مجلد التثبيت وقم بتشغيل ملف إلغاء التثبيت `uninstall.exe`.
- يمكنك أيضاً إلغاء تثبيت التطبيق من إعدادات ويندوز (`إضافة أو إزالة البرامج` / `Add or remove programs`).

### لينكس

إذا كنت قد استخدمت سكربت التثبيت للينكس، يمكنك تنفيذ الأمر أدناه لإلغاء تثبيته:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/amir1376/ab-download-manager/master/scripts/uninstall.sh)
```

### Homebrew (macOS ولينكس)

إذا قمت بتثبيت التطبيق باستخدام Homebrew، يمكنك تشغيل الأمر التالي لإلغاء تثبيته:

```bash
brew uninstall --cask --zap ab-download-manager && brew untap amir1376/tap
```

### إلغاء التثبيت اليدوي

إذا قمت بتثبيت التطبيق يدوياً (عن طريق ملف `.zip` أو `tar.gz`)، فبعد حذف مجلد التطبيق، قم بحذف الملفات/المجلدات التالية أيضاً:

- `~/.abdm` (مجلد إعدادات وتخزين التطبيق المؤقت - config/cache)
- `~/.config/autostart/com.abdownloadmanager.desktop` (ملف البدء التلقائي مع النظام)
- `~/.local/share/applications/com.abdownloadmanager.desktop` (ملف اختصار التطبيق على سطح المكتب)
