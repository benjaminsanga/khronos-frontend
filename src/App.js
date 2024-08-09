// import logo from '../src/assets/images/logo.png';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import CreateProject from './pages/CreateProject';
import GetQuotation from './pages/GetQuotation';
import Deposit from './pages/Deposit';
import Login from './pages/Login';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/Terms';
import ProjectDashboard from './pages/ProjectDashboard';
import UserDashboard from './pages/UserDashboard';
import Projects from './pages/Projects';
import Join from './pages/Join';
import Users from './pages/Users';
import FourOhFour from './pages/FourOhFour';
import PaymentRedirectPage from './pages/PaymentRedirectPage';
import LoginFirstPage from './pages/LoginFirst';
import ResetPasswordPage from './pages/ResetPassword';
import LandingPage from './pages/LandingPage';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {Provider, useSelector} from "react-redux";
import store from "./context/store";
import ErrorBoundary from './pages/ErrorBoundary';

const queryClient = new QueryClient()

const App = () => {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <Router>
            <Routes>

                <Route path="/create-account" element={<CreateAccount/>}/>

                {!isAuthenticated && <Route path="/create-project" element={<LoginFirstPage/>}/>}

                {isAuthenticated && <Route path="/create-project" element={<CreateProject/>}/>}

                <Route path="/get-quotation" element={<GetQuotation/>}/>

                <Route path="/deposit/:code" element={<Deposit/>}/>

                <Route path="/join" element={<Join/>}/>

                <Route path="/login" element={<Login/>}/>

                <Route path="/account/reset-password/:hash" element={<ResetPasswordPage/>}/>

                <Route path="/about" element={<About/>}/>

                <Route path="/faq" element={<FAQ/>}/>

                <Route path="/contact" element={<Contact/>}/>

                <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>

                <Route path="/terms-and-conditions" element={<TermsConditions/>}/>

                <Route path="/project/dashboard/:id" element={<ProjectDashboard/>}/>

                <Route path="/account/dashboard/:id" element={<UserDashboard/>}/>

                <Route path="/projects" element={<Projects/>}/>

                <Route path="/accounts" element={<Users/>}/>

                <Route path="/flutterwave/confirm" element={<PaymentRedirectPage/>}/>

                <Route path='/intro' element={<LandingPage/>}/>

                <Route path="/" element={<Home/>}/>

                <Route path='*' element={<FourOhFour/>}/>
            </Routes>
        </Router>
    );
}

const WrappedApp = () => {
    return <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
                <App/>
            </ErrorBoundary>
        </QueryClientProvider>
    </Provider>
}

export default WrappedApp;
