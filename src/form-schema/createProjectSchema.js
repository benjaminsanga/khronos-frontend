import * as Yup from 'yup'

export const CreateProjectSchema = Yup.object().shape({
    project_name: Yup.string().required('Project Name is required'),
    project_purpose: Yup.string().required('Purpose is required'),
    is_public: Yup.string().required('Project visibility is required'),
    project_target: Yup.string().required('Target is required'),
    recurring_payout: Yup.string().required('Type is required'),
    contribution_end_date: Yup.string().required('End date is required'),
})