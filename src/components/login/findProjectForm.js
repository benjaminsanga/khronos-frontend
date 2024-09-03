import {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {FindProjectSchema} from "../../form-schema/findProjectSchema";
import {InvalidFormField} from "../Errors/invalidFormField";
import {useFindProjectByCode} from "../../hooks/customHooks";

const FindProjectForm = () => {

    const [project, setProject] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()

    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(FindProjectSchema)
    })
    
    const {
        isLoading,
        isError,
        error,
        data,
        isSuccess,
        isFetching,
        mutate,
        reset
    } = useFindProjectByCode()

    useEffect(() => {
        if (isSuccess) {
            setProject(data?.data);
        }
        if (isError) {
            console.log(error, 'error')
            setErrorMessage(error?.response?.data?.message);
        }
    }, [data?.data, error, isError, isSuccess])
    
    const handleFormSubmit = (data) => {
        mutate(data)
    }

    return (
        <>
        {isSuccess && !!data?.data ?
        <div id="join" className='container-fluid pt-5'>
            <div className="row d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-row justify-content-start align-items-start">
                    <div className="w-100">
                        <h5>Confirm Project Details</h5><hr/>
                        <p className="m-0 fw-lighter">Project Name</p>
                        <h2 className="mb-3">{project?.project_name}</h2>
                        <p className="m-0 fw-lighter">Account Name</p>
                        <h2 className="mb-2">{project?.account_name}</h2>
                        <div className="d-flex flex-row justify-content-between my-5">
                            <button 
                                className="btn btn-md btn-primary fw-lighter"
                                onClick={() => navigate(`/deposit/${project?.project_code}`)}
                            >Proceed to Payment</button>
                            <button 
                                className="btn btn-md btn-secondary fw-lighter ms-3"
                                onClick={() => {
                                    reset()
                                }}
                            >Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
        : 
        <div id="join" className='container-fluid'>
            <div className="d-flex flex-column align-items-center">     
                <div className="row">
                    <h2 className="mb-5 text-center">Find Project By Code</h2>
                    {/* <p className="text-center">Let's identify the recipient</p> */}
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <p className="text-center text-danger" id="submission-error">{errorMessage}</p>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="mb-3 text-center">
                                <label htmlFor="project_code" className="form-label">Enter Code</label>
                                <input
                                    type="text"
                                    name="project_code"
                                    placeholder="*** - **** - ***"
                                    className="form-control"
                                    id="project_code"
                                    {...register('project_code')}
                                    aria-invalid={!!errors?.project_code ? "true" : "false"}
                                />
                                {!!errors.project_code && <InvalidFormField message={errors.project_code?.message}/>}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-primary fw-lighter btn-lg"
                                    disabled={isLoading || isFetching}
                                >
                                    {(isLoading || isFetching) && <i className="fa fa-spinner fa-spin"></i>} Proceed
                                </button>
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
