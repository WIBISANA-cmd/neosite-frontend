import SectionWrapper from '../components/SectionWrapper';

const NotFound = () => (
  <SectionWrapper title="Halaman tidak ditemukan">
    <p className="reveal-card rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300">
      Maaf, halaman yang Anda cari tidak tersedia.
    </p>
  </SectionWrapper>
);

export default NotFound;
