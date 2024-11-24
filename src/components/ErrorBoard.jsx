import React from 'react';
import '../css/ErrorBoard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const ErrorBoard = ({ message }) => {
    return (
        <div>
            <div className={"error-title boots"}
                style={{
                    fontSize:"15px"
                }}
            >Info</div>
            {message ? <div
                style={{fontSize:"15px"}}
                className="error-message">{message}</div> : null}
        </div>
    );
};

export default ErrorBoard;
