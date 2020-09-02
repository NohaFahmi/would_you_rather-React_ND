export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER = 'ADD_ANSWER'


export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function addAnswer(authedUser, qid, answer) {
    return {
        type: ADD_ANSWER,
        authedUser,
        qid,
        answer

    }
}