import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toFirstLetterUpperCase } from "../../utils/utilities";
import Loading from '../../utils/loading';
import {useGetProjectById, useGetProjectDeposits} from "../../hooks/customHooks";

const ProjectDashboardPage = () => {

    const { id } = useParams();
    const [projectInfo, setProjectInfo] = useState({});
    const [deposits, setDeposits] = useState([]);

    const {
        isLoading: projectLoading,
        isSuccess: projectSuccess,
        data: projectData
    } = useGetProjectById(id)
    
    const {
        isLoading: depositLoading,
        isSuccess: depositSuccess,
        data: depositData
    } = useGetProjectDeposits(id)

    useEffect(() => {
        setProjectInfo(projectData?.data);
        setDeposits(depositData?.data);
    }, [depositData?.data, projectData?.data]);

    return (
        <>
            {(depositLoading || projectLoading) && <Loading />}
            {(depositSuccess && projectSuccess) && <div id="dashboard" className="container">
                <div className="row account-info">
                    <h2 className="text-center"><span>{toFirstLetterUpperCase(projectInfo?.account_name)} </span>Project Dashboard</h2>
                    <div className="col-md-6">
                        <p className="p-0 m-0">Title</p>
                        <p className="p-0"><strong>{toFirstLetterUpperCase(projectInfo?.project_name)}</strong></p>
                        <p className="p-0 m-0">Address</p>
                        <p className="p-0"><strong>{projectInfo?.account_address}</strong></p>
                    </div>
                    <div className="col-md-6">
                        <p>Project Code<br/><strong>{projectInfo?.project_code}</strong></p>
                        <p>Deposit Link<br/><code>{`https://khronos.herokuapp.com/deposit/${projectInfo?.project_code}`}</code></p>
                    </div>
                </div>
                <div className="row text-center project-stats">
                    <div className="col-md-3">
                        <p>Target</p>
                        <h2>{projectInfo?.project_target_amount}</h2>
                    </div>
                    <div className="col-md-3">
                        <p>Raised</p>
                        <h2>{projectData?.total_amount || 0}</h2>
                    </div>
                    <div className="col-md-3">
                        <p>Progress</p>
                        <h2>{((projectInfo?.total_amount / projectInfo?.project_target_amount) / 100) || 0}%</h2>
                    </div>
                    <div className="col-md-3">
                        <p>Difference</p>
                        <h2>{(projectInfo?.project_target_amount - projectInfo?.total_amount) || 0}</h2>
                    </div>
                </div>
                <div className="row payments">
                    <h2>Deposits</h2>
                    <div>
                        {deposits?.length === 0 && <p>No deposits, yet.</p>} 
                        {deposits?.length > 0 && <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    deposits?.map(({
                                                        name,
                                                        amount,
                                                        phone,
                                                        email,
                                                       createdAt
                                                   }, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>{name}</td>
                                                <td>{amount}</td>
                                                <td>{phone}</td>
                                                <td>{email}</td>
                                                <td>{createdAt}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <p>Want to contribute to account's project?</p>
                        <Link to={`/deposit/${id}`}>
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
