import { useState, useEffect } from "react";
import { getQuestions } from "../services/questionService";
import Question from "./Question";
import Result from "./Result";

function Quiz() {

    const QUESTION_COUNT = 10;
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState({
        question: "",
        answerOptions: {
            "A": "",
            "B": "",
            "C": "",
            "D": ""
        }
    });
    const [questionNumber, setQuestionNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [gameIteration, setGameIteration] = useState(0);

    const getNextQuestion = () => {
        if (questionNumber <= QUESTION_COUNT) {
            setQuestionNumber(questionNumber + 1);
            setQuestion(questions[questionNumber]);
        }
    }

    const updateScore = (isCorrect) => {
        if (isCorrect) setScore(score + 1);
    }

    const getRandomSubset = (questions) => {
        let result = [];
        let i = 0;
        let j = 0;

        while (i < QUESTION_COUNT) {
            j = Math.floor(Math.random() * (questions.length - 1));
            let removed = questions.splice(j, 1)[0];
            result.push(removed);
            i++;
        }
        
        return result;
    }

    const reset = () => {
        setQuestion({
            question: "",
            answerOptions: {
                "A": "",
                "B": "",
                "C": "",
                "D": ""
            }
        });
        setQuestionNumber(0);
        setScore(0);
        setGameIteration(gameIteration + 1);
    }

    useEffect(() => {
        const fetch = async () => {
            const data = await getQuestions();
            const subset = getRandomSubset(data.questions);
            setQuestions(subset);
            setQuestion(subset[0]);
        };
        
        fetch()
            .catch(console.error());
    }, [gameIteration]);

    return (
        <main>
            <div className="quiz-header">
                <h1>JAVASCRIPT TRIVIA</h1>
            </div>
            {
                questionNumber < QUESTION_COUNT &&
                <Question key={questionNumber} question={question} questionNumber={questionNumber} total={QUESTION_COUNT} updateScore={updateScore} getNextQuestion={getNextQuestion}/>
            }
            {
                questionNumber >= QUESTION_COUNT &&
                <Result score={score} reset={reset}/>
            }
        </main>
    );
}

export default Quiz;