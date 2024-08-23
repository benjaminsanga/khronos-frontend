import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import HappyFaceIcon from "../../assets/images/happy_face.svg";
import Loading from "../../utils/loading";
import { useGetConfirmFlutterwavePayment } from "../../hooks/customHooks";

const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

const PaymentRedirect = () => {
  const query = useQuery();
  const status = query.get("status");
  const tx_ref = query.get("tx_ref");
  const transaction_id = query.get("transaction_id");

  const {
    isSuccess,
    data,
    isError,
    error,
    isLoading,
  } = useGetConfirmFlutterwavePayment(status, tx_ref, transaction_id);

  return (
    <>
      {isLoading && (
        <>
          <Loading />
        </>
      )}

      <div className="row w-100 my-5">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="d-flex flex-column align-items-center justify-content-center text-center success">
            {isSuccess &&
              data?.data?.message === "success" &&
              status !== "cancelled" && (
                <>
                  <img src={HappyFaceIcon} alt="Successful" />
                  <h3>Payment Successful!</h3>
                  <p>
                    Your payment has been recorded and an email has been sent to
                    you.
                  </p>
                  <span className="fw-lighter my-3">
                    Follow us for more{" "}
                    <strong>
                      <em>
                        <Link
                          to="https://x.com/khronos"
                          className="text-decoration-none"
                        >
                          @khronos
                        </Link>
                      </em>
                    </strong>
                  </span>
                </>
              )}
            {status === "cancelled" && (
              <p className="text-center text-primary my-5 py-5">
                Your transaction was cancelled.
              </p>
            )}
            {isError && <p>{error?.response?.data?.message}</p>}
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default PaymentRedirect;
