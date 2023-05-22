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

const verifyCluster = async (data) => {
    return await apiWorker.post('cluster/verify', data)
}

const forgotPassword = async (data) => {
    return await apiWorker.post('cluster/forgot-password', data)
}

const getCluster = async (id) => {
    return await apiWorker.get(`cluster/dashboard/${id}`)
}

const getAllProjects = async (id) => {
    return await apiWorker.get(`projects/${id}`)
}

const createProject = async (data) => {
    return await apiWorker.post(`project`, data, {
        'Authorization': `Bearer `
    })
}

const apiCalls = {
    createCluster,
    login,
    getStatistics,
    getStatesAndLgas,
    verifyCluster,
    forgotPassword,
    getCluster,
    getAllProjects,
    createProject
}

export default apiCalls