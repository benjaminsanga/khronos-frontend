import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from '../utils/clusterContext';

const Navbar = () => {
    // get current location
    let location = useLocation();
    const clusterContext = useContext(AuthContext);
    const navigate = useNavigate();

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
                    Ajokudi 💵 
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
                        { clusterContext.token ? 
                            <Link to="/" className="nav-link" onClick={(e) => {
                                e.preventDefault();

                                clusterContext.logout();

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
