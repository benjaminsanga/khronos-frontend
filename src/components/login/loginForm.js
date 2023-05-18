import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { validateEmail, validateForm } from "../../utils/utilities";
import AuthContext from '../../utils/clusterContext';
import ForgotPassword from "./forgotPassword";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginSchema} from "../../form-schema/loginSchema";
import {useLogin} from "../../hooks/userClusterHooks";
import {InvalidFormField} from "../Errors/invalidFormField";

const LoginForm = () => {

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        resolver: yupResolver(LoginSchema)
    })

    const {
        mutate,
        isSuccess,
        isError
    } = useLogin()
    
    const clusterContext = useContext(AuthContext);
    const navigate = useNavigate();

    const [loginSuccess, setLoginSuccess] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        // if (isFormValid) {
            // submit form submission data
            axios.post(`/cluster/login`, {data: ''}).then((response) => {

                if (response.data.message === 'Successfully Logged In!') {

                    // set context values
                    clusterContext.login(response.data.token, 
                        response.data.userInfo, 
                        response.data.tokenExpiration, 
                        response.data.accountType);
                    clusterContext.expiration = response.data.expiration;
                    clusterContext.accountType = response.data.accountType
                    
                    setErrorMessage('Logging in...');

                    setLoginSuccess(true);
                    

                } else {
                    throw new Error('Server error');
                }

            }).catch( (error) => {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  if (error.response.data.errors.email) setErrorMessage(error.response.data.errors.email)
                  if (error.response.data.errors.password) setErrorMessage(error.response.data.errors.password);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  setErrorMessage(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  setErrorMessage(error.message);
                }
                console.log(error);
                
              });
        }
    // };

    const handleLogin = (data) => {
        console.log(data)
        mutate(data)
    }

    return (
        <>
        
        { forgotPassword ? <ForgotPassword /> :
        loginSuccess ? navigate(`/cluster/dashboard/${clusterContext.userInfo._id}`, {
            replace: true
        }) : 

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
                            />
                            {!!errors.password && <InvalidFormField message={errors.password?.message} />}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                            >Log In</button>
                            <p className="text-center text-danger" id="submission-error">{errorMessage}</p>
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
        }
        </>
    );
};

export default LoginForm;
