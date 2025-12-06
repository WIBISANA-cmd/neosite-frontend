import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const LeadDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    api.adminLeads
      .list(token)
      .then((res) => {
        const data = (res.data || res).find((l) => String(l.id) === id);
        setLead(data);
      })
      .catch(console.error);
  }, [id, token]);

  if (!lead) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold text-white">Detail Lead</h1>
        <p className="text-slate-300">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">Detail Lead</h1>
      <div className="space-y-2 rounded-2xl border border-white/5 bg-white/5 p-6 text-sm text-slate-200">
        <p>Nama: {lead.name}</p>
        <p>Email: {lead.email}</p>
        <p>WhatsApp: {lead.whatsapp}</p>
        <p>Layanan: {lead.service_interest}</p>
        <p>Status: {lead.status}</p>
        <p>Pesan: {lead.message}</p>
      </div>
    </div>
  );
};

export default LeadDetail;
