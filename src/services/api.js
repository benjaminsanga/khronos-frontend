import axios from 'axios'
import {getEndpoint} from "../utils/utilities";

const apiWorker = axios.create({
    baseURL: getEndpoint(),
    headers: {
        Accept: 'application/json',
    },
})

const login = async (data) => {
    return await apiWorker.post('/cluster/login', data)
}

const apiCalls = {
    login
}

export default apiCalls