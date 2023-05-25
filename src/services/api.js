import axios from 'axios'
import {getApiEndpoint} from "../utils/utilities";

// get logged in user
const userId = JSON.parse(localStorage.getItem('ajokudi::user'))?.userId

const apiWorker = axios.create({
    baseURL: getApiEndpoint(),
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userId}`
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
    return await apiWorker.post(`project`, data)
}

const getProject = async (code) => {
    return await apiWorker.get(`project/${code}`)
}

const projectDeposit = async (data) => {
    return await apiWorker.post('deposit', data)
}

const getFlutterwavePaymentInfo = async (tx_ref, transaction_id) => {
    return await apiWorker.get(`flutterwave/confirm/?tx_ref=${tx_ref}&tx_id=${transaction_id}`)
}

const getProjectDeposits = async (id) => {
    return await apiWorker.get(`/deposits/${id}`)
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
    createProject,
    getProject,
    projectDeposit,
    getFlutterwavePaymentInfo,
    getProjectDeposits
}

export default apiCalls