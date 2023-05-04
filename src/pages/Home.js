import Navbar from "../components/navbar";
import Hero from "../components/home/hero";
import Company from "../components/home/company";
import Conviction from "../components/home/conviction";
import Operation from "../components/home/operation";
import Statistics from "../components/home/statistics";
import CallUs from "../components/home/callUs";
import Feedback from "../components/home/feedback";
import Footer from "../components/footer";

const Home = () => {

    return (
        <>
            <Navbar />
            <Hero />
            <Company />
            <Conviction />
            <Operation />
            <Statistics />
            <CallUs />
            <Feedback />
            <Footer />
        </>
    );

}

export default Home;
