import React, { useState } from 'react';


const Input = (props) => {
    const [value, setValue] = useState(props.min); // Ініціалізуємо зі значенням мінімуму

    // Функція для обробки скролу
    const handleWheel = (event) => {
        const delta = event.deltaY > 0 ? -1 : 1; // визначає напрямок скролу
        const newValue = value + delta;

        // Перевірка, чи нове значення в межах
        if (newValue >= props.min && newValue <= props.max) {
            setValue(newValue);
            props.onValueChange(newValue); // Оновлення значення у батьківському компоненті
        }
    };

    // Функція для обробки введення вручну
    const handleChange = (event) => {
        const newValue = Number(event.target.value);

        if (newValue >= props.min && newValue <= props.max) {
            setValue(newValue);
            props.onValueChange(newValue); // Оновлення значення у батьківському компоненті
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
                value={value}
                onChange={handleChange}
                onWheel={handleWheel}
                min={props.min}
                max={props.max}
                step="1"
                style={{
                    borderBottomLeftRadius: "0px",
                    borderTopLeftRadius:  "0px"
                }}

            />
        </div>
    );
};

export default Input;
