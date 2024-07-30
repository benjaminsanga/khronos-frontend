import { Link } from 'react-router-dom';

import Team from '../about/team';

import Image1 from '../../assets/images/happy_face.svg';
// import Image2 from '../../assets/images/achievement.svg';
// import Image3 from '../../assets/images/motivation.svg';
import Image4 from '../../assets/images/target.svg';

const AboutPage = () => {
    return (
        <div id="about" className="container-fluid">
            <section className="row">
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-start">
                    <h1>Khronos.</h1>
                    <p>...more than a digital wallet; it's a catalyst for change.</p>
                </div>
                <div className="col-md-6">
                    <img src={Image1} alt="Welcome" />
                </div>
            </section>
            <section className="row">
                <div className="col-md-12">
                    <h2><i>the problem.</i></h2>
                    {/* <p><strong>Khronos: Bridge the Gap</strong></p> */}
                    <p>Imagine a world where financial hurdles are history. Where communities aren’t held back by outdated systems. Khronos is the architect of this future. We’re building bridges over the chasm of financial and infrastructural challenges. By creating a seamless, secure digital ecosystem, we're empowering communities to unlock their full potential. Let Khronos be the cornerstone of your progress. 
                    </p>
                </div>
                {/* <div className="col-md-6">
                    <img src={Image2} alt="Welcome" />
                </div> */}
            </section>
            <section className="row">
                {/* <div className="col-md-6">
                    <img src={Image2} alt="Welcome" />
                </div> */}
                <div className="col-md-12 text-left">
                    <h2><i>the solution.</i></h2>
                    <p>Designed with communities in mind, Khronos empowers individuals and organizations to thrive. By streamlining financial transactions and providing essential tools, we're building a future where projects are realized, and communities flourish. Trust, transparency, and security are at the core of everything we do. 
                    </p>
                    <p>Whether you're a local government looking to optimize resources or a non-profit striving to make a difference, Khronos is your partner in progress. Join us in shaping a brighter future. 
                    </p>
                </div>
            </section>
            <section className="row text-center hwdi">
                <h2 className="mb-5"><i> 3 Taps to Transform Your World.</i></h2>
                <div className="row how-we-do-it">
                    <div className="col-md-4">
                        <div>
                            <h5>Step 1: <br/>Create Your Cosmos</h5>
                            <p>Begin your Khronos journey by crafting a digital wallet tailored to your community's needs. It's your financial universe, personalized.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div>
                            <h5><strong>Step 2: <br/>Connect the Dots</strong></h5>
                            <p>Link your wallet to your community's projects. Watch as contributions flow seamlessly, creating ripples of positive change.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div>
                            <h5><strong>Step 3: <br/>Watch Your World Grow</strong></h5>
                            <p>Witness the magic unfold as your community thrives. Khronos is more than a wallet; it's a launchpad for endless possibilities.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="row" style={{margin: '7.5rem 0'}}>
                <div className="col-md-6 mt-5">
                    <img src={Image4} alt="Welcome" />
                </div>
                <div className="col-md-6 mt-5">
                    <h3>Ready to reshape your world?</h3>
                    <p>Follow these simple steps, and unlock the power of your community.</p>
                    <Link to="/create-account"><button className="btn btn-primary fw-lighter btn-lg mt-5">Create Your Cosmos</button></Link>
                </div>
            </section>
            <Team />
        </div>
    );
};

export default AboutPage;
