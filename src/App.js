import React, { useState } from "react";
import "./App.css";
import InputForm from "./components/inputBoard/InputForm";
import InfoBoard from "./components/infoBoard/InfoBoard";
import './components/chessBoard/board.scss';
import Board from "./components/chessBoard/Board";
import ErrorBoard from "./components/errorBoard/ErrorBoard";
import { fetchSolution } from './utils/fetchSolution';  // Импортируем функцию
import LoadingScreen from "./components/loadingScreen/LoadingScreen";


function App() {
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
    const [posX, setPosX] = useState(1);
    const [posY, setPosY] = useState(1);
    const[timeStop, setTimeStop] = useState(10);
    const [solutionW, setSolutionW] = useState([]);
    const [solutionGA, setSolutionGA] = useState({solution: [], generation: null, population: null});
    const [selectedMethods, setSelectedMethods] = useState({ warnsdorf: false, genetic: false });
    const [showMethod,setShowMethod] = useState(null)
    const [errors,setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false);




    const handleMethodUpdate = (newSelection) => {
        setSelectedMethods(newSelection);
    };

    const handleShowMethod = (newSelection) => {
        setShowMethod(newSelection)
    };
    const handleInputChange = (name, value) => {
        setSolutionW([]);
        setSolutionGA({ solution: [], generation: null, population: null });
        setErrors([]);

        switch (name) {
            case "rows":
                setRows(value);
                if (posY > value) setPosY(value); // Корректируем posY, если выходит за пределы
                break;
            case "cols":
                setCols(value);
                if (posX > value) setPosX(value); // Корректируем posX, если выходит за пределы
                break;
            case "posX":
                setPosX(value);
                break;
            case "posY":
                setPosY(value);
                break;
            case "timeStop":
                setTimeStop(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async () => {
        if((cols===4 &&  rows === 4) || (cols === 3 &&  rows === 3)) {
            setErrors(["Riešenie pre šachovnicu zadaných rozmerov neexistuje."]);
            setSolutionW([]);
            setSolutionGA({ solution: [], generation: null, population: null });
        }else{
            await fetchSolution(cols, rows, posX, posY,
                selectedMethods, setSolutionW, setSolutionGA,
                setErrors, setIsLoading,timeStop);

        }

    };

    const selectedMethod = () => {
        if (selectedMethods.warnsdorf && !selectedMethods.genetic) {
            return solutionW;
        } else if (!selectedMethods.warnsdorf && selectedMethods.genetic) {
            return solutionGA.solution;
        } else {

            if(showMethod === "warnsdorf"){
                return solutionW;
            }else if(showMethod === "genetic"){
                return solutionGA.solution;
            }else{
                return [];
            }
        }
    };

    return (
        <>
            <LoadingScreen isVisible={isLoading} duration={timeStop * 1000} onComplete={setIsLoading} />
            <div className={'container'}>
                <div className={'item left-board'}>
                    <div className={'input-board'}>
                        <InputForm
                            cols1={cols}
                            rows1={rows}
                            posX={posX}
                            posY={posY}
                            times={timeStop}
                            onInputChange={handleInputChange}
                            onSubmit={handleSubmit}
                        />
                    </div>
                    <div className={'error-board'}>
                        <ErrorBoard messages={errors} />
                    </div>
                </div>
                <div className={'item board justify-content-center d-flex'}>
                    <Board rows={rows} cols={cols} posX={posX} posY={posY} solution={selectedMethod()} />
                </div>
                <div className={'item right-board'}>
                    <InfoBoard handleMethodUpdate={handleMethodUpdate}
                               handleShowMethod = {handleShowMethod}
                               solutionGA = {solutionGA}
                               solutionW = {solutionW}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
