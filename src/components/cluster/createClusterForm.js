import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import VerifyCluster from "./verifyCluster";
import {CreateClusterSchema} from "../../form-schema/createClusterSchema";
import {useCreateCluster, useGetStatesAndLgas} from "../../hooks/customHooks";
import Loading from "../../utils/loading";
import {InvalidFormField} from "../Errors/invalidFormField";

const CreateClusterForm = () => {
    const [states, setStates] = useState({});
    const [lgas, setLgas] = useState([]);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(CreateClusterSchema)
    })

    const {
        isLoading: isStatesLoading,
        isSuccess: isStatesSuccess,
        data: statesData
    } = useGetStatesAndLgas()

    const {
        isSuccess: isCreateClusterSuccess,
        isError: isCreateClusterError,
        error,
        mutate
    } = useCreateCluster()

    useEffect(() => {
        setStates(statesData?.data)
    }, [statesData])

    if (isStatesLoading) {
        return <Loading/>
    }

    const handleStateSelectionChange = (e) => {
        const selectedState = e.target.value;
        setLgas(states[selectedState]);
    }

    const handleSubmitCluster = (data) => {
        console.log(data, 'data')
        mutate(data)
    }

    return (
        <>
            <div id="create-cluster" className='container'>
                {isCreateClusterError && <h5>{error?.message}</h5>}
                {isCreateClusterSuccess && <VerifyCluster/>}

                {!isCreateClusterSuccess &&
                    <div className="d-flex flex-column align-items-center">
                        <h2 className="mb-5">Create Cluster Account</h2>
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <h5 className="mb-4">Profile</h5>
                            <form onSubmit={handleSubmit(handleSubmitCluster)}>
                                <div className="mb-3">
                                    <label htmlFor="cluster_name" className="form-label">Cluster Name <i
                                        style={{fontSize: '12px'}}> (Text only)</i></label>
                                    <input 
                                        type="text" 
                                        name="cluster_name" 
                                        placeholder="" 
                                        className="form-control"
                                        id="cluster_name" 
                                        aria-describedby="clusterNameHelp"
                                        {...register('cluster_name')}
                                        aria-invalid={!!errors.cluster_name ? 'true' : 'false'}
                                    />
                                    {!!errors.cluster_name && <InvalidFormField message={errors.cluster_name?.message} />}
                                    <div id="clusterNameHelp" className="form-text">The name of community or group</div>
                                </div>
                                {isStatesSuccess && <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cluster_state" className="form-label">State</label>
                                        <select 
                                            className="form-select" 
                                            id="cluster_state" 
                                            name="cluster_state"
                                            aria-label="form-select example"
                                            {...register('cluster_state')}
                                            aria-invalid={!!errors.cluster_state ? 'true' : 'false'}
                                            onChange={(e) => handleStateSelectionChange(e)}
                                        >
                                            <option defaultValue value="">Select</option>
                                            {
                                                Object.keys(states || {})?.sort()?.map((state, index) => {
                                                        return <option value={state}
                                                                       key={index}>{state}</option>
                                                    })
                                            }
                                        </select>
                                        {!!errors.cluster_state && <InvalidFormField message={errors.cluster_state?.message} />}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cluster_lga" className="form-label">LGA</label>
                                        <select 
                                            className="form-select" 
                                            id="cluster_lga" 
                                            name="cluster_lga"
                                            aria-label="form-select example"
                                            {...register('cluster_lga')}
                                            aria-invalid={!!errors.cluster_lga ? 'true' : 'false'}
                                        >
                                            <option defaultValue value="">Select</option>
                                            {
                                                lgas?.map((lga, index) => {
                                                    return <option value={lga} key={index}>{lga}</option>
                                                })
                                            }
                                        </select>
                                        {!!errors.cluster_lga && <InvalidFormField message={errors.cluster_lga?.message} />}
                                    </div>
                                </div>}
                                <div className="mb-3">
                                    <label htmlFor="cluster_address" className="form-label">Address</label>
                                    <input 
                                        type="text" 
                                        name="cluster_address" 
                                        placeholder="" 
                                        className="form-control"
                                        id="cluster_address"
                                        {...register('cluster_address')}
                                        aria-invalid={!!errors.cluster_address ? 'true' : 'false'}
                                    />
                                    {!!errors.cluster_address && <InvalidFormField message={errors.cluster_address?.message} />}
                                </div>
                                <h5 className="mt-4 mb-3">Cluster Creator</h5>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cluster_admin_firstname" className="form-label">First
                                            name</label>
                                        <input 
                                            type="text" 
                                            name="cluster_admin_firstname" 
                                            placeholder=""
                                            className="form-control" 
                                            id="cluster_admin_firstname"
                                            {...register('cluster_admin_firstname')}
                                            aria-invalid={!!errors.cluster_admin_firstname ? 'true' : 'false'}
                                        />
                                        {!!errors.cluster_admin_firstname && <InvalidFormField message={errors.cluster_admin_firstname?.message} />}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cluster_admin_lastname" className="form-label">Last name</label>
                                        <input
                                            type="text"
                                            name="cluster_admin_lastname"
                                            placeholder=""
                                            className="form-control"
                                            id="cluster_admin_lastname"
                                            {...register('cluster_admin_lastname')}
                                            aria-invalid={!!errors.cluster_admin_lastname ? 'true' : 'false'}
                                        />
                                        {!!errors.cluster_admin_lastname && <InvalidFormField message={errors.cluster_admin_lastname?.message} />}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cluster_admin_gender" className="form-label">Gender</label>
                                        <select
                                            className="form-select"
                                            id="cluster_admin_gender"
                                            aria-label="form-select example"
                                            {...register('cluster_admin_gender')}
                                            aria-invalid={!!errors.cluster_admin_gender ? 'true' : 'false'}
                                        >
                                            <option defaultValue value="">Select</option>
                                            <option value="female">Female</option>
                                            <option value="male">Male</option>
                                        </select>
                                        {!!errors.cluster_admin_gender && <InvalidFormField message={errors.cluster_admin_gender?.message} />}
                                    </div>
                                    <div className="col-md-6 mb-3"></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="cluster_admin_phone"
                                            className="form-label"
                                        >Contact Phone <i style={{fontSize: '12px'}}> (+2348000000000)</i></label>
                                        <input
                                            type="phone"
                                            name="cluster_admin_phone"
                                            placeholder=""
                                            className="form-control"
                                            id="cluster_admin_phone"
                                            {...register('cluster_admin_phone')}
                                            aria-invalid={!!errors.cluster_admin_phone ? 'true' : 'false'}
                                        />
                                        {!!errors.cluster_admin_phone && <InvalidFormField message={errors.cluster_admin_phone?.message} />}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="cluster_admin_email"
                                            className="form-label"
                                        >Contact Email</label>
                                        <input
                                            type="email"
                                            name="cluster_admin_email"
                                            placeholder=""
                                               className="form-control"
                                            id="cluster_admin_email"
                                            {...register('cluster_admin_email')}
                                            aria-invalid={!!errors.cluster_admin_email ? 'true' : 'false'}
                                        />
                                        {!!errors.cluster_admin_email && <InvalidFormField message={errors.cluster_admin_email?.message} />}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cluster_password" className="form-label">Password
                                            <i style={{fontSize: '12px'}}> (Minimum of 8 characters)</i></label>
                                        <input type="password"
                                               name="cluster_password"
                                               placeholder=""
                                               className="form-control"
                                               id="cluster_password"
                                               {...register('cluster_password')}
                                               aria-invalid={!!errors.cluster_password ? 'true' : 'false'}
                                        />
                                        {!!errors.cluster_password && <InvalidFormField message={errors.cluster_password?.message} />}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="confirm_password"
                                            className="form-label"
                                        >Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirm_password"
                                            placeholder=""
                                            className="form-control"
                                            id="confirm_password"
                                            {...register('confirm_password')}
                                            aria-invalid={!!errors.confirm_password ? 'true' : 'false'}
                                        />
                                        {!!errors.confirm_password && <InvalidFormField message={errors.confirm_password?.message} />}
                                    </div>
                                </div>
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        name=""
                                        className="form-check-input"
                                        id="agree_to_register_cluster"
                                        {...register('agree_to_register_cluster')}
                                        aria-invalid={!!errors.agree_to_register_cluster ? 'true' : 'false'}
                                    />
                                    {!!errors.agree_to_register_cluster && <InvalidFormField message={errors.agree_to_register_cluster?.message} />}
                                    <label
                                        className="form-check-label"
                                        htmlFor="agree_to_register_cluster"
                                    >
                                        I agree to the <Link to="/terms-and-conditions">Terms and Conditions</Link> of Khronos
                                    </label>
                                </div>
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        name=""
                                        className="form-check-input"
                                        id="verify_cluster_information"
                                        {...register('verify_cluster_information')}
                                        aria-invalid={!!errors.verify_cluster_information ? 'true' : 'false'}
                                    />
                                    {!!errors.verify_cluster_information && <InvalidFormField message={errors.verify_cluster_information?.message} />}
                                    <label
                                        className="form-check-label"
                                        htmlFor="verify_cluster_information"
                                    >I verify that the information provided are true</label>
                                </div>
                                <div className="mb-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary fw-lighter btn-lg"
                                    >Create Cluster Profile</button>
                                </div>
                            </form>
                            <div>
                                <p><Link to="/create-project">Create Project</Link></p>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                }
            </div>
        </>
    );
};

export default CreateClusterForm;
