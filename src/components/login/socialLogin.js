import GoogleLogo from "../../assets/icons/google.png";
import FacebookLogo from "../../assets/icons/facebook.png";

const SocialLogin = () => {
    const styles = {
        div: {
            width: "70%",
            backgroundColor: "#ededed",
            padding: "10px 20px",
            marginBottom: "1.2rem",
            cursor: "pointer"
        },
        image: {
            width: "36px",
            height: "auto",
            borderRadius: "50%",
            marginRight: "30px",
        },
        p: {
            margin: "0px"
        }
    };

    return (
        <div className="d-flex flex-column justify-content-around align-items-center">
            <div className="d-flex flex-row justify-content-center align-items-center" style={styles.div}>
                <img src={GoogleLogo} alt="Google" style={styles.image} />
                <p style={styles.p}>Login with Google</p>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center" style={styles.div}>
                <img src={FacebookLogo} alt="Facebook" style={styles.image} />
                <p style={styles.p}>Login with Facebook</p>
            </div>
        </div>
    );
};

export default SocialLogin;
