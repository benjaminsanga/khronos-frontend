import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../utils/loading";
import { toFirstLetterUpperCase } from "../../utils/utilities"
import {useGetAllClusters} from "../../hooks/customHooks";

const ClustersComponent = () => {

    const [clusters, setClusters] = useState([]);
    const {
        isLoading,
        isSuccess,
        data
    } = useGetAllClusters()

    useEffect(() => {
        setClusters(data?.data)
    }, [data]);

    if (isLoading) {
        return <Loading/>
    }

    return (
        <>
        {isSuccess && <div id="clusters" className='container'>
            <h1 style={{fontSize: '3.5rem'}}>{clusters?.length}</h1>
            <h2 className="mb-5">Clusters on Khronos</h2>
            <div className="row">
                {clusters?.map((cluster, index) => {
                    return (
                    <div className="col-md-3" key={index}>
                        <div className="cluster">
                            <Link to={`/cluster/dashboard/${cluster._id}`}>
                                <h3>{toFirstLetterUpperCase(cluster.cluster_name)}</h3>
                                <span>@ {`${cluster.cluster_lga} ${cluster.cluster_state}`}</span>
                                    {/*<span>Admin: {`${toFirstLetterUpperCase(cluster.cluster_admin_firstname)} ${toFirstLetterUpperCase(cluster.cluster_admin_lastname)}`}</span>*/}
                                <span><i className="fa fa-phone"></i> {cluster.cluster_admin_phone}</span>
                            </Link>
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
