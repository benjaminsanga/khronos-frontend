import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../utils/loading";
import { toFirstLetterUpperCase } from "../../utils/utilities"

const ClustersComponent = () => {

    const [clusters, setClusters] = useState({});

    useEffect(() => {

        const getAllClusters = async () => {
            await axios.get(`/clusters`).then((response) => {
                setClusters(response.data);
            });
        }
        getAllClusters();
        
      }, []);

    return (
        <>
        {Object.keys(clusters).length <= 0 ? 
        
        <Loading/> 
        
        : 
        <div id="clusters" className='container'>
            <h1>{clusters.length}</h1>
            <h2 className="mb-5">Clusters on Ajokudi</h2>
            <div className="row">
                {clusters.map((cluster, index) => {
                    return (
                    <div className="col-md-3" key={index}>
                        <div className="cluster">
                            <Link to={`/cluster/dashboard/${cluster._id}`}><h3 className="text-secondary">
                                { toFirstLetterUpperCase(cluster.cluster_name)}
                            </h3>
                            <span>At: {`${cluster.cluster_lga} ${cluster.cluster_state}`}</span>
                            <span>Admin: {`${toFirstLetterUpperCase(cluster.cluster_admin_firstname)} ${toFirstLetterUpperCase(cluster.cluster_admin_lastname)}`}</span>
                            <span>Contact: {cluster.cluster_admin_phone}</span></Link>
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
        }
        </>
    );
};

export default ClustersComponent;
