import { useState } from 'react';
import Button from '../components/Button';
import SectionWrapper from '../components/SectionWrapper';
import { api } from '../utils/api';

const defaultForm = {
  name: '',
  email: '',
  whatsapp: '',
  service_interest: '',
  budget_estimate: '',
  message: '',
};

const Contact = () => {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Nama wajib diisi';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email tidak valid';
    if (!form.message || form.message.length < 10) errs.message = 'Pesan minimal 10 karakter';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      await api.submitLead(form);
      setStatus('Pesan terkirim! Kami akan hubungi Anda.');
      setForm(defaultForm);
    } catch (err) {
      setStatus(err.message);
    }
  };

  return (
    <SectionWrapper
      title="Hubungi NeoSite"
      eyebrow="Kontak"
      description="Sampaikan kebutuhan Anda. Kami akan merespons dalam 1x24 jam kerja."
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">Informasi Kontak</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>Email: hello@neosite.id</li>
            <li>WhatsApp: +62 812-3456-7890</li>
            <li>Jam kerja: Senin - Jumat, 09.00 - 18.00</li>
          </ul>
          <div className="mt-6 space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">Prefer WA?</p>
            <p>Kami bisa mulai dengan call singkat untuk menyamakan ekspektasi sebelum membuat proposal.</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-slate-200">Nama*</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b1021] px-3 py-2 text-white"
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm text-slate-200">Email*</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b1021] px-3 py-2 text-white"
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-slate-200">Nomor WhatsApp</label>
                <input
                  type="text"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b1021] px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-slate-200">Jenis Layanan</label>
                <select
                  value={form.service_interest}
                  onChange={(e) => setForm({ ...form, service_interest: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b1021] px-3 py-2 text-white"
                >
                  <option value="">Pilih layanan</option>
                  <option value="Company Profile">Company Profile</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="Toko Online">Toko Online</option>
                  <option value="Web App Kustom">Web App Kustom</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-200">Budget Estimasi</label>
              <input
                type="text"
                value={form.budget_estimate}
                onChange={(e) => setForm({ ...form, budget_estimate: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b1021] px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-200">Pesan*</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b1021] px-3 py-2 text-white"
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">Data Anda aman dan hanya dipakai untuk keperluan konsultasi.</p>
              <Button type="submit">Kirim Pesan</Button>
            </div>
            {status && <p className="text-sm text-emerald-400">{status}</p>}
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
