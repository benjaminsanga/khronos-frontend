import { Link } from 'react-router-dom';
import ArrowsDown from '../../assets/icons/arrows-down.svg';
import CaretDown from '../../assets/icons/caret-down.svg';
import CaretUpGreen from '../../assets/icons/caret-up-green.svg';
import CaretUpPurple from '../../assets/icons/caret-up-purple.svg';
// import Customer1 from '../../assets/images/Ann.png';
// import Customer2 from '../../assets/images/Tom.png';

const Feedback = () => {
    return (
        <div id="feedback" className="container">
            <div className="row down-arrows">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src={ArrowsDown} alt="Arrows down" />
                    <img src={CaretDown} alt="Caret down" className="last" />
                </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-1">
                {/* <h3>What people say about us</h3> */}
                <h3>Join us today!</h3>
                <p>Start the process of a new creation</p>
                <Link to="/create-cluster"><button>Get Started - For Free!</button></Link>
            </div>
            {/* <div className="row text-center">
                <div className="col-md-4 customer">
                    <img src={Customer1} alt="Customer" />
                    <div>
                        <h5>Lalong</h5>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                    </div>
                </div>
                <div className="col-md-4 customer active">
                    <img src={Customer2} alt="Customer" />
                    <div>
                        <h5>Fashola</h5>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                    </div>
                </div>
                <div className="col-md-4 customer">
                    <img src={Customer1} alt="Customer" />
                    <div>
                        <h5>Ebube</h5>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                    </div>
                </div>
            </div> */}
            <div className="d-flex flex-row justify-content-center align-items-center carets">
                <img src={CaretUpGreen} alt="Up caret" />
                <img src={CaretUpPurple} alt="Up caret" />
                <img src={CaretUpGreen} alt="Up caret" />
            </div>
        </div>
    );
};

export default Feedback;
