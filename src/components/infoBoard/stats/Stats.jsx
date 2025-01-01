import React, { useState } from "react";
import "../instruction/Instruction.css";
import { ModalWindow } from "../../modalWindow/modalWindow";
import Graph from "./graph/Graph";

export default function Stats({ solutionGA, solutionW }) {
    const [modalInfoIsOpen, setModalInfoOpen] = useState(false);

    // Проверка на наличие данных в solutionGA
    const isGAAvailable = solutionGA && solutionGA.population && solutionGA.generation;
    const isWAvailable = solutionW && solutionW.isSolved !== undefined;

    // Данные для отображения solutionGA
    const bestGenerationGA = isGAAvailable ? solutionGA.generation : "N/A";
    const populationSizeGA = isGAAvailable ? solutionGA.population : "N/A";
    const totalGenerationsGA = isGAAvailable ? solutionGA.totalGenerations : "N/A";
    const isSolvedGA = isGAAvailable ? (solutionGA.isSolved ? "Ano" : "Nie") : "N/A";

    // Данные для отображения solutionW
    const bestGenerationW = isWAvailable ? 1 : "N/A";
    const populationSizeW = isWAvailable ? 1 : "N/A";
    const totalGenerationsW = isWAvailable ? 1 : "N/A";
    const isSolvedW = isWAvailable ? (solutionW.isSolved ? "Ano" : "Nie") : "N/A";

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <button
                    className={`btn ${(isGAAvailable || isWAvailable) ? "btn-success" : "btn-danger"}`}
                    onClick={() => setModalInfoOpen(true)}
                >
                    Zobraziť štatistiky
                </button>
            </div>

            <ModalWindow
                isOpen={modalInfoIsOpen}
                onClose={() => setModalInfoOpen(false)}
            >
                <div style={{ padding: "20px" }}>
                    <h3>Štatistiky</h3>

                    {isGAAvailable && (
                        <div>
                            <h4>Riešenie GA</h4>
                            <p><strong>Bolo nájdené riešenie?</strong> {isSolvedGA}</p>
                            <p><strong>Najlepší záznam v generácii:</strong> {bestGenerationGA}</p>
                            <p><strong>Veľkosť populácie:</strong> {populationSizeGA}</p>
                            <p><strong>Celkový počet generácií:</strong> {totalGenerationsGA}</p>
                            <Graph
                                solutionGA={solutionGA}
                                solutionW={solutionW}
                            />
                        </div>
                    )}

                    {isWAvailable && (
                        <div>
                            <h4>Riešenie W</h4>
                            <p><strong>Bolo nájdené riešenie?</strong> {isSolvedW}</p>
                            <p><strong>Najlepší záznam v generácii:</strong> {bestGenerationW}</p>
                            <p><strong>Veľkosť populácie:</strong> {populationSizeW}</p>
                            <p><strong>Celkový počet generácií:</strong> {totalGenerationsW}</p>
                        </div>
                    )}

                    {!isGAAvailable && !isWAvailable && (
                        <p>Nie sú dostupné žiadne údaje o riešeniach.</p>
                    )}
                </div>
            </ModalWindow>

        </div>
    );
}
