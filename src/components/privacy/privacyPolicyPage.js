// import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
    return (
        <div id="privacy-policy" className="container-fluid">
            <section className="row">
                <div className="col-md-6 p-0">
                    <h1>Privacy Policy</h1>
                    <p>We care about your data.</p>
                </div>
            </section>
            <section className="row p-0">
                <div className="p-0">
                    <p>Effective Date: 5<sup>th</sup> October, 2024</p>

                    <p>
                        Welcome to Khronos! At Khronos, we value your privacy and are committed to safeguarding your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you use our platform. By accessing or using our application, you consent to the terms described in this policy.
                    </p>
                    <ol>
                        <li>
                            <h5>Information We Collect</h5>
                            <p>We collect various types of information to improve your experience with Khronos, including:</p>
                            <ul>
                                <li>
                                    <b>Personal Information</b>: Information you provide when creating an account, such as your name, email address, and other identifying details.
                                </li>
                                <li>
                                    <b>Transaction Information</b>: Details of transactions made through Khronos, including the amount, date, and associated projects.
                                </li>
                                <li>
                                    <b>Device Information</b>: Information about the device and network used to access Khronos, such as IP address and browser type.
                                </li>
                                <li>
                                    <b>Usage Data</b>: Information about your interactions with our platform, such as pages visited, time spent on the site, and features used.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h5>How We Use Your Information</h5>
                            <p>We use your information to:</p>
                            <ul>
                                <li>Provide and maintain the Khronos service.</li>
                                <li>Facilitate transactions and connect communities with projects.</li>
                                <li>Enhance security and prevent fraudulent activities.</li>
                                <li>Communicate updates, promotions, and important notices.</li>
                                <li>Analyze usage trends to improve our services.</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Sharing Your Information</h5>
                            <p>We do not sell, rent, or trade your personal information. However, we may share your data with:</p>
                            <ul>
                                <li><b>Service Providers</b>: Third-party service providers who assist us in delivering our services.</li>
                                <li><b>Legal Compliance</b>: If required by law or in response to valid legal requests.</li>
                                <li><b>Partners</b>: With your consent, we may share information with partners for collaborative community projects.</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Data Security</h5>
                            <p>
                                We prioritize the security of your data. We employ advanced encryption techniques and maintain robust safeguards to protect against unauthorized access, loss, or misuse of your information.
                            </p>
                        </li>
                        <li>
                            <h5>Your Rights</h5>
                            <p>You have the right to:</p>
                            <ul>
                                <li>Access and update your personal information.</li>
                                <li>Request the deletion of your data.</li>
                                <li>Opt-out of marketing communications.</li>
                                <li>Withdraw consent at any time for data processing.</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Changes to the Privacy Policy</h5>
                            <p>
                                We may update this Privacy Policy periodically. Any changes will be communicated through our platform or via email. Continued use of the application after such updates constitutes your acceptance of the revised policy.
                            </p>
                        </li>
                        <li>
                            <h5>Contact Us</h5>
                            <p>
                                If you have any questions or concerns about this Privacy Policy, please contact us at info@khronosapp.com.
                            </p>
                        </li>
                    </ol>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicyPage;
