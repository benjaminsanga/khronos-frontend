import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toFirstLetterUpperCase } from "../../utils/utilities";
import Loading from '../../utils/loading';
import {useGetProjectById, useGetProjectDeposits} from "../../hooks/customHooks";

const ProjectDashboardPage = () => {

    const { id } = useParams();

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

    const [projectInfo, setProjectInfo] = useState({});
    const [deposits, setDeposits] = useState([]);

    useEffect(() => {
        // set states values in hook array
        setProjectInfo(projectData?.data?.result);
        setDeposits(depositData?.data);
    }, [depositData?.data, projectData?.data]);

    return (
        <>
            {(depositLoading || projectLoading) && <Loading />}
            {(depositSuccess && projectSuccess) && <div id="dashboard" className="container">
                <div className="row account-info">
                    <h2 className="text-center"><span>{toFirstLetterUpperCase(projectInfo?.account_name)} </span>Project Dashboard</h2>
                    <div className="col-md-6">
                        <h3>{toFirstLetterUpperCase(projectInfo?.project_name)}</h3>
                        <span>Code: <strong>{projectInfo?.project_code}</strong></span><br/>
                        <span>Share: <code>{`https://khronos.herokuapp.com/deposit/${projectInfo?.project_code}`}</code></span>
                    </div>
                    <div className="col-md-6 text-end">
                        <p>Status: <span className="text-success">Open</span></p>
                        <p>Created: {projectInfo?.createdAt?.slice(0, 10)}</p>
                    </div>
                </div>
                <div className="row text-center project-stats">
                    <div className="col-md-3">
                        <p>Target</p>
                        <h2>{projectInfo?.project_target}</h2>
                    </div>
                    <div className="col-md-3">
                        <p>Raised</p>
                        <h2>N/A</h2>
                    </div>
                    <div className="col-md-3">
                        <p>Progress</p>
                        <h2>N/A</h2>
                    </div>
                    <div className="col-md-3">
                        <p>Difference</p>
                        <h2>N/A</h2>
                    </div>
                </div>
                <div className="row payments">
                    <h2>Deposits</h2>
                    <div>
                        <table className="table table-striped table-hover">
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
                                    deposits?.length > 0 && deposits?.map(({
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
                        </table>
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
