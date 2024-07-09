import axios from "axios";
import Autocomplete from "./components/Autocomplete";
import SuggestionList from "./components/Suggestion-list";
import { useEffect, useState } from "react";

function App() {
    const [inputValue, setInputValue] = useState("");
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showSuggestion, setShowSuggestion] = useState(false);

    useEffect(() => {
        setShowSuggestion(true);
    }, [list]);

    const fetchSuggestions = async (text) => {
        try {
            if (text) {
                setLoading(true);
                const result = await axios.get(
                    `https://dummyjson.com/recipes/search?q=${text}`
                );
                if (result.status === 200) {
                    let tempList = result.data.recipes.map((recipe) => {
                        return {
                            id: recipe.id,
                            name: recipe.name,
                        };
                    });
                    setList(tempList);
                }
            }
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const chooseSuggestion = (id) => {
        const result = list.find((data) => data.id === id);
        setInputValue(result.name);
    };

    return (
        <>
            <div
                className="w-screen h-screen flex justify-center items-center"
                onClick={() => setShowSuggestion(false)}
            >
                <div className="w-1/2">
                    <Autocomplete
                        fetchSuggestions={fetchSuggestions}
                        placeholder={"Enter Recipe"}
                        onSelect={(res) => console.log(res)}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                    />

                    {showSuggestion ? (
                        error ? (
                            "Error"
                        ) : loading ? (
                            "Loading..."
                        ) : (
                            <SuggestionList
                                list={list}
                                chooseSuggestion={chooseSuggestion}
                                inputValue={inputValue}
                            />
                        )
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default App;
