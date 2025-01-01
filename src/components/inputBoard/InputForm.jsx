import Input from "./Input";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css'

const InputForm = ({ onInputChange,rows1,cols1,posX,posY,onSubmit}) => {

    const handleValueChange = (name, value) => {
        onInputChange(name, value);
    };




    return (
        <div className="text-center">
            <Input
                text={"Počet riadkov"}
                max={30}
                min={3}
                onValueChange={(value) => handleValueChange("rows", value) && handleValueChange("posY", 1)}
            />
            <Input
                text={"Počet stĺpcov"}
                max={30}
                min={3}
                onValueChange={(value) => handleValueChange("cols", value) && handleValueChange("posX", 1)}
            />
            <Input
                text={"Pozícia X"}
                max={cols1}
                min={1}
                onValueChange={(value) => handleValueChange("posX", value)}
                value={posX}
            />
            <Input
                text={"Pozícia Y"}
                max={rows1}
                min={1}
                onValueChange={(value) => handleValueChange("posY", value)}
                value={posY}
            />
            <Input
                text={"Čas rieš. (s)"}
                max={3600}
                min={10}
                onValueChange={(value) => handleValueChange("timeStop", value)}
                step={10}
            />

            <button className="btn btn-light custom-btn w-75" onClick={onSubmit}>Odoslať</button>
        </div>
    );
};

export default InputForm;
