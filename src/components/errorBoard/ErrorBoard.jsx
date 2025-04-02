import React from 'react';
import './ErrorBoard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error1 from './Error';

const ErrorBoard = ({ messages }) => {
    return (
        <div>
            {Array.isArray(messages) && messages.length > 0 ? (
                <div className="error-title boots" style={{ fontSize: "15px" }}>
                    ERROR
                </div>
            ):(<div className="error-title boots" style={{ fontSize: "15px" }}>

            </div>)
            }
            {Array.isArray(messages) && messages.length > 0 ? (
                messages.map((message, index) => (
                    <Error1 key={index} message={message} />
                ))
            ) : (
                <div className="no-errors"></div>
            )}
        </div>
    );
};

export default ErrorBoard;
