import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toFirstLetterUpperCase } from "../../utils/utilities";
import Loading from "../../utils/loading";
import { useGetAccountProjects, useGetAccount } from "../../hooks/customHooks";
import { useSelector } from "react-redux";
import EditProfileModal from "../modals/editProfileModal";

const AccountDashboardPage = () => {
  // const location = useLocation();
  const { id } = useParams();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const {
    isLoading: accountLoading,
    isSuccess: accountSuccess,
    data: accountData,
  } = useGetAccount(id);

  const {
    isLoading: projectsLoading,
    isSuccess: projectsSuccess,
    data: projectsData,
    refetch
  } = useGetAccountProjects(id);

  const [accountInfo, setAccountInfo] = useState({});
  const [projects, setProjects] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setAccountInfo(accountData?.data);
    setProjects(projectsData?.data);
  }, [accountData, projectsData]);

  return (
    <>
      {(accountLoading || projectsLoading) && <Loading />}
      {accountSuccess && projectsSuccess && (
        <div id="dashboard" className="container-fluid" onLoad={() => refetch()}>
          <div className="bottom-line">
            <h4>
              Hello,{" "}
              {`${toFirstLetterUpperCase(
                accountInfo?.account_admin_firstname
              )} ${toFirstLetterUpperCase(
                accountInfo?.account_admin_lastname
              )} `}
            </h4>
            <div className="d-flex flex-row justify-content-between">
              <p>{new Date().toDateString()}</p>
              <button className="btn" onClick={() => setModalShow(true)}>Edit Profile</button>
            </div>
          </div>
          <div className="row account-info mt-1">
            <div className="row g-3">
                <div className="col-4">
                    <div className="dashboard-item p-3">
                        <p className="p-0 m-0 mb-2">Account Name</p>
                        <h6 className="m-0">{accountInfo?.account_name}</h6>
                    </div>
                </div>
                <div className="col-4">
                    <div className="dashboard-item p-3">
                        <p className="p-0 m-0 mb-2">Created</p>
                        <h6 className="m-0">{accountInfo?.created_at?.slice(0, 10)}</h6>
                    </div>
                </div>
                <div className="col-4">
                    <div className="dashboard-item p-3">
                        <p className="p-0 m-0 mb-2">Phone</p>
                        <h6 className="m-0">{accountInfo?.account_admin_phone}</h6>
                    </div>
                </div>
            </div>
            <div className="row g-3 mt-1">
                <div className="col-4">
                    <div className="dashboard-item p-3">
                        <p className="p-0 m-0 mb-2">Email</p>
                        <h6 className="m-0">{accountInfo?.account_admin_email}</h6>
                    </div>
                </div>
                <div className="col-8">
                    <div className="dashboard-item p-3">
                        <p className="p-0 m-0 mb-2">Location</p>
                        <h6 className="m-0">{`${toFirstLetterUpperCase(accountInfo?.account_address)}, ${accountInfo?.account_lga}, ${accountInfo?.account_state} `}</h6>
                    </div>
                </div>
            </div>
          </div>
          <div className="row payments">
            <h5 className="mx-3 p-0 pb-3 bottom-line">Projects</h5>
            <div>
              {projects?.length === 0 ? (
                <p>No Projects, yet!</p>
              ) : (
                <table className="table table-striped table-hover w-100">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      {/* <th scope="col">Purpose</th> */}
                      <th scope="col">Target</th>
                      {/* <th scope="col">Code</th> */}
                      <th scope="col">End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects?.map(
                      (
                        {
                          id,
                          // project_code,
                          project_name,
                          // project_purpose,
                          project_target_amount,
                          contribution_end_date,
                        },
                        index
                      ) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <Link to={`/project/dashboard/${id}`}>
                                {project_name}
                              </Link>
                            </td>
                            {/* <td>{project_purpose}</td> */}
                            <td>{project_target_amount}</td>
                            {/* <td>{project_code}</td> */}
                            <td>{contribution_end_date?.slice(0, 10)}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          {isAuthenticated && (
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <Link to="/create-project">
                  <button className="btn btn-primary fw-lighter btn-lg w-100">
                    Create Project
                  </button>
                </Link>
              </div>
              <div className="col-md-4"></div>
            </div>
          )}
        </div>
      )}
      <EditProfileModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={accountInfo}
      />
    </>
  );
};

export default AccountDashboardPage;
