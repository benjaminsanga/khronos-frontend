import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import VerifyUser from "./verifyUser";
import {CreateUserSchema} from "../../form-schema/createUserSchema";
import {useCreateUser, useGetStatesAndLgas} from "../../hooks/customHooks";
import Loading from "../../utils/loading";
import {InvalidFormField} from "../Errors/invalidFormField";

const CreateUserForm = () => {
    const [states, setStates] = useState({});
    const [lgas, setLgas] = useState([]);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(CreateUserSchema)
    })

    const {
        isLoading: isStatesLoading,
        isSuccess: isStatesSuccess,
        data: statesData
    } = useGetStatesAndLgas()

    const {
        isSuccess: isCreateUserSuccess,
        isError: isCreateUserError,
        error,
        mutate
    } = useCreateUser()

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

    const handleSubmitUser = (data) => {
        console.log(data, 'data')
        mutate(data)
    }

    return (
        <>
            <div id="create-account" className='container'>
                {isCreateUserError && <h5>{error?.message}</h5>}
                {isCreateUserSuccess && <VerifyUser/>}

                {!isStatesSuccess &&
                    <div className="d-flex flex-column align-items-center">
                        <h2 className="mb-5">Register Account</h2>
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <h5 className="mb-4">Profile</h5>
                            <form onSubmit={handleSubmit(handleSubmitUser)}>
                                <div className="mb-3">
                                    <label htmlFor="user_name" className="form-label">User Name <i
                                        style={{fontSize: '12px'}}> (Text only)</i></label>
                                    <input 
                                        type="text" 
                                        name="user_name" 
                                        placeholder="" 
                                        className="form-control"
                                        id="user_name" 
                                        aria-describedby="userNameHelp"
                                        {...register('user_name')}
                                        aria-invalid={!!errors.user_name ? 'true' : 'false'}
                                    />
                                    {!!errors.user_name && <InvalidFormField message={errors.user_name?.message} />}
                                    <div id="userNameHelp" className="form-text">The name of community or group</div>
                                </div>
                                {isStatesSuccess && <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="user_state" className="form-label">State</label>
                                        <select 
                                            className="form-select" 
                                            id="user_state" 
                                            name="user_state"
                                            aria-label="form-select example"
                                            {...register('user_state')}
                                            aria-invalid={!!errors.user_state ? 'true' : 'false'}
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
                                        {!!errors.user_state && <InvalidFormField message={errors.user_state?.message} />}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="user_lga" className="form-label">LGA</label>
                                        <select 
                                            className="form-select" 
                                            id="user_lga" 
                                            name="user_lga"
                                            aria-label="form-select example"
                                            {...register('user_lga')}
                                            aria-invalid={!!errors.user_lga ? 'true' : 'false'}
                                        >
                                            <option defaultValue value="">Select</option>
                                            {
                                                lgas?.map((lga, index) => {
                                                    return <option value={lga} key={index}>{lga}</option>
                                                })
                                            }
                                        </select>
                                        {!!errors.user_lga && <InvalidFormField message={errors.user_lga?.message} />}
                                    </div>
                                </div>}
                                <div className="mb-3">
                                    <label htmlFor="user_address" className="form-label">Address</label>
                                    <input 
                                        type="text" 
                                        name="user_address" 
                                        placeholder="" 
                                        className="form-control"
                                        id="user_address"
                                        {...register('user_address')}
                                        aria-invalid={!!errors.user_address ? 'true' : 'false'}
                                    />
                                    {!!errors.user_address && <InvalidFormField message={errors.user_address?.message} />}
                                </div>
                                <h5 className="mt-4 mb-3">User Creator</h5>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="user_admin_firstname" className="form-label">First
                                            name</label>
                                        <input 
                                            type="text" 
                                            name="user_admin_firstname" 
                                            placeholder=""
                                            className="form-control" 
                                            id="user_admin_firstname"
                                            {...register('user_admin_firstname')}
                                            aria-invalid={!!errors.user_admin_firstname ? 'true' : 'false'}
                                        />
                                        {!!errors.user_admin_firstname && <InvalidFormField message={errors.user_admin_firstname?.message} />}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="user_admin_lastname" className="form-label">Last name</label>
                                        <input
                                            type="text"
                                            name="user_admin_lastname"
                                            placeholder=""
                                            className="form-control"
                                            id="user_admin_lastname"
                                            {...register('user_admin_lastname')}
                                            aria-invalid={!!errors.user_admin_lastname ? 'true' : 'false'}
                                        />
                                        {!!errors.user_admin_lastname && <InvalidFormField message={errors.user_admin_lastname?.message} />}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="user_admin_gender" className="form-label">Gender</label>
                                        <select
                                            className="form-select"
                                            id="user_admin_gender"
                                            aria-label="form-select example"
                                            {...register('user_admin_gender')}
                                            aria-invalid={!!errors.user_admin_gender ? 'true' : 'false'}
                                        >
                                            <option defaultValue value="">Select</option>
                                            <option value="female">Female</option>
                                            <option value="male">Male</option>
                                        </select>
                                        {!!errors.user_admin_gender && <InvalidFormField message={errors.user_admin_gender?.message} />}
                                    </div>
                                    <div className="col-md-6 mb-3"></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="user_admin_phone"
                                            className="form-label"
                                        >Contact Phone <i style={{fontSize: '12px'}}> (+2348000000000)</i></label>
                                        <input
                                            type="phone"
                                            name="user_admin_phone"
                                            placeholder=""
                                            className="form-control"
                                            id="user_admin_phone"
                                            {...register('user_admin_phone')}
                                            aria-invalid={!!errors.user_admin_phone ? 'true' : 'false'}
                                        />
                                        {!!errors.user_admin_phone && <InvalidFormField message={errors.user_admin_phone?.message} />}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="user_admin_email"
                                            className="form-label"
                                        >Contact Email</label>
                                        <input
                                            type="email"
                                            name="user_admin_email"
                                            placeholder=""
                                               className="form-control"
                                            id="user_admin_email"
                                            {...register('user_admin_email')}
                                            aria-invalid={!!errors.user_admin_email ? 'true' : 'false'}
                                        />
                                        {!!errors.user_admin_email && <InvalidFormField message={errors.user_admin_email?.message} />}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="user_password" className="form-label">Password
                                            <i style={{fontSize: '12px'}}> (Minimum of 8 characters)</i></label>
                                        <input type="password"
                                               name="user_password"
                                               placeholder=""
                                               className="form-control"
                                               id="user_password"
                                               {...register('user_password')}
                                               aria-invalid={!!errors.user_password ? 'true' : 'false'}
                                        />
                                        {!!errors.user_password && <InvalidFormField message={errors.user_password?.message} />}
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
                                        id="agree_to_register_user"
                                        {...register('agree_to_register_user')}
                                        aria-invalid={!!errors.agree_to_register_user ? 'true' : 'false'}
                                    />
                                    {!!errors.agree_to_register_user && <InvalidFormField message={errors.agree_to_register_user?.message} />}
                                    <label
                                        className="form-check-label"
                                        htmlFor="agree_to_register_user"
                                    >
                                        I agree to the <Link to="/terms-and-conditions">Terms and Conditions</Link> of Khronos
                                    </label>
                                </div>
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        name=""
                                        className="form-check-input"
                                        id="verify_user_information"
                                        {...register('verify_user_information')}
                                        aria-invalid={!!errors.verify_user_information ? 'true' : 'false'}
                                    />
                                    {!!errors.verify_user_information && <InvalidFormField message={errors.verify_user_information?.message} />}
                                    <label
                                        className="form-check-label"
                                        htmlFor="verify_user_information"
                                    >I verify that the information provided are true</label>
                                </div>
                                <div className="mb-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary fw-lighter btn-lg"
                                    >Register Profile</button>
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

export default CreateUserForm;
