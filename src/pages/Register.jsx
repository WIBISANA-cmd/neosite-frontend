import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import Button from '../components/Button';
import SectionWrapper from '../components/SectionWrapper';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      const role = res?.user?.role;
      navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SectionWrapper title="Sign Up" description="Buat akun untuk memantau project dan invoice Anda.">
      <AuthCard
        title="Create account"
        description="Daftarkan akun klien NeoSite untuk mulai berkolaborasi."
        footer={
          <span>
            Sudah punya akun?{' '}
            <Link to="/login" className="text-cyan">
              Sign In
            </Link>
          </span>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-slate-200">Nama</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b1021] px-3 py-2 text-white"
              placeholder="Nama lengkap"
            />
          </div>
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
              placeholder="Minimal 8 karakter"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" className="w-full justify-center" disabled={loading}>
            {loading ? 'Memproses...' : 'Sign Up'}
          </Button>
        </form>
      </AuthCard>
    </SectionWrapper>
  );
};

export default Register;
