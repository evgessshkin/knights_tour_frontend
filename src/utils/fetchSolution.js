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
    const baseUrl = `http://localhost:8080/solutions?col=${cols}&row=${rows}&posKnightX=${posX - 1}&posKnightY=${posY - 1}`;

    if (warnsdorf && !genetic) {
        const url = `${baseUrl}&method=warnsdorf`;
        fetchData(url, setSolutionW, setError);
    } else if (!warnsdorf && genetic) {
        const url = `${baseUrl}&method=genetic-approach`;
        fetchData(url, setSolutionGA, setError);
    } else if (warnsdorf && genetic) {
        const urlWarnsdorf = `${baseUrl}&method=warnsdorf`;
        const urlGenetic = `${baseUrl}&method=genetic-approach`;

        // Выполнение обоих запросов параллельно
        Promise.all([
            fetchData(urlWarnsdorf, setSolutionW, setError),
            fetchData(urlGenetic, setSolutionGA, setError)
        ]).catch((error) => {
            setError(error.message);
        });
    } else {
        setError("The solution method is not chosen");
    }
};
