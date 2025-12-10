import { Navigate, Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { user, isAuthenticated, checkingAuth, logout } = useAuth();
  const allowed = ['admin', 'superadmin'].includes(user?.role);

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b1021] text-white">
        <p className="text-sm text-slate-300">Memeriksa sesi Anda...</p>
      </div>
    );
  }

  if (!isAuthenticated || !allowed) {
    logout();
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0b1021] text-white">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminTopbar />
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
