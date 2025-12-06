import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import DataTable from '../components/DataTable';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const AdminUsers = () => {
  const { token } = useAuth();
  const [rows, setRows] = useState([]);

  const load = async () => {
    const res = await api.adminUsers.list(token);
    setRows(res.data || res);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Hapus admin ini?')) return;
    await api.adminUsers.remove(token, id);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Admin Users</h1>
        <Link to="/admin/admin-users/create">
          <Button variant="primary">Tambah Admin</Button>
        </Link>
      </div>
      <DataTable
        columns={[
          { Header: 'Nama', accessor: 'name' },
          { Header: 'Email', accessor: 'email' },
          { Header: 'Role', accessor: 'role' },
          {
            Header: 'Aksi',
            accessor: 'actions',
            Cell: (row) => (
              <div className="flex gap-2">
                <Link to={`/admin/admin-users/${row.id}/edit`} className="text-cyan">
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

export default AdminUsers;
