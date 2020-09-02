import { 
    RECEIVE_USERS, ADD_ANSWER_TO_USER, ADD_NEW_QUESTION
} from '../actions/users'


export default function users(state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS : 
            return {
                ...state,
                ...action.users
            }
        
        case ADD_ANSWER_TO_USER :
            const {authedUser, qid, answer} = action
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            }

        case ADD_NEW_QUESTION :
            
            const {id, author} = action
            return  {
                ...state,
                [author]: {
                    ...state[author],
                    questions: state[author.questions.concat(id)]
                }
            }

        default : 
            return state
    }
}
