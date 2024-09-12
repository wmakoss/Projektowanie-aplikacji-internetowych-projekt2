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
- Quiz: _nazwa, publiczneID, prywatneID_
- Pytanie: _treść, publiczneID, prywatneID, publiczneIDQuizu, nrPoprawnejOdpowiedzi, [odpowiedzi]_
- Odpowiedź: _nazwaUżytkownika, publiczneID, prywatneID, publiczneIDQuizu_
- ElementOdpowiedzi: _publiczneIDOdpowiedzi, publiczneIDPytania, wartośćKonkretnejOdpowiedziUżytkownika_


## Implementacja

_Backend_: Został zbudowany z wykorzystaniem framework'u Express.js i jest oparty o wzorzec architektoniczny Model-View-Controller. Implementacja została podzielona na warstwy takie jak: Routers, Controllers, Services i Models. Takie podejście bardzo ułatwia utrzymanie i przyszły rozwój serwisu. Połączenie z backendu z bazą danych jest zrealizowane przy pomocy narzędzia ORM o nazwie Sequelize. Pozwala to w łatwy sposób zmienić bazę danych i dialect SQL. Backend został stworzony w oparciu o styl architektury REST API co umożliwia zintegrowanie serwisu z dowolnym frontendem w oparciu o Client-side rendering.

_Frontend_: Zbudowany został w oparciu o framework React.js. Aplikacja korzysta z komponentowej architektury, co pozwala na łatwe utrzymanie oraz rozbudowę projektu. Pliki projektu rozdzielono na katalogi w zależności od funkcji: assets - zasoby statyczne (style), components - komponenty React (logika i UI), services - komponenty odpowiedzialne za komunikację z API backendu. Główne komponenty aplikacji (_index.js_ i _App.js_) znajdują się poza katalogami podrzędnymi (powyższymi). Każda funkcjonalność aplikacji zaimplementowana została jako osobny komponent (czasem zależny od innych komponentów). Komunikacja z backendem odbywa się za pomocą asynchronicznych zapytań HTTP, realizowanych za pomocą wbudowanej funkcji _fetch_. Wszystkie zapytania są realizowane poprzez warstwę (omawianych wcześniej) komponentów-serwisów. Dodatkowo, do zarządzania stanem i zaczepiania akcji w komponentach wykorzystano React Hooks, co pozwala na proste i czytelne zarządzanie logiką aplikacji. W projekcie korzystamy z dwóch głównych hooków: _useState_ – do zarządzania lokalnym stanem komponentów oraz _useEffect_ – do wykonywania dodatkowych akcji, takich jak wywoływanie funkcji komponentów-serwisów odpowiedzialnych za pobieranie danych z API.

## Podsumowanie

Zamierzony cel projektu (opisany na początku dokumentu) został osiągnięty bez większych trudności. 

Jako plany/wnioski na przyszłość - warto byłoby zaimplementować obsługę pytań wielokrotnego wyboru oraz pytań otwartych (i wtedy ich ręcznego/półautomatycznego/automatycznego sprawdzania).
