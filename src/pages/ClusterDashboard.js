import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ClusterDashboardPage from "../components/dashboard/clusterDashboard";


const ClusterDashboard = () => {
    return (
        <>
            <Navbar />
            <ClusterDashboardPage />
            <Footer />
        </>
    );
};

export default ClusterDashboard;
