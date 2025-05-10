import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from './context/LoadingProvider.jsx';
import { useLoading } from './context/useLoading.jsx';
import Loader from './components/Loader.jsx';
import NavigationLoader from './components/NavigationLoader.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { DarkModeProvider } from './context/DarkModeContext.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import Demo from './pages/DemoPage/Demo.jsx';
import LandingPage from './pages/LandingPage/LandingPage.jsx';

const AppContent = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <Loader />}
      <NavigationLoader />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/staff-login" element={<Login />} />
        <Route path="/staff-signup" element={<Signup />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/demo/*" element={<Demo />} /> 
        <Route path="/landing" element={<LandingPage />} /> 
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <LoadingProvider>
      <DarkModeProvider>
        <Router>
          <AppContent />
        </Router>
      </DarkModeProvider>
    </LoadingProvider>
  );
};

export default App;