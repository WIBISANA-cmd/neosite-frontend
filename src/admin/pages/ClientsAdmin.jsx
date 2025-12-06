import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import DataTable from '../components/DataTable';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const ClientsAdmin = () => {
  const { token } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState(null);

  const load = async (page = 1) => {
    setLoading(true);
    try {
    const res = await api.adminClients.list(token, { page });
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

  const handleDelete = async (id) => {
    if (!confirm('Hapus client ini?')) return;
    await api.adminClients.remove(token, id);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Clients</h1>
        <Link to="/admin/clients/create">
          <Button variant="primary">Tambah Client</Button>
        </Link>
      </div>
      {loading && <p className="text-slate-300">Memuat...</p>}
      <DataTable
        columns={[
          { Header: 'Nama', accessor: 'name' },
          { Header: 'Email', accessor: 'email' },
          {
            Header: 'Aksi',
            accessor: 'actions',
            Cell: (row) => (
              <div className="flex gap-2">
                <Link to={`/admin/clients/${row.id}/edit`} className="text-cyan">
                  Edit
                </Link>
                <button onClick={() => handleDelete(row.id)} className="text-rose-400">
                  Hapus
                </button>
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
        </div>
      )}
    </div>
  );
};

export default ClientsAdmin;
