# Súgó és GYIK

Keressen válaszokat a gyakran ismételt kérdésekre, és megtalálja az AB Download Manager hibaelhárítási útmutatóit.

---

### Támogatja ez az alkalmazás a média letöltését weboldalakról?
Igen! Az AB Download Manager képes videókat, hanganyagokat és nem titkosított HLS streameket rögzíteni weboldalakról. Győződj meg róla, hogy a böngészőbővítmény telepítve van, hogy ez a funkció működjön.

---

### Támogatja ez az alkalmazás a letöltést a YouTube-ról?
Nem. A jogi és licencfeltételek miatt az alkalmazás nem támogatja a titkosított videófolyamok letöltését, ami magában foglalja a YouTube-videókat is.

---

### A képernyő fekete vagy villog – mit tegyek?
Előfordulhat, hogy a renderelési API-t szoftveres renderelésre kell módosítania. Kövesse az alábbi lépéseket:
1. adja hozzá ezt a sort a környezeti változóihoz
   ```env
   SKIKO_RENDER_API=SOFTWARE
   ```
2. Indítsa újra az alkalmazást.

További részletekért tekintse meg a [hivatalos renderelési API oktatóanyagot a GitHubon] (https://github.com/amir1376/ab-download-manager/wiki/Change-the-renderApi).

---

### A bővítmény nem tud csatlakozni az alkalmazáshoz — mit tegyek?
Ha a böngészőbővítmény nem tud kommunikálni az asztali alkalmazással:
1. Győződjön meg róla, hogy az AB Download Manager asztali alkalmazás fut.
2. Ellenőrizze, hogy a VPN-je, tűzfala vagy proxyja nem blokkolja-e a hozzáférést a helyi porthoz `15151`.
3. Próbálja meg közvetlenül megnyitni a [http://localhost:15151](http://localhost:15151) oldalt a böngészőben. Ha működik, látnia kell egy kapcsolati választ az alkalmazástól.
