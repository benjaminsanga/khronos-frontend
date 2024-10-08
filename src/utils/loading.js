const Loading = () => {
    return (
        <div className="d-flex flex-row justify-content-center align-items-center" id="loader">
            <svg
                version="1.1"
                id="loader-svg"
                xmlns="http://www.w3.org/2000/svg"
                x="0px" y="0px"
                viewBox="0 0 100 100"
            >
                <circle fill="#7BEFB2" stroke="none" cx="6" cy="50" r="6">
                    <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.1"
                    />
                </circle>
                <circle fill="#7BEFB2" stroke="none" cx="26" cy="50" r="6">
                    <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.2"
                    />
                </circle>
                <circle fill="#7BEFB2" stroke="none" cx="46" cy="50" r="6">
                    <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.3"
                    />
                </circle>
            </svg>
            {/* <p className="text-center text-primary">Just a moment...</p> */}
        </div>
    );
};

export default Loading;
