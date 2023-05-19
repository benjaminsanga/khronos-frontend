import axios from 'axios'
import {getApiEndpoint} from "../utils/utilities";

const apiWorker = axios.create({
    baseURL: getApiEndpoint(),
    headers: {
        Accept: 'application/json',
    },
})

const login = async (data) => {
    return await apiWorker.post('cluster/login', data)
}

const getStatistics = async () => {
    return await apiWorker.get('statistics')
}

const apiCalls = {
    login,
    getStatistics
}

export default apiCalls