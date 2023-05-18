import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { validateEmail, validateForm, validatePhone, validateTextField } from "../../utils/utilities";
import ClusterCreated from "./clusterCreated";
import {CreateClusterSchema} from "../../form-schema/createClusterSchema";

const CreateClusterForm = () => {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(CreateClusterSchema)
    })

    // initial states values
    const [states, setStates] = useState({});

    // initial local government areas values
    const [lgas, setLgas] = useState([]);

    // form data hooks
    const [clusterName, setClusterName] = useState("");
    const [clusterAddress, setClusterAddress] = useState("");
    const [clusterLga, setClusterLga] = useState("");
    const [clusterState, setClusterState] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [verifyInformation, setVerifyInformation] = useState(false);

    // success submission hook
    const [accountIsCreated, setAccountIsCreated] = useState(false);

    // error message state
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordIsValid, setPasswordIsValid] = useState(false)
    
    // on load/reload get states and local government areas
    useEffect(() => {
        const getAllStatesAndLgas = async () => {

            // header options for api
            var options = {
                method: 'GET',
                url: `/get-states`,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            await axios.request(options).then((response) => {                
                
                if (typeof response.data === 'object') {
                    // set states values in hook array
                    setStates(response.data);
                }

            }).catch(function (error) {
                console.error(error);
            });
        }

        try {
            // call function within useEffect hook
            getAllStatesAndLgas();
        } catch (error) {
            console.log(`Error: ${error}`);
        }
        
    }, []);

    // form submission handler
    const handleSubmitClusterForm = (e) => {
        e.preventDefault();

        // get form data object
        const data = {
            'cluster_name': clusterName, 
            'cluster_state': clusterState, 
            'cluster_lga': clusterLga, 
            'cluster_address': clusterAddress, 
            'cluster_admin_firstname': firstName, 
            'cluster_admin_lastname': lastName, 
            'cluster_admin_gender': gender,
            'cluster_admin_phone': phone, 
            'cluster_admin_email': email,
            'cluster_password': password,
            'confirm_password': confirmPassword,
            'agree_to_register_cluster': agreeToTerms,
            'verify_cluster_information': verifyInformation,
        };

        // validation
        if (!validateTextField(clusterName)) {
            setErrorMessage('Cluster name is invalid');
            return;
        } else if (!validateTextField(firstName) || !validateTextField(lastName)) {
            setErrorMessage('Name is invalid');
            return;
        } else if (!validateEmail(email)) {
            setErrorMessage('Email is invalid');
            return;
        } else if (!validatePhone(phone)) {
            setErrorMessage('Phone is invalid');
            return;
        }

        // validate password
        if (password.length >= 8 && (password === confirmPassword)) setPasswordIsValid(true)

        // check form validity
        const isFormValid = validateForm(data) && passwordIsValid;

        if (isFormValid) {
            // add fields to form data
            data['verification_code'] = 0;
            data['verified_account'] = false;

            // submit form submission data
            axios.post(`/cluster`, data).then((response) => {
                
                if (response.data.message === 'success') {
                    // set form submission to successful
                    setAccountIsCreated(true);
                }                    

            }).catch( (error) => {

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(`Error: ${error.response.data.errors.email}`);
                    setErrorMessage('Email already exists')
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(`Error: ${error.request}`);
                    setErrorMessage('Server error')
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log(`Error: ${error.message}`);
                    setErrorMessage('Error occured while submitting form')
                }

                if (passwordIsValid) setPasswordMessage('')
                
              });
        } else {
            // set error for invalid form filling
            setErrorMessage('Invalid form value(s)')

            // set password message
            if(!passwordIsValid) {
                setPasswordMessage('* Password is not valid')
            } else {
                setPasswordMessage('')
            }
        }       

    };

    // handler for state selection
    const handleStateSelectionChange = (e) => {
        // get value of state
        const selectedState = e.target.value;

        // set values of selected state
        setClusterState(selectedState);

        // set local governments for selected state
        setLgas(states[selectedState]);
    }

    return (
        states && (
        <div id="create-cluster" className='container'>
            {accountIsCreated && <ClusterCreated />}

            {!accountIsCreated && 
            <div className="d-flex flex-column align-items-center">
                <h2 className="mb-5">Create Cluster Account</h2>
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <h5 className="mb-4">Profile</h5>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="cluster_name" className="form-label">Cluster Name <i style={{fontSize: '12px'}}> (Text only)</i></label>
                            <input type="text" name="cluster_name" placeholder="" className="form-control" id="cluster_name" aria-describedby="clusterNameHelp"
                            value={clusterName}
                            onChange={(e) => setClusterName(e.target.value)} required />
                            <div id="clusterNameHelp" className="form-text">The name of community or group</div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cluster_state" className="form-label">State</label>
                                <select className="form-select" id="cluster_state" name="cluster_state" aria-label="form-select example"
                                    onChange={(e) => handleStateSelectionChange(e)} required>
                                        <option defaultValue value="">Select</option>
                                    {
                                        Object.keys(states).sort()
                                        .map((state, index)  =>  {
                                            return <option value={state} 
                                                            key={index} >{state}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cluster_lga" className="form-label">LGA</label>
                                <select className="form-select" id="cluster_lga" name="cluster_lga" aria-label="form-select example"
                                    onChange={(e) => setClusterLga(e.target.value)} required>  
                                    <option defaultValue value="">Select</option>                    
                                    {
                                        lgas.map((lga, index) => {
                                            return <option value={lga} key={index}>{lga}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cluster_address" className="form-label">Address</label>
                            <input type="text" name="cluster_address" placeholder="" className="form-control" id="cluster_address"
                            value={clusterAddress}
                            onChange={(e) => setClusterAddress(e.target.value)} required />
                        </div>
                        <h5 className="mt-4 mb-3">Cluster Leader</h5>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cluster_admin_firstname" className="form-label">First name</label>
                                <input type="text" name="cluster_admin_firstname" placeholder="" className="form-control" id="cluster_admin_firstname"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cluster_admin_lastname" className="form-label">Last name</label>
                                <input type="text" name="cluster_admin_name" placeholder="" className="form-control" id="cluster_admin_lastname"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cluster_admin_gender" className="form-label">Gender</label>
                                <select className="form-select" id="cluster_admin_gender" aria-label="form-select example"
                                    onChange={(e) => setGender(e.target.value)} required>
                                        <option defaultValue value="">Select</option>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3"></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cluster_admin_phone" className="form-label">Contact Phone <i style={{fontSize: '12px'}}> (+2348000000000)</i></label>
                                <input type="phone" name="cluster_admin_phone" placeholder="" className="form-control" id="cluster_admin_phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cluster_admin_email" className="form-label">Contact Email</label>
                                <input type="email" name="cluster_admin_email" placeholder="" className="form-control" id="cluster_admin_email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cluster_password" className="form-label">Password
                                <i style={{fontSize: '12px'}}> (Minimum of 8 characters)</i></label>
                                <input type="password" name="cluster_password" placeholder="" className="form-control" id="cluster_password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} required autoComplete="" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                                <input type="password" name="confirm_password" placeholder="" className="form-control" id="confirm_password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} required autoComplete="" />
                            </div>                            
                        </div>
                        <span id="password_match" style={{fontSize:"14px", color: 'red'}}>{passwordMessage}</span>
                        <div className="mb-3 form-check">
                            <input type="checkbox" name="" className="form-check-input" id="agree_to_register_cluster"
                            value={agreeToTerms}
                            onChange={() => setAgreeToTerms(!agreeToTerms)} />
                            <label className="form-check-label" htmlFor="agree_to_register_cluster">I agree to the <Link to="/terms-and-conditions">Terms and Conditions</Link> of Ajokudi</label>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" name="" className="form-check-input" id="verify_cluster_information"
                            value={verifyInformation}
                            onChange={() => setVerifyInformation(!verifyInformation)} />
                            <label className="form-check-label" htmlFor="verify_cluster_information">I verify that the information provided are true</label>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary btn-lg"
                            onClick={(e) => handleSubmitClusterForm(e)} >Create Cluster Profile</button>
                            <p className="text-center text-danger" id="submission-error">{errorMessage}</p>
                        </div>
                    </form>
                    <div>
                        <p><Link to="/create-project">Create Project</Link></p>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
            }
        </div>
        )
    );
};

export default CreateClusterForm;
