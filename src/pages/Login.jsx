import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import Button from '../components/Button';
import SectionWrapper from '../components/SectionWrapper';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      const role = res?.user?.role;
      navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SectionWrapper title="Sign In" description="Akses dashboard project dan riwayat pembayaran.">
      <AuthCard
        title="Welcome back"
        description="Masuk ke akun Anda untuk melihat progres project, timeline, dan pembayaran."
        footer={
          <span>
            Belum punya akun?{' '}
            <Link to="/register" className="text-cyan">
              Sign Up
            </Link>
          </span>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-slate-200">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b1021] px-3 py-2 text-white"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm text-slate-200">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b1021] px-3 py-2 text-white"
              placeholder="********"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" className="w-full justify-center" disabled={loading}>
            {loading ? 'Memproses...' : 'Sign In'}
          </Button>
        </form>
      </AuthCard>
    </SectionWrapper>
  );
};

export default Login;
