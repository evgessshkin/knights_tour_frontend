const fetchData = async (url, setData, setErrors, textMsg) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error();
        }
        const data = await response.json();
        setData(data);
    } catch (error) {
        // Обновляем ошибки через setErrors
        setErrors((prevErrors) => [...prevErrors, textMsg]);
    }
};

export const fetchSolution = async (cols, rows, posX, posY, selectedMethods, setSolutionW, setSolutionGA, setErrors, setIsLoading) => {
    const { warnsdorf, genetic } = selectedMethods;

    const urlW = `http://localhost:8080/solutions/warnsdorf?col=${cols}&row=${rows}&posKnightX=${posX - 1}&posKnightY=${posY - 1}`;
    const urlG = `http://localhost:8080/solutions/genetic-approach?col=${cols}&row=${rows}&posKnightX=${posX - 1}&posKnightY=${posY - 1}&timeStop=${5}`;

    setErrors([])


    if (warnsdorf && !genetic) {
        let errorMsg = "The solution using Warnsdorf's rule was not found.";
        await fetchData(urlW, setSolutionW, setErrors, errorMsg);
    } else if (!warnsdorf && genetic) {
        try {
            setIsLoading(true);
            const startTime = Date.now();
            const userTimeLimit = 5000;

            const response = await fetch(urlG);
            if (!response.ok) {
                throw new Error("Failed to fetch solution.");
            }
            const data = await response.json();
            setSolutionGA(data);

            if (cols * rows !== data.solution.length) {
                setErrors(["The solution using Genetic Approach was not found. The area that was successfully covered."]);
            } else {
                setErrors([]);
                setIsLoading(false);
                return;
            }

            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, userTimeLimit - elapsedTime);

            setTimeout(() => {
                setIsLoading(false);
            }, remainingTime);
        } catch (error) {
            setErrors([error.message || "An unknown error occurred."]);
            setIsLoading(false);
        }
    } else if (warnsdorf && genetic) {
        let errorMsg = "The solution using Warnsdorf's rule was not found.";
        await fetchData(urlW, setSolutionW, setErrors, errorMsg);

        try {
            setIsLoading(true);
            const startTime = Date.now();
            const userTimeLimit = 5000;

            const response = await fetch(urlG);
            if (!response.ok) {
                throw new Error("Failed to fetch solution.");
            }
            const data = await response.json();
            setSolutionGA(data);

            if (cols * rows !== data.solution.length) {
                setErrors((prevErrors) => [
                    ...prevErrors,
                    "The solution using Genetic Approach was not found. The area that was successfully covered."
                ]);
            } else {
                setIsLoading(false);
                return;
            }

            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, userTimeLimit - elapsedTime);

            setTimeout(() => {
                setIsLoading(false);
            }, remainingTime);
        } catch (error) {
            setErrors([error.message || "An unknown error occurred."]);
            setIsLoading(false);
        }
    } else {
        setErrors(["The solution method is not chosen"]);
    }
};
