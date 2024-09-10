// import { Link } from 'react-router-dom';

const FAQPage = () => {
    return (
        <div id="faq" className="container-fluid">
            <section className="row">
                <div className="col-md-6 p-0">
                    <h1>FAQ</h1>
                    <p>Our answers to your questions.</p>
                </div>
            </section>
            <section className="row">
                <div className="p-0">
                    <h3>How does Khronos ensure security of funds?</h3>
                    <p>We are continuously buidling, testing, and strenghtening our system which leverages on best practices and builds software on top of these platforms. While we work to earn your trust, we make sure all funds are accessible by the account managers and visible to every member involved.</p>
                </div>
            </section>
            <section className="row">
                <div className="p-0">
                    <h3>Are there specific projects Khronos supports?</h3>
                    <p>Khronos is open to all projects that can be undertaken by communities or groups who want a transparent and trusted process of raising funds are executing projects. Except otherwise stated, the platform is open to all projects.</p>
                </div>
            </section>
        </div>
    );
};

export default FAQPage;
