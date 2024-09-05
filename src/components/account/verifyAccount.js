import EmailIcon from '../../assets/icons/email.svg';
import AccountVerified from "./accountVerified";
import {useVerifyAccount} from "../../hooks/customHooks";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {VerifyAccountSchema} from "../../form-schema/verifyAccountSchema";
import {InvalidFormField} from "../Errors/invalidFormField";

const VerifyAccount = () => {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(VerifyAccountSchema)
    })

    const {
        mutate,
        isSuccess,
        isError,
        error
    } = useVerifyAccount()

    const handleVerify = (data) => {
        mutate(data)
    }

    return (
        <>
            {isSuccess && <AccountVerified />}

            {!isSuccess &&
            <div className="row" style={{maxWidth: '100%'}}>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="d-flex flex-column align-items-center justify-content-center success">
                        <img src={EmailIcon} alt="Email" />
                        <h3 className="py-2">Almost there!</h3>
                        <span className="pb-1">Enter the code we sent to your email to verify your account.</span>
                        <form onSubmit={handleSubmit(handleVerify)} className="w-100">
                            <input
                                type='text'
                                id='verification_code'
                                className='form-control text-center'
                                {...register('verification_code')}
                                aria-invalid={!!errors.verification_code ? "true" : "false"}
                            />
                            {!!errors.verification_code && <InvalidFormField message={errors.verification_code?.message} />}
                            {isError && <p className="text-center text-danger" id="submission-error">{error?.response?.data?.message}</p>}
                            <button className="btn btn-lg btn-primary fw-lighter mt-3" type="submit">Verify</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
            }
        </>
    );
}

export default VerifyAccount;
