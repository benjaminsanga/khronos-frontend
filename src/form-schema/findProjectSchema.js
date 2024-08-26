import * as Yup from 'yup'

export const FindProjectSchema = Yup.object().shape({
    project_code: Yup.string()
        .matches(/^[A-Za-z0-9]+-[A-Za-z0-9]+-[A-Za-z0-9]+$/, 'This field should contain alphanumeric characters and exactly two hyphens')
        .required('Project code is required')
})