import TwitterIcon from "../../assets/icons/twitter.svg";

const Team = () => {
    return (
        <div id="team" className="container">
            <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-1">
                <h2>Our Squad</h2>
                <p>People who make things happen here</p>
            </div>
            <div className="row text-center">
                <div className="col-md-6 team-member active">
                    <div>
                        <h5>Kabeer Muhammad</h5>
                        <h6>Operations</h6>
                        <a href="https://twitter.com/Ibn_Xkanta" target={'_blank'} rel="noreferrer"><img src={TwitterIcon} alt="Team member" /></a>
                    </div>
                </div>
                <div className="col-md-6 team-member active">
                    <div>
                        <h5>Benjamin Sanga</h5>
                        <h6>Engineering</h6>
                        <a href="https://twitter.com/yourfavben" target={'_blank'} rel="noreferrer"><img src={TwitterIcon} alt="Team member" /></a>
                    </div>
                </div>
                {/* <div className="col-md-4 team-member active">
                    <img src={TeamMember1} alt="Team member" />
                    <div>
                        <h5>Ebubechukwu Nnamdi</h5>
                        <h6>Civil Engineer</h6>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Team;
