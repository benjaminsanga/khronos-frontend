import axios from 'axios'
import {getApiEndpoint} from "../utils/utilities";

// get logged in account
const accountId = JSON.parse(localStorage.getItem('khronos::account'))?.accountId

const apiWorker = axios.create({
    baseURL: getApiEndpoint(),
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accountId}`
    },
})

const createAccount = async (data) => {
    // add fields to form data
    data['verification_code'] = 0;
    data['is_verified_account'] = false;
    return await apiWorker.post('account', data)
}

const login = async (data) => {
    return await apiWorker.post('account/login', data)
}

const getStatistics = async () => {
    return await apiWorker.get('statistics')
}

const getStatesAndLgas = async () => {
    return await apiWorker.get('get-states')
}

const verifyAccount = async (data) => {
    return await apiWorker.post('account/verify', data)
}

const forgotPassword = async (data) => {
    return await apiWorker.post('account/forgot-password', data)
}

const getAccount = async (id) => {
    return await apiWorker.get(`account/dashboard/${id}`)
}

const getAccountProjects = async (id) => {
    return await apiWorker.get(`projects/${id}`)
}

const createProject = async (data) => {
    return await apiWorker.post(`project`, data)
}

const getProjectById = async (id) => {
    return await apiWorker.get(`project/dashboard/${id}`)
}

const getProjectByCode = async (code) => {
    return await apiWorker.get(`project/code/${code}`)
}

const projectDeposit = async (data) => {
    return await apiWorker.post('deposit', data)
}

const getFlutterwavePaymentInfo = async (tx_ref, transaction_id) => {
    return await apiWorker.get(`flutterwave/confirm/?tx_ref=${tx_ref}&tx_id=${transaction_id}`)
}

const getProjectDeposits = async (id, page, limit) => {
    return await apiWorker.get(`/deposits/${id}?page=${page}&limit=${limit}`)
}

const getAllProjects = async () => {
    return await apiWorker.get('/projects')
}

const getAllAccounts = async () => {
    return await apiWorker.get('/account')
}

const apiCalls = {
    createAccount,
    login,
    getStatistics,
    getStatesAndLgas,
    verifyAccount,
    forgotPassword,
    getAccount,
    getAccountProjects,
    createProject,
    getProjectById,
    getProjectByCode,
    projectDeposit,
    getFlutterwavePaymentInfo,
    getProjectDeposits,
    getAllProjects,
    getAllAccounts
}

export default apiCalls