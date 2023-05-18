import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import apiCalls from '../services/api'

export const useLogin = () => {
    const queryClient = useQueryClient()
    return useMutation((arg) => apiCalls.login(arg), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['LogIn'])
            return data
        }
    })
}