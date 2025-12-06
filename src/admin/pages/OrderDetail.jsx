import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import DataTable from '../components/DataTable';
import { api } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [paymentForm, setPaymentForm] = useState({ amount: '', payment_method: '', payment_date: '', status: 'paid' });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.adminOrders.detail(token, id);
      setOrder(data.data || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const updateStatus = async (status) => {
    await api.adminOrders.update(token, id, { ...order, order_status: status });
    load();
  };

  const addPayment = async (e) => {
    e.preventDefault();
    await api.adminOrders.payments.add(token, id, paymentForm);
    setPaymentForm({ amount: '', payment_method: '', payment_date: '', status: 'paid' });
    load();
  };

  const totalPaid = (order?.payments || []).reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const balance = Number(order?.final_price || 0) - totalPaid;

  if (!order) {
    return <p className="text-slate-300">Memuat...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Order #{order.order_number}</h1>
        <Button variant="outline" onClick={() => updateStatus('confirmed')}>
          Konfirmasi
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-200">
          <p>Client: {order.client?.name || '-'}</p>
          <p>Layanan: {order.service?.name}</p>
          <p>Payment Status: {order.payment_status}</p>
          <p>Order Status: {order.order_status}</p>
          <p>Final Price: {order.final_price}</p>
          <p>Paid: {totalPaid}</p>
          <p>Sisa: {balance}</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-200">
          <p>Notes: {order.notes_internal || '-'}</p>
          <p>Due: {order.due_date || '-'}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {['new', 'confirmed', 'in_progress', 'completed', 'cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => updateStatus(st)}
                className={`rounded-full px-3 py-1 text-xs ${
                  order.order_status === st ? 'bg-cyan/20 text-cyan' : 'bg-white/5 text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Pembayaran</p>
          <form className="flex flex-wrap gap-2" onSubmit={addPayment}>
            <input
              type="number"
              required
              value={paymentForm.amount}
              onChange={(e) => setPaymentForm((p) => ({ ...p, amount: e.target.value }))}
              placeholder="Nominal"
              className="rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-sm text-white"
            />
            <input
              value={paymentForm.payment_method}
              onChange={(e) => setPaymentForm((p) => ({ ...p, payment_method: e.target.value }))}
              placeholder="Metode"
              className="rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-sm text-white"
            />
            <input
              type="date"
              value={paymentForm.payment_date}
              onChange={(e) => setPaymentForm((p) => ({ ...p, payment_date: e.target.value }))}
              className="rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-sm text-white"
            />
            <Button type="submit" variant="primary">
              Tambah
            </Button>
          </form>
        </div>
        <DataTable
          columns={[
            { Header: 'Tanggal', accessor: 'payment_date' },
            { Header: 'Metode', accessor: 'payment_method' },
            { Header: 'Amount', accessor: 'amount' },
            { Header: 'Status', accessor: 'status' },
          ]}
          data={order.payments || []}
        />
      </div>
    </div>
  );
};

export default OrderDetail;
