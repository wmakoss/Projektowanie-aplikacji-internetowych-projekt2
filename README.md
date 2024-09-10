# Projektowanie-aplikacji-internetowych-projekt2

Projekt: Aplikacja do tworzenia testów (_**QuizApp**_)

Autorzy:
- Wojciech Makosiej
- Jakub Pleśniak
- Cezary Zięba

## Identyfikacja zagadnienia biznesowego (problemu)

Celem projektu jest stworzenie aplikacji do tworzenia i rozwiązywania testów. 

Docelowym odbiorcą aplikacji mogą być zarówno instytucje edukacyjne, firmy, jak i osoby prywatne, które potrzebują narzędzia do mierzenia poziomu wiedzy lub kompetencji. 

Aplikacja rozwiązuje pełen zakres potrzeb biznesowych związanych z tworzeniem, rozwiązywaniem i ocenianiem testów. Umożliwia łatwe tworzenie pytań, rozwiązywanie testów, zarządzanie wynikami, a także analizę wyników użytkowników w przejrzysty i intuicyjny sposób. 

Działa jako samodzielne rozwiązanie, niewymagające integracji z zewnętrznymi systemami.


## Wymagania systemowe i funkcjonalne

Aplikacja oparta jest na technologii Node.js (backend), React.js (frontend) oraz SQLite3 (baza danych). Do uruchomienia aplikacji wymagane jest środowisko, które obsłuży serwer Node.js i React.js, a baza danych SQLite3 może być obsługiwana lokalnie na tym samym serwerze. 

Zależności zarządzane są za pomocą Dockera (docker-compose), co upraszcza wdrażanie aplikacji w różnych środowiskach.

Funkcjonalności aplikacji obejmują:
- tworzenie testów jednokrotnego wyboru.
- rozwiązywanie testów przez użytkowników oraz automatyczne obliczanie wyników.
- wyświetlanie wyników testów - pojedyncze - dla rozwiązującego, zbiorcze - dla autorów testów.

Aplikacja posiada również intuicyjny interfejs webowy, który zapewnia użytkownikom dostępność na dowolnej przeglądarce internetowej.


## Analiza zagadnienia i jego modelowanie

Aplikacja korzysta z modelu architektury klient-serwer, gdzie frontend (React.js) komunikuje się z backendem (Node.js) za pomocą REST API. Backend komunikuje się z bazą danych SQLite3 za pomocą narzędzia ORM (Sequelize). Baza danych przechowuje informacje o testach, pytaniach oraz wynikach użytkowników.

Struktura wykorzystanych modeli:
- Quiz: nazwa, publiczneID, prywatneID
- Pytanie: treść, publiczneID, prywatneID, publiczneIDQuizu, nrPoprawnejOdpowiedzi, [odpowiedzi]
- Odpowiedź: nazwaUżytkownika, publiczneID, prywatneID, publiczneIDQuizu
- ElementOdpowiedzi: publiczneIDOdpowiedzi, publiczneIDPytania, wartośćKonkretnejOdpowiedziUżytkownika


## Implementacja

1. Tworzenie testów

2. Rozwiązywanie testów

3. Sprawdzanie wyników - pojedynczo - użytkownik rozwiązujący test

4. Sprawdzenie wyników - zbiorowo - autor testu


## Podsumowanie

Zamierzony cel projektu (opisany na początku dokumentu) został osiągnięty bez większych trudności. 

Jako plany/wnioski na przyszłość - warto byłoby zaimplementować obsługę pytań wielokrotnego wyboru oraz pytań otwartych (i wtedy ich ręcznego/półautomatycznego/automatycznego sprawdzania).
