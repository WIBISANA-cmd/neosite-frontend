import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const TestimonialForm = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const [form, setForm] = useState({
    client_name: '',
    company: '',
    position: '',
    rating: 5,
    is_featured: false,
    content: '',
    photo_url: '',
  });
  const [loading, setLoading] = useState(false);

  const loadDetail = async () => {
    if (mode !== 'edit' || !id) return;
    setLoading(true);
    try {
      const res = await api.getTestimonials();
      const data = (res.data || res).find((t) => String(t.id) === String(id));
      if (data) setForm(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetail();
  }, []);

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'edit') {
        await api.adminTestimonials.update(token, id, form);
      } else {
        await api.adminTestimonials.create(token, form);
      }
      navigate('/admin/testimonials');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">
        {mode === 'edit' ? 'Edit Testimoni' : 'Tambah Testimoni'}
      </h1>
      <form className="space-y-4 rounded-2xl border border-white/5 bg-white/5 p-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-300">Nama Klien</label>
            <input
              required
              value={form.client_name}
              onChange={(e) => handleChange('client_name', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Perusahaan</label>
            <input
              value={form.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-300">Rating</label>
            <select
              value={form.rating}
              onChange={(e) => handleChange('rating', Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-300">Featured</label>
            <select
              value={form.is_featured ? '1' : '0'}
              onChange={(e) => handleChange('is_featured', e.target.value === '1')}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            >
              <option value="1">Ya</option>
              <option value="0">Tidak</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm text-slate-300">Isi Testimoni</label>
          <textarea
            rows={4}
            value={form.content}
            onChange={(e) => handleChange('content', e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="text-sm text-slate-300">Foto URL</label>
          <input
            value={form.photo_url || ''}
            onChange={(e) => handleChange('photo_url', e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
          />
        </div>
        <div className="flex gap-3">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
          <Button variant="outline" type="button" onClick={() => navigate('/admin/testimonials')}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TestimonialForm;
