import { useState } from "react";
import Questions from "./questions";

const Searchbar = () => {
    const [query, setQuery] = useState("");
    const [topic, setTopic] = useState("");
    const search = (e) => {
        setQuery(e.target.value);
    };
    const updateQuestions = (topic) => {
        // This function can be used to trigger any additional actions when the search button is clicked
        console.log("Searching for topic:", topic);
        setTopic(topic);
    }

    return (
        <>
            {/* Fixed search bar at the top */}
            <div className="fixed top-10 left-1/2 transform -translate-x-1/2 w-full max-w-xl px-4 z-50 flex flex-col items-center gap-4 backdrop-blur-md bg-white/80 shadow-lg rounded-b-2xl border-b border-gray-200">
                <div className="flex w-full bg-white/60 rounded-3xl shadow-xl overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition duration-300 ease-in-out">
                    <input
                        type="text"
                        className="w-full px-6 py-4 text-gray-800 placeholder-gray-500 bg-transparent focus:outline-none text-lg transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-400"
                        placeholder="Write topic to generate quiz"
                        onChange={search}
                        value={query}
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => {updateQuestions(query)}}>
                        🔍
                    </button>
                </div>
                {/* Uncomment if you want difficulty buttons */}
                {/* <div className="flex justify-between w-full gap-4">
                    <button className="flex-1 bg-green-100 rounded-lg py-2 font-medium focus:outline-3 focus:outline-blue-500">Easy</button>
                    <button className="flex-1 bg-yellow-100 rounded-lg py-2 font-medium focus:outline-3 focus:outline-blue-500">Medium</button>
                    <button className="flex-1 bg-red-100 rounded-lg py-2 font-medium focus:outline-3 focus:outline-blue-500">Hard</button>
                </div> */}
            </div>
            {/* Main content with padding to prevent overlap */}
            <div className="pt-32 px-4">
                {topic?(<Questions topic={topic}/>):"Search for a topic to generate quiz questions!"}
            </div>
        </>
    );
};

export default Searchbar;
