import { Link } from 'react-router-dom';
// import PlayIcon from '../../assets/icons/play-white.svg';
import WorkIcon from '../../assets/icons/work.svg';

const styles = {
    light_text: {
        fontWeight: 'lighter',
    }
}

const Operation = () => {
    return (
        <div id="operation" className="d-flex flex-row">
            <div className="col-md-6 text-center left">
                <h2>Ready to reshape your world?</h2>
                <p style={styles.light_text}>
                    Follow these 3 simple steps to <i><strong className='text-secondary'>Transform Your World</strong></i>, and unlock the power of your community.
                </p>
                <img src={WorkIcon} alt="Work" />
            </div>
            <div className="col-md-6 right">
                <div className="operation-point">
                    <h5>Create Your Wallet</h5>
                    <p>Begin your Khronos journey by crafting a digital wallet tailored to your community's needs. It's your financial universe, personalized.</p>
                </div>
                <div className="operation-point">
                    <h5>Connect the Dots</h5>
                    <p>Link your wallet to your community's projects. Watch as contributions flow seamlessly, creating ripples of positive change.</p>
                </div>
                <div className="operation-point">
                    <h5>Watch Your World Grow</h5>
                    <p>Witness the magic unfold as your community thrives. Khronos is more than a wallet; it's a launchpad for endless possibilities.</p>
                </div>
                <Link to="/create-account">
                    <div className="d-flex flex-row justify-content-center align-items-center get-started">
                        {/* <img src={PlayIcon} alt="Get started" /> */}
                        <div>
                            <h6>GET STARTED</h6>
                            {/* <span>For Free</span> */}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Operation;
