import React, { useState } from "react";
import "./Instruction.css";
import {ModalWindow} from "../../modalWindow/modalWindow";

export default function Instruction() {
    const [modalInfoIsOpen, setModalInfoOpen] = useState(false);

    return (
        <div>
            <div style={{ textAlign: "center" }}>
            <button
                className="btn btn-light custom-btn w-50 h-75"
                onClick={() => setModalInfoOpen(true)}
            >
                Návod
            </button>
            </div>
            <ModalWindow
                isOpen={modalInfoIsOpen}
                onClose={() => setModalInfoOpen(false)}
            >
                <div className="text-lg-start">
                <h1 className="text-center">Ako používať rozhranie</h1>

                <h2>1. Konfigurácia vstupu</h2>
                    <strong>Akúkoľvek z veličín môžete meniť pomocou rolovania myšou.</strong>
                    <p>Na ľavom paneli vyplňte nasledujúce polia:</p>
                    <ul>
                        <li><strong>Počet riadkov:</strong> Špecifikujte počet riadkov na šachovnici.</li>
                        <li><strong>Počet stĺpcov:</strong> Špecifikujte počet stĺpcov na šachovnici.</li>
                        <li><strong>Pozícia X:</strong> Nastavte počiatočnú horizontálnu pozíciu jazdca (číslovanie od 1).</li>
                        <li><strong>Pozícia Y:</strong> Nastavte počiatočnú vertikálnu pozíciu jazdca (číslovanie od 1).</li>
                        <li><strong>Čas riešenia (s): </strong> Zadajte čas v sekundách na riešenie úlohy pomocou genetického prístupu.</li>
                    </ul>
                    <p>Kliknite na tlačidlo <strong>Odoslať</strong> na použitie konfigurácie.</p>

                <h2>2. Tlačidlo "Návod"</h2>
                <p>Kliknite na tlačidlo <strong>Návod</strong> aby ste otvorili podrobný sprievodca používaním rozhrania.</p>

                <h2>3. Panel metód</h2>
                <p>Na pravom paneli vyberte algoritmus na riešenie jazdcovej cesty:</p>
                <ul>
                    <li><strong>Warnsdorffovo pravidlo:</strong> Zaškrtnite toto políčko pre použitie heuristiky Warnsdorffovho pravidla.
                    </li>
                    <li><strong>Genetický prístup:</strong> Zaškrtnite toto políčko pre použitie genetického algoritmu.</li>
                </ul>
                <p>Riešenie si môžete zobraziť výberom jednej z možností v sekcii <strong>Zobraziť prístup.</strong>.</p>

                <h2>4. Panel chýb</h2>
                <p>Panel umiestnený vľavo dole, zobrazuje:
                </p>
                <ul>
                    <li>Akékoľvek chyby, ktoré nastanú počas validácie vstupov (napr. neplatná pozícia, hodnoty mimo rozsahu atď.).
                    </li>
                    <li>Dôležité upozornenia alebo spätnú väzbu týkajúcu sa riešenia jazdcovej cesty.</li>
                </ul>
                <p>Ak sa zobrazí chyba, skontrolujte vstupné polia, opravte chyby a odošlite konfiguráciu znova.</p>


                <h2>5. Štatistiky</h2>
                <p>Sekcia <strong>Štatistiky</strong> zobrazuje informácie o procese riešenia.</p>
                <div>
                    <h3>Vysvetlenie tlačidla Štatistiky</h3>

                    <p>
                        Tlačidlo <strong>Štatistiky</strong> otvára okno so štatistikami riešení. Farba tlačidla odráža dostupnosť dát:
                    </p>

                    <ul>
                        <li><strong>Zelená:</strong> Dáta sú dostupné pre aspoň jedno riešenie.</li>
                        <li><strong>Červená:</strong> Dáta nie sú dostupné.</li>
                    </ul>

                    <p>
                        <strong>Zobrazené štatistiky:</strong>
                    </p>

                    <h3>Pre riešenie genetickou metódou:</h3>
                    <ul>
                        <li>Či bolo nájdené riešenie.</li>
                        <li>Veľkosť populácie.</li>
                        <li>Celkový počet generácií.</li>
                        <li>Graf.</li>
                    </ul>

                    <h3>Pre riešenie pomocou Warnsdorffovho pravidla:</h3>
                    <ul>
                        <li>Či bolo nájdené riešenie.</li>
                    </ul>

                    <p>
                        Ak nie sú dostupné dáta, zobrazí sa správa <strong>"Nie sú dostupné žiadne dáta"</strong>.
                    </p>
                </div>



                <h2>6. Navigačné ovládacie prvky</h2>
                <p>Použite navigačné tlačidlá v dolnej časti rozhrania:</p>
                <ul>
                    <li><strong>&lt;&lt;</strong> - Prejsť na začiatok riešenia.</li>
                    <li><strong>Späť:</strong> Posun o jeden krok dozadu v riešení.</li>
                    <li><strong>Dopredu:</strong> Posun o jeden krok dopredu v riešení.</li>
                    <li><strong>&gt;&gt;</strong> - Prejsť na koniec riešenia.</li>
                </ul>

                <p>Nasledujte tieto pokyny, aby ste úspešne využili rozhranie na riešenie problému jazdcovej cesty. Prajeme veľa úspechov! </p>
                </div>
            </ModalWindow>
        </div>
    );
}
