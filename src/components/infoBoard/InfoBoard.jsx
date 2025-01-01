import React, { useState } from 'react';
import './InfoBoard.css';
import Instruction from "./instruction/Instruction";
import Stats from "./stats/Stats";

const InfoBoard = ({ handleMethodUpdate,handleShowMethod ,solutionGA,solutionW}) => {
    const [isCheckedW, setIsCheckedW] = useState(false);
    const [isCheckedGA, setIsCheckedGA] = useState(false);

    const handleChangeW = () => {
        const newState = !isCheckedW;
        handleMethodUpdate({ warnsdorf: newState, genetic: isCheckedGA});
        setIsCheckedW(newState);
    };

    const handleChangeGA = () => {
        const newState = !isCheckedGA;
        handleMethodUpdate({ warnsdorf: isCheckedW, genetic: newState});
        setIsCheckedGA(newState);
    };

    const handleRadioChange = (event) => {
        handleShowMethod(event.target.id)
    };


    return (
        <>

            <div className="info-board">
                <div className="text-methods">Návod:</div>
                <Instruction/>
                <div className="text-methods">Methods:</div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={isCheckedW}
                        onChange={handleChangeW}
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Warnsdorffovo pravidlo
                    </label>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={isCheckedGA}
                        onChange={handleChangeGA}
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Genetický prístup
                    </label>
                </div>


                <div className="text-methods">Zobraziť prístup:</div>
                <div className="form-check">
                    <input className="form-check-input"
                           type="radio"
                           name="flexRadioDefault"
                           id="warnsdorf"
                           onChange={handleRadioChange}
                    />
                    <label className="form-check-label">
                        Warnsdorffovo pravidlo
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input"
                           type="radio"
                           name="flexRadioDefault"
                           id="genetic"
                           onChange={handleRadioChange}
                    />
                    <label className="form-check-label">
                        Genetický prístup
                    </label>
                </div>
                <div className="text-methods">Štatistiky:</div>
                <Stats solutionGA={solutionGA} solutionW={solutionW}/>
            </div>
        </>
    );
};

export default InfoBoard;
