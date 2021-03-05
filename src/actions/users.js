import { saveQuestionAnswer } from '../utils/api'
import { saveAnswers } from '../actions/questions'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER'
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION'


export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}


export function saveAnswerToUser(authedUser, qid, answer) {
    return {
        type: ADD_ANSWER_TO_USER,
        authedUser,
        qid,
        answer
    }
}

export function addNewQuestion({id, author}) {
    return {
        type: ADD_NEW_QUESTION,
        id,
        author
    }
}

export function handleSavingAnswers(authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(saveAnswerToUser(authedUser, qid, answer))
        dispatch(saveAnswers(authedUser, qid, answer))

        return saveQuestionAnswer(authedUser, qid, answer)
        .catch(e => {
            console.warn("Error in handleSavingAnswers:", e)
        })
    }
}