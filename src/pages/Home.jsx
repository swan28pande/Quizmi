
import { useState } from "react";
import Questions from "../components/questions";

export default function Home() {
    const [topic, setTopic] = useState("");
    const [query, setQuery] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    const handleInput = (e) => setQuery(e.target.value);
    const handleSearch = () => {
        setTopic(query);
        setHasSearched(true);
    };
    const handleEnter = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-100 flex flex-col items-center">
            {/* Hero Section */}
                <div className={`w-full flex flex-col items-center transition-all duration-700 ${hasSearched ? 'pt-2' : 'pt-30'}`}
                    style={{ minHeight: hasSearched ? '0' : '40vh' }}>
                <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 drop-shadow mb-4 tracking-tight select-none">
                    Quizmi
                </h1>
                <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-xl text-center select-none">
                    Instantly generate fun, challenging quizzes on any topic using AI.
                </p>
                {/* Search Bar */}
                <div className="w-full max-w-xl px-4 z-10 flex flex-col items-center gap-4">
                    <div className="flex w-full bg-white/80 rounded-3xl shadow-xl overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition duration-300 ease-in-out">
                        <input
                            type="text"
                            className="w-full px-6 py-4 text-gray-800 placeholder-gray-500 bg-transparent focus:outline-none text-lg transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-400"
                            placeholder="Write topic to generate quiz"
                            onChange={handleInput}
                            value={query}
                            onKeyDown={handleEnter}
                        />
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={handleSearch}
                        >
                            🔍
                        </button>
                    </div>
                </div>
            </div>
            {/* Questions Section */}
            <div className={`w-full flex flex-col items-center transition-all duration-700 ${hasSearched ? 'opacity-100 pt-10' : 'opacity-0 pointer-events-none'}`}
                style={{ minHeight: hasSearched ? '40vh' : '0' }}>
                {topic && <Questions topic={topic} />}
            </div>
        </div>
    );
}
