import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Layanan' },
  { to: '/portfolio', label: 'Portofolio' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'Tentang' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#0b1021]/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-white">
          <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan">
            NeoSite
          </span>
          <span className="hidden text-sm text-slate-300 sm:inline">Website Development Studio</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition hover:text-white ${isActive ? 'text-white' : 'text-slate-300'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/login">
            <Button variant="primary">Sign In</Button>
          </Link>
        </div>

        <button
          onClick={() => setOpen((p) => !p)}
          className="inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          <span className="sr-only">Toggle menu</span>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-surface/90 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-200"
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="w-full">
              <Button className="w-full justify-center" variant="primary">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
