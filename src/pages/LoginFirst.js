import Navbar from "../components/navbar";
import Footer from "../components/footer";
import LoginFirst from "../components/Errors/unAuthorized";

const LoginFirstPage = () => {
    return (
        <>
            <Navbar />
            <LoginFirst />
            <Footer />
        </>
    );
};

export default LoginFirstPage;
