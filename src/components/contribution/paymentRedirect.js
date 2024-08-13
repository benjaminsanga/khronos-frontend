import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import HappyFaceIcon from "../../assets/images/happy_face.svg";
import Loading from '../../utils/loading';
import {useGetFlutterwavePaymentInfo} from "../../hooks/customHooks";

const useQuery = () => {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search), [search]);
}

const PaymentRedirect = () => {

    const query = useQuery();
    const status = query.get("status")
    const tx_ref = query.get("tx_ref")
    const transaction_id = query.get("transaction_id");

    const {
        isSuccess,
        data,
        // isError,
        // error,
        isLoading
    } = useGetFlutterwavePaymentInfo(tx_ref, transaction_id)

    return (
        <>
            {status === 'cancelled' && <p className="text-center text-primary">Transaction was cancelled.</p>}
            {isLoading && <>
                <Loading />
                <p className="text-center text-primary">Just a moment.</p>
            </>}
            {isSuccess && data?.data?.message === 'success' && <div className="row w-100">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="d-flex flex-column align-items-center justify-content-center text-center success">
                        <img src={HappyFaceIcon} alt="Successful" />
                        <h3>Payment Successful!</h3>
                        <span className="fw-lighter">Your payment has been recorded and an email has been sent to you.</span>
                        <Link to="/">
                            <button className="btn btn-lg btn-primary fw-lighter mt-4" >Go To Home Page</button>
                        </Link>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>}
        </>
    );
}

export default PaymentRedirect;
