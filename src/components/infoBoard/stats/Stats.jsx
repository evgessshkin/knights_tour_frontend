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
    const isSolvedGA = isGAAvailable ? (solutionGA.isSolved ? "Yes" : "No") : "N/A";

    // Данные для отображения solutionW
    const bestGenerationW = isWAvailable ? 1 : "N/A";
    const populationSizeW = isWAvailable ? 1 : "N/A";
    const totalGenerationsW = isWAvailable ? 1 : "N/A";
    const isSolvedW = isWAvailable ? (solutionW.isSolved ? "Yes" : "No") : "N/A";

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <button
                    className={`btn ${(isGAAvailable || isWAvailable) ? "btn-success" : "btn-danger"}`}
                    onClick={() => setModalInfoOpen(true)}
                >
                    View statistics
                </button>
            </div>

            <ModalWindow
                isOpen={modalInfoIsOpen}
                onClose={() => setModalInfoOpen(false)}
            >
                <div style={{ padding: "20px" }}>
                    <h3>Statistics</h3>

                    {isGAAvailable && (
                        <div>
                            <h4>Solution GA</h4>
                            <p><strong>Was solution found?</strong> {isSolvedGA}</p>
                            <p><strong>Best record at generation:</strong> {bestGenerationGA}</p>
                            <p><strong>Population size:</strong> {populationSizeGA}</p>
                            <p><strong>Total generations:</strong> {totalGenerationsGA}</p>
                            <Graph
                                solutionGA={solutionGA}
                                solutionW={solutionW}
                            />
                        </div>
                    )}

                    {isWAvailable && (
                        <div>
                            <h4>Solution W</h4>
                            <p><strong>Was solution found?</strong> {isSolvedW}</p>
                            <p><strong>Best record at generation:</strong> {bestGenerationW}</p>
                            <p><strong>Population size:</strong> {populationSizeW}</p>
                            <p><strong>Total generations:</strong> {totalGenerationsW}</p>
                        </div>
                    )}

                    {!isGAAvailable && !isWAvailable && (
                        <p>No data available for solutions.</p>
                    )}
                </div>
            </ModalWindow>
        </div>
    );
}
