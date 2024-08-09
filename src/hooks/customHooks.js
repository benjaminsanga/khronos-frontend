import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import apiCalls from '../services/api'

export const useCreateUser = () => {
    const queryClient = useQueryClient()
    return useMutation((arg) => apiCalls.createUser(arg), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['CreateAccount'])
            return data
        }
    })
}

export const useLogin = () => {
    const queryClient = useQueryClient()
    return useMutation((arg) => apiCalls.login(arg), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['LogIn'])
            return data
        }
    })
}

export const useGetStatistics = () => {
    return useQuery(
        ['GetStatistics'],
        () => apiCalls.getStatistics(),
        {
            keepPreviousData: true,
            staleTime: Infinity,
            enabled: true
        }
    )
}

export const useGetStatesAndLgas = () => {
    return useQuery(
        ['GetStatesAndLgas'],
        () => apiCalls.getStatesAndLgas(),
        {
            keepPreviousData: true,
            staleTime: Infinity
        }
    )
}

export const useVerifyUser = () => {
    const queryClient = useQueryClient()
    return useMutation((arg) => apiCalls.verifyAccount(arg), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['VerifyUser'])
            return data
        }
    })
}

export const useForgotPassword = () => {
    const queryClient = useQueryClient()
    return useMutation((arg) => apiCalls.forgotPassword(arg), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['ForgotPassword'])
            return data
        }
    })
}

export const useGetUser = (id) => {
    return useQuery(
        ['GetUser'],
        () => apiCalls.getUser(id),
        {
            keepPreviousData: true,
            staleTime: Infinity
        }
    )
}

export const useGetUserProjects = (id) => {
    return useQuery(
        ['GetUserProjects'],
        () => apiCalls.getAllProjects(id),
        {
            keepPreviousData: true,
            staleTime: Infinity
        }
    )
}

export const useCreateProject = () => {
    const queryClient = useQueryClient()
    return useMutation((arg) => apiCalls.createProject(arg), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['CreateProject'])
            return data
        }
    })
}

export const useGetProject = () => {
    const queryClient = useQueryClient()
    return useMutation((arg) => apiCalls.getProject(arg), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['GetProject'])
            return data
        }
    })
}

export const useGetProjectById = (id) => {
    return useQuery(
        ['GetProjectById'],
        () => apiCalls.getProject(id),
        {
            keepPreviousData: true,
            staleTime: Infinity
        }
    )
}

export const useGetProjectByCode = (code) => {
    return useQuery(
        ['GetProjectByCode'],
        () => apiCalls.getProject(code),
        {
            keepPreviousData: true,
            staleTime: Infinity
        }
    )
}

export const useProjectDeposit = () => {
    const queryClient = useQueryClient()
    return useMutation((arg) => apiCalls.projectDeposit(arg), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['ProjectDeposit'])
            return data
        }
    })
}

export const useGetFlutterwavePaymentInfo = (tx_ref, transaction_id) => {
    return useQuery(
        ['GetFlutterwavePaymentInfo'],
        () => apiCalls.getFlutterwavePaymentInfo(tx_ref, transaction_id),
        {
            keepPreviousData: true,
            staleTime: Infinity
        }
    )
}

export const useGetProjectDeposits = (id) => {
    return useQuery(
        ['GetProjectDeposits'],
        () => apiCalls.getProjectDeposits(id),
        {
            keepPreviousData: true,
            staleTime: Infinity
        }
    )
}

export const useGetAllProjects = () => {
    return useQuery(
        ['GetAllProjects'],
        () => apiCalls.getAllProjects(),
        {
            keepPreviousData: true,
            staleTime: Infinity
        }
    )
}

export const useGetAllUsers = () => {
    return useQuery(
        ['GetAllUsers'],
        () => apiCalls.getAllUsers(),
        {
            keepPreviousData: true,
            staleTime: Infinity
        }
    )
}