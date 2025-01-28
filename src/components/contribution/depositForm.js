import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toFirstLetterUpperCase } from "../../utils/utilities";
import Loading from "../../utils/loading";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {DepositSchema} from "../../form-schema/depositSchema";
import {InvalidFormField} from "../Errors/invalidFormField";
import {useGetProjectByCode, useProjectDeposit} from "../../hooks/customHooks";

const DepositForm = () => {

    // set project 
    const { code } = useParams();
    const [errorMessage, setErrorMessage] = useState("");
    const [projectInfo, setProjectInfo] = useState({});

    const {
        handleSubmit,
        formState: {errors},
        register
    } = useForm({
        resolver: yupResolver(DepositSchema)
    })

    const {
        isLoading,
        isSuccess,
        data,
        isError,
        error
    } = useGetProjectByCode(code)

    const {
        isLoading: depositIsLoading,
        isSuccess: depositIsSuccess,
        data: depositData,
        isError: depositIsError,
        error: depositError,
        mutate: depositMutate
    } = useProjectDeposit()

    useEffect(() => {
        if (isSuccess) {
            setProjectInfo(data?.data);
        }
        if (isError) {
            setErrorMessage(error?.response?.data.message);
        }
    }, [data?.data, error, isError, isSuccess]);
    
    useEffect(() => {
        if (depositIsSuccess && depositData?.data?.link) {
            window.location.replace(depositData?.data?.link);
        }
        if (depositIsError) {
            setErrorMessage(`Error: ${depositError?.response?.data?.message}`);
        }
    }, [depositIsSuccess, depositIsError, depositData, error, depositError])

    const handleDepositSubmit = (data) => {
        data['project_id'] = projectInfo?.id;
        depositMutate(data)
    }

    return (
        <>
            {/* <PaymentSuccessful projectCode={projectInfo?.project_code} /> */}
            {isLoading && <Loading />}
            {isSuccess && <div id="deposit" className='container-fluid'>
                <div className="d-flex flex-column align-items-center">
                    <h4>
                        <span className="text-secondary">
                            { toFirstLetterUpperCase(projectInfo?.project_name)}
                        </span> Deposit Form
                    </h4>
                    <p className="mb-5">{projectInfo?.project_purpose}</p>
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit(handleDepositSubmit)}>
                            <div className="row mb-3">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="name" className="form-label">Name of Depositor</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder=""
                                        className="form-control"
                                        id="name"
                                        {...register('name')}
                                        aria-invalid={!!errors?.name ? 'true' : 'false'}
                                    />
                                    {!!errors.name && <InvalidFormField message={errors.name?.message} />}
                                    <input type="hidden" value="xxx-xxxx-xxx" id="project_id" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input
                                        type="phone"
                                        name="phone"
                                        placeholder=""
                                        className="form-control"
                                        id="phone"
                                        {...register('phone')}
                                        aria-invalid={!!errors?.phone ? 'true' : 'false'}
                                    />
                                    {!!errors.phone && <InvalidFormField message={errors.phone?.message} />}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder=""
                                        className="form-control"
                                        id="email"
                                        {...register('email')}
                                        aria-invalid={!!errors?.email ? 'true' : 'false'}
                                    />
                                    {!!errors.email && <InvalidFormField message={errors.email?.message} />}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="amount" className="form-label">Amount</label>
                                    <input
                                        type="text"
                                        name="amount"
                                        placeholder=""
                                        className="form-control"
                                        id="amount"
                                        {...register('amount')}
                                        aria-invalid={!!errors?.amount ? 'true' : 'false'}
                                    />
                                    {!!errors.amount && <InvalidFormField message={errors.amount?.message} />}
                                </div>
                            </div>
                            <div>
                                <p className="text-danger small-text">
                                    <em>* This project was created by <strong>{projectInfo?.account_admin_firstname} {projectInfo?.account_admin_lastname}</strong> ({projectInfo?.account_admin_phone}).</em>
                                </p>
                                <p className="text-danger small-text">
                                    <em>* The project owner has the privilege to perform transactions for the group.</em>
                                </p>
                                <p className="text-warning small-text">
                                    <em>* This transaction is non-refundable.</em>
                                </p>
                                <p className="text-warning small-text">
                                    <em>* Your data will be stored for reference.</em>
                                </p>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-primary fw-lighter btn-lg"
                                    disabled={depositIsLoading}
                                >{depositIsLoading ? 'Initializing...' : 'Continue'}</button>
                                <p className="fw-lighter small-text">You will be redirected to complete payment.</p>
                            </div>
                            <p className="text-center text-danger" id="payment-error">{errorMessage}</p>
                        </form>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>}
            {isError && <div id="deposit" className='container-fluid my-5 py-5'>
                <div className="my-5 py-5 text-center">
                    <p className="text-center text-danger my-5" id="payment-error">{errorMessage}</p>
                    <button className="btn btn-sm btn-primary w-25" onClick={() => {
                        window.history.back()
                    }}>Back</button>
                </div>
            </div>}
        </>
    );
};

export default DepositForm;
