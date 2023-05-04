import axios from "axios";
import { useEffect, useState } from "react";

const Statistics = () => {

    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        const getStatistics = async () => {
            // header options for api
            var options = {
                method: 'GET',
                url: `/statistics`,
                baseURL: '/',
                responseType: 'json',
            };

            await axios.request(options).then((response) => {  
                // set states values in hook array
                setStatistics(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        };

        getStatistics();
    }, []);

    return (
        <div id="statistics" className="container">
            <div className="row">
                <div className="col-md-3 left">
                    <h2>Our numbers</h2>
                    <p>The progress made through the effort of the team.</p>
                </div>
                <div className="col-md-9 text-center right">
                    <div className="row">
                        <div className="col-md-4 stat-item">
                            <div>
                                <h1>{Object.keys(statistics).length > 0 ? statistics.clusters : '...'}</h1>
                                <p>Clusters</p>
                            </div>
                        </div>
                        <div className="col-md-4 stat-item">
                            <div>
                                <h1>{Object.keys(statistics).length > 0 ? statistics.projects : '...'}</h1>
                                <p>Projects</p>
                            </div>
                        </div>
                        <div className="col-md-4 stat-item">
                            <div>
                                <h1>{Object.keys(statistics).length > 0 ? statistics.deposits : '...'}</h1>
                                <p>Deposits</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
