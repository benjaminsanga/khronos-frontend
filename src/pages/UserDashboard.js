import Navbar from "../components/navbar";
import Footer from "../components/footer";
import UserDashboardPage from "../components/dashboard/userDashboard";


const UserDashboard = () => {
    return (
        <>
            <Navbar />
            <UserDashboardPage />
            <Footer />
        </>
    );
};

export default UserDashboard;
