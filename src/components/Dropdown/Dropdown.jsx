import './Dropdown.css';
import {useState} from "react";

function Dropdown({ options }){
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("Choose an country");

    const toggleDropdown = () =>{
        setIsOpen(!isOpen);
    }

    const handleOptionClick = (option) =>{
        setSelectedCountry(option);
        setIsOpen(false);
    }

    return(
        <div className="custom-select" tabIndex={0}>
            <div className="select-selected" onClick={toggleDropdown}>
                {selectedCountry}
            </div>
            {isOpen && (
                <div className={`select-items ${isOpen ? 'show': ''}`}>
                    {options.map((option, index)=>(
                        <div key={index} onClick={() => handleOptionClick(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown;