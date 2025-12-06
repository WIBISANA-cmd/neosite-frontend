import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const PortfolioForm = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { token } = useAuth();
  const [form, setForm] = useState({
    project_name: '',
    category: '',
    industry: '',
    tech_stack: [],
    demo_url: '',
    image_url: '',
    description: '',
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    try {
      const res = await api.adminPortfolios.categories.list(token);
      setCategories(res);
    } catch (err) {
      console.error(err);
    }
  };

  const loadDetail = async () => {
    if (mode !== 'edit' || !slug) return;
    setLoading(true);
    try {
      const data = await api.getPortfolio(slug);
      setForm({
        ...data,
        tech_stack: data.tech_stack || [],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
    loadDetail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        tech_stack: form.tech_stack.filter(Boolean),
      };
      if (mode === 'edit') {
        await api.adminPortfolios.update(token, slug, payload);
      } else {
        await api.adminPortfolios.create(token, payload);
      }
      navigate('/admin/portfolio');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">
        {mode === 'edit' ? 'Edit Portofolio' : 'Tambah Portofolio'}
      </h1>
      <form className="space-y-4 rounded-2xl border border-white/5 bg-white/5 p-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-300">Nama Project</label>
            <input
              required
              value={form.project_name}
              onChange={(e) => handleChange('project_name', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Kategori</label>
            <select
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            >
              <option value="">Pilih kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-300">Industri</label>
            <input
              value={form.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Tech Stack (pisahkan koma)</label>
            <input
              value={form.tech_stack.join(', ')}
              onChange={(e) => handleChange('tech_stack', e.target.value.split(',').map((s) => s.trim()))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
              placeholder="Laravel, React, Tailwind"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-300">URL Demo</label>
            <input
              value={form.demo_url || ''}
              onChange={(e) => handleChange('demo_url', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Thumbnail URL</label>
            <input
              value={form.image_url || ''}
              onChange={(e) => handleChange('image_url', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
              placeholder="https://image.url"
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-slate-300">Deskripsi</label>
          <textarea
            rows={4}
            value={form.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            placeholder="Rich text editor placeholder"
          />
        </div>
        <div className="flex gap-3">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
          <Button variant="outline" type="button" onClick={() => navigate('/admin/portfolio')}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioForm;
