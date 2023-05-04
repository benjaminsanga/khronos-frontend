import { Link, useNavigate } from "react-router-dom";
// import HappyFaceIcon from "../assets/images/happy_face.svg";
import TwitterIcon from "../assets/icons/twitter.svg";
import FacebookIcon from "../assets/icons/facebook.svg";
import InstagramIcon from "../assets/icons/instagram.svg";
import { useContext } from "react";
import AuthContext from '../utils/clusterContext';

const Footer = () => {

    const clusterContext = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div id="footer" className="container-fluid">
            <div className="row justify-content-between align-items-center" id="footer-top">
                <div className="col-md-3">
                    <Link to="/#" className="brand-text">
                        {/* <img src={HappyFaceIcon} alt="Ajokudi Logo" /> */}
                        Ajokudi
                    </Link>
                </div>
                <div className="col-md-9 pt-3">
                    <div className="row">
                        <div className="col-md-7 text-end">
                            <ul>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/clusters">Clusters</Link></li>
                                <li><Link to="/projects">Projects</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                <li><Link to="/faq">FAQ</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-5 text-end icons">
                            <ul>
                                <li><a href="https://www.twitter.com/ajokudi" target="_blank" rel="noreferrer"><img src={TwitterIcon} alt="Twitter" className="icon" /></a></li>
                                <li><a href="https://www.facebook.com/ajokudi" target="_blank" rel="noreferrer"><img src={FacebookIcon} alt="Facebook" className="icon" /></a></li>
                                <li><a href="https://www.instagram.com/ajokudi" target="_blank" rel="noreferrer"><img src={InstagramIcon} alt="Instagram" className="icon" /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-between align-items-center" id="footer-bottom">
                <div className="col-md-6">
                    <ul>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/terms-and-conditions">Terms &amp; Conditions</Link></li>
                        <li>
                            { clusterContext.token ? <a href="/" onClick={(e) => {
                                e.preventDefault();

                                clusterContext.logout();

                                navigate(`/`, { replace: true });
                            }}>Logout</a> :
                            <Link to='/login'>Login</Link>
                            }
                        </li>
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
