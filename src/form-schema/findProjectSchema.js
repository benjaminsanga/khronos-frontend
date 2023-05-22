import * as Yup from 'yup'

export const FindProjectSchema = Yup.object().shape({
    project_code: Yup.string().required('Project code is required')
})