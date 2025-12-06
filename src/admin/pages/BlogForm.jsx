import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const BlogForm = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { token } = useAuth();
  const [form, setForm] = useState({
    title: '',
    category: '',
    status: 'draft',
    thumbnail_url: '',
    content: '',
    excerpt: '',
    published_at: '',
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    const res = await api.adminPosts.categories.list(token);
    setCategories(res);
  };

  const loadDetail = async () => {
    if (mode !== 'edit' || !slug) return;
    setLoading(true);
    try {
      const data = await api.getPost(slug);
      setForm({
        title: data.title || '',
        category: data.category || '',
        status: data.status || 'draft',
        thumbnail_url: data.thumbnail_url || '',
        content: data.content || '',
        excerpt: data.excerpt || '',
        published_at: data.published_at || '',
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

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'edit') {
        await api.adminPosts.update(token, slug, form);
      } else {
        await api.adminPosts.create(token, form);
      }
      navigate('/admin/blog');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">{mode === 'edit' ? 'Edit Artikel' : 'Tambah Artikel'}</h1>
      <form className="space-y-4 rounded-2xl border border-white/5 bg-white/5 p-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-300">Judul</label>
            <input
              required
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
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
            <label className="text-sm text-slate-300">Status</label>
            <select
              value={form.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-300">Thumbnail URL</label>
            <input
              value={form.thumbnail_url}
              onChange={(e) => handleChange('thumbnail_url', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
              placeholder="https://image.url"
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-slate-300">Excerpt</label>
          <textarea
            rows={2}
            value={form.excerpt}
            onChange={(e) => handleChange('excerpt', e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="text-sm text-slate-300">Konten</label>
          <textarea
            rows={6}
            value={form.content}
            onChange={(e) => handleChange('content', e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            placeholder="Rich text editor placeholder"
          />
        </div>
        <div className="flex gap-3">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
          <Button variant="outline" type="button" onClick={() => navigate('/admin/blog')}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
