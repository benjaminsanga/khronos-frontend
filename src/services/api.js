import axios from 'axios'
import {getApiEndpoint} from "../utils/utilities";

// get logged in user
const userId = JSON.parse(localStorage.getItem('khronos::user'))?.userId

const apiWorker = axios.create({
    baseURL: getApiEndpoint(),
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userId}`
    },
})

const createUser = async (data) => {
    // add fields to form data
    data['verification_code'] = 0;
    data['verified_account'] = false;
    return await apiWorker.post('user', data)
}

const login = async (data) => {
    return await apiWorker.post('user/login', data)
}

const getStatistics = async () => {
    return await apiWorker.get('statistics')
}

const getStatesAndLgas = async () => {
    return await apiWorker.get('get-states')
}

const verifyUser = async (data) => {
    return await apiWorker.post('user/verify', data)
}

const forgotPassword = async (data) => {
    return await apiWorker.post('user/forgot-password', data)
}

const getUser = async (id) => {
    return await apiWorker.get(`user/dashboard/${id}`)
}

const getUserProjects = async (id) => {
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

const getAllProjects = async () => {
    return await apiWorker.get('/projects')
}

const getAllUsers = async () => {
    return await apiWorker.get('/user')
}

const apiCalls = {
    createUser,
    login,
    getStatistics,
    getStatesAndLgas,
    verifyUser,
    forgotPassword,
    getUser,
    getUserProjects,
    createProject,
    getProject,
    projectDeposit,
    getFlutterwavePaymentInfo,
    getProjectDeposits,
    getAllProjects,
    getAllUsers
}

export default apiCalls