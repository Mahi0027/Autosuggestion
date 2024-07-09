import PropTypes from "prop-types";
import { useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

const Autocomplete = ({
    fetchSuggestions,
    placeholder,
    inputValue,
    setInputValue,
}) => {
    const debouncedValue = useDebounce(inputValue, 1000);

    useEffect(() => {
        console.log("debouncedValue", debouncedValue);
        fetchSuggestions(debouncedValue);
    }, [debouncedValue]);

    return (
        <div className="w-screen">
            <input
                className="w-1/2 border-2 border-gray-300 rounded-md p-3 focus:border-gray-500 transition-all duration-500 transform"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
};

Autocomplete.propTypes = {
    fetchSuggestions: PropTypes.any,
    placeholder: PropTypes.any,
    inputValue: PropTypes.any,
    setInputValue: PropTypes.any,
};

export default Autocomplete;
