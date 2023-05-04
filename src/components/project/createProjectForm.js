import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Redirect } from "react-router";
import { generateProjectCode, validateForm } from "../../utils/utilities";
// import ProjectDashboardPage from "../dashboard/project-dashboard";
import AuthContext from '../../utils/clusterContext';

const CreateProjectForm = () => {

    const navigate = useNavigate();

    const [isSuccessful, setIsSuccessful] = useState(false);
    const clusterContext = useContext(AuthContext);

    // form data hooks
    const [projectName, setProjectName] = useState("");
    const [projectPurpose, setProjectPurpose] = useState("");
    const [isPublic, setIsPublic] = useState("");
    const [projectTarget, setProjectTarget] = useState("");
    const [report, setReport] = useState("");
    const [payout, setPayout] = useState("");
    const [contributionEndDate, setContributionEndDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // set project code
    const projectCode = generateProjectCode();
    let projectLink = '';
    let clusterId = clusterContext.userInfo._id;

    const submitProjectForm = (e) => {
        e.preventDefault();

        // form data object for submission
        let formData = {
            'project_name': projectName, 
            'project_purpose': projectPurpose, 
            'is_public': isPublic,
            'project_target': projectTarget, 
            'recurring_payout': payout,
            'contribution_end_date': contributionEndDate
        };

        if (validateForm(formData)) {

            // add fields without form field checks
            formData['cluster_id'] = clusterId;
            formData['report'] = report;
            formData['project_code'] = projectCode;
            formData['email'] = clusterContext.userInfo.cluster_admin_email;

            // set project link
            projectLink = `/project/dashboard/${projectCode}`;
            
             // header options for api
            var options = {
                method: 'POST',
                url: `/project`,
                data: formData
            };

            axios.request(options).then((response) => {

                if (response.data.message === 'success') {
                    setIsSuccessful(true);
                } else {
                    throw new Error(response.data.message);
                }

            }).catch((error) => {
                // get the error DOM object
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    setErrorMessage(`Error: ${error.response.data.errors.email}`);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    setErrorMessage(`Error: ${error.request}`);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setErrorMessage(`Error: ${error.message}`);
                }
                console.log(error);
            });
        }

    };

    return (
        <>
        {isSuccessful ? navigate(`${projectLink}`) :
        <div id="create-project" className='container'>
            <div className="d-flex flex-column align-items-center">
                <h2>Create Project for Cluster</h2>
                <i className="mb-5">You need to create a cluster before creating a project</i>
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="project_name" className="form-label">Project Name</label>
                            <input type="text" name="project_name" placeholder="" className="form-control" id="project_name" aria-describedby="projectNameHelp"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)} />
                            <div id="projectNameHelp" className="form-text">What would you like to call the project?</div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="project_purpose" className="form-label">Purpose of Project</label>
                                <input type="text" name="project_purpose" placeholder="" className="form-control" id="project_purpose" aria-describedby="projectPurposeHelp"
                                value={projectPurpose}
                                onChange={(e) => setProjectPurpose(e.target.value)} />
                                <div id="projectPurposeHelp" className="form-text">What is the project for?</div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="is_public" className="form-label">Is this a public project?</label>
                                <select className="form-select" id="is_public" aria-label="form-select example" aria-describedby="projectPublic"
                                    onChange={(e) => setIsPublic(e.target.value)} required>
                                    <option defaultValue>Select</option>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>
                                <div id="projectPurposeHelp" className="form-text">If Yes, everyone can see and deposit to the project.</div>
                            </div>                            
                        </div>
                        <div className="mb-3">
                            <label htmlFor="project_target" className="form-label">Target</label>
                            {/* <span>Don't know how much? Try our <Link to="/get-quotation">Calculator</Link> to find out.</span> */}
                            <input type="number" name="project_target" placeholder="" className="form-control" id="project_target" aria-describedby="projectTargetHelp"
                            value={projectTarget}
                            onChange={(e) => setProjectTarget(e.target.value)} />
                            <div id="projectTargetHelp" className="form-text">How much will the project cost?</div>
                        </div>     
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="recurring_payout" className="form-label">Is Payout Continuous?</label>
                                <select className="form-select" id="recurring_payout" aria-label="form-select example"
                                    onChange={(e) => setPayout(e.target.value)} required>
                                    <option defaultValue>Select</option>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">                                              
                                <label>Payout &amp; Report</label>
                                <div className="d-flex flex-row justify-content-between mb-2 mt-2">
                                    <div className="col-md-4 mb-3 form-check">
                                        <input className="form-check-input" type="radio" name="report" id="daily_report"
                                        onClick={() => setReport("daily")} />
                                        <label className="form-check-label" htmlFor="daily_report">daily</label>
                                    </div>
                                    <div className="col-md-4 mb-3 form-check">
                                        <input className="form-check-input" type="radio" name="report" id="weekly_report"
                                        onClick={() => setReport("weekly")} />
                                        <label className="form-check-label" htmlFor="weekly_report">Weekly</label>
                                    </div>
                                    <div className="col-md-4 mb-3 form-check">
                                        <input className="form-check-input" type="radio" name="report" id="monthly_report"
                                        onClick={() => setReport("monthly")} />
                                        <label className="form-check-label" htmlFor="monthly_report">Monthly</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contribution_end_date" className="form-label">Contribution End Date</label>
                            <input type="date" name="contribution_end_date" placeholder="" className="form-control" id="contribution_end_date" aria-describedby="endDateHelp"
                            value={contributionEndDate}
                            onChange={(e) => setContributionEndDate(e.target.value)} />
                            <div id="endDateHelp" className="form-text">When is contributions ending?</div>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary btn-lg"
                            onClick={(e) => submitProjectForm(e)} >Create Project</button>
                            <p className="text-center text-danger" id="submission-error">{errorMessage}</p>
                        </div>
                    </form>
                    <div>
                        <p><Link to="/create-cluster">Create Cluster</Link></p>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
        }
        </>
    );
};

export default CreateProjectForm;
