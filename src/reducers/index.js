import { combineReducers } from 'redux'
import authedUser from './authedUser';
import users from './users';
import questions from './questions';

//gathering them in one reducer as createStor function only accepts single reducers
export default combineReducers({
    authedUser,
    users,
    questions
})