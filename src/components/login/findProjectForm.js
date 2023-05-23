import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {FindProjectSchema} from "../../form-schema/findProjectSchema";
import {InvalidFormField} from "../Errors/invalidFormField";
import {useGetProject} from "../../hooks/customHooks";

const FindProjectForm = () => {

    const [project, setProject] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(FindProjectSchema)
    })
    
    const {
        isLoading,
        isError,
        error,
        mutate,
        data,
        isSuccess
    } = useGetProject()

    useEffect(() => {
        if (isSuccess) {
            setProject(data?.data?.result);
        }
        if (isError) {
            console.log(error, 'error')
            setErrorMessage(error?.response?.data?.message);
        }
    }, [data?.data, error, isError, isSuccess])

    const handleFormSubmit = (data) => {
        mutate(data?.project_code)
    }

    return (
        <>
        {isSuccess ?
        <div className='container pt-5' style={{height: '70vh'}}>
            <div className="row d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-row justify-content-start align-items-start w-auto mt-5 pt-5">
                    {/*<img src={CheckBox} alt="found" style={{width: '200px'}} />*/}
                    <div>
                        <p className="m-0 fw-lighter">Project Name</p>
                        <h2 className="mb-3">{project.project_name}</h2>
                        <p className="m-0 fw-lighter">Code</p>
                        <h2 className="mb-2">{project.project_code}</h2>
                        <p className="mt-4">
                            <Link to={`/deposit/${project.project_code}`}>
                                <button className="btn btn-md btn-primary fw-lighter">Proceed to Payment</button>
                            </Link>
                        </p>
                    </div>
                </div>
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
                                    disabled={isLoading}
                                >
                                    {isLoading && <i className="fa fa-spinner fa-spin"></i>} Proceed
                                </button>
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
