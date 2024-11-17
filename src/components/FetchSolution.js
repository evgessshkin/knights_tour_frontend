import { useState } from "react";

const FetchSolution = ({ selectedMethods, cols, rows, posX, posY, setSolutionW, setSolutionGA, setError }) => {
    const fetchSolution = async () => {
        if (selectedMethods.warnsdorf && !selectedMethods.genetic) {
            try {
                const response = await fetch(`http://localhost:8080/solutions/warnsdorf?col=${cols}&row=${rows}&posKnightX=${posX - 1}&posKnightY=${posY - 1}`);
                if (!response.ok) {
                    throw new Error('The solution using Warnsdorf\'s rule was not found.');
                }
                const data = await response.json();
                setSolutionW(data);
                setError(null);
            } catch (error) {
                setError(error.message);
            }
        } else if (!selectedMethods.warnsdorf && selectedMethods.genetic) {
            try {
                const response = await fetch(`http://localhost:8080/solutions/genetic-approach?col=${cols}&row=${rows}&posKnightX=${posX - 1}&posKnightY=${posY - 1}`);
                if (!response.ok) {
                    throw new Error('The solution using Genetic Approach was not found.');
                }
                const data = await response.json();
                setSolutionGA(data);
                setError(null);
            } catch (error) {
                setError(error.message);
            }
        } else if (selectedMethods.warnsdorf && selectedMethods.genetic) {
            console.log("W && GA");
        } else {
            setError("The solution method is not chosen");
        }
    };

    return (
        <button onClick={fetchSolution}>Fetch Solution</button>
    );
};

export default FetchSolution;
