import React, { useState } from 'react';
import '../css/InfoBoard.css';

const InfoBoard = ({ handleMethodUpdate }) => {
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


    return (
        <div className="info-board">
            <div className="text-methods">Methods:</div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked={isCheckedW}
                    onChange={handleChangeW}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Warnsdorf's rule
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked={isCheckedGA}
                    onChange={handleChangeGA}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Genetic approach
                </label>
            </div>

        </div>
    );
};

export default InfoBoard;
