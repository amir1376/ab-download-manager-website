# Pomoc i często zadawane pytania

Znajdź odpowiedzi na często zadawane pytania oraz poradniki dotyczące rozwiązywania problemów dla AB Download Manager.

---

### Czy ta aplikacja wspiera pobieranie multimediów z stron?
Tak! AB Download Manager może przechwycić wideo, audio, i nieszyfrowane streamy HLS z stron. Upewnij się że masz zainstalowane rozszerzenie w przeglądarce żeby ta funkcja działała.

---

### Czy ta aplikacja wspiera pobieranie filmów z YouTube?
Nie. Ze względu na prawa i warunki licencji aplikacja nie obsługuje pobierania zaszyfrowanych strumieni, w tym filmów z serwisu YouTube.

---

### Mój ekran jest czarny albo mruga — co mam zrobić?
Być może konieczna będzie zmiana API renderowania na renderowanie programowe. Wykonaj poniższe czynności:
1. dodaj tą linie do zmiennych środowiskowych
   ```env
   SKIKO_RENDER_API=SOFTWARE
   ```
2. Uruchom ponownie aplikacje.

Aby uzyskać więcej informacji, możesz zapoznać się z [oficjalnym samouczkiem dotyczącym API renderowania na GitHubie](https://github.com/amir1376/ab-download-manager/wiki/Change-the-renderApi).

---

### Rozszerzenie nie łączy się z aplikacją — co mam zrobić?
Jeśli rozszerzenie przeglądarkowe nie może nawiązać połączenia z aplikacją:
1. Upewnij się że aplikacja komputerowa AB Download Manager jest uruchomiona.
2. Upewnij się że twój VPN, zapora, albo proxy nie blokuje dostępu do lokalnego portu `15151`.
3. Spróbuj otworzyć [http://localhost:15151](http://localhost:15151) bezpośrednio w przeglądarce. Jeśli wszystko działa poprawnie, powinna pojawić się informacja o nawiązaniu połączenia z aplikacją.
