import * as Yup from 'yup'

export const FindProjectSchema = Yup.object().shape({
    project_code: Yup.string().required('Project code is required')
        .matches(/^[A-Za-z0-9]+$/, 'This field should contain only alphanumeric characters')
})