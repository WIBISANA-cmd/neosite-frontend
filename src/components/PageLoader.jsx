import { useEffect, useState } from 'react';

const PageLoader = ({ show }) => {
  const [render, setRender] = useState(show);

  useEffect(() => {
    let timeout;
    if (show) {
      setRender(true);
      document.body.classList.add('overflow-hidden');
    } else {
      timeout = setTimeout(() => setRender(false), 400);
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      if (timeout) clearTimeout(timeout);
    };
  }, [show]);

  if (!render) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#050816] bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,247,0.08),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(96,165,250,0.08),transparent_25%),#050816] transition-opacity duration-500 ${
        show ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-cyan/20 blur-3xl animate-[pulse_3s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-120px] right-[-40px] h-96 w-96 rounded-full bg-sky-500/15 blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
      </div>

      <div className="relative flex flex-col items-center gap-6">
        <div className="relative h-32 w-32 rounded-full border border-white/10">
          <div className="absolute inset-2 rounded-full border border-cyan/30" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan/20 via-white/10 to-transparent blur-lg" />

          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '12s' }}>
            <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_20px_rgba(45,212,247,0.8)]" />
            <div className="absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
          </div>

          <div className="absolute inset-6 animate-spin" style={{ animationDuration: '6s' }}>
            <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)]" />
          </div>

          <div className="absolute inset-10 flex items-center justify-center">
            <div className="loader-float relative flex h-12 w-12 items-center justify-center rounded-full bg-white/10 shadow-[0_10px_50px_rgba(45,212,247,0.35)]">
              <span className="text-lg font-semibold text-white">N</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan">Neosite Studio</p>
          <p className="mt-2 text-sm text-slate-300">Merajut pengalaman web yang halus.</p>
        </div>

        <div className="relative h-1 w-44 overflow-hidden rounded-full bg-white/10">
          <div className="loader-shimmer absolute inset-y-0 w-1/2 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
