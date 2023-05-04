import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AuthContext from '../../utils/clusterContext';
import { toFirstLetterUpperCase } from "../../utils/utilities";
import Loading from "../../utils/loading";

const ClusterDashboardPage = () => {

    // const location = useLocation();
    const clusterContext = useContext(AuthContext); // get context
    const { id } = useParams();

    const [clusterInfo, setClusterInfo] = useState({});
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const ac = new AbortController();
        
        const getClusterInfo = async () => {
            // header options for api
            var options = {
                method: 'GET',
                url: `/cluster/dashboard/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            await axios.request(options).then((response) => {                

                // set states values in hook array
                setClusterInfo(response.data);

            }).catch(function (error) {
                console.error(error);
            });
        };

        const getAllProjects = async () => {
            // header options for api
            var options = {
                method: 'GET',
                url: `/projects/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            await axios.request(options).then((response) => {  
                // set states values in hook array
                setProjects(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        };

        getClusterInfo();
        getAllProjects();
        return ac.abort();
    }, [id]);

    return (
        <>
        {Object.keys(clusterInfo).length <= 0 ? 
        
        <Loading />
        
        :

        <div id="dashboard" className="container">
            <div className="row user-info">
                <div className="col-md-6">
                    <h2>{toFirstLetterUpperCase(clusterInfo.cluster_name)}</h2>
                    <p><strong>Location:</strong> {`${toFirstLetterUpperCase(clusterInfo.cluster_address)}, ${clusterInfo.cluster_lga}, ${clusterInfo.cluster_state} `}</p>
                    <p><strong>Created:</strong> {clusterInfo.createdAt.slice(0, 10)}</p>
                </div>
                <div className="col-md-6">
                    <p><strong>Leader:</strong> {`${toFirstLetterUpperCase(clusterInfo.cluster_admin_firstname)} ${toFirstLetterUpperCase(clusterInfo.cluster_admin_lastname)} `}</p>
                    <p><strong>Phone:</strong> {clusterInfo.cluster_admin_phone}</p>
                    <p><strong>Email:</strong> {clusterInfo.cluster_admin_email}</p>
                </div>
            </div>
            <div className="row payments">
                <h2>Projects</h2>
                <div>
                    {!projects ? <p>No Projects</p> :
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
                            {projects.map((project, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>
                                            <Link to={`/project/dashboard/${project.project_code}`}>
                                                {project.project_name}
                                            </Link>
                                        </td>
                                        <td>{project.project_purpose}</td>
                                        <td>{project.project_target}</td>
                                        <td>{project.project_code}</td>
                                        <td>{project.contribution_end_date}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>     
            {clusterContext.token &&        
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <Link to="/create-project">
                        <button className="btn btn-primary btn-lg w-100">Create Project</button>
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

export default ClusterDashboardPage;
