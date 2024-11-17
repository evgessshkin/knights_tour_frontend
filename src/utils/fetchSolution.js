const fetchData = async (url, setData, setError) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Solution not found.');
        }
        const data = await response.json();
        setData(data);
        setError(null);
    } catch (error) {
        setError(error.message);
    }
};

export const fetchSolution = async (cols, rows, posX, posY, selectedMethods, setSolutionW, setSolutionGA, setError) => {
    const { warnsdorf, genetic } = selectedMethods;

    const urlW = `http://localhost:8080/solutions/warnsdorf?col=${cols}&row=${rows}&posKnightX=${posX - 1}&posKnightY=${posY - 1}`;
    const urlG = `http://localhost:8080/solutions/genetic-approach?col=${cols}&row=${rows}&posKnightX=${posX - 1}&posKnightY=${posY - 1}`;


    if (warnsdorf && !genetic) {
        fetchData(urlW, setSolutionW, setError);
    } else if (!warnsdorf && genetic) {
        fetchData(urlG, setSolutionGA, setError);
    } else if (warnsdorf && genetic) {
        fetchData(urlW,setSolutionW,setError);
        fetchData(urlG,setSolutionGA,setError);

        console.log("W && GA");
    } else {
        setError("The solution method is not chosen");
    }
};