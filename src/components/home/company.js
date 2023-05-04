import Picture1 from '../../assets/images/target.svg'
import Picture2 from '../../assets/images/motivation.svg'
import Picture3 from '../../assets/images/happy_face.svg'

const Company = () => {
    return (
        <div id="company" className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <p>Our Company</p>
                    <h5>Ajokudi represents integrity, accountability, and speedy execution. We are confident that our unique approach will serve the needs of our customers.</h5>
                </div>
                <div className="col-md-6">
                    <p>We provide an avenue for clusters (communities, sponsors, and groups) to raise funds collectively on our platform and we keep everyone in the circle up to date about the progress.</p>
                    <p>We also sub-contract projects issued by clusters after raising capital to credible companies who register with us for execution.</p>
                </div>
            </div>
            <div className="row text-center justify-content-center procedure">
                <div className="col-md-3 procedure-item">
                    <img src={Picture1} alt="Project target" />
                    <p>set<br/>target</p>
                </div>
                <div className="col-md-3 procedure-item">
                    <img src={Picture2} alt="Raise funds" />
                    <p>accept<br/>funds</p>
                </div>
                <div className="col-md-3 procedure-item">
                    <img src={Picture3} alt="Deliver project" />
                    <p>achieve<br/>project</p>
                </div>
            </div>
        </div>
    )
};

export default Company;
