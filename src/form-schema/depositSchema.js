import * as Yup from 'yup'

export const DepositSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    name: Yup.string()
        .matches(/^[A-Za-z\s]+$/, 'This field should contain only letters and spaces')
        .required('Name is required'),
    amount: Yup.string().matches(/^\d+$/, 'Must be a number only').required('Amount is required'),
    phone: Yup.string()
        .matches(/^(\+)?(234|0)[0-9]{10}$/, 'Must be a valid phone number')
        .required('Phone is required'),
})