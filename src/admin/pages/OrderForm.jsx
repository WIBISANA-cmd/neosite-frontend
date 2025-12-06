import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const OrderForm = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    client_id: '',
    service_id: '',
    total_price: 0,
    discount: 0,
    final_price: 0,
    payment_status: 'pending',
    order_status: 'new',
    order_number: '',
    custom_requirements: '',
  });

  useEffect(() => {
    api.adminServices.list(token).then((res) => setServices(res.data || res));
    api.adminClients.list(token).then((res) => setClients(res.data || res));
  }, []);

  const handleChange = (key, value) => {
    const updated = { ...form, [key]: value };
    updated.final_price = Number(updated.total_price || 0) - Number(updated.discount || 0);
    setForm(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.adminOrders.create(token, form);
    navigate('/admin/orders');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">Buat Order</h1>
      <form className="space-y-4 rounded-2xl border border-white/5 bg-white/5 p-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-300">Order Number</label>
            <input
              value={form.order_number}
              onChange={(e) => handleChange('order_number', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
              placeholder="Kosongkan untuk auto"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Client</label>
            <select
              value={form.client_id}
              onChange={(e) => handleChange('client_id', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            >
              <option value="">Pilih client (opsional)</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-300">Layanan</label>
            <select
              required
              value={form.service_id}
              onChange={(e) => handleChange('service_id', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            >
              <option value="">Pilih layanan</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-300">Payment Status</label>
            <select
              value={form.payment_status}
              onChange={(e) => handleChange('payment_status', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            >
              <option value="pending">pending</option>
              <option value="waiting_payment">waiting_payment</option>
              <option value="partially_paid">partially_paid</option>
              <option value="paid">paid</option>
              <option value="refunded">refunded</option>
            </select>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm text-slate-300">Total</label>
            <input
              type="number"
              value={form.total_price}
              onChange={(e) => handleChange('total_price', Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Diskon</label>
            <input
              type="number"
              value={form.discount}
              onChange={(e) => handleChange('discount', Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Final</label>
            <input
              type="number"
              value={form.final_price}
              readOnly
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-slate-300">Order Status</label>
          <select
            value={form.order_status}
            onChange={(e) => handleChange('order_status', e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
          >
            <option value="new">new</option>
            <option value="confirmed">confirmed</option>
            <option value="in_progress">in_progress</option>
            <option value="completed">completed</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-300">Custom Requirements</label>
          <textarea
            value={form.custom_requirements}
            onChange={(e) => handleChange('custom_requirements', e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#0d1428] px-3 py-2 text-white"
          />
        </div>
        <Button type="submit" variant="primary">
          Simpan
        </Button>
      </form>
    </div>
  );
};

export default OrderForm;
