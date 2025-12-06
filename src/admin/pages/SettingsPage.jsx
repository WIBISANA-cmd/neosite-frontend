import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { api } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const SettingsPage = () => {
  const { token } = useAuth();
  const [form, setForm] = useState({
    site_name: '',
    email: '',
    whatsapp: '',
    address: '',
    operational_hours: '',
    logo_url: '',
    favicon_url: '',
    default_seo: { description: '' },
  });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const data = await api.adminSettings.get(token);
      setForm({
        ...form,
        ...(data || {}),
        default_seo: data?.default_seo || { description: '' },
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.adminSettings.update(token, form);
      alert('Settings disimpan');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">Site Settings</h1>
      <form className="space-y-4 rounded-2xl border border-white/5 bg-white/5 p-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-300">Site Name</label>
            <input
              value={form.site_name}
              onChange={(e) => handleChange('site_name', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-300">WhatsApp</label>
            <input
              value={form.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Alamat</label>
            <input
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-slate-300">Jam Operasional</label>
          <input
            value={form.operational_hours}
            onChange={(e) => handleChange('operational_hours', e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-300">Logo URL</label>
            <input
              value={form.logo_url}
              onChange={(e) => handleChange('logo_url', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Favicon URL</label>
            <input
              value={form.favicon_url}
              onChange={(e) => handleChange('favicon_url', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-slate-300">Default SEO Description</label>
          <textarea
            rows={3}
            value={form.default_seo?.description || ''}
            onChange={(e) => handleChange('default_seo', { ...form.default_seo, description: e.target.value })}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
          />
        </div>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;
