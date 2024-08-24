import { Link } from 'react-router-dom';
import Emergency from '../../assets/icons/happy.svg';

const NotFound = () => {
    return (
        <>
            <div className="row" style={{height: '70vh', padding: '10px'}}>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="d-flex flex-column align-items-center justify-content-between success">
                        <img src={Emergency} alt="Email" style={{width: '75px', height: 'relative'}} />
                        <span style={{fontSize: '6rem'}}>404</span>
                        <h5>Page not found</h5>
                        <Link to='/'>
                            <button className="btn btn-lg btn-primary fw-lighter mt-2">Back to Home</button>
                        </Link>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </>
    );
}

export default NotFound;
