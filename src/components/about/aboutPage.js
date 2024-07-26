import { Link } from 'react-router-dom';

import Team from '../about/team';

import Image1 from '../../assets/images/happy_face.svg';
import Image2 from '../../assets/images/achievement.svg';
import Image3 from '../../assets/images/motivation.svg';
import Image4 from '../../assets/images/target.svg';

const AboutPage = () => {
    return (
        <div id="about" className="container-fluid">
            <section className="row">
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-start">
                    <h1>Khronos.</h1>
                    <p>Achieve your projects, with the right support system.</p>
                </div>
                <div className="col-md-6">
                    <img src={Image1} alt="Welcome" />
                </div>
            </section>
            <section className="row">
                <div className="col-md-6">
                    <img src={Image2} alt="Welcome" />
                </div>
                <div className="col-md-6">
                    <h2><i>who we are.</i></h2>
                    <p>We are a community who believe in the power of the people. The power to create a better life for the people, by the people.</p>
                </div>
            </section>
            <section className="row">
                <div className="col-md-6">
                    <h2><i>what we do.</i></h2>
                    <p>Our solution provides a platform that enables people of all types in groups and communities to achieve their goals by contributing openly and spending publicly to achieve a project.</p>
                    <p>This project which is funded by the community is executed by registered companies on Khronos, and progress is monitored periodically by the general public.</p>
                </div>
                <div className="col-md-6">
                    <img src={Image3} alt="Welcome" />
                </div>
            </section>
            <section className="row text-center hwdi">
                <h2 className="mb-5"><i>how we do it.</i></h2>
                <div className="row how-we-do-it">
                    <div className="col-md-4">
                        <div>
                            <h3>Register</h3>
                            <p>Give your project an identity, and location.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div>
                            <h3>Fund project</h3>
                            <p>Receive money from contributors, sponsors, and donors.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div>
                            <h3>Get result</h3>
                            <p>We deliver the completed project to your user.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="row">
                <div className="col-md-6">
                    <img src={Image4} alt="Welcome" />
                </div>
                <div className="col-md-6 mt-5">
                    <h3>You, as a community can take action today to collectively achieve your needs for a better life.</h3>
                    <Link to="/create-account"><button className="btn btn-primary fw-lighter btn-lg mt-5">Register</button></Link>
                </div>
            </section>
            <Team />
        </div>
    );
};

export default AboutPage;
