import React from 'react';
import '../css/ErrorBoard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error1 from './Error';

const ErrorBoard = ({ messages }) => {
    return (
        <div>
            <div
                className="error-title boots"
                style={{ fontSize: "15px" }}
            >
                Info
            </div>
            {Array.isArray(messages) && messages.length > 0 ? (
                messages.map((message, index) => (
                    <Error1 key={index} message={message} />
                ))
            ) : (
                <div className="no-errors">No messages</div>
            )}
        </div>
    );
};

export default ErrorBoard;
