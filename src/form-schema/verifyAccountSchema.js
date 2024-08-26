import * as Yup from 'yup'

export const VerifyAccountSchema = Yup.object().shape({
    verification_code: Yup.string()
        .matches(/^[0-9]+$/, 'This field should contain only numbers')
        .required('Code is required')
})