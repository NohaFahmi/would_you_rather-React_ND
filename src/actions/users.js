export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_ANSWER_FOR_USER = 'ADD_ANSWER_FOR_USER'


export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}


export function addAnsToUser(authedUser, qid, answer) {
    return {
        type: ADD_ANSWER_FOR_USER,
        authedUser,
        qid,
        answer
    }
}


