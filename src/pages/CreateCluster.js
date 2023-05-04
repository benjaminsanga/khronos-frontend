import Navbar from "../components/navbar";
import Footer from "../components/footer";
import CreateClusterForm from "../components/cluster/createClusterForm";

const CreateCluster = () => {
    return (
        <>
            <Navbar />
            <CreateClusterForm />
            <Footer />
        </>
    );
};

export default CreateCluster;
