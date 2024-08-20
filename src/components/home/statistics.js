import { useEffect, useState } from "react";
import {useGetStatistics} from "../../hooks/customHooks";
import Loading from "../../utils/loading";

const Statistics = () => {

    const [statistics, setStatistics] = useState([]);

    const {
        data,
        isLoading,
        isSuccess
    } = useGetStatistics()

    useEffect(() => {
        setStatistics(data?.data);
    }, [data]);

    if (isLoading) {
        return <Loading/>
    }

    return (
        <>
            {isSuccess && <div id="statistics" className="container-fluid">
                <div className="row">
                    <div className="col-md-3 left">
                        <h2>Our Milestones</h2>
                        <p>Empowering progress, one innovation at a time.</p>
                    </div>
                    <div className="col-md-9 text-center right">
                        <div className="row">
                            <div className="col-md-4 stat-item">
                                <div>
                                    <h1>{statistics?.accounts}</h1>
                                    <p>Accounts</p>
                                </div>
                            </div>
                            <div className="col-md-4 stat-item">
                                <div>
                                    <h1>{statistics?.projects}</h1>
                                    <p>Projects</p>
                                </div>
                            </div>
                            <div className="col-md-4 stat-item">
                                <div>
                                    <h1>{statistics?.deposits}</h1>
                                    <p>Deposits</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default Statistics;
