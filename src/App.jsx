import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Portfolio from './pages/Portfolio';
import PortfolioDetail from './pages/PortfolioDetail';
import Register from './pages/Register';
import Services from './pages/Services';
import AdminLayout from './admin/components/AdminLayout';
import AdminDashboard from './admin/pages/Dashboard';
import ServicesAdmin from './admin/pages/Services';
import ServiceForm from './admin/pages/ServiceForm';
import PortfolioList from './admin/pages/PortfolioList';
import PortfolioForm from './admin/pages/PortfolioForm';
import PortfolioCategories from './admin/pages/PortfolioCategories';
import BlogList from './admin/pages/BlogList';
import BlogForm from './admin/pages/BlogForm';
import BlogCategories from './admin/pages/BlogCategories';
import Testimonials from './admin/pages/Testimonials';
import TestimonialForm from './admin/pages/TestimonialForm';
import FaqAdmin from './admin/pages/FaqAdmin';
import LeadsAdmin from './admin/pages/LeadsAdmin';
import LeadDetail from './admin/pages/LeadDetail';
import ClientsAdmin from './admin/pages/ClientsAdmin';
import ClientForm from './admin/pages/ClientForm';
import ProjectsAdmin from './admin/pages/ProjectsAdmin';
import ProjectForm from './admin/pages/ProjectForm';
import AdminUsers from './admin/pages/AdminUsers';
import AdminUserForm from './admin/pages/AdminUserForm';
import SettingsPage from './admin/pages/SettingsPage';
import ActivityLogPage from './admin/pages/ActivityLogPage';
import NotificationsPage from './admin/pages/NotificationsPage';
import OrdersList from './admin/pages/OrdersList';
import OrderDetail from './admin/pages/OrderDetail';
import OrderForm from './admin/pages/OrderForm';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="services" element={<ServicesAdmin />} />
          <Route path="services/create" element={<ServiceForm />} />
          <Route path="services/:slug/edit" element={<ServiceForm mode="edit" />} />
          <Route path="portfolio" element={<PortfolioList />} />
          <Route path="portfolio/create" element={<PortfolioForm />} />
          <Route path="portfolio/:slug/edit" element={<PortfolioForm mode="edit" />} />
          <Route path="portfolio/categories" element={<PortfolioCategories />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/create" element={<BlogForm />} />
          <Route path="blog/:slug/edit" element={<BlogForm mode="edit" />} />
          <Route path="blog/categories" element={<BlogCategories />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="testimonials/create" element={<TestimonialForm />} />
          <Route path="testimonials/:id/edit" element={<TestimonialForm mode="edit" />} />
          <Route path="faq" element={<FaqAdmin />} />
          <Route path="leads" element={<LeadsAdmin />} />
          <Route path="leads/:id" element={<LeadDetail />} />
          <Route path="clients" element={<ClientsAdmin />} />
          <Route path="clients/create" element={<ClientForm />} />
          <Route path="clients/:id/edit" element={<ClientForm mode="edit" />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="projects/create" element={<ProjectForm />} />
          <Route path="projects/:id/edit" element={<ProjectForm mode="edit" />} />
          <Route path="admin-users" element={<AdminUsers />} />
          <Route path="admin-users/create" element={<AdminUserForm />} />
          <Route path="admin-users/:id/edit" element={<AdminUserForm mode="edit" />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="activity-log" element={<ActivityLogPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders/create" element={<OrderForm />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="orders/:id/edit" element={<OrderForm />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
