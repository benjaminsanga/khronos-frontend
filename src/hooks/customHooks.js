import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import apiCalls from '../services/api'

export const useCreateAccount = () => {
    const queryClient = useQueryClient()
    return useMutation((arg) => apiCalls.createAccount(arg), {
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

export const useVerifyAccount = () => {
    const queryClient = useQueryClient()
    return useMutation((arg) => apiCalls.verifyAccount(arg), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['VerifyAccount'])
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

export const useGetAccount = (id) => {
    return useQuery(
        ['GetAccount'],
        () => apiCalls.getAccount(id),
        {
            keepPreviousData: true,
            staleTime: Infinity
        }
    )
}

export const useGetAccountProjects = (id) => {
    return useQuery(
        ['GetAccountProjects'],
        () => apiCalls.getAccountProjects(id),
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

// export const useGetProject = () => {
//     const queryClient = useQueryClient()
//     return useMutation((arg) => apiCalls.getProject(arg), {
//         onSuccess: (data) => {
//             queryClient.invalidateQueries(['GetProject'])
//             return data
//         }
//     })
// }

export const useGetProjectById = (id) => {
    return useQuery(
        ['GetProjectById'],
        () => apiCalls.getProjectById(id),
        {
            keepPreviousData: false,
            staleTime: 0,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
        }
    )
}

export const useGetProjectByCode = (code) => {
    return useQuery(
        ['GetProjectByCode'],
        () => apiCalls.getProjectByCode(code),
        {
            keepPreviousData: false,
            staleTime: 0,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
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

export const useGetConfirmFlutterwavePayment = (status, tx_ref, transaction_id) => {
    return useQuery(
        ['GetFlutterwavePaymentInfo'],
        () => apiCalls.confirmFlutterwavePayment(status, tx_ref, transaction_id),
        {
            keepPreviousData: true,
            staleTime: Infinity
        }
    )
}

export const useGetProjectDeposits = (id, page, limit) => {
    return useQuery(
        ['GetProjectDeposits'],
        () => apiCalls.getProjectDeposits(id, page, limit),
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

export const useGetAllAccounts = () => {
    return useQuery(
        ['GetAllAccounts'],
        () => apiCalls.getAllAccounts(),
        {
            keepPreviousData: true,
            staleTime: Infinity
        }
    )
}

export const useSendMessage = () => {
    const queryClient = useQueryClient()
    return useMutation((arg) => apiCalls.userSendMessage(arg), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['SendMessage'])
            return data
        }
    })
}

export const useResetPassword = () => {
    const queryClient = useQueryClient()
    return useMutation((arg) => apiCalls.resetPassword(arg), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['ResetPassword'])
            return data
        }
    })
}