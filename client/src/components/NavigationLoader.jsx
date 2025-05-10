import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../context/useLoading.jsx';

const NavigationLoader = () => {
  const { setIsLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location, setIsLoading]);

  useEffect(() => {
    const showLoaderOnReload = () => {
      setIsLoading(true);
    };

    const hideLoaderOnLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    window.addEventListener('beforeunload', showLoaderOnReload);
    window.addEventListener('load', hideLoaderOnLoad);

    return () => {
      window.removeEventListener('beforeunload', showLoaderOnReload);
      window.removeEventListener('load', hideLoaderOnLoad);
    };
  }, [setIsLoading]);

  return null;
};

export default NavigationLoader;