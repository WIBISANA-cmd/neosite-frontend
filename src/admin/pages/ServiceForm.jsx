import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const ServiceForm = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { token } = useAuth();
  const [form, setForm] = useState({
    name: '',
    starting_price: '',
    estimated_time: '',
    description: '',
    is_active: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && slug) {
      setLoading(true);
      api
        .getServices()
        .then((res) => {
          const data = (res.data || res).find((s) => s.slug === slug);
          if (data) setForm(data);
        })
        .finally(() => setLoading(false));
    }
  }, [mode, slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (mode === 'edit') {
        await api.adminServices.update(token, slug, form);
      } else {
        await api.adminServices.create(token, form);
      }
      navigate('/admin/services');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">{mode === 'edit' ? 'Edit Layanan' : 'Tambah Layanan'}</h1>
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
            <label className="text-sm text-slate-300">Harga mulai (Rp)</label>
            <input
              type="number"
              value={form.starting_price}
              onChange={(e) => handleChange('starting_price', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-300">Estimasi waktu</label>
            <input
              value={form.estimated_time || ''}
              onChange={(e) => handleChange('estimated_time', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Aktif</label>
            <select
              value={form.is_active ? '1' : '0'}
              onChange={(e) => handleChange('is_active', e.target.value === '1')}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            >
              <option value="1">Aktif</option>
              <option value="0">Nonaktif</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm text-slate-300">Deskripsi</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            placeholder="Rich text editor placeholder"
          />
        </div>
        <div className="flex gap-3">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
          <Button variant="outline" type="button" onClick={() => navigate('/admin/services')}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
