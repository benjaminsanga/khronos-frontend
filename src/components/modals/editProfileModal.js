import { yupResolver } from "@hookform/resolvers/yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { EditProfileSchema } from "../../form-schema/editProfileSchema";
import { InvalidFormField } from "../Errors/invalidFormField";
import { useEditProfile } from "../../hooks/customHooks";
import { useEffect } from "react";

function EditProfileModal(props) {
  console.log(props?.data, 'props?.data');

  const {
	  register,
	  handleSubmit,
	  formState: {errors},
	  setValue
  } = useForm({
	  resolver: yupResolver(EditProfileSchema)
  })

  const {
	isLoading,
	isError,
	error,
	isSuccess,
	mutate
  } = useEditProfile()

  useEffect(() => {
	setValue('account_name', props?.data?.account_name)
	setValue('account_admin_lastname', props?.data?.account_admin_lastname)
	setValue('account_admin_firstname', props?.data?.account_admin_firstname)
	setValue('account_admin_phone', props?.data?.account_admin_phone)
  }, [props?.data, setValue])

  useEffect(() => {
	if (isSuccess) {
		props.onHide()
	}
  }, [isSuccess, props])

  const handleSubmitEdit = (data) => {
	mutate(data)
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
		<p>Address and Email data are not editable.</p>
	  	<form onSubmit={handleSubmit(handleSubmitEdit)}>
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
			<div className="d-flex flex-row justify-content-between mb-3">
				<div>
					{isError && <p className="text-danger">{error?.response?.data?.message}</p>}
					<Button
						type="submit"
						className="btn btn-primary px-4"
					>{isLoading && <i className="fa fa-spinner fa-spin"></i>} Edit Profile</Button>
				</div>
				<div>
					<Button onClick={props.onHide} className="btn-secondary px-4">Close</Button>
				</div>
			</div>
		</form>
      </Modal.Body>
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
}

export default EditProfileModal;
