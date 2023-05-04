import { useState } from "react";
import axios from 'axios';
import { validateForm } from "../../utils/utilities";
import { Link } from "react-router-dom";
import LoginForm from "./loginForm";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [goToLogin, setGoToLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleForgotPassword = (e) => {
        e.preventDefault();

        const data = {
            'email': email
        };

        const isFormValid = validateForm(data);

        if (isFormValid) {
            // submit form submission data
            axios.post(`/cluster/forgot-password`, data).then((response) => {

                if (response.data.message === 'success') {
                    // set context values
                    setEmailSent(true);                   
                } else {
                    throw new Error('No account exists with this email');
                }

            }).catch( (error) => {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  setErrorMessage(error.response.data);
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
    };

    return (
        <>
        
        { goToLogin ? <LoginForm /> :
        emailSent ? <p className="text-center text-primary" style={{margin: '15% 0'}}>Check your email inbox for a password reset link</p> : 

        <div id="login" className='container'>

            <div className="d-flex flex-column align-items-center">
                <h2 className="mb-5 text-center">Reset Password</h2>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" name="email" placeholder="user@email.com" className="form-control" id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                            <br/>
                            <p className="text-primary" style={{fontSize: '0.8rem'}}>We will send a link to this email address to reset the account password.</p>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary btn-lg"
                            onClick={(e) => handleForgotPassword(e)}>Proceed</button>                            
                            <p className="text-center text-danger" id="submission-error">{errorMessage}</p>
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
