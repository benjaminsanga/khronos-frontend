import axios from "axios";
import { useState } from "react";
import EmailIcon from '../../assets/icons/email.svg';
import ClusterAccountVerified from "./clusterAccountVerified";
import { validateForm } from '../../utils/utilities';

const ClusterCreated = () => {

    const [verificationCode, setVerificationCode] = useState("");
    const [accountIsVerified, setAccountIsVerified] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleVerify = (e) => {
        e.preventDefault();

        const data = {
            'verification_code': verificationCode
        };

        const isFormValid = validateForm(data);

        if (isFormValid) {
            // header options for api
            var options = {
                method: 'POST',
                url: `/cluster/verify`,
                data: data
            };

            axios.request(options).then((response) => {
                if (response.data.message === 'success') {
                    setAccountIsVerified(true);
                } else {
                    throw Error("Coudln't find cluster");
                }
            }).catch((error) => {
                if (error.response) {
                    setErrorMessage(`Error: ${error.response.data}`);
                } else if (error.request) {
                    setErrorMessage(`Error: ${error.request}`);
                } else {
                    setErrorMessage(`Error: ${error.message}`);
                }
                console.log(error);
            });
        }

        

    }

    return (
        <>
            {accountIsVerified && <ClusterAccountVerified />}

            {!accountIsVerified &&
            <div className="row" style={{maxWidth: '100%'}}>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="d-flex flex-column align-items-center justify-content-center success">
                        <img src={EmailIcon} alt="Email" />
                        <h3>Account created. Almost there!</h3>
                        <span>Enter the code we sent to your email to verify your account.</span>
                        <input type='number' id='verification_code' className='form-control'
                        onChange={ (e) => setVerificationCode(e.target.value) } />
                        <button className="btn btn-lg btn-primary mt-2"
                        onClick={(e) => handleVerify(e)}>Verify</button>
                        <p className="text-center text-danger" id="submission-error">{errorMessage}</p>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
            }
        </>
    );
}

export default ClusterCreated;
