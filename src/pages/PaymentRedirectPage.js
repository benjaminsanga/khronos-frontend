import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PaymentRedirect from "../components/contribution/paymentRedirect";

const PaymentRedirectPage = () => {
    return (
        <>
            <Navbar />
            <PaymentRedirect />
            <Footer />
        </>
    );
};

export default PaymentRedirectPage;
