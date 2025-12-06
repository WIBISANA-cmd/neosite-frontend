import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import DataTable from '../components/DataTable';
import { api } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const FaqAdmin = () => {
  const { token } = useAuth();
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ question: '', answer: '', order: 0, is_active: true });

  const load = async () => {
    const res = await api.getFaqs();
    setRows(res.data || res);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/faqs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      setForm({ question: '', answer: '', order: 0, is_active: true });
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">FAQ</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-white/5 bg-white/5 p-4">
        <input
          value={form.question}
          onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))}
          placeholder="Pertanyaan"
          className="w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
          required
        />
        <textarea
          value={form.answer}
          onChange={(e) => setForm((p) => ({ ...p, answer: e.target.value }))}
          placeholder="Jawaban"
          rows={3}
          className="w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
          required
        />
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <label className="text-sm text-slate-300">Urutan</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Aktif</label>
            <select
              value={form.is_active ? '1' : '0'}
              onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.value === '1' }))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            >
              <option value="1">Ya</option>
              <option value="0">Tidak</option>
            </select>
          </div>
        </div>
        <Button type="submit" variant="primary">
          Simpan FAQ
        </Button>
      </form>
      <DataTable
        columns={[
          { Header: 'Pertanyaan', accessor: 'question' },
          { Header: 'Urutan', accessor: 'order' },
          { Header: 'Aktif', accessor: 'is_active', Cell: (row) => (row.is_active ? 'Ya' : 'Tidak') },
        ]}
        data={rows}
      />
    </div>
  );
};

export default FaqAdmin;
