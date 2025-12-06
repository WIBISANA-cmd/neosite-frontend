import { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import { Link } from 'react-router-dom';

const LeadsAdmin = () => {
  const { token } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [meta, setMeta] = useState(null);

  const load = async (page = 1, status = filter) => {
    setLoading(true);
    try {
      const res = await api.adminLeads.list(token, { status, page });
      const data = res.data || res;
      setRows(data.data || data);
      setMeta(res.meta || data.meta || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await api.adminLeads.update(token, id, { status });
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const convertToOrder = async (leadId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/leads/${leadId}/convert-order`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      const data = await res.json();
      alert(`Order dibuat: ${data.order_number || data.order_id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">Leads</h1>
      <div className="flex gap-3">
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            load(1, e.target.value || undefined);
          }}
          className="rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-sm text-white"
        >
          <option value="">Semua status</option>
          <option value="baru">Baru</option>
          <option value="diproses">Diproses</option>
          <option value="selesai">Selesai</option>
        </select>
      </div>
      {loading && <p className="text-slate-300">Memuat...</p>}
      <DataTable
        columns={[
          { Header: 'Nama', accessor: 'name' },
          { Header: 'Email', accessor: 'email' },
          { Header: 'Layanan', accessor: 'service_interest' },
          { Header: 'Status', accessor: 'status' },
          {
            Header: 'Aksi',
            accessor: 'actions',
            Cell: (row) => (
              <div className="flex flex-wrap gap-2">
                <Link to={`/admin/leads/${row.id}`} className="text-cyan">
                  Detail
                </Link>
                <button onClick={() => convertToOrder(row.id)} className="text-emerald-400">
                  Convert to Order
                </button>
                {['baru', 'diproses', 'selesai'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatus(row.id, st)}
                    className={`rounded-full px-2 py-1 text-xs ${
                      row.status === st ? 'bg-cyan/20 text-cyan' : 'bg-white/5 text-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            ),
          },
        ]}
        data={rows}
      />
      {meta && (
        <div className="flex items-center justify-end gap-3 text-sm text-slate-300">
          <button
            disabled={meta.current_page === 1}
            onClick={() => load(meta.current_page - 1)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {meta.current_page} / {meta.last_page}
          </span>
          <button
            disabled={meta.current_page === meta.last_page}
            onClick={() => load(meta.current_page + 1)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => {
              const header = ['Nama', 'Email', 'Layanan', 'Status', 'Pesan'];
              const csvRows = [
                header.join(','),
                ...rows.map((r) =>
                  [r.name, r.email, r.service_interest, r.status, `"${(r.message || '').replace(/"/g, '""')}"`].join(
                    ',',
                  ),
                ),
              ];
              const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'leads.csv';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1"
          >
            Export CSV
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadsAdmin;
