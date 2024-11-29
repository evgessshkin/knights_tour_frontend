import React, { useState } from 'react';


const Input = (props) => {
    const [value, setValue] = useState(props.min);

    const handleWheel = (event) => {
        let delta = event.deltaY > 0 ? -1 : 1;
        if(props.step) {
            delta = event.deltaY > 0 ? -10: 10;
        }

        const newValue = value + delta;

        if (newValue >= props.min && newValue <= props.max) {
            setValue(newValue);
            props.onValueChange(newValue);
        }
    };

    const handleChange = (event) => {
        const newValue = Number(event.target.value);

        if (newValue >= props.min && newValue <= props.max) {
            setValue(newValue);
            props.onValueChange(newValue);
        }
    };

    return (
        <div className="d-flex flex-row justify-content-between m-3">
            <label
               className="form-control"
               style={{
                   borderBottomRightRadius: "0px",
                   borderTopRightRadius:  "0px"
               }}
            >
                {props.text+":"}
            </label>
            <input className="form-control w-auto align-self-center"
                type="number"
                value={props.value ? props.value : value}
                onChange={handleChange}
                onWheel={handleWheel}
                min={props.min}
                max={props.max}
                step={props.step ?? 1}
                style={{
                    borderBottomLeftRadius: "0px",
                    borderTopLeftRadius:  "0px"
                }}

            />
        </div>
    );
};

export default Input;
