import { combineReducers } from "redux";
import error from './errorReducer';
import auth from './authReducer';
import search from './searchReducer';


const rootReducer = combineReducers({
    auth,
    error,
    search,
});

export default rootReducer;