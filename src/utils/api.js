const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const request = async (endpoint, { token, headers = {}, ...options } = {}) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const message = errorBody.message || 'Permintaan gagal diproses';
    throw new Error(message);
  }

  return res.json();
};

export const api = {
  getServices: () => request('/services'),
  adminServices: {
    list: (token) => request('/services', { token }),
    create: (token, payload) =>
      request('/services', { token, method: 'POST', body: JSON.stringify(payload) }),
    update: (token, slug, payload) =>
      request(`/services/${slug}`, { token, method: 'PUT', body: JSON.stringify(payload) }),
    remove: (token, slug) => request(`/services/${slug}`, { token, method: 'DELETE' }),
  },
  getPortfolios: (category, page = 1) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    params.append('page', String(page));
    const query = params.toString();
    return request(`/portfolios?${query}`);
  },
  adminPortfolios: {
    list: (token, page = 1) => request(`/portfolios?page=${page}`, { token }),
    create: (token, payload) =>
      request('/portfolios', { token, method: 'POST', body: JSON.stringify(payload) }),
    update: (token, slug, payload) =>
      request(`/portfolios/${slug}`, { token, method: 'PUT', body: JSON.stringify(payload) }),
    remove: (token, slug) => request(`/portfolios/${slug}`, { token, method: 'DELETE' }),
    categories: {
      list: (token) => request('/portfolio-categories', { token }),
      create: (token, payload) =>
        request('/portfolio-categories', { token, method: 'POST', body: JSON.stringify(payload) }),
      update: (token, id, payload) =>
        request(`/portfolio-categories/${id}`, { token, method: 'PUT', body: JSON.stringify(payload) }),
      remove: (token, id) => request(`/portfolio-categories/${id}`, { token, method: 'DELETE' }),
    },
  },
  getPortfolio: (slug) => request(`/portfolios/${slug}`),
  getPosts: (page = 1) => request(`/posts?page=${page}`),
  adminPosts: {
    list: (token, page = 1) => request(`/posts?page=${page}`, { token }),
    create: (token, payload) =>
      request('/posts', { token, method: 'POST', body: JSON.stringify(payload) }),
    update: (token, slug, payload) =>
      request(`/posts/${slug}`, { token, method: 'PUT', body: JSON.stringify(payload) }),
    remove: (token, slug) => request(`/posts/${slug}`, { token, method: 'DELETE' }),
    categories: {
      list: (token) => request('/blog-categories', { token }),
      create: (token, payload) =>
        request('/blog-categories', { token, method: 'POST', body: JSON.stringify(payload) }),
      update: (token, id, payload) =>
        request(`/blog-categories/${id}`, { token, method: 'PUT', body: JSON.stringify(payload) }),
      remove: (token, id) => request(`/blog-categories/${id}`, { token, method: 'DELETE' }),
    },
  },
  getPost: (slug) => request(`/posts/${slug}`),
  getTestimonials: () => request('/testimonials'),
  adminTestimonials: {
    list: (token) => request('/testimonials', { token }),
    create: (token, payload) =>
      request('/testimonials', { token, method: 'POST', body: JSON.stringify(payload) }),
    update: (token, id, payload) =>
      request(`/testimonials/${id}`, { token, method: 'PUT', body: JSON.stringify(payload) }),
    remove: (token, id) => request(`/testimonials/${id}`, { token, method: 'DELETE' }),
  },
  adminLeads: {
    list: (token, params = {}) => {
      const search = new URLSearchParams(params).toString();
      return request(`/leads${search ? `?${search}` : ''}`, { token });
    },
    update: (token, id, payload) =>
      request(`/leads/${id}`, { token, method: 'PUT', body: JSON.stringify(payload) }),
  },
  adminStats: {
    counts: async (token) => {
      const [services, portfolios, posts, testimonials, leads, projects] = await Promise.all([
        request('/services', { token }),
        request('/portfolios', { token }),
        request('/posts', { token }),
        request('/testimonials', { token }),
        request('/leads', { token }),
        request('/projects', { token }),
      ]);
      return {
        services: (services.data || services || []).length,
        portfolios: (portfolios.data || portfolios || []).length,
        posts: (posts.data || posts || []).length,
        testimonials: (testimonials.data || testimonials || []).length,
        leads: (leads.data || leads || []).length,
        projects: (projects.data || projects || []).length,
      };
    },
  },
  adminClients: {
    list: (token) => request('/clients', { token }),
    create: (token, payload) =>
      request('/clients', { token, method: 'POST', body: JSON.stringify(payload) }),
    update: (token, id, payload) =>
      request(`/clients/${id}`, { token, method: 'PUT', body: JSON.stringify(payload) }),
    remove: (token, id) => request(`/clients/${id}`, { token, method: 'DELETE' }),
  },
  adminProjects: {
    list: (token, params = {}) => {
      const search = new URLSearchParams(params).toString();
      return request(`/projects${search ? `?${search}` : ''}`, { token });
    },
    create: (token, payload) =>
      request('/projects', { token, method: 'POST', body: JSON.stringify(payload) }),
    update: (token, id, payload) =>
      request(`/projects/${id}`, { token, method: 'PUT', body: JSON.stringify(payload) }),
    remove: (token, id) => request(`/projects/${id}`, { token, method: 'DELETE' }),
  },
  adminUsers: {
    list: (token) => request('/admin-users', { token }),
    create: (token, payload) =>
      request('/admin-users', { token, method: 'POST', body: JSON.stringify(payload) }),
    update: (token, id, payload) =>
      request(`/admin-users/${id}`, { token, method: 'PUT', body: JSON.stringify(payload) }),
    remove: (token, id) => request(`/admin-users/${id}`, { token, method: 'DELETE' }),
  },
  adminSettings: {
    get: (token) => request('/settings', { token }),
    update: (token, payload) =>
      request('/settings', { token, method: 'PUT', body: JSON.stringify(payload) }),
  },
  adminNotifications: {
    list: (token, params = {}) => {
      const search = new URLSearchParams(params).toString();
      return request(`/notifications${search ? `?${search}` : ''}`, { token });
    },
    markRead: (token, id) => request(`/notifications/${id}/read`, { token, method: 'POST' }),
  },
  adminActivity: {
    list: (token, params = {}) => {
      const search = new URLSearchParams(params).toString();
      return request(`/activity-log${search ? `?${search}` : ''}`, { token });
    },
  },
  adminOrders: {
    list: (token, params = {}) => {
      const search = new URLSearchParams(params).toString();
      return request(`/orders${search ? `?${search}` : ''}`, { token });
    },
    create: (token, payload) =>
      request('/orders', { token, method: 'POST', body: JSON.stringify(payload) }),
    update: (token, id, payload) =>
      request(`/orders/${id}`, { token, method: 'PUT', body: JSON.stringify(payload) }),
    remove: (token, id) => request(`/orders/${id}`, { token, method: 'DELETE' }),
    detail: (token, id) => request(`/orders/${id}`, { token }),
    payments: {
      add: (token, orderId, payload) =>
        request(`/orders/${orderId}/payments`, { token, method: 'POST', body: JSON.stringify(payload) }),
      update: (token, orderId, paymentId, payload) =>
        request(`/orders/${orderId}/payments/${paymentId}`, { token, method: 'PUT', body: JSON.stringify(payload) }),
      remove: (token, orderId, paymentId) =>
        request(`/orders/${orderId}/payments/${paymentId}`, { token, method: 'DELETE' }),
    },
  },
  getFaqs: () => request('/faqs'),
  submitLead: (payload) =>
    request('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  authMe: (token) => request('/auth/me', { token }),
  authLogin: (payload) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  authRegister: (payload) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getClientProjects: (token) =>
    request('/client/projects', {
      token,
    }),
};

export { API_BASE };
