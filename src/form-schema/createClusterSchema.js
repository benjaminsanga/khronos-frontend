import * as Yup from 'yup'

export const CreateClusterSchema = Yup.object().shape({
    cluster_name: Yup.string().required('Cluster Name is required'),
    cluster_address: Yup.string().required('Cluster Address is required'),
    cluster_lga: Yup.string().required('Cluster LGA is required'),
    cluster_state: Yup.string().required('Cluster State is required'),
    cluster_admin_gender: Yup.string().required('Gender is required'),
    cluster_password: Yup.string()
        .required('Password is required')
        .min(3, 'Password must be at 3 char long')
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>?]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Password must contain at least 8 characters, one uppercase, one number and one special case character',
        ),
    confirm_password: Yup.string()
        .required('Confirm Password field is mandatory')
        .oneOf([Yup.ref('cluster_password')], 'Passwords does not match'),
    cluster_admin_email: Yup.string().email('Must be a valid email').required('Email is required'),
    cluster_admin_lastname: Yup.string().required('Last Name is required'),
    cluster_admin_firstname: Yup.string().required('First Name is required'),
    cluster_admin_phone: Yup.string().matches(/^(\+)?(234|0)[0-9]{10}$/, 'Must be a valid phone number'),
    agree_to_register_cluster: Yup.boolean().required('Agreement is required'),
    verify_cluster_information: Yup.boolean().required('Verification is required')
})