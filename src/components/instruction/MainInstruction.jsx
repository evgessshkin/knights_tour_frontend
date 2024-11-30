import React, { useState } from "react";
import "./MainInstruction.css";
import {Instruction} from "./Instruction";

export default function MainInstruction() {
    const [modalInfoIsOpen, setModalInfoOpen] = useState(false);

    return (
        <div>
            <button
                className="btn btn-light custom-btn w-50 h-25"
                onClick={() => setModalInfoOpen(true)}
            >
                Instruction
            </button>
            <Instruction
                isOpen={modalInfoIsOpen}
                onClose={() => setModalInfoOpen(false)}
            >

                <h1>How to Use the Interface</h1>

                <h2>1. Input Configuration</h2>
                <p>On the left panel, fill in the following fields:</p>
                <ul>
                    <li><strong>Count of rows:</strong> Specify the number of rows on the board.</li>
                    <li><strong>Count of cols:</strong> Specify the number of columns on the board.</li>
                    <li><strong>Position X:</strong> Set the knight's initial horizontal position (1-indexed).
                    </li>
                    <li><strong>Position Y:</strong> Set the knight's initial vertical position (1-indexed).
                    </li>
                    <li><strong>Sol. Time (s):</strong> Enter the time in seconds for Genetic Approach solving the knight's tour.
                    </li>
                </ul>
                <p>Click the <strong>Submit</strong> button to apply the configuration.</p>

                <h2>2. Instruction Button</h2>
                <p>Click the <strong>Instruction</strong> button to open a detailed guide on using this
                    interface.</p>

                <h2>3. Methods Panel</h2>
                <p>On the right panel, choose the algorithm for solving the knight's tour:</p>
                <ul>
                    <li><strong>Warnsdorff's rule:</strong> Select this checkbox to use Warnsdorff's heuristic.
                    </li>
                    <li><strong>Genetic approach:</strong> Select this checkbox to use a genetic algorithm.</li>
                </ul>
                <p>You can also view the solution by selecting one of the options under <strong>Show
                    approach</strong>.</p>

                <h2>4. Info Panel</h2>
                <p>The <strong>Info</strong> panel, located at the bottom-left of the interface, displays the following:
                </p>
                <ul>
                    <li>Any errors that occur during input validation (e.g., invalid position, out-of-range values,
                        etc.).
                    </li>
                    <li>Important warnings or feedback related to solving the knight's tour.</li>
                </ul>
                <p>If an error is shown, review the input fields, correct any mistakes, and submit the configuration
                    again.</p>


                <h2>5. Stats</h2>
                <p>The <strong>Stats</strong> section displays information about the solution process.</p>

                <h2>6. Navigation Controls</h2>
                <p>Use the navigation buttons at the bottom of the interface:</p>
                <ul>
                    <li><strong>&lt;&lt;</strong> - Navigate to the beginning of the solution.</li>
                    <li><strong>Back:</strong> Move one step backward in the solution.</li>
                    <li><strong>Forward:</strong> Move one step forward in the solution.</li>
                    <li><strong>&gt;&gt;</strong> - Navigate to the end of the solution.</li>
                </ul>

                <p>Follow these instructions to successfully use the interface for solving the knight's tour
                    problem. Happy solving!</p>

            </Instruction>
        </div>
    );
}
