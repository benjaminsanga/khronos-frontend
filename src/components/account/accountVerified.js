import { Link } from "react-router-dom";
import CheckIcon from '../../assets/icons/circle-check.svg';

const AccountVerified = () => {
    return (
        <div className="row my-5">
            <div className="col-md-3"></div>
            <div className="col-md-6 my-5">
                <div className="d-flex flex-column align-items-center justify-content-center success">
                    <img src={CheckIcon} alt="Success face" />
                    <p className="text-center">Your account has been <b>Created</b> and <b>Verified</b> Successfully!</p>
                    <Link to='/login'>
                        <button className="btn btn-lg btn-primary fw-lighter mt-2">Go to Login</button>
                    </Link>
                </div>
            </div>
            <div className="col-md-3"></div>
        </div>
    );
};

export default AccountVerified;
