import { Link } from 'react-router-dom';
import Emergency from '../../assets/icons/happy.svg';

const LoginFirst = () => {
    return (
        <>
            <div className="row" style={{maxWidth: '100%', padding: '5% 0 10px', margin: '10% 0'}}>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="d-flex flex-column align-items-center justify-content-between success">
                        <img src={Emergency} alt="Email" style={{width: '10%', height: 'relative'}} />
                        <h3>Off the grid.</h3>
                        <h5>Please create a account first, then log in</h5>
                        <Link to='/create-account'>
                            <button className="btn btn-lg btn-primary fw-lighter mt-2">Register</button>
                        </Link>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </>
    );
}

export default LoginFirst;
