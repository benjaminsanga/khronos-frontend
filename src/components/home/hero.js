import { Link } from "react-router-dom";
import Slider1 from "../../assets/images/achievement.svg";
import Slider2 from "../../assets/images/construction.svg";
import Slider3 from "../../assets/images/team_success.svg";

const Hero = () => {
    return (
        <div id="hero" className="container-fluid bg-image">
            <div className="row">
                <div className="col-md-5 welcome-text">
                    <p>Be part of something beyond yourself</p>
                    <h1>Fund projects collectively. Execute with ease.</h1>
                    <div className="action-btns">
                        <Link to="/create-cluster"><button className="get-started">Get Started</button></Link>
                        <Link to="/join"><button className="get-quote">Deposit</button></Link>
                    </div>
                </div>
                <div className="col-md-7">
                    <div id="carousel-slider" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={Slider1} className="d-block w-100" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src={Slider2} className="d-block w-100" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src={Slider3} className="d-block w-100" alt="..."/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
