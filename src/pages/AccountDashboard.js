import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AccountDashboardPage from "../components/dashboard/accountDashboard";

const UserDashboard = () => {
    return (
        <>
            <Navbar />
            <AccountDashboardPage />
            <Footer />
        </>
    );
};

export default UserDashboard;
