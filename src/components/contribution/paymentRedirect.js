import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HappyFaceIcon from "../../assets/images/happy_face.svg";
import Loading from '../../utils/loading';

const useQuery = () => {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search), [search]);
}

const PaymentRedirect = () => {

    const query = useQuery();

    const status = query.get("status"), tx_ref = query.get("tx_ref"), transaction_id = query.get("transaction_id");

    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    
    useEffect(() => {
        // const ac = new AbortController();
        
        const getPaymentInfo = async () => {
            // header options for api
            let options = {
                method: 'GET',
                url: `/flutterwave/confirm/?tx_ref=${tx_ref}&tx_id=${transaction_id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            };
            
            await axios.request(options).then((response) => {                

                // set payment status to true on success
                if (response.data.message === 'success') {
                    setPaymentSuccessful(true);
                } else {
                    setPaymentSuccessful(false);
                }
                
            }).catch(function (error) {
                console.error(error);
            });
        };
        
        if (status === 'successful') {
            // if payment was successful
            getPaymentInfo();
        }
        
        // return ac.abort();
    }, [ status, transaction_id, tx_ref ]);

    return (
        <>  
            {status === 'cancelled' ? 

            <p className="text-center text-primary">Transaction was cancelled.</p>
            
            :
            
            paymentSuccessful ? 

            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="d-flex flex-column align-items-center justify-content-center success">
                        <img src={HappyFaceIcon} alt="Successful" />
                        <h3>Payment Successful!</h3>
                        <span>Your payment has been recorded and an email has been sent to you.</span>
                        <Link to="/">
                            <button className="btn btn-lg btn-primary mt-2" >Go To Home Page</button>
                        </Link>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
            
            :

            <>
                <Loading />
                <p className="text-center text-primary">A payment was initialized, we are trying to confirming it.</p>
            </>
            }
        </>
    );
}

export default PaymentRedirect;
