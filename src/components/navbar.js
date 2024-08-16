import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../context/authSlice";

const Navbar = () => {
    // get current location
    let location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const account = useSelector((state) => state.auth.account)
    const dispatch = useDispatch();

    // set path of location
    const [ path ] = useState(location.pathname);

    // remove border bottom if on index page
    const styles = {
        navbar: { 
            borderBottom: "none",
            boxShadow: "none",
        },
        navbar_container: {padding: '0 115px'}
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar-custom" style={path === "/" ? styles.navbar : {}} >
            <div className="container-fluid d-flex justify-content-between" style={styles.navbar_container}>
                
                <Link className="navbar-brand" to="/">
                    Khronos<strong className="text-secondary">.</strong> 
                </Link>

                <div className="nav">
                { isAuthenticated ?
                    <div className="nav-item">
                        <Link to={`/account/dashboard/${account?.account?._id}`} className="nav-link">
                            Dashboard
                        </Link>
                    </div> : 
                    <>
                        <div className="nav-item">
                            <Link to="/about" className="nav-link">
                                About
                            </Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/create-account" className="nav-link">
                                Register
                            </Link>
                        </div>
                    </>
                    }                    
                    <div className="nav-item">
                        <Link to="/join" className="nav-link">
                            Deposit
                        </Link>
                    </div>
                    <div className="nav-item">
                        { isAuthenticated ?
                            <Link to="/" className="nav-link" onClick={(e) => {
                                e.preventDefault();

                                dispatch(logout())

                                navigate(`/`, { replace: true });
                            }}>
                                Logout
                            </Link> :
                            <Link to="/login" className="nav-link">
                                Log In
                            </Link>
                        }
                    </div>
                </div>
                
            </div>
        </nav>
    );
};

export default Navbar;
