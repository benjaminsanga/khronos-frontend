import * as Yup from 'yup'

export const VerifyClusterSchema = Yup.object().shape({
    verification_code: Yup.string().required('Code is required')
})