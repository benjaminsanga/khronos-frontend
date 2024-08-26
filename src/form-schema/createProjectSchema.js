import * as Yup from 'yup'

export const CreateProjectSchema = Yup.object().shape({
    project_name: Yup.string().required('Project Name is required')
        .min(3, 'Project Name must be at least 3 characters long')
        .max(100, 'Project Name must not be more than 100 in length'),
    project_purpose: Yup.string().required('Purpose is required')
        .matches(/^[A-Za-z]+$/, 'This field should contain only letters'),
    is_public: Yup.string().required('Project visibility is required'),
    project_target_amount: Yup.string().required('Target is required'),
    recurring_payout: Yup.string().required('Type is required'),
    contribution_end_date: Yup.string().required('End date is required'),
})