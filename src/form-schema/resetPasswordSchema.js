import * as Yup from "yup";

export const ResetPasswordSchema = Yup.object().shape({
	password: Yup.string()
		.required("Password is required")
		.min(3, "Password must be at 3 char long")
		.matches(
		/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>?]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
		"Password must contain at least 8 characters, one uppercase, one number and one special case character"
		),
	confirm_password: Yup.string()
		.required("Confirm Password field is mandatory")
		.oneOf([Yup.ref("password")], "Passwords does not match"),
});
