import axios from "axios";

export async function getQuestions() {
    try {
        let response = await axios('https://api.javascript-trivia.com/en/');
        return response.data;
    } catch(exception) {
        console.log(exception);
    }
}