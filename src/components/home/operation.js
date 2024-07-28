import { Link } from 'react-router-dom';
import PlayIcon from '../../assets/icons/play-white.svg';
import WorkIcon from '../../assets/icons/work.svg';

const Operation = () => {
    return (
        <div id="operation" className="d-flex flex-row">
            <div className="col-md-6 text-center left">
                <h2>How we operate?</h2>
                <p>We provide a purse for public contributions towards any project, and ensure accountability through openness of the progress of fundraising to the contributors.</p>
                <img src={WorkIcon} alt="Work" />
            </div>
            <div className="col-md-6 right">
                <div className="operation-point">
                    <h5>Register project</h5>
                    <p>The community head or group leader registers an account with us, then creates the project(s) which the members can contribute to.</p>
                </div>
                <div className="operation-point">
                    <h5>Set target for project</h5>
                    <p>The community head or group leader sets their target for the crowdfunding, the account holder will be alerted upon hitting the target.</p>
                </div>
                <div className="operation-point">
                    <h5>Monitor project execution</h5>
                    <p>Members of the community or group, and the public can view the progress made on the fundraising and the people involved.</p>
                </div>
                <Link to="/create-account">
                    <div className="d-flex flex-row justify-content-center align-items-center get-started">
                        <img src={PlayIcon} alt="Get started" />
                            <div>
                                <h6>Get Started</h6>
                                <span>For Free</span>
                            </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Operation;
