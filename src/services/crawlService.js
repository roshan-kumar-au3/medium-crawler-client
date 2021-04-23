import axios from "axios";
import { baseUrl } from "../constants/backendConstant"


const crawlMedium = async (token, userId, searchTag) => {
    const url = `${baseUrl}/admin/${userId}/crawlkeyword/?tag=${searchTag}`;
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

const crawlService = {
    crawlMedium,
}

export default crawlService;