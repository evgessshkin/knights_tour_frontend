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
    // наместо локал хоста
    // 54.234.127.160:
    const urlW = `http://54.234.127.160:8080/solutions/warnsdorf?col=${cols}&row=${rows}&posKnightX=${posX - 1}&posKnightY=${posY - 1}`;
    const urlG = `http://54.234.127.160:8080/solutions/genetic-approach?col=${cols}&row=${rows}&posKnightX=${posX - 1}&posKnightY=${posY - 1}&timeStop=${timeStop}`;

    setErrors([])


    if (warnsdorf && !genetic) {
        let errorMsg = "Riešenie pomocou Warnsdorffovho pravidla nebolo nájdené.";
        await fetchData(urlW, setSolutionW, setErrors, errorMsg);

    } else if (!warnsdorf && genetic) {
        try {
            setIsLoading(true);
            const startTime = Date.now();
            const userTimeLimit = timeStop;

            const response = await fetch(urlG);
            if (!response.ok) {
                throw new Error("Nepodarilo sa načítať riešenie.");
            }
            const data = await response.json();
            setSolutionGA(data);

            if (cols * rows !== data.solution.length) {
                setErrors(["Riešenie pomocou genetického prístupu nebolo nájdené. Oblasť, ktorá bola úspešne pokrytá."]);
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
            setErrors([error.message || "Vyskytla sa neznáma chyba."]);
            setIsLoading(false);
        }
    } else if (warnsdorf && genetic) {
        let errorMsg = "Riešenie pomocou Warnsdorffovho pravidla nebolo nájdené.";
        await fetchData(urlW, setSolutionW, setErrors, errorMsg);

        try {
            setIsLoading(true);
            const startTime = Date.now();


            const response = await fetch(urlG);
            if (!response.ok) {
                throw new Error("Nepodarilo sa načítať riešenie.");
            }
            const data = await response.json();
            setSolutionGA(data);

            if (cols * rows !== data.solution.length) {
                data.isSolved = false;
                setErrors((prevErrors) => [
                    ...prevErrors,
                    "Riešenie pomocou genetického prístupu nebolo nájdené.Na šachovnici je zobrazená oblasť, ktorú sa podarilo pokryť najlepšou cestou koňa z poslednej generácie."
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
            setErrors([error.message || "Vyskytla sa neznáma chyba."]);
            setIsLoading(false);
        }
    } else {
        setErrors(["Metóda riešenia nie je vybraná."]);
    }
};
