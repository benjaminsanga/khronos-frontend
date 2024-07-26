import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {getFullDate} from "../../utils/utilities";
import {useForm} from "react-hook-form";
import {InvalidFormField} from "../Errors/invalidFormField";
import {yupResolver} from "@hookform/resolvers/yup";
import {CreateProjectSchema} from "../../form-schema/createProjectSchema";
import {useCreateProject} from "../../hooks/customHooks";
import {useSelector} from "react-redux";

const CreateProjectForm = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const [projectCode, setProjectCode] = useState("");
    const [report, setReport] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(CreateProjectSchema)
    })

    const {
        isLoading,
        isSuccess,
        isError,
        error,
        data,
        mutate
    } = useCreateProject()

    useEffect(() => {
        if (isSuccess) {
            setProjectCode(`/project/dashboard/${data?.data?.projectCode}`);
        }
        if (isError) {
            setErrorMessage(`Error: ${error?.response?.data?.message}`);
        }
    }, [data, error, isError, isSuccess])

    let projectURL = '';
    let userId = user?.info?._id;

    const handleSubmitProject = (data) => {
        // add fields without form field checks
        data['user_id'] = userId;
        data['report'] = report;
        data['email'] = user?.info?.user_admin_email;

        mutate(data)
    }

    return (
        <>
            {(isSuccess && !!projectCode) && navigate(`${projectURL}`)}
            <div id="create-project" className='container'>
                <div className="d-flex flex-column align-items-center">
                    <h2 className="mb-5">Create Project for User</h2>
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit(handleSubmitProject)}>
                            <div className="mb-3">
                                <label htmlFor="project_name" className="form-label">Project Name</label>
                                <input
                                    type="text"
                                    name="project_name"
                                    placeholder=""
                                    className="form-control"
                                    id="project_name"
                                    aria-describedby="projectNameHelp"
                                    {...register('project_name')}
                                    aria-invalid={!!errors.project_name ? 'true' : 'false'}
                                />
                                {!!errors.project_name && <InvalidFormField message={errors.project_name?.message} />}
                                <div id="projectNameHelp" className="form-text">What would you like to call the project?</div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="project_purpose" className="form-label">Purpose of Project</label>
                                    <input
                                        type="text"
                                        name="project_purpose"
                                        placeholder=""
                                        className="form-control"
                                        id="project_purpose"
                                        aria-describedby="projectPurposeHelp"
                                        {...register('project_purpose')}
                                        aria-invalid={!!errors.project_purpose ? 'true' : 'false'}
                                    />
                                    {!!errors.project_purpose && <InvalidFormField message={errors.project_purpose?.message} />}
                                    <div id="projectPurposeHelp" className="form-text">What is the project for?</div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="is_public" className="form-label">Is this a public project?</label>
                                    <select
                                        className="form-select"
                                        id="is_public"
                                        aria-label="form-select example"
                                        aria-describedby="projectPublic"
                                        {...register('is_public')}
                                        aria-invalid={!!errors.is_public ? 'true' : 'false'}
                                    >
                                        <option defaultValue disabled value="">Select</option>
                                        <option value="no">No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                    {!!errors.is_public && <InvalidFormField message={errors.is_public?.message} />}
                                    <div id="projectPurposeHelp" className="form-text">If Yes, everyone can see and deposit to the project.</div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="project_target" className="form-label">Target</label>
                                {/* <span>Don't know how much? Try our <Link to="/get-quotation">Calculator</Link> to find out.</span> */}
                                <input
                                    type="number"
                                    name="project_target"
                                    placeholder=""
                                    className="form-control"
                                    id="project_target"
                                    aria-describedby="projectTargetHelp"
                                    {...register('project_target')}
                                    aria-invalid={!!errors.project_target ? 'true' : 'false'}
                                />
                                {!!errors.project_target && <InvalidFormField message={errors.project_target?.message} />}
                                <div id="projectTargetHelp" className="form-text">How much will the project cost?</div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="recurring_payout" className="form-label">Is Payout Continuous?</label>
                                    <select
                                        className="form-select"
                                        id="recurring_payout"
                                        aria-label="form-select example"
                                        {...register('recurring_payout')}
                                        aria-invalid={!!errors.recurring_payout ? 'true' : 'false'}
                                    >
                                        <option defaultValue disabled value="">Select</option>
                                        <option value="no">No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                    {!!errors.recurring_payout && <InvalidFormField message={errors.recurring_payout?.message} />}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Payout &amp; Report</label>
                                    <div className="d-flex flex-row justify-content-between mb-2 mt-2">
                                        <div className="col-md-4 mb-3 form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="report"
                                                id="daily_report"
                                                onClick={() => setReport("daily")}
                                            />
                                            <label className="form-check-label" htmlFor="daily_report">daily</label>
                                        </div>
                                        <div className="col-md-4 mb-3 form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="report"
                                                id="weekly_report"
                                                onClick={() => setReport("weekly")}
                                            />
                                            <label className="form-check-label" htmlFor="weekly_report">Weekly</label>
                                        </div>
                                        <div className="col-md-4 mb-3 form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="report"
                                                id="monthly_report"
                                                onClick={() => setReport("monthly")}
                                            />
                                            <label className="form-check-label" htmlFor="monthly_report">Monthly</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contribution_end_date" className="form-label">Contribution End Date</label>
                                <input
                                    type="date"
                                    name="contribution_end_date"
                                    className="form-control"
                                    id="contribution_end_date"
                                    min={getFullDate()}
                                    aria-describedby="endDateHelp"
                                    {...register('contribution_end_date')}
                                    aria-invalid={!!errors.contribution_end_date ? 'true' : 'false'}
                                />
                                {!!errors.contribution_end_date && <InvalidFormField message={errors.contribution_end_date?.message} />}
                                <div id="endDateHelp" className="form-text">When is contributions ending?</div>
                            </div>
                            <div className="my-5">
                                <button
                                    type="submit"
                                    className="btn btn-primary fw-lighter btn-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading && <i className="fa fa-spinner fa-spin"></i>} Create Project
                                </button>
                                <p className="text-center text-danger" id="submission-error">{errorMessage}</p>
                            </div>
                        </form>
                        {/*<div>*/}
                        {/*    <p><Link to="/create-account">Register</Link></p>*/}
                        {/*</div>*/}
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </>
    );
};

export default CreateProjectForm;
