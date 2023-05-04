import { useState } from "react";
import { Link } from "react-router-dom";

const QuotationForm = () => {

    const [projectType, setProjectType] = useState("");

    const handleSubmitQuotation = (e) => {
        e.preventDefault();
        console.log(projectType);
    };

    return (
        <div id="get-quotation" className='container'>
            <div className="d-flex flex-column align-items-center">
                <h2>Get A Project Quotation</h2>
                <i className="mb-5">Know how much a project would cost</i>
                <div className="col-md-6">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="project-type" className="form-label">Type of Project</label>
                            <select className="form-select" id="project-type" aria-label="form-select example"
                            onSelect={(e) => setProjectType(e.target.value)}>
                                <option defaultValue>Select</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Project timeframe</label>
                            <select className="form-select" id="project-type" aria-label="form-select example" aria-describedby="projectTimeframeHelp">
                                <option defaultValue>Select</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <div id="projectTimeframeHelp" className="form-text">How long will the project take?</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Area of coverage - if applicable</label>
                            <input type="" name="" placeholder="" className="form-control" id="" aria-describedby="coverageAreaHelp" />
                            <div id="coverageAreaHelp" className="form-text">What is the size of the project physical space?</div>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary btn-lg"
                            onClick={(e) => handleSubmitQuotation(e)}>Get Quotation</button>
                        </div>
                    </form>
                    <div>
                        <p><Link to="/create-cluster">Create Cluster</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuotationForm;
