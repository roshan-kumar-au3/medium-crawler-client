import { crawlActionTypes, searchActionTypes } from "../../constants/searchConstant";

let initState = {
    searchHistoryStatus: {},
    searchDataByTagStatus: {},
}

const searchReducer = (state = initState, action) =>{
    switch (action.type) {
        case crawlActionTypes.GET_CRAWL_DATA_REQUEST:
            return {
                ...state,
                searchDataByTagStatus: {
                    isLoading: true,
                }
            }
        case crawlActionTypes.GET_CRAWL_DATA_SUCCESS:
            return {
                ...state,
                searchDataByTagStatus: {
                    isLoading: false,
                    searchData: action.payload,
                }
            }
        case crawlActionTypes.GET_CRAWL_DATA_FAILURE:
            return {
                ...state,
                searchDataByTagStatus: {
                    isLoading: false,
                }
            }
        case searchActionTypes.GET_SEARCH_HISTORY_REQUEST:
            return {
                ...state,
                searchHistoryStatus: {
                    isLoading: true,
                }
            }
        case searchActionTypes.GET_SEARCH_HISTORY_SUCCESS:
            return {
                ...state,
                searchHistoryStatus: {
                    isLoading: false,
                    searchHistoryData: action.payload,
                }
            }
        case searchActionTypes.GET_SEARCH_HISTORY_FAILURE:
            return {
                ...state,
                searchHistoryStatus: {
                    isLoading: false,
                }
            }
        default:
            return state
    }
}

export default searchReducer;