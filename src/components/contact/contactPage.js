import FacebookIcon from '../../assets/icons/facebook.svg';
import TwitterIcon from '../../assets/icons/twitter.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';

const ContactPage = () => {
    return (
        <div id="contact" className="container">
            <section className="row">
                <div className="col-md-6">
                    <h1>React Out</h1>
                    <p>Stay in touch with us.</p>
                </div>
            </section>
            <section className="row">
                <div className="col-md-6">
                    <div className="row">    
                        <p>Email</p>
                        <h4>📧  khronos@gmail.com</h4>
                    </div>
                    <div className="row">
                        <p>Phone</p>
                        <h4>📱 +234(0)7062220012</h4>
                    </div>
                    <div className="row icons">
                        <p>Socials</p>
                        <ul>
                            <li><a href="https://www.twitter.com/khronos" target="_blank" rel="noreferrer"><img src={TwitterIcon} alt="Twitter" className="icon" /></a></li>
                            <li><a href="https://www.facebook.com/khronos" target="_blank" rel="noreferrer"><img src={FacebookIcon} alt="Facebook" className="icon" /></a></li>
                            <li><a href="https://www.facebook.com/khronos" target="_blank" rel="noreferrer"><img src={InstagramIcon} alt="Instagram" className="icon" /></a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-6">
                    <p>Address</p>
                    <h4>🌐 Remote</h4>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
