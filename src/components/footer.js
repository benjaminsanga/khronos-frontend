import { Link, useNavigate } from "react-router-dom";
import TwitterIcon from "../assets/icons/twitter.svg";
import FacebookIcon from "../assets/icons/facebook.svg";
import InstagramIcon from "../assets/icons/instagram.svg";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../context/authSlice";

const Footer = () => {

    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const dispatch = useDispatch();

    return (
        <div id="footer" className="container-fluid">
            <div className="row justify-content-between align-items-center" id="footer-top">
                <div className="col-md-12">
                    <a href="https://www.twitter.com/khronos" target="_blank" rel="noreferrer"><img src={TwitterIcon} alt="Twitter" className="icon" /></a>
                    <a href="https://www.facebook.com/khronos" target="_blank" rel="noreferrer"><img src={FacebookIcon} alt="Facebook" className="icon" /></a>
                    <a href="https://www.instagram.com/khronos" target="_blank" rel="noreferrer"><img src={InstagramIcon} alt="Instagram" className="icon" /></a>
                    <span><i>@thisiskhronos</i></span>
                </div>
                {/* <div className="col-md-9 pt-3">
                    <div className="row">
                        <div className="col-md-7 text-end">
                            <ul>
                                
                            </ul>
                        </div>
                        <div className="col-md-12 text-end icons">
                            <ul>
                                <li><a href="https://www.twitter.com/khronos" target="_blank" rel="noreferrer"><img src={TwitterIcon} alt="Twitter" className="icon" /></a></li>
                                <li><a href="https://www.facebook.com/khronos" target="_blank" rel="noreferrer"><img src={FacebookIcon} alt="Facebook" className="icon" /></a></li>
                                <li><a href="https://www.instagram.com/khronos" target="_blank" rel="noreferrer"><img src={InstagramIcon} alt="Instagram" className="icon" /></a></li>
                            </ul>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="row justify-content-between align-items-center" id="footer-bottom">
                <div className="col-md-6">
                    <ul>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/terms-and-conditions">Terms &amp; Conditions</Link></li>
                        <li>
                            { isAuthenticated ? <a href="/" onClick={(e) => {
                                e.preventDefault();

                                dispatch(logout())

                                navigate(`/`, { replace: true });
                            }}>Logout</a> :
                            <Link to='/login'>Login</Link>
                            }
                        </li>
                        <li><Link to="/about">About</Link></li>
                        {/* <li><Link to="/users">Users</Link></li> */}
                        {/* <li><Link to="/projects">Projects</Link></li> */}
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                    </ul>
                </div>
                <div className="col-md-6 pt-3 text-end">
                    <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
