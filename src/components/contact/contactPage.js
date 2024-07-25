import FacebookIcon from '../../assets/icons/facebook.svg';
import TwitterIcon from '../../assets/icons/twitter.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';

const ContactPage = () => {
    return (
        <div id="contact" className="container">
            <section className="row">
                <div className="col-md-6">
                    <h1>Make Contact</h1>
                    <p>Stay in touch with us.</p>
                </div>
            </section>
            <section className="row">
                <div className="col-md-6">
                    <div className="row">    
                        <p>Email</p>
                        <h3>khronostechnologies@gmail.com</h3>
                    </div>
                    <div className="row">
                        <p>Phone</p>
                        <h3>+234 708 668 2008</h3>
                    </div>
                    <div className="row icons">
                        <p>Social</p>
                        <ul>
                            <li><a href="https://www.twitter.com/khronos" target="_blank" rel="noreferrer"><img src={TwitterIcon} alt="Twitter" className="icon" /></a></li>
                            <li><a href="https://www.facebook.com/khronos" target="_blank" rel="noreferrer"><img src={FacebookIcon} alt="Facebook" className="icon" /></a></li>
                            <li><a href="https://www.facebook.com/khronos" target="_blank" rel="noreferrer"><img src={InstagramIcon} alt="Instagram" className="icon" /></a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-6">
                    <p>Address</p>
                    <h3>Jos - Nigeria.</h3>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
