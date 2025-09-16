import React, { useState } from "react";
import Confetti from "react-confetti";

const Question = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (value === question.answer) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  return (
    <div className="relative flex flex-col items-start bg-gray-900 rounded-lg shadow-lg p-6 max-w-xl w-full border border-gray-700 mb-6">
      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 1920}
          height={typeof window !== "undefined" ? window.innerHeight : 1080}
          numberOfPieces={300}
          gravity={0.5}
          initialVelocityY={10}
          recycle={false}
          confettiSource={{ x: 0, y: 0, w: window.innerWidth, h: 0 }}
          style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999 }}
        />
      )}

      <p className="text-gray-100 text-lg font-medium mb-4">{question.question}</p>

      <div className="flex flex-col gap-3 mb-4 w-full">
        {question.options.map((option, index) => (
          <label
            key={index}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
                name={question.question}
                className="accent-yellow-400 w-5 h-5"
              />
              <span className="text-gray-400">{option}</span> {/* lighter option text */}
            </div>

            {selectedOption === option && option === question.answer && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}

            {selectedOption === option && option !== question.answer && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;
