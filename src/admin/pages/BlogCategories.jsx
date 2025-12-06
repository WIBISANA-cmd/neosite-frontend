import { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const BlogCategories = () => {
  const { token } = useAuth();
  const [rows, setRows] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  const load = async () => {
    const res = await api.adminPosts.categories.list(token);
    setRows(res);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.adminPosts.categories.create(token, { name, slug: slug || undefined });
      setName('');
      setSlug('');
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus kategori?')) return;
    await api.adminPosts.categories.remove(token, id);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Kategori Blog</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 rounded-2xl border border-white/5 bg-white/5 p-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama kategori"
          className="min-w-[200px] flex-1 rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
          required
        />
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Slug (opsional)"
          className="min-w-[200px] flex-1 rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
        />
        <Button type="submit" variant="primary">
          Simpan Kategori
        </Button>
      </form>
      <DataTable
        columns={[
          { Header: 'Nama', accessor: 'name' },
          { Header: 'Slug', accessor: 'slug' },
          {
            Header: 'Aksi',
            accessor: 'actions',
            Cell: (row) => (
              <button onClick={() => handleDelete(row.id)} className="text-rose-400">
                Hapus
              </button>
            ),
          },
        ]}
        data={rows}
      />
    </div>
  );
};

export default BlogCategories;
