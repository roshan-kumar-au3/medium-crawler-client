import { errorActionTypes } from "../constants/errorConstant";
import { authActionTypes } from "../constants/searchConstant"
import authService from "../services/authService";


const loginAdmin = (email, password) => {
    const request = () => ({ type: authActionTypes.SEND_LOGIN_REQUEST });
    const success = (payload) => ({ type: authActionTypes.SEND_LOGIN_SUCCESS, payload });
    const failure = () => ({ type: authActionTypes.SEND_LOGIN_FAILURE });
    const setError = (error) => ({ type: errorActionTypes.SET_ERROR, error });

    return async (dispatch) => {
        dispatch(request());
        try {
            const response = await authService.loginAdmin(email, password);
            dispatch(success(response.data));
        } catch (e) {
            console.log(e);
            const error = {};
            error.message = e.response.data.error;
            error.statusCode = e.response.status
            dispatch(failure());
            dispatch(setError(error));
        }
    }
}

const authActions = {
    loginAdmin,
}

export default authActions;