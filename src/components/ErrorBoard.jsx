import React from 'react';
import '../css/ErrorBoard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const ErrorBoard = ({ message }) => {
    return (
        <div>
            <div className={"error-title boots"}>Info</div>
            {message ? <div className="error-message">{message}</div> : null}
        </div>
    );
};

export default ErrorBoard;
