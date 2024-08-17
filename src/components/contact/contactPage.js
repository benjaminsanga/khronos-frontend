import FacebookIcon from '../../assets/icons/facebook.svg';
import TwitterIcon from '../../assets/icons/twitter.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import { SendMessageSchema } from '../../form-schema/sendMessageSchema';
import { useForm } from 'react-hook-form';
import { useSendMessage } from '../../hooks/customHooks';
import { useEffect, useState } from 'react';
import { InvalidFormField } from '../Errors/invalidFormField';
import CheckIcon from '../../assets/icons/circle-check.svg';

const ContactPage = () => {

    const [feedback, setFeedback] = useState(null)

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        resolver: yupResolver(SendMessageSchema)
    })

    const {
        mutate,
        isLoading,
        isError,
        error,
        isSuccess
    } = useSendMessage()

    useEffect(() => {
        if (isError) {
            setFeedback(error?.message)
        }
    }, [isError, error])

    const handleSendMessage = (data) => {
        mutate(data)
    }

    return (
        <div id="contact" className="container-fluid pt-0">
            <section className="row">
                <div className="col-md-6 p-0">
                    <p>React Out</p>
                    <h3>Get in Touch With Us</h3>
                    <p className='mb-5'>
                        Partner with Khronos to overcome financial challenges and empower your community. We're here to provide seamless, secure solutions. Connect with us today to shape a brighter, more prosperous future together.
                    </p>
                    <div className="d-flex flex-row">
                        <span className='icon bg-secondary fa fa-map-marker fs-3 text-white ps-3'></span>
                        <div className='d-inline'>
                            <h6 className='m-0'>Address</h6>
                            <p className='mt-0 mb-4'>Nigeria - Remote</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row">
                        <span className='icon bg-secondary fa fa-envelope fs-4 text-white'></span>
                        <div className='d-inline'> 
                            <h6 className='m-0'>Email</h6>
                            <p className='mt-0 mb-4'>khronos@gmail.com</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row">
                        <span className='icon bg-secondary fa fa-phone fs-3 text-white'></span>
                        <div className='d-inline'>
                            <h6 className='m-0'>Phone</h6>
                            <p className='mt-0 mb-4'>+2347062220012</p>
                        </div>
                    </div>
                    <div className="row icons">
                        <h6 className='mt-0 mb-2'>Socials</h6>
                        <ul>
                            <li><a href="https://www.twitter.com/khronos" target="_blank" rel="noreferrer"><img src={TwitterIcon} alt="Twitter" className="icon" /></a></li>
                            <li><a href="https://www.facebook.com/khronos" target="_blank" rel="noreferrer"><img src={FacebookIcon} alt="Facebook" className="icon" /></a></li>
                            <li><a href="https://www.facebook.com/khronos" target="_blank" rel="noreferrer"><img src={InstagramIcon} alt="Instagram" className="icon" /></a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-6 mt-4 p-0">
                    {isSuccess && <div className="d-flex flex-column align-items-center justify-content-center h-100">
                        <img src={CheckIcon} alt="Message Sent" width={72} />
                        <p>Message Sent!</p>
                    </div>}
                    {!isSuccess && <form onSubmit={handleSubmit(handleSendMessage)}>
                        <div>
                            {/* <label htmlFor="name" className="form-label">Name</label> */}
                            <input
                                type="name"
                                name="name"
                                placeholder="Name"
                                className="form-control"
                                id="name"
                                {...register('name')}
                                aria-invalid={!!errors.name ? 'true' : 'false'}
                                disabled={isLoading}
                            />
                            {!!errors.name && <InvalidFormField message={errors.name?.message} />}
                        </div>
                        <div>
                            {/* <label htmlFor="email" className="form-label">Email</label> */}
                            <input
                                type="email"
                                name="email"
                                placeholder="name@email.com"
                                className="form-control"
                                id="email"
                                {...register('email')}
                                aria-invalid={!!errors.email ? 'true' : 'false'}
                                disabled={isLoading}
                            />
                            {!!errors.email && <InvalidFormField message={errors.email?.message} />}
                        </div>
                        <div>
                            {/* <label htmlFor="message" className="form-label">Message</label> */}
                            <textarea
                                rows="4" cols="50" maxlength="200"
                                name="message"
                                placeholder="Type your message here..."
                                className="form-control"
                                id="message"
                                {...register('message')}
                                aria-invalid={!!errors.message ? 'true' : 'false'}
                                disabled={isLoading}
                                style={{resize: 'none'}}
                            ></textarea>
                            {!!errors.message && <InvalidFormField message={errors.message?.message} />}
                        </div>
                        <div>
                            <label>{feedback}</label>
                            <button
                                type="submit"
                                className="btn btn-primary fw-lighter btn-lg w-100"
                                disabled={isLoading}
                            >
                                {isLoading && <i className="fa fa-spinner fa-spin"></i>} Send Message
                            </button>
                        </div>
                    </form>}
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
