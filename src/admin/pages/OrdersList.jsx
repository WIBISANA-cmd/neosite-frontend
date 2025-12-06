import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import DataTable from '../components/DataTable';
import { api } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const OrdersList = () => {
  const { token } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ payment_status: '', order_status: '', search: '' });
  const [meta, setMeta] = useState(null);

  const load = async (page = 1, override = {}) => {
    setLoading(true);
    try {
      const params = { ...filters, ...override, page };
      const res = await api.adminOrders.list(token, params);
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

  const exportCsv = () => {
    const header = ['Order Number', 'Client', 'Service', 'Payment Status', 'Order Status', 'Final Price'];
    const csvRows = [
      header.join(','),
      ...rows.map((r) =>
        [
          r.order_number,
          r.client?.name || '',
          r.service?.name || '',
          r.payment_status,
          r.order_status,
          r.final_price,
        ].join(','),
      ),
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Orders</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={exportCsv}>
            Export CSV
          </Button>
          <Link to="/admin/orders/create">
            <Button variant="primary">Buat Order</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <input
          placeholder="Cari order number / client"
          value={filters.search}
          onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
          className="rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-sm text-white"
        />
        <select
          value={filters.payment_status}
          onChange={(e) => setFilters((p) => ({ ...p, payment_status: e.target.value }))}
          className="rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-sm text-white"
        >
          <option value="">Payment: Semua</option>
          <option value="pending">Pending</option>
          <option value="waiting_payment">Waiting</option>
          <option value="partially_paid">Partial</option>
          <option value="paid">Paid</option>
          <option value="refunded">Refunded</option>
        </select>
        <select
          value={filters.order_status}
          onChange={(e) => setFilters((p) => ({ ...p, order_status: e.target.value }))}
          className="rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-sm text-white"
        >
          <option value="">Status: Semua</option>
          <option value="new">New</option>
          <option value="confirmed">Confirmed</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <Button variant="outline" onClick={() => load(1)}>
          Terapkan
        </Button>
      </div>
      {loading && <p className="text-slate-300">Memuat...</p>}
      <DataTable
        columns={[
          { Header: 'Order #', accessor: 'order_number' },
          { Header: 'Client', accessor: 'client', Cell: (row) => row.client?.name || '-' },
          { Header: 'Service', accessor: 'service', Cell: (row) => row.service?.name || '-' },
          { Header: 'Payment', accessor: 'payment_status' },
          { Header: 'Status', accessor: 'order_status' },
          { Header: 'Final Price', accessor: 'final_price' },
          {
            Header: 'Aksi',
            accessor: 'actions',
            Cell: (row) => (
              <div className="flex gap-2">
                <Link to={`/admin/orders/${row.id}`} className="text-cyan">
                  Detail
                </Link>
                <Link to={`/admin/orders/${row.id}/edit`} className="text-cyan">
                  Edit
                </Link>
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

export default OrdersList;
