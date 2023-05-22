import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from '../../context/clusterContext';
import { toFirstLetterUpperCase } from "../../utils/utilities";
import Loading from "../../utils/loading";
import {useGetAllProjects, useGetCluster} from "../../hooks/customHooks";

const ClusterDashboardPage = () => {

    // const location = useLocation();
    const clusterContext = useContext(AuthContext); // get context
    const { id } = useParams();

    const {isLoading: clusterLoading, isSuccess: clusterSuccess, data: clusterData} = useGetCluster(id)
    const {isLoading: projectsLoading, isSuccess: projectsSuccess, data: projectsData} = useGetAllProjects(id)

    const [clusterInfo, setClusterInfo] = useState({});
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setClusterInfo(clusterData?.data)
        setProjects(projectsData?.data?.result)
    }, [clusterData, projectsData]);

    return (
        <>
            {(clusterLoading && projectsLoading) && <Loading />}
            {(clusterSuccess && projectsSuccess) && <div id="dashboard" className="container">
            <div className="row user-info">
                <div className="col-md-6">
                    <h2>{toFirstLetterUpperCase(clusterInfo?.cluster_name)}</h2>
                    <h5>Location</h5>
                    <p>{`${toFirstLetterUpperCase(clusterInfo?.cluster_address)}, ${clusterInfo?.cluster_lga}, ${clusterInfo?.cluster_state} `}</p>
                    <h5>Created</h5>
                    <p>{clusterInfo?.createdAt?.slice(0, 10)}</p>
                </div>
                <div className="col-md-6">
                    <h5>Leader</h5>
                    <p>{`${toFirstLetterUpperCase(clusterInfo?.cluster_admin_firstname)} ${toFirstLetterUpperCase(clusterInfo?.cluster_admin_lastname)} `}</p>
                    <h5>Phone</h5>
                    <p>{clusterInfo?.cluster_admin_phone}</p>
                    <h5>Email</h5>
                    <p>{clusterInfo?.cluster_admin_email}</p>
                </div>
            </div>
            <div className="row payments">
                <h2>Projects</h2>
                <div>
                    {(Array.isArray(projects) && projects?.length > 0) ? <p>No Projects, yet!</p> :
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
                            {projects?.map((project, index) => {
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
