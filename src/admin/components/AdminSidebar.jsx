import { NavLink } from 'react-router-dom';
import { FiHome, FiDatabase, FiUsers, FiSettings, FiBell, FiEdit, FiBook, FiGrid, FiMessageSquare, FiHelpCircle } from 'react-icons/fi';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: FiHome },
  { to: '/admin/services', label: 'Services', icon: FiGrid },
  { to: '/admin/portfolio', label: 'Portfolio', icon: FiDatabase },
  { to: '/admin/blog', label: 'Blog', icon: FiEdit },
  { to: '/admin/testimonials', label: 'Testimonials', icon: FiMessageSquare },
  { to: '/admin/faq', label: 'FAQ', icon: FiHelpCircle },
  { to: '/admin/leads', label: 'Leads', icon: FiUsers },
  { to: '/admin/projects', label: 'Projects', icon: FiBook },
  { to: '/admin/orders', label: 'Orders', icon: FiGrid },
  { to: '/admin/clients', label: 'Clients', icon: FiUsers },
  { to: '/admin/admin-users', label: 'Admin Users', icon: FiUsers },
  { to: '/admin/settings', label: 'Settings', icon: FiSettings },
  { to: '/admin/activity-log', label: 'Activity Log', icon: FiDatabase },
  { to: '/admin/notifications', label: 'Notifications', icon: FiBell },
];

const AdminSidebar = () => {
  return (
    <aside className="hidden h-screen w-64 flex-shrink-0 border-r border-white/5 bg-[#0d1428] lg:block">
      <div className="px-6 py-4 text-xl font-semibold text-cyan">NeoSite Admin</div>
      <nav className="space-y-1 px-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition hover:bg-white/5 ${
                  isActive ? 'bg-cyan/10 text-cyan' : 'text-slate-200'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
