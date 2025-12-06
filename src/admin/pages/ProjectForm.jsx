import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const statuses = ['perencanaan', 'desain', 'development', 'testing', 'selesai'];

const ProjectForm = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const [form, setForm] = useState({
    project_name: '',
    client_id: '',
    status: 'perencanaan',
    progress_percent: 0,
    deadline: '',
  });
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadClients = async () => {
    const res = await api.adminClients.list(token);
    setClients(res.data || res);
  };

  const loadDetail = async () => {
    if (mode !== 'edit' || !id) return;
    setLoading(true);
    try {
      const res = await api.adminProjects.list(token);
      const data = (res.data || res).find((p) => String(p.id) === String(id));
      if (data) {
        setForm({
          project_name: data.project_name,
          client_id: data.client_id,
          status: data.status,
          progress_percent: data.progress_percent,
          deadline: data.deadline || '',
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
    loadDetail();
  }, []);

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'edit') {
        await api.adminProjects.update(token, id, form);
      } else {
        await api.adminProjects.create(token, form);
      }
      navigate('/admin/projects');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">{mode === 'edit' ? 'Edit Project' : 'Tambah Project'}</h1>
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
            <label className="text-sm text-slate-300">Client</label>
            <select
              required
              value={form.client_id}
              onChange={(e) => handleChange('client_id', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            >
              <option value="">Pilih client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm text-slate-300">Status</label>
            <select
              value={form.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-300">Progress (%)</label>
            <input
              type="number"
              value={form.progress_percent}
              onChange={(e) => handleChange('progress_percent', Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Deadline</label>
            <input
              type="date"
              value={form.deadline || ''}
              onChange={(e) => handleChange('deadline', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
          <Button variant="outline" type="button" onClick={() => navigate('/admin/projects')}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
