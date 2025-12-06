import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import DataTable from '../components/DataTable';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const Testimonials = () => {
  const { token } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.adminTestimonials.list(token);
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

  const handleDelete = async (id) => {
    if (!confirm('Hapus testimoni ini?')) return;
    try {
      await api.adminTestimonials.remove(token, id);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Testimonials</h1>
        <Link to="/admin/testimonials/create">
          <Button variant="primary">Tambah Testimoni</Button>
        </Link>
      </div>
      {loading && <p className="text-slate-300">Memuat...</p>}
      <DataTable
        columns={[
          { Header: 'Klien', accessor: 'client_name' },
          { Header: 'Perusahaan', accessor: 'company' },
          { Header: 'Rating', accessor: 'rating' },
          {
            Header: 'Aksi',
            accessor: 'actions',
            Cell: (row) => (
              <div className="flex gap-2">
                <Link to={`/admin/testimonials/${row.id}/edit`} className="text-cyan">
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
    </div>
  );
};

export default Testimonials;
