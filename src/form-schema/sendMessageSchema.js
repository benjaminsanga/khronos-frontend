import * as Yup from 'yup'

export const SendMessageSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    message: Yup.string().required('Message is required')
})