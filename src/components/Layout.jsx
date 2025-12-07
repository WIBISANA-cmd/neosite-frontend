import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import PageLoader from './PageLoader';
import usePageAnimations from '../hooks/usePageAnimations';

const Layout = ({ children }) => {
  const [showLoader, setShowLoader] = useState(true);
  const isAdmin = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
  const mainRef = useRef(null);
  const location = useLocation();

  usePageAnimations(!isAdmin ? mainRef : null);

  useEffect(() => {
    if (isAdmin) {
      setShowLoader(false);
      return undefined;
    }
    const timer = setTimeout(() => setShowLoader(false), 1400);
    return () => clearTimeout(timer);
  }, [isAdmin]);

  if (isAdmin) {
    return <div className="min-h-screen bg-[#0b1021] text-white">{children}</div>;
  }
  return (
    <div className="min-h-screen bg-[#0b1021] text-white">
      <PageLoader show={showLoader} />
      <Navbar />
      <main key={location.pathname} ref={mainRef} className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
