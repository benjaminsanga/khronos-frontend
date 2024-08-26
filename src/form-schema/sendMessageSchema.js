import * as Yup from 'yup'

export const SendMessageSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^[A-Za-z]+$/, 'This field should contain only letters')
        .required('Name is required'),
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    message: Yup.string()
        .min(20, 'Must be at least 20 characters')
        .max(200, 'Must not be more than 200 characters')
        .matches(/^[A-Za-z0-9]+$/, 'This field should contain only alphanumeric characters')
        .required('Message is required')
})