import * as Yup from 'yup'

export const CreateUserSchema = Yup.object().shape({
    user_name: Yup.string().required('User Name is required'),
    user_address: Yup.string().required('User Address is required'),
    user_lga: Yup.string().required('User LGA is required'),
    user_state: Yup.string().required('User State is required'),
    user_admin_gender: Yup.string().required('Gender is required'),
    user_password: Yup.string()
        .required('Password is required')
        .min(3, 'Password must be at 3 char long')
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>?]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Password must contain at least 8 characters, one uppercase, one number and one special case character',
        ),
    confirm_password: Yup.string()
        .required('Confirm Password field is mandatory')
        .oneOf([Yup.ref('user_password')], 'Passwords does not match'),
    user_admin_email: Yup.string().email('Must be a valid email').required('Email is required'),
    user_admin_lastname: Yup.string().required('Last Name is required'),
    user_admin_firstname: Yup.string().required('First Name is required'),
    user_admin_phone: Yup.string().matches(/^(\+)?(234|0)[0-9]{10}$/, 'Must be a valid phone number'),
    agree_to_register_user: Yup.boolean().required('Agreement is required'),
    verify_user_information: Yup.boolean().required('Verification is required')
})