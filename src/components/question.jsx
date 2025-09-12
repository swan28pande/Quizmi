import React, { useState } from "react";
const Question = (params) => {
    const question = params.question;
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = () => {
        if(selectedOption === question.answer) {
            alert("Correct Answer!");
        } else {
            alert(`Wrong Answer! Correct answer is: ${question.answer}`);
        }
                // console.log("Selected Answer:", selectedOption);
    };

    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <p className="text-gray-700 text-lg font-medium mb-6">
                   {question.question}
                </p>
                <div className="flex flex-col gap-3 mb-6">
                    {question.options.map((option, index) => (
                        <label key={index} className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="radio"
                                value={option}
                                checked={selectedOption === option}
                                onChange={handleOptionChange}
                                className="accent-blue-600"
                                name={question.question}
                            />
                            <span className="text-gray-800">{option}</span>
                        </label>
                    ))}
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Question;
