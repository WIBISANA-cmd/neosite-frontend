import { useEffect, useMemo, useState } from 'react';
import StatsCard from '../components/StatsCard';
import QuickActions from '../components/QuickActions';
import DataTable from '../components/DataTable';
import { api } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { token } = useAuth();
  const [counts, setCounts] = useState({
    leads: 0,
    portfolios: 0,
    services: 0,
    posts: 0,
    testimonials: 0,
    projects: 0,
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const stats = await api.adminStats.counts(token);
      setCounts({ ...stats, projects: stats.projects || 0 });

      const leadsRes = await api.adminLeads.list(token).catch(() => []);
      const leadList = leadsRes.data || leadsRes || [];
      setRecentLeads(leadList.slice(0, 5).map((l) => ({ type: 'Lead', detail: l.name || l.email, time: '' })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(
    () => [
      { title: 'Leads Baru', value: counts.leads },
      { title: 'Portofolio', value: counts.portfolios },
      { title: 'Layanan', value: counts.services },
      { title: 'Blog Posts', value: counts.posts },
      { title: 'Testimonials', value: counts.testimonials },
      { title: 'Projects Aktif', value: counts.projects },
    ],
    [counts],
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((item) => (
          <StatsCard key={item.title} title={item.title} value={item.value} />
        ))}
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
        <p className="text-sm text-slate-300">Grafik leads (placeholder)</p>
        <div className="mt-4 h-40 rounded-xl bg-gradient-to-r from-cyan/10 via-white/5 to-transparent" />
      </div>
      <QuickActions />
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
        <p className="text-sm font-semibold text-white">Aktivitas Terbaru</p>
        {loading && <p className="text-slate-300">Memuat...</p>}
        <DataTable
          columns={[
            { Header: 'Jenis', accessor: 'type' },
            { Header: 'Detail', accessor: 'detail' },
            { Header: 'Waktu', accessor: 'time' },
          ]}
          data={recentLeads}
        />
      </div>
    </div>
  );
};

export default Dashboard;
