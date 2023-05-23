import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// import AuthContext from '../../utils/clusterContext';
import { toFirstLetterUpperCase } from "../../utils/utilities";
import Loading from '../../utils/loading';

const ProjectDashboardPage = () => {

    // const location = useLocation();
    // const clusterContext = useContext(AuthContext); // get context
    const { id } = useParams();

    const [projectInfo, setProjectInfo] = useState({});
    const [deposits, setDeposits] = useState([]);

    useEffect(() => {
        const ac = new AbortController();
        
        const getUserInfo = async () => {
            // header options for api
            var options = {
                method: 'GET',
                url: `/project/dashboard/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            await axios.request(options).then((response) => {                

                // set states values in hook array
                setProjectInfo(response.data);

            }).catch(function (error) {
                console.error(error);
            });
        };

        const getAllDeposits = async () => {
            // header options for api
            var options = {
                method: 'GET',
                url: `/deposits/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            await axios.request(options).then((response) => {                

                setDeposits(response.data);

            }).catch(function (error) {
                console.error(error);
            });
        };

        getUserInfo();
        getAllDeposits();
        return ac.abort();
    }, [id]);

    return (
        <>
        {Object.keys(projectInfo).length <= 0 ? 

        // <h1 className="text-center" style={{margin: '15% 10px'}}>Project Not Found!</h1>
         <Loading />

        :

        <div id="dashboard" className="container">
            <div className="row user-info">
                <h2 className="text-center"><span>{toFirstLetterUpperCase(projectInfo.cluster_name)} </span>Project Dashboard</h2>
                <div className="col-md-6">
                    <h3>{toFirstLetterUpperCase(projectInfo.project_name)}</h3>
                    <span>Code: <strong>{projectInfo.project_code}</strong></span><br/>
                    <span>Share: <code>{`https://ajokudi.herokuapp.com/deposit/${projectInfo.project_code}`}</code></span>
                </div>
                <div className="col-md-6 text-end">
                    <p>Status: <span className="text-success">Open</span></p>
                    <p>Created: {projectInfo.createdAt.slice(0, 10)}</p>
                </div>
            </div>
            <div className="row text-center project-stats">
                <div className="col-md-3">
                    <p>Target</p>
                    <h2>{projectInfo.project_target}</h2>
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
                                deposits.map((deposit, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index+1}</th>
                                            <td>{deposit.name}</td>
                                            <td>{deposit.amount}</td>
                                            <td>{deposit.phone}</td>
                                            <td>{deposit.email}</td>
                                            <td>{deposit.createdAt}</td>
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
                    <p>Want to contribute to cluster's project?</p>
                    <Link to={`/deposit/${id}`}>
                        <button className="btn btn-primary fw-lighter btn-lg w-100">Deposit</button>
                    </Link>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
        }
        </>
    );
};

export default ProjectDashboardPage;
