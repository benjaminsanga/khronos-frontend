import * as Yup from 'yup'

export const CreateAccountSchema = Yup.object().shape({
    account_name: Yup.string().required('Account Name is required')
        .min(3, 'Name must be at least 3 characters long')
        .max(100, 'Name must not be more than 100 in length'),
    account_address: Yup.string().required('Account Address is required')
        .max(100, 'Address must not be more than 100 in length'),
    account_lga: Yup.string().required('Account LGA is required'),
    account_state: Yup.string().required('Account State is required'),
    account_admin_gender: Yup.string().required('Gender is required'),
    account_password: Yup.string()
        .required('Password is required')
        .min(3, 'Password must be at 3 char long')
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>?]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Password must contain at least 8 characters, one uppercase, one number and one special case character',
        ),
    confirm_password: Yup.string()
        .required('Confirm Password field is mandatory')
        .oneOf([Yup.ref('account_password')], 'Passwords does not match'),
    account_admin_email: Yup.string().email('Must be a valid email').required('Email is required'),
    account_admin_lastname: Yup.string().required('Last Name is required')
        .min(2, 'Last Name must be at least 3 characters long')
        .max(20, 'Last Name must not be more than 100 in length')
        .matches(/^[A-Za-z]+$/, 'This field should contain only letters'),
    account_admin_firstname: Yup.string().required('First Name is required')
        .min(2, 'First Name must be at least 3 characters long')
        .max(20, 'First Name must not be more than 100 in length')
        .matches(/^[A-Za-z]+$/, 'This field should contain only letters'),
    account_admin_phone: Yup.string().matches(/^(\+)?(234|0)[0-9]{10}$/, 'Must be a valid phone number'),
    agree_to_register_account: Yup.boolean().required('You must agree to register'),
    verify_account_information: Yup.boolean().required('Your consent is required')
})