import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const PortfolioDetail = lazy(() => import('./pages/PortfolioDetail'));
const Register = lazy(() => import('./pages/Register'));
const Services = lazy(() => import('./pages/Services'));

const AdminLayout = lazy(() => import('./admin/components/AdminLayout'));
const AdminDashboard = lazy(() => import('./admin/pages/Dashboard'));
const ServicesAdmin = lazy(() => import('./admin/pages/Services'));
const ServiceForm = lazy(() => import('./admin/pages/ServiceForm'));
const PortfolioList = lazy(() => import('./admin/pages/PortfolioList'));
const PortfolioForm = lazy(() => import('./admin/pages/PortfolioForm'));
const PortfolioCategories = lazy(() => import('./admin/pages/PortfolioCategories'));
const BlogList = lazy(() => import('./admin/pages/BlogList'));
const BlogForm = lazy(() => import('./admin/pages/BlogForm'));
const BlogCategories = lazy(() => import('./admin/pages/BlogCategories'));
const Testimonials = lazy(() => import('./admin/pages/Testimonials'));
const TestimonialForm = lazy(() => import('./admin/pages/TestimonialForm'));
const FaqAdmin = lazy(() => import('./admin/pages/FaqAdmin'));
const LeadsAdmin = lazy(() => import('./admin/pages/LeadsAdmin'));
const LeadDetail = lazy(() => import('./admin/pages/LeadDetail'));
const ClientsAdmin = lazy(() => import('./admin/pages/ClientsAdmin'));
const ClientForm = lazy(() => import('./admin/pages/ClientForm'));
const ProjectsAdmin = lazy(() => import('./admin/pages/ProjectsAdmin'));
const ProjectForm = lazy(() => import('./admin/pages/ProjectForm'));
const AdminUsers = lazy(() => import('./admin/pages/AdminUsers'));
const AdminUserForm = lazy(() => import('./admin/pages/AdminUserForm'));
const SettingsPage = lazy(() => import('./admin/pages/SettingsPage'));
const ActivityLogPage = lazy(() => import('./admin/pages/ActivityLogPage'));
const NotificationsPage = lazy(() => import('./admin/pages/NotificationsPage'));
const OrdersList = lazy(() => import('./admin/pages/OrdersList'));
const OrderDetail = lazy(() => import('./admin/pages/OrderDetail'));
const OrderForm = lazy(() => import('./admin/pages/OrderForm'));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center text-sm text-slate-200">
            Memuat tampilan...
          </div>
        }
      >
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
      </Suspense>
    </Layout>
  );
}

export default App;
