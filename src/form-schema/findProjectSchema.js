import * as Yup from 'yup'

export const FindProjectSchema = Yup.object().shape({
    project_code: Yup.string()
        .required('Project code is required')
        .matches(/^[A-Za-z0-9]+-[A-Za-z0-9]+-[A-Za-z0-9]+$/, 'Invalid code')
})