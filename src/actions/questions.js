export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER_TO_Q = 'ADD_ANSWER_TO_Q'


export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function saveAnswers(authedUser, qid, answer) {
    return {
        type: ADD_ANSWER_TO_Q,
        authedUser,
        qid,
        answer

    }
}