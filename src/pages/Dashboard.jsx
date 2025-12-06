import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import SectionWrapper from '../components/SectionWrapper';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const statusColors = {
  perencanaan: 'bg-blue-500/20 text-blue-200',
  desain: 'bg-purple-500/20 text-purple-200',
  development: 'bg-yellow-500/20 text-yellow-200',
  testing: 'bg-emerald-500/20 text-emerald-200',
  selesai: 'bg-cyan-500/20 text-cyan-200',
};

const Dashboard = () => {
  const { user, token, isAuthenticated } = useAuth();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    api
      .getClientProjects(token)
      .then((res) => setProjects(res.data || res))
      .catch((err) => setError(err.message));
  }, [token]);

  if (!isAuthenticated) {
    return (
      <SectionWrapper title="Client Dashboard">
        <p className="text-slate-300">Silakan login untuk melihat status project.</p>
        <div className="mt-4 flex gap-3">
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="outline">Register</Button>
          </Link>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper title="Client Dashboard" description={`Halo, ${user?.name}. Berikut status project Anda.`}>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{project.project_name}</h3>
              <span className={`rounded-full px-3 py-1 text-xs ${statusColors[project.status] || 'bg-white/10'}`}>
                {project.status}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-300">Progress: {project.progress_percent}%</p>
            <div className="mt-2 h-2 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-cyan"
                style={{ width: `${project.progress_percent}%`, transition: 'width 0.3s ease' }}
              />
            </div>
            {project.deadline && (
              <p className="mt-2 text-xs text-slate-400">
                Deadline: {new Date(project.deadline).toLocaleDateString('id-ID')}
              </p>
            )}
          </div>
        ))}
      </div>
      {!projects.length && <p className="text-slate-300">Belum ada project aktif.</p>}
    </SectionWrapper>
  );
};

export default Dashboard;
