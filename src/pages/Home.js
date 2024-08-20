import Navbar from "../components/navbar";
import Hero from "../components/home/hero";
import Product from "../components/home/product";
import Mission from "../components/home/mission";
import Operation from "../components/home/operation";
import Statistics from "../components/home/statistics";
import CallUs from "../components/home/call-to-action";
import Feedback from "../components/home/feedback";
import Footer from "../components/footer";

const Home = () => {

    return (
        <>
            <Navbar />
            <Hero />
            <Product />
            <Mission />
            <Operation />
            <Statistics />
            <CallUs />
            <Feedback />
            <Footer />
        </>
    );

}

export default Home;
