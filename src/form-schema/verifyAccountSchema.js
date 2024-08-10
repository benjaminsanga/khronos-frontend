import * as Yup from 'yup'

export const VerifyAccountSchema = Yup.object().shape({
    verification_code: Yup.string().required('Code is required')
})