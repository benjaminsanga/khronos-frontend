// import logo from '../src/assets/images/logo.png';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import CreateCluster from './pages/CreateCluster';
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
import ClusterDashboard from './pages/ClusterDashboard';
import Projects from './pages/Projects';
import Join from './pages/Join';
import Clusters from './pages/Clusters';
import FourOhFour from './pages/FourOhFour';
import PaymentRedirectPage from './pages/PaymentRedirectPage';

import AuthContext from './utils/clusterContext';
import { useState } from 'react';
import LoginFirstPage from './pages/LoginFirst';
import ResetPasswordPage from './pages/ResetPassword';
import LandingPage from './pages/LandingPage';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient()

const App = () => {

  // initialize values
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [expiration, setTokenExpiration] = useState(null);
  
  const login = (token, userInfo, tokenExpiration, accountType) => {
    // set non-null values
    setUserToken(token);
    setUserInfo(userInfo);
    setTokenExpiration(tokenExpiration);
    setAccountType(accountType);
  };

  const logout = () => {
    // set null values
    setUserToken(null);
    setUserInfo(null);
  };

  return (
    <Router>
      <AuthContext.Provider value={
        {
          token: userToken,
          userInfo: userInfo,
          accountType: accountType,
          login: login,
          logout: logout,
          expiration: expiration
        }
      }>
        <Routes>

          <Route path="/create-cluster" element={<CreateCluster />} />
        
          {!userToken && <Route path="/create-project" element={<LoginFirstPage />} />}
        
          {userToken && <Route path="/create-project" element={<CreateProject />} />}
        
          <Route path="/get-quotation" element={<GetQuotation />} />
      
          <Route path="/deposit/:code" element={<Deposit />} />
        
          <Route path="/join" element={<Join />} />
        
          <Route path="/login" element={<Login />} />

          <Route path="/cluster/reset-password/:hash" element={<ResetPasswordPage />} />
        
          <Route path="/about" element={<About />} />
        
          <Route path="/faq" element={<FAQ />} />
        
          <Route path="/contact" element={<Contact />} />
        
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
        
          <Route path="/project/dashboard/:id" element={<ProjectDashboard />} />
      
          <Route path="/cluster/dashboard/:id" element={<ClusterDashboard />} />
        
          <Route path="/projects" element={<Projects />} />
        
          <Route path="/clusters" element={<Clusters />} />

          <Route path="/flutterwave/confirm" element={<PaymentRedirectPage />} />

          <Route path='/intro' element={<LandingPage />} />
        
          <Route path="/" element={<Home />} />        

          <Route path='*' element={<FourOhFour />} />  
        </Routes>
      </AuthContext.Provider>      
    </Router>
  );
}

const WrappedApp = () => {
  return <QueryClientProvider client={queryClient}>
    <App/>
  </QueryClientProvider>
}

export default WrappedApp;
