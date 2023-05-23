import SuccessImage from '../assets/images/undraw_winners.svg';
import StreetImage from '../assets/images/undraw_empty_street.svg';
import AuthenticationImage from '../assets/images/undraw_two_factor_authentication.svg';
import LocationImage from '../assets/images/undraw_navigation.svg';
import CheckBox from '../assets/icons/checkbox.svg';
import PlusIcon from '../assets/icons/plus.svg';
// import XIcon from '../assets/icons/x.svg';

const LandingPage = () => {

    // const toggle = (e) => {
    //     if (e.target.nextSibling.style.display === 'none') {
    //         e.target.nextSibling.style.display = 'block';
    //         e.target.children[1].src = XIcon;
    //     } else {        
    //         e.target.nextSibling.style.display = 'none';
    //         e.target.children[1].src = PlusIcon;
    //     }
    // };

    return (
        <>
        <div id='intro' className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
                <div className="container d-flex justify-content-between">                    
                    <h4 className="text-primary ps-3">Ajo<span className="text-secondary">kudi</span></h4>
                </div>
            </nav>
        </div>
        <div className="container first-section">
            <div className="row p-0 m-0">
                <div className="col-md-7 pt-5">
                    <h1>Trust, Accountability, Execution - Accomplish Joint Capital Projects In Time.</h1>
                    <p>Raise capital on our system, payments are visible to all members of your cluster to ensure transparency.</p>
                    <a href='https://forms.gle/PD6QTnX9XakP9rR58' target='_blank' rel='noreferrer'>
                        <button className='btn btn-lg btn-primary fw-lighter'>Send Feedback</button>
                    </a>
                    <p>We are targeting communities and groups in Nigeria, starting with Jos, Plateau state.</p>
                </div>
                <div className="col-md-5">
                    <img src={SuccessImage} alt="Project Success" style={{width: '100%'}} />
                </div>
            </div>
        </div>
        <div className="container second-section p-5 border border-4 border-primary">
            <div className="row p-0 m-0">
                <div className="col-md-6 p-5 mt-5">
                    <img src={StreetImage} alt="Project Success" style={{width: '100%'}} />
                </div>
                <div className="col-md-6 p-5">
                    <h1>Choose Us</h1>
                    <p>
                        Keep funds in one place, get notified, follow up to keep tab of the progress of your cluster's project fund without hassle. While we focus on transparency and giving the best value.
                    </p>
                </div>
            </div>
        </div>
        <div className="container third-section p-5 border border-4 border-secondary">
            <div className="row">
                <div className="col-md-6 p-5">
                    <a href='https://forms.gle/PD6QTnX9XakP9rR58' target='_blank' rel='noreferrer'>
                        <button className='btn btn-lg btn-primary fw-lighter'>Send Feedback</button>
                    </a>
                    <p>
                    Our pilot project targets residents of Jos, which is our current location. We hope to expand to all the states in Nigeria as we grow.
                    </p>
                </div>
                <div className="col-md-6 p-5 bullet-points">
                    <ul style={{listStyleType: 'none'}}>
                        <li>
                            <img src={CheckBox} alt="Bullet point" style={{width: '18px'}} />&nbsp;
                            Trusted system for funds.
                        </li>
                        <li>
                            <img src={CheckBox} alt="Bullet point" style={{width: '18px'}} />&nbsp;
                            Public and private projects.
                        </li>
                        <li>
                            <img src={CheckBox} alt="Bullet point" style={{width: '18px'}} />&nbsp;
                            Open to wider contributors.
                        </li>
                        <li>
                            <img src={CheckBox} alt="Bullet point" style={{width: '18px'}} />&nbsp;
                            Secure finance system.
                        </li>
                        <li>
                            <img src={CheckBox} alt="Bullet point" style={{width: '18px'}} />&nbsp; 
                            Deposit without hassle.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="container p-5 fourth-section">
            <div className="row p-0 m-0">
                <div className="col-md-6 p-5">
                    <h1>Reliable and Trusted Purse</h1>
                    <p>
                        Ajokudi runs on world-class servers, and performs it's customers financial transactions using cutting-edge technologies used by millions of people across the world.
                    </p>
                </div>
                <div className="col-md-6 p-5 mt-5">
                    <img src={AuthenticationImage} alt="Project Success" style={{width: '100%'}} />
                </div>
            </div>
        </div>
        <div className="container p-5 fifth-section">
            <div className="row p-0 m-0">
                <div className="col-md-6 p-5 mt-5">
                    <img src={LocationImage} alt="Project Success" style={{width: '100%'}} />
                </div>
                <div className="col-md-6 p-5">
                    <h1>From Yours Truly</h1>
                    <p>
                        This platform is designed and developed by locals of the Nigerian communities. Who have seen the need to provide a better alternative due to failed fundraising and execution of community projects. To aid people participate in project developments, be it a private or public endeavour.
                    </p>
                </div>
            </div>
        </div>
        <div className='container p-5 sixth-section'>
            <h1 className='text-center pb-5'>Frequently Asked Questions</h1>
            <div>
                <div className='d-flex flex-row justify-content-between'>
                    <h4 className='pt-2'>Why should I use Ajokudi?</h4>
                    <img src={PlusIcon} alt='toggle' style={{width: '24px'}} />
                </div>
                <p>Use Ajokudi to stop the risk of losing your money to people who are not trusted, and have failed too many times to count for a project execution.</p>
            </div>
            <div>
                <div className='d-flex flex-row justify-content-between'>
                    <h4 className='pt-2'>Is Ajokudi an online bank?</h4>
                    <img src={PlusIcon} alt='toggle' style={{width: '24px'}} />
                </div>
                <p>No, we are not an online bank. We provide a platfom that help people create and monitor their project funds, and offer to execute that project on their behave.</p>
            </div>
            <div>
                <div className='d-flex flex-row justify-content-between'>
                    <h4 className='pt-2'>Who can use Ajokudi?</h4>
                    <img src={PlusIcon} alt='toggle' style={{width: '24px'}} />
                </div>
                <p>Leaders of communities or groups are examples of people who can create and manage accounts on our platform. After which they can create projects for members of their group or communities to deposit towards the project.</p>
            </div>
            <div>
                <div className='d-flex flex-row justify-content-between'>
                    <h4 className='pt-2'>Can I withdraw money from Ajokudi?</h4>
                    <img src={PlusIcon} alt='toggle' style={{width: '24px'}} />
                </div>
                <p>No. A single individual cannot withdraw funds from Ajokudi, this can only be done with the consent of the community or group members who have contributed towards the project.</p>
            </div>
            <div>
                <div className='d-flex flex-row justify-content-between'>
                    <h4 className='pt-2'>Where is Ajokudi office located?</h4>
                    <img src={PlusIcon} alt='toggle' style={{width: '24px'}} />
                </div>
                <p>We are currently located in Jos.</p>
            </div>
        </div>
        <div className="container p-5 border border-4 border-primary text-center seventh-section">
            <div className="row p-0 m-0">
                <div className="col-md-12 p-5">
                    <a href='https://forms.gle/PD6QTnX9XakP9rR58' target='_blank' rel='noreferrer'>
                        <button className='btn btn-lg btn-primary fw-lighter'>Send Feedback</button>
                    </a>
                    <p>
                        Send funds, get notified, follow up, to keep tab of the progress of your cluster's project fund without hassle. While we focus on transparency and giving the best value.
                    </p>
                </div>
            </div>
        </div>
        <div className="container-fluid pt-5 pb-2 bg-primary text-center landing-footer" style={{marginTop: '10%'}}>
            <div className="row p-0 m-0">
                <div className="col-md-12 p-5">
                    <p>Stay in the loop</p>
                    <a href='https://twitter.com' target='_blank' rel='noreferrer'>Twitter</a>
                    <a href='https://facebook.com' target='_blank' rel='noreferrer'>Facebook</a>
                    <a href='https://youtube.com' target='_blank' rel='noreferrer'>YouTube</a>
                    <p className='mt-5'>&copy; Ajokudi Inc. {new Date().getFullYear()}</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default LandingPage;
