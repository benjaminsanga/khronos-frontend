import * as Yup from 'yup'

export const EditProfileSchema = Yup.object().shape({
    account_name: Yup.string().required('Account Name is required')
        .min(3, 'Name must be at least 3 characters long')
        .max(100, 'Name must not be more than 100 in length'),
    account_admin_lastname: Yup.string().required('Last Name is required')
        .min(2, 'Last Name must be at least 3 characters long')
        .max(20, 'Last Name must not be more than 100 in length')
        .matches(/^[A-Za-z\s]+$/, 'This field should contain only letters and spaces'),
    account_admin_firstname: Yup.string().required('First Name is required')
        .min(2, 'First Name must be at least 3 characters long')
        .max(20, 'First Name must not be more than 100 in length')
        .matches(/^[A-Za-z\s]+$/, 'This field should contain only letters and spaces'),
    account_admin_phone: Yup.string().matches(/^(\+)?(234|0)[0-9]{10}$/, 'Must be a valid phone number'),
})