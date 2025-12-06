import { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import { api } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const ActivityLogPage = () => {
  const { token } = useAuth();
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState(null);

  const load = async (page = 1) => {
    try {
      const res = await api.adminActivity.list(token, { page });
      const data = res.data || res;
      setRows(data.data || data);
      setMeta(res.meta || data.meta || null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">Activity Log</h1>
      <DataTable
        columns={[
          { Header: 'Module', accessor: 'module' },
          { Header: 'Action', accessor: 'action' },
          { Header: 'User', accessor: 'user', Cell: (row) => row.user?.name || '-' },
          { Header: 'Time', accessor: 'created_at' },
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

export default ActivityLogPage;
