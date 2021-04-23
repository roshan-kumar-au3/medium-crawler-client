import { authActionTypes } from "../../constants/searchConstant";

let initState = {
    isLoggedIn: false,
    isLoading: false,
}

const authReducer = (state = initState, action) =>{
    switch (action.type) {
        case authActionTypes.SEND_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case authActionTypes.SEND_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.admin,
                token: action.payload.token,
                isLoading: false,
            }
        case authActionTypes.SEND_LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                isLoading: false,
            }
        default:
            return state
    }
}

export default authReducer;