import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const isAdmin = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
  if (isAdmin) {
    return <div className="min-h-screen bg-[#0b1021] text-white">{children}</div>;
  }
  return (
    <div className="min-h-screen bg-[#0b1021] text-white">
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
