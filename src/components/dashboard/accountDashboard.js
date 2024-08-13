import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toFirstLetterUpperCase } from "../../utils/utilities";
import Loading from "../../utils/loading";
import {useGetAccountProjects, useGetAccount} from "../../hooks/customHooks";
import {useSelector} from "react-redux";

const AccountDashboardPage = () => {

    // const location = useLocation();
    const { id } = useParams();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    const {
        isLoading: accountLoading,
        isSuccess: accountSuccess,
        data: accountData
    } = useGetAccount(id)
    const {
        isLoading: projectsLoading,
        isSuccess: projectsSuccess,
        data: projectsData
    } = useGetAccountProjects(id)

    const [accountInfo, setAccountInfo] = useState({});
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setAccountInfo(accountData?.data)
        setProjects(projectsData?.data)
    }, [accountData, projectsData]);

    
    return (
        <>
            {(accountLoading || projectsLoading) && <Loading />}
            {(accountSuccess && projectsSuccess) && <div id="dashboard" className="container">
            <div className="row account-info">
                <div className="col-md-6">
                    <h2>{toFirstLetterUpperCase(accountInfo?.account_name)}</h2>
                    <h5>Location</h5>
                    <p>{`${toFirstLetterUpperCase(accountInfo?.account_address)}, ${accountInfo?.account_lga}, ${accountInfo?.account_state} `}</p>
                    <h5>Created</h5>
                    <p>{accountInfo?.created_at?.slice(0, 10)}</p>
                </div>
                <div className="col-md-6">
                    <h5>Account Admin</h5>
                    <p>{`${toFirstLetterUpperCase(accountInfo?.account_admin_firstname)} ${toFirstLetterUpperCase(accountInfo?.account_admin_lastname)} `}</p>
                    <h5>Phone</h5>
                    <p>{accountInfo?.account_admin_phone}</p>
                    <h5>Email</h5>
                    <p>{accountInfo?.account_admin_email}</p>
                </div>
            </div>
            <div className="row payments">
                <h2>Projects</h2>
                <div>
                    {projects?.length === 0 ? <p>No Projects, yet!</p> :
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Purpose</th>
                            <th scope="col">Target</th>
                            <th scope="col">Code</th>
                            <th scope="col">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects?.map(({
                                                id,
                                                project_code,
                                                project_name,
                                                project_purpose,
                                                project_target_amount,
                                                contribution_end_date
                                            }, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>
                                            <Link to={`/project/dashboard/${id}`}>
                                                {project_name}
                                            </Link>
                                        </td>
                                        <td>{project_purpose}</td>
                                        <td>{project_target_amount}</td>
                                        <td>{project_code}</td>
                                        <td>{contribution_end_date?.slice(0, 10)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>     
            {isAuthenticated &&
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <Link to="/create-project">
                        <button className="btn btn-primary fw-lighter btn-lg w-100">Create Project</button>
                    </Link>
                </div>
                <div className="col-md-4"></div>
            </div>
            }
        </div>
        }
        </>
    );
};

export default AccountDashboardPage;
