import { yupResolver } from "@hookform/resolvers/yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { InvalidFormField } from "../Errors/invalidFormField";
import { useChangePassword } from "../../hooks/customHooks";
import { useEffect } from "react";
import { ChangePasswordSchema } from "../../form-schema/changePasswordSchema";
import toast from "react-hot-toast";

function ChangePasswordModal(props) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePasswordSchema),
  });

  const { isLoading, isError, error, isSuccess, mutate } = useChangePassword();

  useEffect(() => {
    if (isSuccess) {
      props.onHide();
      toast.success('Password updated successfully')
    }
    if (isError) {
      toast.error('Error updating password')
    }
  }, [isSuccess, props, isError]);

  const handleSubmitEdit = (data) => {
    mutate({ data, id: props?.id });
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(handleSubmitEdit)}>
          <div className="mb-3">
            <label htmlFor="current_password" className="form-label">
              Current Password
            </label>
            <input
              type="password"
              name="current_password"
              placeholder=""
              className="form-control"
              id="current_password"
              {...register("current_password")}
              aria-invalid={!!errors.current_password ? "true" : "false"}
            />
            {!!errors.current_password && (
              <InvalidFormField message={errors.current_password?.message} />
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="new_password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              name="new_password"
              placeholder=""
              className="form-control"
              id="new_password"
              {...register("new_password")}
              aria-invalid={!!errors.new_password ? "true" : "false"}
            />
            <p className="small-text mb-0">
              {" "}
              (Minimum of 8 characters, one uppercase, one number and one
              special case character)
            </p>
            {!!errors.new_password && (
              <InvalidFormField message={errors.new_password?.message} />
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_new_password" className="form-label">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirm_new_password"
              placeholder=""
              className="form-control"
              id="confirm_new_password"
              {...register("confirm_new_password")}
              aria-invalid={!!errors.confirm_new_password ? "true" : "false"}
            />
            {!!errors.confirm_new_password && (
              <InvalidFormField message={errors.confirm_new_password?.message} />
            )}
          </div>
          <div className="mb-3">
            {isError && (
              <p className="text-danger">{error?.response?.data?.message}</p>
            )}
            <div className="d-flex flex-row justify-content-between">
              <div>
                <Button type="submit" className="btn btn-primary px-4">
                  {isLoading && <i className="fa fa-spinner fa-spin"></i>} Continue
                </Button>
              </div>
              <div>
                <Button onClick={props.onHide} className="btn-secondary px-4">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
}

export default ChangePasswordModal;
