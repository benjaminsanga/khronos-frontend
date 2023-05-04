const Loading = () => {
    return (
        <div className="container">
            <div className="row m-5 p-5">
                <div className="col-md-4"></div>
                <div className="col-md-4 row d-flex flex-column justify-content-center align-items-center">
                    <div className="load-wrapp">
                        <div className="load-5">
                            <p className="loader-p text-primary">Loading</p>
                            <div className="ring-2">
                            <div className="ball-holder">
                                <div className="ball"></div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
                <div className="col-md-4"></div>
            </div>
            
        </div>
    );
};

export default Loading;
