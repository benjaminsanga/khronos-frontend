import Navbar from "../components/navbar";
import Footer from "../components/footer";
import NotFound from "../components/Errors/notFound";

const FourOhFour = () => {
    return (
        <>
            <Navbar />
            <NotFound />
            <Footer />
        </>
    );
};

export default FourOhFour;
