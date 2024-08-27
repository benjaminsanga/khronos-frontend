import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDateTime, getHost, getMonetaryNumber, isRaisedMoreThanHalf, toFirstLetterUpperCase } from "../../utils/utilities";
import Loading from '../../utils/loading';
import {useGetProjectById, useGetProjectDeposits} from "../../hooks/customHooks";
import { useSelector } from "react-redux";

const ProjectDashboardPage = () => {
    const { id } = useParams();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const [projectInfo, setProjectInfo] = useState({});
    const [deposits, setDeposits] = useState([]);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [shareError, setShareError] = useState('')
    const host = getHost()

    const {
        isLoading: projectLoading,
        isSuccess: projectSuccess,
        data: projectData
    } = useGetProjectById(id)
    
    const {
        isLoading: isDepositLoading,
        isSuccess: isDepositSuccess,
        data: depositData,
        isError: isDepostError,
        error: depositError,
        refetch
    } = useGetProjectDeposits(id, page, limit)

    useEffect(() => {
        setProjectInfo(projectData?.data);
        setDeposits(depositData?.data);
    }, [depositData?.data, projectData?.data, isDepostError, depositError]);

    useEffect(() => {
      refetch()
    }, [page, limit, refetch])

    const handleShareLink = (title, text, url) => {
        const data = { title, text, url }

        if (navigator.canShare && navigator.canShare(data)) {
            navigator.share(data)
        } else {
            // not supported
            setShareError('This browser does not support sharing.')
        }
    }

    return (
        <>
            {(isDepositLoading || projectLoading) && <>
                <Loading />
                {isDepostError && <p>{depositError?.message}</p>}
            </>}
            {(isDepositSuccess && projectSuccess) && <div id="dashboard" className="container-fluid">
                <p className="mb-0">Project Dashboard</p>
                <div className="row pb-2 bottom-line">
                    <div className="col-md-8">
                        <h4>{toFirstLetterUpperCase(projectInfo?.account_name)}</h4>
                    </div>
                    <div className="col-md-4">
                        <button 
                            className="btn btn-sm btn-secondary text-primary px-3 py-1"
                            onClick={() => handleShareLink(
                                toFirstLetterUpperCase(projectInfo?.project_name),
                                projectInfo?.project_purpose,
                                `${host}/project/dashboard/${projectInfo?.id}`
                            )}
                        >
                            <i className="fa fa-share me-1"></i> Share Project Link
                        </button>
                    </div>
                </div>
                <div className="row account-info mt-5">
                    <div className="col-md-6">
                        <p className="p-0 m-0 bo">Title</p>
                        <p className="p-0"><strong>{toFirstLetterUpperCase(projectInfo?.project_name)}</strong></p>
                        <p className="p-0 m-0">Address</p>
                        <p className="p-0"><strong>{projectInfo?.account_address}</strong></p>
                        <p className="p-0 m-0">End Date</p>
                        <p className="p-0"><strong>{projectInfo?.contribution_end_date?.substr(0, 10)}</strong></p>
                    </div>
                    <div className="col-md-6">
                        <p>Project Code<br/><strong>{projectInfo?.project_code}</strong></p>
                        <p>Deposit Link<br/><code>{`${host}/deposit/${projectInfo?.project_code}`}</code></p>
                        <div className="d-flex flex-row justify-content-between">
                            <button 
                                className="btn btn-sm btn-primary text-white px-3 py-1"
                                onClick={() => handleShareLink(
                                    toFirstLetterUpperCase(projectInfo?.project_name),
                                    projectInfo?.project_purpose,
                                    `${host}/deposit/${projectInfo?.project_code}`
                                )}
                            >
                                <i className="fa fa-share me-1"></i> Share Deposit Link
                            </button>
                        </div>
                        <span className="text-warning">{shareError}</span>
                    </div>
                </div>
                <div className="row account-info mt-1">
                    <div className="row g-3">
                        <div className="col-4">
                            <div className="dashboard-item p-3">
                                <p className="p-0 m-0 mb-2">Target</p>
                                <h4 className="m-0">{projectInfo?.project_target_amount}</h4>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dashboard-item p-3">
                                <p className="p-0 m-0 mb-2">Raised</p>
                                <h4 className={`m-0 ${isRaisedMoreThanHalf(projectInfo?.project_target_amount, projectInfo?.total_amount) ? 'text-success' : 'text-danger'}`}>
                                    {getMonetaryNumber(projectInfo?.total_amount) || 0} ({getMonetaryNumber((projectInfo?.total_amount / projectInfo?.project_target_amount) * 100) || 0}%)
                                </h4>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dashboard-item p-3">
                                <p className="p-0 m-0 mb-2">Difference</p>
                                <h4 className="m-0">{getMonetaryNumber(projectInfo?.project_target_amount - projectInfo?.total_amount) || 0}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row payments">
                    <h2>Deposits</h2>
                    <div>
                        {deposits?.length === 0 ? <p>No deposits, yet.</p> :
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Phone</th>
                                {/* <th scope="col">Email</th> */}
                                <th scope="col">Date/Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    deposits?.map(({
                                                        name,
                                                        amount,
                                                        phone,
                                                        // email,
                                                        updated_at
                                                   }, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>{name}</td>
                                                <td>{isAuthenticated ? amount : '*****'}</td>
                                                <td>{phone}</td>
                                                {/* <td>{email}</td> */}
                                                <td>{formatDateTime(updated_at)}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>}
                        {deposits?.length > 0 && <div className="d-flex flex-row justify-content-between align-items-center my-5">
                            <div>
                                <button className={`btn btn-secondary text-primary ${page === 1 && 'disabled'}`} onClick={() => setPage(page - 1)}>Previous</button>
                                <button className={`btn btn-primary text-white ms-3`} onClick={() => setPage(page + 1)}>Next</button>
                                {isDepositLoading && <i className="fa fa-spinner fa-spin"></i>}
                            </div>                            
                            <div className="d-flex flex-row">
                                <h6 className="ms-3 mt-2">Per Page</h6>
                                <select 
                                    className="ms-1 px-3 py-1 border-primary" style={{borderWidth: '2px'}}
                                    onChange={(e) => setLimit(e?.target?.value)}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                </select>
                            </div>
                        </div>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <p>Want to contribute to this project?</p>
                        <Link to={`/deposit/${projectInfo?.project_code}`}>
                            <button className="btn btn-primary fw-lighter btn-lg w-100">Deposit</button>
                        </Link>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>}
        </>
    );
};

export default ProjectDashboardPage;
