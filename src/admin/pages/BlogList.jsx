import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import DataTable from '../components/DataTable';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const BlogList = () => {
  const { token } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.adminPosts.list(token);
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
    if (!confirm('Hapus artikel ini?')) return;
    try {
      await api.adminPosts.remove(token, slug);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Blog / Posts</h1>
        <div className="flex gap-3">
          <Link to="/admin/blog/categories">
            <Button variant="outline">Kategori</Button>
          </Link>
          <Link to="/admin/blog/create">
            <Button variant="primary">Tambah Artikel</Button>
          </Link>
        </div>
      </div>
      {loading && <p className="text-slate-300">Memuat...</p>}
      <DataTable
        columns={[
          { Header: 'Judul', accessor: 'title' },
          { Header: 'Status', accessor: 'status' },
          { Header: 'Kategori', accessor: 'category' },
          {
            Header: 'Aksi',
            accessor: 'actions',
            Cell: (row) => (
              <div className="flex gap-2">
                <Link to={`/admin/blog/${row.slug}/edit`} className="text-cyan">
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

export default BlogList;
