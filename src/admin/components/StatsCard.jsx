const StatsCard = ({ title, value, change }) => {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-lg shadow-black/10">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {change && <p className="text-xs text-emerald-400">{change}</p>}
    </div>
  );
};

export default StatsCard;
