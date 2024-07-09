import PropTypes from "prop-types";

const SuggestionList = ({ list, chooseSuggestion, inputValue }) => {
    return (
        <>
            <div className="max-h-96 h-auto border border-gray-500 rounded-md overflow-y-auto p-2 mt-2 shadow-md">
                {list.length ? (
                    list.map(({ id, name }) => (
                        <div
                            className="w-full px-2 py-4 hover:bg-slate-300 focus:bg-slate-300 transition-all transform"
                            key={id}
                            onClick={() => chooseSuggestion(id)}
                        >
                            {name
                                .split(new RegExp(`(${inputValue})`, "gi"))
                                .map((value, index) => {
                                    return value.toLowerCase() ===
                                        inputValue.toLowerCase() ? (
                                        <span key={index} className="text-blue-500 text-lg">{value}</span>
                                    ) : (
                                        value
                                    );
                                })}
                        </div>
                    ))
                ) : (
                    <div>no suggestion</div>
                )}
            </div>
        </>
    );
};

SuggestionList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    chooseSuggestion: PropTypes.func,
    inputValue: PropTypes.string,
};
export default SuggestionList;
