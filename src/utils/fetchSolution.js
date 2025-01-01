const fetchData = async (url, setData, setErrors, textMsg) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error();
        }
        const data = await response.json();
        data.isSolved = true;
        setData(data);
    } catch (error) {
        // Обновляем ошибки через setErrors
        setErrors((prevErrors) => [...prevErrors, textMsg]);
    }
};

export const fetchSolution = async (cols, rows, posX, posY, selectedMethods,
                                    setSolutionW, setSolutionGA, setErrors, setIsLoading,
                                    timeStop) => {
    const { warnsdorf, genetic } = selectedMethods;

    const userTimeLimit = timeStop * 1000;
    const urlW = `http://3.84.199.25:8080/solutions/warnsdorf?col=${cols}&row=${rows}&posKnightX=${posX - 1}&posKnightY=${posY - 1}`;
    const urlG = `http://3.84.199.25:8080/solutions/genetic-approach?col=${cols}&row=${rows}&posKnightX=${posX - 1}&posKnightY=${posY - 1}&timeStop=${timeStop}`;

    setErrors([])


    if (warnsdorf && !genetic) {
        let errorMsg = "The solution using Warnsdorf's rule was not found.";
        await fetchData(urlW, setSolutionW, setErrors, errorMsg);

    } else if (!warnsdorf && genetic) {
        try {
            setIsLoading(true);
            const startTime = Date.now();
            const userTimeLimit = timeStop;

            const response = await fetch(urlG);
            if (!response.ok) {
                throw new Error("Failed to fetch solution.");
            }
            const data = await response.json();
            setSolutionGA(data);

            if (cols * rows !== data.solution.length) {
                setErrors(["The solution using Genetic Approach was not found. The area that was successfully covered."]);
                data.isSolved = false;
            } else {
                setErrors([]);
                data.isSolved = true;
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


            const response = await fetch(urlG);
            if (!response.ok) {
                throw new Error("Failed to fetch solution.");
            }
            const data = await response.json();
            setSolutionGA(data);

            if (cols * rows !== data.solution.length) {
                data.isSolved = false;
                setErrors((prevErrors) => [
                    ...prevErrors,
                    "The solution using Genetic Approach was not found. The area that was successfully covered."
                ]);
            } else {
                setIsLoading(false);
                data.isSolved = true;
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
