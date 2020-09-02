import { getInitialData, saveQuestionAnswer } from './../utils/api';
import { receiveUsers, addAnsToUser } from '../actions/users'
import { receiveQuestions, addAnswer } from '../actions/questions'


export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
        .then(({users, questions}) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
        })
    }
}

export function handleSavingAnswers(authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(addAnsToUser(authedUser, qid, answer))
        dispatch(addAnswer(authedUser, qid, answer))

        return saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
        // .catch(e => {
        //     console.warn('Error in handleSavingAnswers:', e)
        // })
    }
}
