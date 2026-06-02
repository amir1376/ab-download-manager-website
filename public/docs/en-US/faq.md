# Help & FAQ

Find answers to frequently asked questions and troubleshooting guides for AB Download Manager.

---

### Does this app support downloading media from websites?
Yes! AB Download Manager can capture video, audio, and non-encrypted HLS streams from websites. Make sure you have the browser extension installed for this feature to work.

---

### Does this app support downloading from YouTube?
No. Due to legal and licensing terms, the app does not support downloading encrypted streams, which includes YouTube videos.

---

### My screen is black or flickering — what should I do?
You may need to change the render API to software rendering. Follow the steps below:
1. add this line to your environment variables
   ```env
   SKIKO_RENDER_API=SOFTWARE
   ```
2. Restart the application.

For more details, you can also view the [official rendering API tutorial on GitHub](https://github.com/amir1376/ab-download-manager/wiki/Change-the-renderApi).

---

### The extension can't connect to the app — what should I do?
If the browser extension is unable to communicate with the desktop application:
1. Make sure the AB Download Manager desktop application is running.
2. Check that your VPN, firewall, or proxy is not blocking access to the local port `15151`.
3. Try opening [http://localhost:15151](http://localhost:15151) directly in your browser. If it is working, you should see a connection response from the app.
