import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../context/authSlice";
import DefaultPic from "../assets/images/default-user-pic.png"

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
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar-custom" style={path === "/" ? styles.navbar : {}} >
            <div className="container-fluid d-flex justify-content-between">
                
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
                        <Link to="/deposit" className="nav-link">
                            Deposit
                        </Link>
                    </div>
                    <div className="nav-item dropdown">
                        {isAuthenticated ? (
                            <>
                                <a
                                    href="/#"
                                    className="nav-link dropdown-toggle"
                                    id="userDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img src={DefaultPic} alt="User" style={{width: '28px'}} />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                    <li>
                                    <a
                                        href="/#"
                                        className="dropdown-item"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(logout());
                                            navigate(`/`, { replace: true });
                                        }}
                                    >
                                        Logout
                                    </a>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <Link to="/login" className="nav-link">
                            Log In
                            </Link>
                        )}
                    </div>

                </div>
                
            </div>
        </nav>
    );
};

export default Navbar;
