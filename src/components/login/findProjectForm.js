import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import CheckBox from '../../assets/icons/checkbox.svg';
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
                                    className="btn btn-primary btn-lg"
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
