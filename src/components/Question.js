import { useState } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Snippet from "./Snippet";

function Question(props) {
    const question = props.question;
    const [scored, setScored] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const processString = (string) => {
        let found = false;

        let charArr = [...string];
        charArr.forEach((c, index) => {
            if (c === '`' && !found) {
                found = !found;
                charArr[index] = "<pre><code>";
            } else if (c === '`' && found) {
                found = !found;
                charArr[index] = "</code></pre>";
            }
        });

        return charArr.reduce((acc, curr) => acc + curr, "");
    }

    const validateAnswer = (event) => {
        const ele = event.currentTarget;
        const siblings = ele.parentElement.children;
        const choice = ele.childNodes[0].innerText;
        resetButtonStyles(siblings);
        if (choice === question.correctAnswer) {
            ele.classList.add('success');
            setShowExplanation(true);
            if (!scored) {
                props.updateScore(true);
                setScored(true);
            }
        } else {
            ele.classList.add('danger');
            if (!scored) {
                props.updateScore(false);
                setScored(true);
            }
        }
    }

    const resetButtonStyles = (elements) => {
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList = "";
        }
    }

    return (
        question &&
        <div className="question-card">
            <div className="progress"><span>{props.questionNumber + 1}</span>/<span>{props.total}</span></div>
            {
                scored &&
                <button className="next-button" onClick={props.getNextQuestion}>
                    <BsFillArrowRightCircleFill />
                </button>
            }
            {
                question.question &&
                <h2 dangerouslySetInnerHTML={{ __html: processString(question.question.trim())}}></h2>
            }
            <Snippet codeSnip={question.codeSnippet} />
            <div className="answers">
                <button onClick={validateAnswer} className="default"><span className="choice">A</span><span dangerouslySetInnerHTML={{__html: processString(question.answerOptions.A) }}></span></button>
                <button onClick={validateAnswer} className="default"><span className="choice">B</span><span dangerouslySetInnerHTML={{__html: processString(question.answerOptions.B) }}></span></button>
                {question.answerOptions.C && <button onClick={validateAnswer} className="default"><span className="choice">C</span><span dangerouslySetInnerHTML={{__html: processString(question.answerOptions.C) }}></span></button>}
                {question.answerOptions.D && <button onClick={validateAnswer} className="default"><span className="choice">D</span><span dangerouslySetInnerHTML={{__html: processString(question.answerOptions.D) }}></span></button>}
            </div>
            {
                question.answerExplanation &&
                showExplanation &&
                <div className="explanation">
                    <h2>Explanation:</h2>
                    <figure dangerouslySetInnerHTML={{ __html: processString(question.answerExplanation)}}></figure>
                </div>
            }
        </div>
    );
}

export default Question;