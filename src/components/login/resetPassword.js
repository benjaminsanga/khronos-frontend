import { useState } from "react";
import axios from 'axios';
import { validateForm } from "../../utils/utilities";
import { Link, useParams } from "react-router-dom";
import HappyIcon from '../../assets/images/happy_face.svg';

const ResetPassword = () => {

    const { hash } = useParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [goToLogin, setGoToLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // handler for password match
    const handlePasswordMatch = () => {
        // get password elements dom
        let pwd = document.getElementById('password');
        let pwd2 = document.getElementById('confirm_password');
        let pwd_match = document.getElementById('password_match');

        // check if input fields are empty
        if (pwd.value === "" && pwd2.value === "") {

            // do not display if empty
            pwd_match.style.display = "none";

            // set field values to empty string
            setPassword("");
            setConfirmPassword("");

            return; // return function to terminate operation
        }

        // passwords do not match, set error message
        if (pwd.value !== pwd2.value) {
            pwd_match.style.color = "red";
            pwd_match.innerHTML = "Passwords don't match";
            pwd_match.style.display = "block";
        } else {
            // passwords match, set success message
            pwd_match.style.color = "green";
            pwd_match.innerHTML = "Passwords match";
            pwd_match.style.display = "block";
        }

        setPassword(pwd.value);
        setConfirmPassword(pwd2.value);
    };

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Password and Confirm Password fields are not equal!");
            return;
        }

        const data = {
            'password': password,
            'confirm_password': confirmPassword
        };

        const isFormValid = validateForm(data);

        // remove confirm password
        delete data['confirm_password'];
        data['hash_string'] = hash;

        if (isFormValid) {
            // submit form submission data
            axios.post(`/cluster/reset-password`, data).then((response) => {

                if (response.data.message === 'success') {
                    // set context values
                    setGoToLogin(true);                   
                } else {
                    setErrorMessage('Password reset failed.');
                }

            }).catch( (error) => {
                setErrorMessage(error.response);
            });
        }
    };

    return (
        <>
        
        { goToLogin ? 
        
        <div className="d-flex flex-column justify-content-center align-items-center mt-5 pt-3">
            <img src={ HappyIcon } alt="success" />
            <p>Your password has been reset successfully!</p>
            <Link to="/login">
                <button className="btn btn-lg btn-primary fw-lighter">Go To Login Page</button>
            </Link>
        </div>

        :

        <div id="login" className='container'>

            <div className="d-flex flex-column align-items-center">
                <h2 className="mb-5 text-center">Reset Password</h2>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" placeholder="********" className="form-control" id="password"
                            value={password}
                            onChange={(e) => handlePasswordMatch(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                            <input type="password" name="confirm_password" placeholder="********" className="form-control" id="confirm_password"
                            value={confirmPassword}
                            onChange={(e) => handlePasswordMatch(e.target.value)} />
                            <br/>
                        </div>
                        <div className="m-1">
                            <span id="password_match" className="text-center" style={{fontSize:"12px"}}></span>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary fw-lighter btn-lg"
                            onClick={(e) => handleResetPassword(e)}>Reset Password</button>                            
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
