import React, { useState } from 'react';
import Input from "./Input";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css'

const InputForm = ({ onInputChange,rows1,cols1,onSubmit}) => {

    const handleValueChange = (name, value) => {
        onInputChange(name, value);
    };


    return (
        <div className="text-center">
            <Input
                text={"Count of rows"}
                max={30}
                min={3}
                onValueChange={(value) => handleValueChange("rows", value) && handleValueChange("posY", 1)}
            />
            <Input
                text={"Count of cols"}
                max={30}
                min={3}
                onValueChange={(value) => handleValueChange("cols", value) && handleValueChange("posX", 1) }
            />
            <Input
                text={"Position X"}
                max={cols1}
                min={1}
                onValueChange={(value) => handleValueChange("posX", value)}
            />
            <Input
                text={"Position Y"}
                max={rows1}
                min={1}
                onValueChange={(value) => handleValueChange("posY", value)}
            />
            <button className="btn btn-light custom-btn w-75" onClick={onSubmit}>Submit</button>
        </div>
    );
};

export default InputForm;
