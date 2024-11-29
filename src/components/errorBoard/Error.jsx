import React from "react";

const Error1 = ({ message }) => {
    return (
        <div>
            {message ? (
                <div
                    style={{ fontSize: "15px" }}
                    className="error-message"
                >
                    {message}
                </div>
            ) : null}
        </div>
    );
};

export default Error1;
