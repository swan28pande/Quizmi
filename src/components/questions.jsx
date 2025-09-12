import Question from "./question";
import { useEffect,useState } from "react";
import axios from "axios";


const Questions = ({topic}) => {
    const [questions, setQuestions] = useState([]);
    // const topic = params.topic;
 
    useEffect( () => {
        const fetchQuestions = async () => {
            try {
                console.log(topic);
                if(!topic) return;
                const response = await axios.get("http://localhost:3000/api/questions/"+topic);
                setQuestions(response.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        }
        fetchQuestions();
    },[topic]);



    return (
        <div className="flex flex-col gap-20 items-center py-10">
            {/* {[...Array(3)].map((_, index) => (
                <Question key={index} />
            ))} */}
            {questions?(questions.map((question, index) => (
                <Question key={index} question={question} />
            ))):"Loading..."}
        </div>
    );
};

export default Questions;
