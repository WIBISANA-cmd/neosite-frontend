import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const AdminUserForm = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', role: 'admin', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && id) {
      api.adminUsers
        .list(token)
        .then((res) => {
          const data = (res.data || res).find((a) => String(a.id) === String(id));
          if (data) setForm({ name: data.name, email: data.email, role: data.role, password: '' });
        })
        .catch(console.error);
    }
  }, [id, mode, token]);

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'edit') {
        await api.adminUsers.update(token, id, form);
      } else {
        await api.adminUsers.create(token, form);
      }
      navigate('/admin/admin-users');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">{mode === 'edit' ? 'Edit Admin' : 'Tambah Admin'}</h1>
      <form className="space-y-4 rounded-2xl border border-white/5 bg-white/5 p-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-300">Nama</label>
            <input
              required
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-300">Role</label>
            <select
              value={form.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            >
              <option value="admin">admin</option>
              <option value="superadmin">superadmin</option>
              <option value="content">content</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-300">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
              placeholder="Kosongkan jika tidak diubah"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
          <Button variant="outline" type="button" onClick={() => navigate('/admin/admin-users')}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminUserForm;
