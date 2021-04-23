import { crawlActionTypes } from "../../constants/searchConstant";

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
        default:
            return state
    }
}

export default searchReducer;