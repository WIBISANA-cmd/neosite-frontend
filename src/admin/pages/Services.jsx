import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import DataTable from '../components/DataTable';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const Services = () => {
  const { token } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.adminServices.list(token);
      setRows(res.data || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (slug) => {
    if (!confirm('Hapus layanan ini?')) return;
    try {
      await api.adminServices.remove(token, slug);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Manajemen Layanan</h1>
        <Link to="/admin/services/create">
          <Button variant="primary">Tambah Layanan</Button>
        </Link>
      </div>
      {loading && <p className="text-slate-300">Memuat...</p>}
      <DataTable
        columns={[
          { Header: 'Nama', accessor: 'name' },
          { Header: 'Harga mulai', accessor: 'starting_price' },
          { Header: 'Status', accessor: 'is_active', Cell: (row) => (row.is_active ? 'Aktif' : 'Nonaktif') },
          {
            Header: 'Aksi',
            accessor: 'actions',
            Cell: (row) => (
              <div className="flex gap-2">
                <Link to={`/admin/services/${row.slug}/edit`} className="text-cyan">
                  Edit
                </Link>
                <button onClick={() => handleDelete(row.slug)} className="text-rose-400">
                  Hapus
                </button>
              </div>
            ),
          },
        ]}
        data={rows}
      />
    </div>
  );
};

export default Services;
