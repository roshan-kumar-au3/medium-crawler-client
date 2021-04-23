import { errorActionTypes } from "../constants/errorConstant";
import { searchActionTypes } from "../constants/searchConstant";
import searchService from "../services/searchService";


const getSearchHistoryById = () => {
    const request = () => ({ type: searchActionTypes.GET_SEARCH_HISTORY_REQUEST });
    const success = (payload) => ({ type: searchActionTypes.GET_SEARCH_HISTORY_SUCCESS, payload });
    const failure = () => ({ type:  searchActionTypes.GET_SEARCH_HISTORY_FAILURE});
    const setError = (error) => ({ type: errorActionTypes.SET_ERROR, error });

    return async (dispatch, getState) => {
        const { token, user } = getState().auth;
        dispatch(request());
        try {
            const response = await searchService.getSearchHistoryById(token, user.id);
            dispatch(success(response.data));
        } catch (e) {
            console.log(e);
            const error = {};
            if (e.response?.status == 404) {
                dispatch(success([]));
            } else {
                error.message = e.response?.data?.error;
                error.statusCode = e.response?.status
                dispatch(failure());
                dispatch(setError(error));        
            }
        }
    }
}

const searchActions = {
    getSearchHistoryById,
}

export default searchActions;