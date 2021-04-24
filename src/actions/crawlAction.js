import { errorActionTypes } from "../constants/errorConstant";
import { crawlActionTypes } from "../constants/searchConstant"
import crawlService from "../services/crawlService";
import searchActions from "./searchAction";


const crawlMedium = (searchTag) => {
    const request = () => ({ type: crawlActionTypes.GET_CRAWL_DATA_REQUEST });
    const success = (payload) => ({ type: crawlActionTypes.GET_CRAWL_DATA_SUCCESS, payload });
    const failure = () => ({ type: crawlActionTypes.GET_CRAWL_DATA_FAILURE });
    const setError = (error) => ({ type: errorActionTypes.SET_ERROR, error });

    return async (dispatch, getState) => {
        const { token, user } = getState().auth;
        dispatch(request());
        try {
            const response = await crawlService.crawlMedium(token, user.id, searchTag);
            dispatch(success(response.data));
            dispatch(searchActions.getSearchHistoryById());
        } catch (e) {
            console.log(e);
            const error = {};
            error.message = e.response?.data?.error;
            error.statusCode = e.response?.status;
            dispatch(searchActions.getSearchHistoryById());
            dispatch(failure());
            dispatch(setError(error));
        }
    }
}

const crawlActions = {
    crawlMedium,
}

export default crawlActions;