import {useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../../context/clusterContext';
import ForgotPassword from "./forgotPassword";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginSchema} from "../../form-schema/loginSchema";
import {useLogin} from "../../hooks/customHooks";
import {InvalidFormField} from "../Errors/invalidFormField";

const LoginForm = () => {

    const {
        register,
        formState: {errors},
        handleSubmit,
        setError,
        clearErrors
    } = useForm({
        resolver: yupResolver(LoginSchema)
    })

    const {
        mutate,
        isSuccess,
        isError,
        isLoading,
        error: clusterError,
        data: clusterData
    } = useLogin()

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {

        if (isSuccess) {
            clearErrors()
            // set context values
            login(clusterData?.data?.token, clusterData?.data?.userInfo, clusterData?.data?.expiration, clusterData?.data?.accountType);
            // expiration = clusterData?.data?.expiration;
            // accountType = clusterData?.data?.accountType
            console.log(clusterData, 'clusterData')
        }

        if (isError) {
            if (clusterError?.response?.data?.message?.includes('email')) {
                setError('email', clusterError?.response?.data, {shouldFocus: true})
            } else {
                setError('password', clusterError?.response?.data, {shouldFocus: true})
            }
        }
    }, [clusterData])

    // const [loginSuccess, setLoginSuccess] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);

    const handleLogin = (data) => {
        mutate(data)
    }

    return (
        <>
            { forgotPassword && <ForgotPassword />}
            {(isSuccess && clusterData) && navigate(`/cluster/dashboard/${clusterData?.data?.userInfo?._id}`, {replace: true})}

            <div id="login" className='container'>

                <div className="d-flex flex-column align-items-center">
                    <h2 className="mb-5 text-center">Login</h2>
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="user@email.com"
                                    className="form-control"
                                    id="email"
                                    {...register('email')}
                                    aria-invalid={!!errors.email ? 'true' : 'false'}
                                    disabled={isLoading}
                                />
                                {!!errors.email && <InvalidFormField message={errors.email?.message} />}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="********"
                                    className="form-control"
                                    id="password"
                                    {...register('password')}
                                    aria-invalid={!!errors.password ? 'true' : 'false'}
                                    disabled={isLoading}
                                />
                                {!!errors.password && <InvalidFormField message={errors.password?.message} />}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-primary fw-lighter btn-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading && <i className="fa fa-spinner fa-spin"></i>} Log In
                                </button>
                                {isError && <p className="text-center text-danger">
                                    {clusterError?.response?.data?.message}
                                </p>}
                            </div>
                        </form>
                        <div className="d-flex flex-column justify-content-between align-items-center">
                            <p><Link to="/" onClick={(e) => {
                                e.preventDefault();
                                setForgotPassword(true);
                             }}>Forgot Password?</Link></p>
                            <p><Link to="/create-cluster">Create Cluster</Link></p>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
