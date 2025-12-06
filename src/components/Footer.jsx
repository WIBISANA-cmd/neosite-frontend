import { Link } from 'react-router-dom';
import { API_BASE } from '../utils/api';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#080c1a]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan">
              NeoSite
            </span>
            <p className="text-sm text-slate-300">
              Studio pengembangan website modern berfokus pada performa, keamanan, dan scale-up.
            </p>
            <p className="text-xs text-slate-500">API: {API_BASE}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Layanan</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Company Profile</li>
              <li>Landing Page</li>
              <li>Toko Online</li>
              <li>Web App Kustom</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Navigasi</h4>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              <Link to="/services" className="block hover:text-white">
                Layanan
              </Link>
              <Link to="/portfolio" className="block hover:text-white">
                Portofolio
              </Link>
              <Link to="/blog" className="block hover:text-white">
                Blog
              </Link>
              <Link to="/contact" className="block hover:text-white">
                Kontak
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Kontak</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Email: hello@neosite.id</li>
              <li>WA: +62 812-3456-7890</li>
              <li>Jakarta & Remote</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NeoSite. All rights reserved.</p>
          <p className="text-slate-400">Modern Web Studio</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
