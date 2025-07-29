import LinkedInIcon from "../../assets/icons/linkedin.svg";

const Team = () => {
  return (
    <div id="team" className="container">
      <div className="d-flex flex-column justify-content-center align-items-center mb-5">
        <h2>People</h2>
        {/* <p>People who make things happen here</p> */}
      </div>
      <div className="d-flex flex-row justify-content-center mb-5 pb-5">
        <div className="col-md-6 team-member active">
          <div>
            <h3>Benjamin Sanga</h3>
            <p>Engineering</p>
            <a
              href="https://linkedin.com/in/benjamin-sanga"
              target={"_blank"}
              rel="noreferrer"
            >
              <img src={LinkedInIcon} alt="Team member" />
              <span className="ms-1"><i></i></span>
            </a>
          </div>
        </div>
        {/* <div className="col-md-6 team-member active">
          <div>
            <h3>Kabeer Muhammad</h3>
            <p>Operations</p>
            <a
              href="https://twitter.com/Ibn_Xkanta"
              target={"_blank"}
              rel="noreferrer"
            >
              <img src={TwitterIcon} alt="Team member" />
              <span className="ms-1"><i>@Ibn_Xkanta</i></span>
            </a>
          </div>
        </div> */}
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
