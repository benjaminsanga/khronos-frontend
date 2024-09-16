import * as Yup from 'yup'

export const ChangePasswordSchema = Yup.object().shape({
  current_password: Yup.string().required('Current password is required')
      .min(8, 'Password must be at 8 char long'),
    new_password: Yup.string()
      .required('New Password is required')
      .min(8, 'Password must be at 8 char long')
      .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>?]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          'Password must contain at least 8 characters, one uppercase, one number and one special case character',
    ),
    confirm_new_password: Yup.string()
      .required('Confirm New Password is mandatory')
      .oneOf([Yup.ref('new_password')], 'Passwords does not match'),
})