import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toFirstLetterUpperCase, validateForm } from "../../utils/utilities";
import Loading from "../../utils/loading";

const DepositForm = () => {

    // set project 
    const { code } = useParams();

    const [depositorName, setDepositorName] = useState("");
    const [depositorPhone, setDepositorPhone] = useState("");
    const [depositorEmail, setDepositorEmail] = useState("");
    const [paymentAmount, setPaymentAmount] = useState("");
    const [isPaymentInitialized, setIsPaymentInitialized] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    // consumer_id
    // consumer_mac

    const [projectInfo, setProjectInfo] = useState({});

    useEffect(() => {
        const ac = new AbortController();
        
        const getProjectInfo = async () => {
            // header options for api
            var options = {
                method: 'GET',
                url: `/project/dashboard/${code}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            await axios.request(options).then((response) => {                

                // set states values in hook array
                setProjectInfo(response.data);

            }).catch(function (error) {
                console.error(error);
            });
        };

        getProjectInfo();
        return ac.abort();
    }, [code]);

    const handleSubmitDeposit = (e) => {
        e.preventDefault();

        const formData = {
            'name': depositorName,
            'phone': depositorPhone,
            'email': depositorEmail,
            'amount': paymentAmount,
        };

        const isFormValid = validateForm(formData);
        
        formData['project_Id'] = code;

        if (isFormValid) {
            // header options for api
           var options = {
               method: 'POST',
               url: `/deposit`,
               data: formData
           };

           axios.request(options).then((response) => {

               if (response.data.status === "success") {
                   window.location.href = response.data.data.link;

                   setIsPaymentInitialized(true);
               }
               
           }).catch((error) => {
               if (error.message) {
                   // Something happened in setting up the request that triggered an Error
                   setErrorMessage(`Error: ${error.message}`);
               }
               setErrorMessage(`Error: ${error}`);
           });
       } else {
            setErrorMessage("Some inputs are empty");
       }

    };

    return (
        <>
        {/* <PaymentSuccessful projectCode={projectInfo.project_code} /> */}
        {isPaymentInitialized || Object.keys(projectInfo).length <= 0 ? 
        
        <Loading /> 
        
        :
        <div id="deposit" className='container'>
            <div className="d-flex flex-column align-items-center">
                <h2 className="mb-5">Deposit for &nbsp;
                    <span className="text-secondary">
                        { toFirstLetterUpperCase(projectInfo.project_name)}
                    </span>
                </h2>
                <span className="mb-5">Purpose of project: {projectInfo.project_purpose}</span>
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form>
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name" className="form-label">Name of Depositor</label>
                                <input type="text" name="name" placeholder="" className="form-control" id="name"
                                value={depositorName}
                                onChange={(e) => setDepositorName(e.target.value)} />
                                <input type="hidden" value="xxx-xxxx-xxx" id="project_id" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="phone" name="phone" placeholder="" className="form-control" id="phone"
                                value={depositorPhone}
                                onChange={(e) => setDepositorPhone(e.target.value)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" name="email" placeholder="" className="form-control" id="email"
                                value={depositorEmail}
                                onChange={(e) => setDepositorEmail(e.target.value)} />
                            </div>
                            <div className="col-md-6 mb-3">                                
                                <label htmlFor="amount" className="form-label">Amount</label>
                                <input type="number" name="amount" placeholder="" className="form-control" id="amount"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)} />
                            </div>
                        </div>       
                        <div>
                            <em className="text-warning">
                                Please note:<br/>
                                * This transaction is non-refundable.<br/>
                                * Your data will be stored for reference.<br/>
                            </em>
                            <br/>
                            <button type="submit" className="btn btn-primary btn-lg"
                            onClick={(e) => handleSubmitDeposit(e)}>Continue</button>
                        </div>
                        <p className="text-center text-danger" id="payment-error">{errorMessage}</p>
                    </form>
                    <div>
                        <p><Link to="/create-cluster">Create Cluster</Link></p>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
        }
        </>
    );
};

export default DepositForm;
