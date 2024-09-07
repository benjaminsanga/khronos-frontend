import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import VerifyAccount from "./verifyAccount";
import {useCreateAccount, useGetStatesAndLgas} from "../../hooks/customHooks";
import {InvalidFormField} from "../Errors/invalidFormField";
import { CreateAccountSchema } from "../../form-schema/createAccountSchema";

const CreateAccountForm = () => {
    const [states, setStates] = useState({});
    const [lgas, setLgas] = useState([]);

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch
    } = useForm({
        resolver: yupResolver(CreateAccountSchema)
    })

    const {
        isLoading: isStatesLoading,
        isSuccess: isStatesSuccess,
        data: statesData
    } = useGetStatesAndLgas()

    const {
        isSuccess: isCreateAccountSuccess,
        isError: isCreateAccountError,
        isLoading,
        error,
        mutate
    } = useCreateAccount()

    useEffect(() => {
        setStates(statesData?.data)
    }, [statesData])

    const handleStateSelectionChange = (e) => {
        const selectedState = e.target.value;
        setLgas(states[selectedState]);
    }

    const handleSubmitAccount = (data) => {
        const transformedValues = {
            ...data,
            agree_to_register_account: data.agree_to_register_account === "on",
          }
        mutate(transformedValues)
    }

    return (
        <>
            <div id="create-account" className='container'>
                {isCreateAccountSuccess ? <VerifyAccount/> :
                    <div className="d-flex flex-column align-items-center">
                        <h2 className="mb-5">Register Account</h2>
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <h5 className="mb-4">Profile</h5>
                            <form onSubmit={handleSubmit(handleSubmitAccount)}>
                                <div className="mb-3">
                                    <label htmlFor="account_name" className="form-label">Account Name <i
                                        style={{fontSize: '12px'}}> (Text only)</i></label>
                                    <input 
                                        type="text" 
                                        name="account_name" 
                                        placeholder="" 
                                        className="form-control"
                                        id="account_name" 
                                        aria-describedby="accountNameHelp"
                                        {...register('account_name')}
                                        aria-invalid={!!errors.account_name ? 'true' : 'false'}
                                    />
                                    {!!errors.account_name && <InvalidFormField message={errors.account_name?.message} />}
                                    <div id="accountNameHelp" className="form-text">The name of community or group</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="account_state" className="form-label">State</label>
                                        {isStatesLoading ? <div><i className="fa fa-spinner fa-spin"></i></div> : 
                                            isStatesSuccess && <select 
                                            className="form-select" 
                                            id="account_state" 
                                            name="account_state"
                                            aria-label="form-select example"
                                            {...register('account_state')}
                                            aria-invalid={!!errors.account_state ? 'true' : 'false'}
                                            onChange={(e) => handleStateSelectionChange(e)}
                                        >
                                            <option defaultValue value="">Select</option>
                                            {
                                                Object.keys(states || {})?.sort()?.map((state, index) => {
                                                        return <option value={state}
                                                                       key={index}>{state}</option>
                                                    })
                                            }
                                        </select>}
                                        {!!errors.account_state && <InvalidFormField message={errors.account_state?.message} />}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="account_lga" className="form-label">LGA</label>
                                        {isStatesLoading ? <div><i className="fa fa-spinner fa-spin"></i></div> : 
                                            isStatesSuccess && <select 
                                            className="form-select" 
                                            id="account_lga" 
                                            name="account_lga"
                                            aria-label="form-select example"
                                            {...register('account_lga')}
                                            aria-invalid={!!errors.account_lga ? 'true' : 'false'}
                                        >
                                            <option defaultValue value="">Select</option>
                                            {
                                                lgas?.map((lga, index) => {
                                                    return <option value={lga} key={index}>{lga}</option>
                                                })
                                            }
                                        </select>}
                                        {!!errors.account_lga && <InvalidFormField message={errors.account_lga?.message} />}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="account_address" className="form-label">Address</label>
                                    <input 
                                        type="text" 
                                        name="account_address" 
                                        placeholder="" 
                                        className="form-control"
                                        id="account_address"
                                        {...register('account_address')}
                                        aria-invalid={!!errors.account_address ? 'true' : 'false'}
                                    />
                                    {!!errors.account_address && <InvalidFormField message={errors.account_address?.message} />}
                                </div>
                                <h5 className="mt-4 mb-3">Account Admin</h5>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="account_admin_firstname" className="form-label">First
                                            name</label>
                                        <input 
                                            type="text" 
                                            name="account_admin_firstname" 
                                            placeholder=""
                                            className="form-control" 
                                            id="account_admin_firstname"
                                            {...register('account_admin_firstname')}
                                            aria-invalid={!!errors.account_admin_firstname ? 'true' : 'false'}
                                        />
                                        {!!errors.account_admin_firstname && <InvalidFormField message={errors.account_admin_firstname?.message} />}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="account_admin_lastname" className="form-label">Last name</label>
                                        <input
                                            type="text"
                                            name="account_admin_lastname"
                                            placeholder=""
                                            className="form-control"
                                            id="account_admin_lastname"
                                            {...register('account_admin_lastname')}
                                            aria-invalid={!!errors.account_admin_lastname ? 'true' : 'false'}
                                        />
                                        {!!errors.account_admin_lastname && <InvalidFormField message={errors.account_admin_lastname?.message} />}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="account_admin_gender" className="form-label">Gender</label>
                                        {/* <select
                                            className="form-select"
                                            id="account_admin_gender"
                                            aria-label="form-select example"
                                            {...register('account_admin_gender')}
                                            aria-invalid={!!errors.account_admin_gender ? 'true' : 'false'}
                                        >
                                            <option defaultValue value="">Select</option>
                                            <option value="female">Female</option>
                                            <option value="male">Male</option>
                                        </select> */}
                                        <div>
                                            <label class={`border border-primary border-2 px-2 py-1 rounded me-3 ${watch('account_admin_gender') === 'female' ? 'bg-primary text-white' : ''}`}>
                                                <input
                                                    type="radio"
                                                    value="female"
                                                    {...register('account_admin_gender')}
                                                    className="d-none"
                                                />{' '}
                                                Female
                                            </label>
                                            <label class={`border border-primary border-2 px-2 py-1 rounded ${watch('account_admin_gender') === 'male' ? 'bg-primary text-white' : ''}`}>
                                                <input
                                                    type="radio"
                                                    value="male"
                                                    {...register('account_admin_gender')}
                                                    className="d-none"
                                                />{' '}
                                                Male
                                            </label>
                                        </div>

                                        {!!errors.account_admin_gender && <InvalidFormField message={errors.account_admin_gender?.message} />}
                                    </div>
                                    <div className="col-md-6 mb-3"></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="account_admin_phone"
                                            className="form-label"
                                        >Contact Phone <i style={{fontSize: '12px'}}> (+2348000000000)</i></label>
                                        <input
                                            type="phone"
                                            name="account_admin_phone"
                                            placeholder=""
                                            className="form-control"
                                            id="account_admin_phone"
                                            {...register('account_admin_phone')}
                                            aria-invalid={!!errors.account_admin_phone ? 'true' : 'false'}
                                        />
                                        {!!errors.account_admin_phone && <InvalidFormField message={errors.account_admin_phone?.message} />}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="account_admin_email"
                                            className="form-label"
                                        >Contact Email</label>
                                        <input
                                            type="email"
                                            name="account_admin_email"
                                            placeholder=""
                                               className="form-control"
                                            id="account_admin_email"
                                            {...register('account_admin_email')}
                                            aria-invalid={!!errors.account_admin_email ? 'true' : 'false'}
                                        />
                                        {!!errors.account_admin_email && <InvalidFormField message={errors.account_admin_email?.message} />}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="account_password" className="form-label">Password</label>
                                        <input 
                                            type="password"
                                            name="account_password"
                                            placeholder=""
                                            className="form-control"
                                            id="account_password"
                                            {...register('account_password')}
                                            aria-invalid={!!errors.account_password ? 'true' : 'false'}
                                        />
                                        <p className="small-text mb-0"> (Minimum of 8 characters, one uppercase, one number and one special case character)</p>
                                        {!!errors.account_password && <InvalidFormField message={errors.account_password?.message} />}
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
                                        name="agree_to_register_account"
                                        className="form-check-input"
                                        id="agree_to_register_account"
                                        {...register('agree_to_register_account')}
                                        aria-invalid={!!errors.agree_to_register_account ? 'true' : 'false'}
                                    />
                                    {!!errors.agree_to_register_account && <InvalidFormField message={errors.agree_to_register_account?.message} />}
                                    <label
                                        className="form-check-label"
                                        htmlFor="agree_to_register_account"
                                    >
                                        I agree to the <Link to="/terms-and-conditions">Terms and Conditions</Link> of Khronos
                                    </label>
                                </div>
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        name="verify_account_information"
                                        className="form-check-input"
                                        id="verify_account_information"
                                        {...register('verify_account_information')}
                                        aria-invalid={!!errors.verify_account_information ? 'true' : 'false'}
                                    />
                                    {!!errors.verify_account_information && <InvalidFormField message={errors.verify_account_information?.message} />}
                                    <label
                                        className="form-check-label"
                                        htmlFor="verify_account_information"
                                    >I verify that the information provided are true</label>
                                </div>
                                <div className="mb-3">
                                    {isCreateAccountError && <p className="text-danger">{error?.response?.data?.message}</p>}
                                    <button
                                        type="submit"
                                        className="btn btn-primary fw-lighter btn-lg"
                                    >{isLoading && <i className="fa fa-spinner fa-spin"></i>} Register Profile</button>
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

export default CreateAccountForm;
