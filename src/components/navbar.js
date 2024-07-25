import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../context/authSlice";

const Navbar = () => {
    // get current location
    let location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    // const user = useSelector((state) => state.auth.user);
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
            <div className="container d-flex justify-content-between">
                
                <Link className="navbar-brand" to="/">
                    {/* <img src={Logo} alt="Company Logo" width="36" height="36" className="d-inline-block align-text-center"/> */}
                    Khronos 💵 
                </Link>

                <div className="nav">
                    <div className="nav-item">
                        <Link to="/about" className="nav-link">
                            About
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/create-cluster" className="nav-link">
                            Create Cluster
                        </Link>
                    </div>
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
