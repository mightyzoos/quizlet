import Winners from "../assets/winners.svg";

function Result(props) {
    return (
        <div className="result-card">
            <img src={Winners} alt="people cheering" />
            <h2>Results</h2>
            <div>You got <span className="score">{props.score}</span> correct answers</div>
            <button onClick={props.reset}>Try again</button>
        </div>
    );
}

export default Result;