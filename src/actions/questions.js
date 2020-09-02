import {saveQuestion} from '../utils/api'
import {addNewQuestion} from '../actions/users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER_TO_Q = 'ADD_ANSWER_TO_Q'
export const ADD_QUESTION = 'ADD_QUESTION'

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

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleSavingQuestions(optionOneText, optionTwoText, author) {

    return (dispatch) => {
        return saveQuestion({optionOneText, optionTwoText, author}).then(
            question => {
                dispatch(addQuestion(question))
                dispatch(addNewQuestion(question))
            }
        )
    }
}