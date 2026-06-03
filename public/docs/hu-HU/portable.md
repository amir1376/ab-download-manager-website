## Az alkalmazás hordozhatóvá tétele (a konfigurációs könyvtár testreszabása)

Alapértelmezés szerint az alkalmazás a konfigurációs fájljait a következő helyen tárolja:

`~/.abdm`

Kétféleképpen módosíthatja ezt:

### 1. lehetőség: Használjon helyi `.abdm` mappát

Hozzon létre egy `.abdm` nevű mappát az alkalmazás telepítési könyvtárában.

Ha ez a mappa létezik, az alkalmazás automatikusan konfigurációs könyvtárként fogja használni az alapértelmezett hely helyett.

### 2. lehetőség: Használjon `.portable` fájlt

Hozzon létre egy `.portable` nevű fájlt a telepítési könyvtárban.

Ebben a fájlban írja be a konfigurációs könyvtárként használni kívánt mappa teljes elérési útját.

Az alkalmazás beolvassa ezt a fájlt, és a megadott elérési utat használja a konfigurációs adatok tárolására.
