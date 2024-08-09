import {useState} from "react";
import {Link} from "react-router-dom";
import LoginForm from "./loginForm";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ForgotPasswordSchema} from "../../form-schema/forgotPasswordSchema";
import {InvalidFormField} from "../Errors/invalidFormField";
import {useForgotPassword} from "../../hooks/customHooks";

const ForgotPassword = () => {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(ForgotPasswordSchema)
    })

    const {
        mutate,
        isSuccess,
        isError,
        error
    } = useForgotPassword()

    const [goToLogin, setGoToLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleForgotPassword = (data) => {
        mutate(data)

        if (isError) {
            setErrorMessage(error.message)
        }
    }

    return (
        <>
            {
                goToLogin ? <LoginForm/> :
                    isSuccess ?
                        <p className="text-center text-primary" style={{margin: '15% 0'}}>
                            Check your email inbox for a password reset link
                        </p> :

                        <div id="login" className='container'>
                            <div className="d-flex flex-column align-items-center">
                                <h2 className="mb-5 text-center">Reset Password</h2>
                                {isError && <p className="text-warning"></p>}
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <form onSubmit={handleSubmit(handleForgotPassword)}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="account@email.com"
                                                className="form-control"
                                                id="email"
                                                {...register('email')}
                                                aria-invalid={!!errors.email ? "true" : "false"}
                                            />
                                            {!!errors.email && <InvalidFormField message={errors.email?.message}/>}
                                            <br/>
                                            <p className="text-primary" style={{fontSize: '0.8rem'}}>
                                                We will send a link to this email address to reset the account password.
                                            </p>
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="btn btn-primary fw-lighter btn-lg"
                                            >Proceed
                                            </button>
                                            <p className="text-center text-danger"
                                               id="submission-error">{errorMessage}</p>
                                        </div>
                                    </form>
                                    <div>
                                        <p>
                                            <Link to="/login" onClick={(e) => {
                                                e.preventDefault();
                                                setGoToLogin(true);
                                            }}>Login</Link>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-3"></div>
                            </div>
                        </div>
            }
        </>
    );
};

export default ForgotPassword;
