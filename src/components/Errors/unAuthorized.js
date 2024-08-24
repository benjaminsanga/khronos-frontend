import { Link } from 'react-router-dom';
import Emergency from '../../assets/icons/happy.svg';

const LoginFirst = () => {
    return (
        <>
            <div className="row my-5 p-3 w-100" style={{height: '70vh'}}>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="d-flex flex-column align-items-center justify-content-between success">
                        <img src={Emergency} alt="Email" style={{width: '125px', height: 'relative'}} />
                        <h3 className='mb-5'>Off The Grid</h3>
                        <h5 className='text-center mb-5'>Register to use this feature.</h5>
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
