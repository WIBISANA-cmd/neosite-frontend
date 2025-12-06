import { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const NotificationsPage = () => {
  const { token } = useAuth();
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState(null);

  const load = async (page = 1) => {
    const res = await api.adminNotifications.list(token, { page });
    const data = res.data || res;
    setRows(data.data || data);
    setMeta(res.meta || data.meta || null);
  };

  useEffect(() => {
    load();
  }, []);

  const markAll = async () => {
    await Promise.all((rows || []).map((n) => api.adminNotifications.markRead(token, n.id)));
    load();
  };

  const markRead = async (id) => {
    await api.adminNotifications.markRead(token, id);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Notifications</h1>
        <Button variant="outline" onClick={markAll}>
          Tandai semua dibaca
        </Button>
      </div>
      <DataTable
        columns={[
          { Header: 'Judul', accessor: 'title' },
          { Header: 'Isi', accessor: 'body' },
          { Header: 'Status', accessor: 'is_read', Cell: (row) => (row.is_read ? 'Read' : 'Unread') },
          {
            Header: 'Aksi',
            accessor: 'actions',
            Cell: (row) =>
              row.is_read ? null : (
                <button onClick={() => markRead(row.id)} className="text-cyan">
                  Tandai baca
                </button>
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

export default NotificationsPage;
