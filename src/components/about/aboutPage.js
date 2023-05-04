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
                <div className="col-md-6">
                    <h1>Welcome to Ajokudi.</h1>
                    <p>The place to fulfil your projects, using the right system.</p>
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
                    <h2>Who we are.</h2>
                    <p>We are a community who believe in the power of the people. The power to create a better life for the people, by the people.</p>
                </div>
            </section>
            <section className="row">
                <div className="col-md-6">
                    <h2>What we do.</h2>
                    <p>Our solution provides a platform that enables people of all types in groups and communities to achieve their goals by contributing openly and spending publicly to achieve a project.</p>
                    <p>This project which is funded by the community is executed by registered companies on Ajokudi, and progress is monitored periodically by the general public.</p>
                </div>
                <div className="col-md-6">
                    <img src={Image3} alt="Welcome" />
                </div>
            </section>
            <section className="row text-center hwdi">
                <h2 className="mb-5">How we do it.</h2>
                <div className="row how-we-do-it">
                    <div className="col-md-4">
                        <div>
                            <h3>Create cluster</h3>
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
                            <p>We deliver the completed project to your cluster.</p>
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
                    <Link to="/create-cluster"><button className="btn btn-primary btn-lg mt-5">Create Cluster</button></Link>
                </div>
            </section>
            <Team />
        </div>
    );
};

export default AboutPage;
