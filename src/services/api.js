import axios from 'axios'
import {getApiEndpoint} from "../utils/utilities";

const apiWorker = axios.create({
    baseURL: getApiEndpoint(),
    headers: {
        Accept: 'application/json',
    },
})

const createCluster = async (data) => {
    // add fields to form data
    data['verification_code'] = 0;
    data['verified_account'] = false;
    return await apiWorker.post('cluster', data)
}

const login = async (data) => {
    return await apiWorker.post('cluster/login', data)
}

const getStatistics = async () => {
    return await apiWorker.get('statistics')
}

const getStatesAndLgas = async () => {
    return await apiWorker.get('get-states')
}

const verifyCluster = async (code) => {
    return await apiWorker.post('cluster/verify', code)
}

const apiCalls = {
    createCluster,
    login,
    getStatistics,
    getStatesAndLgas,
    verifyCluster
}

export default apiCalls