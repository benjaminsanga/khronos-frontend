import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HappyIcon from '../../assets/images/happy_face.svg';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordSchema } from "../../form-schema/resetPasswordSchema";
import { useResetPassword } from "../../hooks/customHooks";
import { InvalidFormField } from "../Errors/invalidFormField";

const ResetPassword = () => {

    const { hash } = useParams();

    const [goToLogin, setGoToLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(ResetPasswordSchema)
    })

    const {
        data,
        isError,
        error,
        isSuccess,
        mutate,
        isLoading
    } = useResetPassword()

    useEffect(() => {
        if (isSuccess && data?.data?.message === 'success') {
            // set context values
            setGoToLogin(true);                   
        } if (isError) {
            setErrorMessage('Password reset failed.');
        }
    }, [isError, error, isSuccess, data?.data])

    const handleResetPassword = (data) => {
        // delete data['confirm_password'];
        data['hash_string'] = hash;
        mutate(data)
    };

    return (
        <>
        
        { goToLogin ? 
        
        <div className="d-flex flex-column justify-content-center align-items-center my-5 pt-3">
            <img src={ HappyIcon } alt="success" />
            <p>Your password has been reset successfully!</p>
            <Link to="/login">
                <button className="btn btn-sm btn-primary fw-lighter px-3 py-2">Go To Login Page</button>
            </Link>
        </div>

        :

        <div id="login" className='container'>

            <div className="d-flex flex-column align-items-center">
                <h2 className="mb-5 text-center">Reset Password</h2>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit(handleResetPassword)}>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password
                                <br/><i style={{fontSize: '12px'}}> (Minimum of 8 characters, one uppercase, one number and one special case character)</i>
                            </label>
                            <input 
                                type="password"
                                name="password"
                                placeholder=""
                                className="form-control"
                                id="password"
                                {...register('password')}
                                aria-invalid={!!errors.password ? 'true' : 'false'}
                            />
                            {!!errors.password && <InvalidFormField message={errors.password?.message} />}
                        </div>
                        <div>
                            <label
                                htmlFor="confirm_password"
                                className="form-label"
                            >Confirm Password</label>
                            <input
                                type="password"
                                name="confirm_password"
                                placeholder=""
                                className="form-control"
                                id="confirm_password"
                                {...register('confirm_password')}
                                aria-invalid={!!errors.confirm_password ? 'true' : 'false'}
                            />
                            {!!errors.confirm_password && <InvalidFormField message={errors.confirm_password?.message} />}
                        </div>
                        <div className="mt-3">
                            <button
                                type="submit"
                                className="btn btn-primary fw-lighter btn-lg"
                                disabled={isLoading}
                            >
                                {isLoading && <i className="fa fa-spinner fa-spin"></i>} Reset Password
                            </button>      
                            <p className="text-center text-danger" id="submission-error">
                                {errorMessage}
                            </p>
                        </div>
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
        }
        </>
    );
};

export default ResetPassword;
