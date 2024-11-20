# 5 Dana U Oblacima Zadatak

REST API za matchmaking platformu video igre koji na osnovu odigranog meča izračuna rejting (ELO) i dodatne statistike za svakog igrača koji je učestvovao u tom meču na osnovu zadatih podataka. Zadatak je izrađen u roku od 48 časova.

## Sadržaj

- [Opis okruženja](#opis-okruženja)
- [Pokretanje aplikacije](#pokretanje-aplikacije)
- [Lista Korišćenih tehnologija](#lista-korišćenih-tehnologija)

## Opis okruženja

Aplikacija je izrađena pomoću Node.js-a (v23.1.0). Potrebno je da imate instaliran Node.js na vašem okruženju.

## Pokretanje aplikacije

```bash
git clone https://github.com/JovanMihic99/5-dana-u-oblacima-zadatak
cd 5-dana-u-oblacima-zadatak
npm install
npm start
```

## Lista Korišćenih Tehnologija

- **[node.js](https://nodejs.org/)**: Platforma zasnovana na JavaScript-u za razvoj server-side aplikacija.

- **[express](https://expressjs.com/)**: Web framework za Node.js koji omogućava brzo i jednostavno kreiranje servera i API-ja.

- **[express-async-handler](https://www.npmjs.com/package/express-async-handler)**: Middleware za upravljanje asinhronim funkcijama u Express aplikacijama, čime se olakšava rukovanje greškama.

- **[sqlite3](https://www.npmjs.com/package/sqlite3)**: Modul za rad sa SQLite bazom podataka, idealan za integraciju laganih i ugrađenih baza podataka u Node.js aplikacijama.

- **[uuid](https://www.npmjs.com/package/uuid)**: Alat za generisanje jedinstvenih identifikatora (UUID-ova).
