import { FiBell, FiSearch, FiSun } from 'react-icons/fi';
import { useState } from 'react';

const AdminTopbar = () => {
  const [dark, setDark] = useState(true);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-[#0b1021]/80 px-6 py-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="relative">
          <FiSearch className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-xl border border-white/10 bg-[#0d1428] px-9 py-2 text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setDark((p) => !p)}
          className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200"
          title="Toggle theme"
        >
          <FiSun />
        </button>
        <button className="relative rounded-full border border-white/10 bg-white/5 p-2 text-slate-200">
          <FiBell />
          <span className="absolute -right-1 -top-1 inline-flex h-2 w-2 rounded-full bg-rose-500" />
        </button>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
          <div>
            <p className="text-white">Admin</p>
            <p className="text-xs text-slate-400">Superadmin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
