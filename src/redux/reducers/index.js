import { combineReducers } from "redux";
import counterReducer from './counterReducer'
import todosReducer from './todosReducer'

const reducers = combineReducers({
    counter:counterReducer,
    todos:todosReducer
})

export default reducers;