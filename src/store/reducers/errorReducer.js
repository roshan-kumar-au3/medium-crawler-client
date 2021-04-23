import { errorActionTypes } from "../../constants/errorConstant";

let initState = {
    isSet: false,
    message: '',
    statusCode: null
}

const errorReducer = (state = initState, action) =>{
    switch (action.type) {
        case errorActionTypes.SET_ERROR:
            return {
                isSet: true,
                message: action.error ? action.error.message : 'NO INTERNET',
                statusCode: action.error?.statusCode,
            }
        case errorActionTypes.RESET_ERROR:
            return {
                isSet: false,
                message: '',
                statusCode: null
            }
        default:
            return state
    }
}

export default errorReducer;