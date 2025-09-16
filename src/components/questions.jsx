import Question from "./question";
import { useEffect, useState } from "react";
import axios from "axios";

const Questions = ({ topic }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refusalMsg, setRefusalMsg] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setQuestions([]);
        setRefusalMsg(""); // Clear prior refusals
        if (!topic) return;
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/questions/" + topic
        );
        // Check for refusal message
        if (
          typeof response.data === "string" &&
          response.data.toLowerCase().includes("unable to provide mcqs")
        ) {
          setRefusalMsg(response.data);
        }
        // Check for completely missing or zero questions
        else if (
          Array.isArray(response.data) &&
          response.data.length === 0
        ) {
          setRefusalMsg("No questions available for this topic.");
        }
        // If valid array of questions, set
        else if (Array.isArray(response.data)) {
          setQuestions(response.data);
        }
        // If question API sometimes returns single object as refusal
        else if (
          response.data &&
          typeof response.data.message === "string" &&
          response.data.message.toLowerCase().includes("unable to provide mcqs")
        ) {
          setRefusalMsg(response.data.message);
        } else {
          setRefusalMsg("No questions available for this topic.");
        }
      } catch (error) {
        setRefusalMsg("Error fetching questions.");
        console.error("Error fetching questions:", error);
      }
      setLoading(false);
    };
    fetchQuestions();
  }, [topic]);

  const handleMoreQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/questions/" + topic + "?more=true"
      );
      if (
        typeof response.data === "string" &&
        response.data.toLowerCase().includes("unable to provide mcqs")
      ) {
        setRefusalMsg(response.data);
      } else if (Array.isArray(response.data)) {
        setQuestions(prev => [...prev, ...response.data]);
      }
    } catch (error) {
      setRefusalMsg("Error fetching more questions.");
      console.error("Error fetching more questions:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-8 items-center py-4 w-full">
      {refusalMsg ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh] w-full">
          <div
            className="w-full max-w-md px-8 py-6 rounded-md shadow-lg border border-yellow-400 text-yellow-600 bg-gray-900 text-center"
            style={{ fontFamily: "FK Grotesk, sans-serif", fontWeight: 700, fontSize: "1.15rem" }}
          >
            {refusalMsg}
          </div>
        </div>
      ) : questions && questions.length > 0 ? (
        <>
          {questions.map((question, index) => (
            <div key={index} className="w-full flex flex-col items-center gap-2">
              <Question question={question} />
            </div>
          ))}
          <button
            onClick={handleMoreQuestions}
            disabled={loading}
            style={{
              backgroundColor: "#EEFC7C",
              color: "#222",
              fontWeight: 700,
              fontFamily: "FK Grotesk, sans-serif",
              fontSize: "0.93rem",
              minWidth: "140px",
              padding: "0.7rem 1.2rem",
              marginTop: "2rem",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1
            }}
            className="rounded-md shadow-lg hover:scale-105 transition"
          >
            {loading ? "Loading..." : "More Questions"}
          </button>
        </>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-yellow-400 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2a7 7 0 00-4 12.9V17a2 2 0 002 2h4a2 2 0 002-2v-2.1A7 7 0 0012 2z"
            />
          </svg>
          <span className="mt-3 text-lg font-medium" style={{ color: "#EEFC7C" }}>
            Thinking up questions...
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default Questions;
