## Jak uczynić aplikację przenośną (Zmiana katalogu konfiguracyjnego)

Domyślnie, aplikacja przechowuje swoje pliki konfiguracyjne w:

`~/.abdm`

Są dwa sposoby żeby to zmienić:

### Sposób 1: Użyj lokalnego folderu `.abdm`

Stwórz folder o nazwie `.abdm` w folderze instalacyjnym aplikacji.

Jeżeli ten folder istnieje, aplikacja automatycznie zacznie go używać jako katalog konfiguracyjny zamiast domyślnej lokalizacji.

### Sposób 2: Użyj pliku `.portable`

Stwórz plik o nazwie `.portable` w folderze instalacyjnym aplikacji.

W środku tego pliku, zapisz pełną ścieżke do folderu który chcesz użyć jako katalog konfiguracyjny.

Aplikacja odczyta ten plik i użyje podanej ścieżki do przechowywania plików konfiguracyjnych.
