import axios from "axios";
import { baseUrl } from "../constants/backendConstant"


const getSearchHistoryById = async (token, userId) => {
    const url = `${baseUrl}/admin/${userId}/history`;
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`
        },
        responseType: 'json',
        responseEncoding: 'utf8',
        url,
    }
    const result = await axios(options);
    return result;
}

const searchService = {
    getSearchHistoryById,
}

export default searchService;