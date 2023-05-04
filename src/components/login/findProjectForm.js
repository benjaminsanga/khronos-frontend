import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { validateForm } from "../../utils/utilities";
import CheckBox from '../../assets/icons/checkbox.svg';

const FindProjectForm = () => {

    const [projectCode, setProjectCode] = useState("");
    const [project, setProject] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {
            'project_code': projectCode
        }

        const isFormValid = validateForm(data);

        if (isFormValid) {
            // submit form submission data
            var options = {
                method: 'GET',
                url: `/project/dashboard/${projectCode}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            axios.request(options).then((response) => {
                if (response.data !== '') {
                    // set data                  
                    setProject(response.data);
                } else {
                    throw new Error('Project not found');
                }

            }).catch( (error) => {
                // error not set
                setErrorMessage(error.message);                
            });
        }
    };

    return (
        <>
        {Object.keys(project).length > 0 ?
        
        <div className='container pt-5'>
            <div className="row d-flex flex-column align-items-center text-center">
                <span>Project Name</span>
                <h2 className="mb-4"><strong>{project.project_name}</strong></h2>
                <img src={CheckBox} alt="found" style={{width: '20%'}} />
                <div className="col-md-2"></div>
                <div className="col-md-8 text-center">
                    <p className="mb-4">Code: <strong>{project.project_code}</strong></p>
                    <p><Link to={`/deposit/${project.project_code}`}>
                        <button className="btn btn-md btn-primary">Proceed to Payment</button>
                    </Link></p>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>        
        : 
        <div id="join" className='container'>
            <div className="d-flex flex-column align-items-center">     
                <div className="row">
                    <h2 className="mb-5 text-center">Project Code</h2>
                    <p className="text-center">Let's identify the recipient</p>
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <form>
                            <div className="mb-3 text-center">
                                <label htmlFor="project_code" className="form-label">Enter Code</label>
                                <input type="text" name="project_code" placeholder="*** - **** - ***" className="form-control" id="project_code"
                                value={projectCode}
                                onChange={(e) => setProjectCode(e.target.value)} />
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary btn-lg"
                                onClick={(e) => handleSubmit(e)}>Proceed</button>
                                <p className="text-center text-danger" id="submission-error">{errorMessage}</p>
                            </div>
                        </form>
                        <div>
                            <p><Link to="/create-project">Create Project</Link></p>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </div>
        }
        </>
    );
};

export default FindProjectForm;
