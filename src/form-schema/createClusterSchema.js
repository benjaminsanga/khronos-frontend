import * as Yup from 'yup'

export const CreateClusterSchema = Yup.object().shape({
    clusterName: Yup.string().required('Cluster Name is required'),
    clusterAddress: Yup.string().required('Cluster Address is required'),
    clusterLga: Yup.string().required('Cluster LGA is required'),
    clusterState: Yup.string().required('Cluster State is required'),
    gender: Yup.string().required('Gender is required'),
    password: Yup.string()
        .required('Password is required')
        .min(3, 'Password must be at 3 char long')
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>?]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Password must contain at least 8 characters, one uppercase, one number and one special case character',
        ),
    confirmPassword: Yup.string()
        .required('Confirm Password field is mandatory')
        .oneOf([Yup.ref('password')], 'Passwords does not match'),
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    lastName: Yup.string().required('Last Name is required'),
    firstName: Yup.string().required('First Name is required'),
    phone: Yup.string().matches(/^(\+)?(234|0)[0-9]{10}$/, 'Must be a valid phone number'),
    agreeToTerms: Yup.boolean().required(),
    verifyInformation: Yup.boolean().required()
})