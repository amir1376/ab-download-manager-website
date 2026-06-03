# Súgó és GYIK

Keressen válaszokat a gyakran ismételt kérdésekre, és megtalálja az AB Download Manager hibaelhárítási útmutatóit.

---

### Támogatja ez az alkalmazás a média letöltését weboldalakról?
Igen! Az AB Download Manager képes videókat, hanganyagokat és nem titkosított HLS streameket rögzíteni weboldalakról. Győződj meg róla, hogy a böngészőbővítmény telepítve van, hogy ez a funkció működjön.

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
