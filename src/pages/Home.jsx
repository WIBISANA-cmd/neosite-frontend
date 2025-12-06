import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import SectionWrapper from '../components/SectionWrapper';
import { api } from '../utils/api';

const processSteps = [
  'Konsultasi',
  'Perencanaan',
  'Desain',
  'Development',
  'Launching',
  'Maintenance',
];

const Home = () => {
  const [services, setServices] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [serviceRes, portfolioRes, testimonialRes, faqRes] = await Promise.all([
          api.getServices(),
          api.getPortfolios(),
          api.getTestimonials(),
          api.getFaqs(),
        ]);
        setServices(serviceRes.data || serviceRes);
        setPortfolios(portfolioRes.data || portfolioRes);
        setTestimonials(testimonialRes.data || testimonialRes);
        setFaqs(faqRes.data || faqRes);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div className="relative space-y-10 overflow-hidden">
      <section className="relative overflow-hidden">
        <div className="section-padding mx-auto flex max-w-6xl flex-col items-start gap-10 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan">
              NeoSite • Modern Web Studio
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Bangun Website Profesional <br className="hidden md:block" /> Bersama NeoSite
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              Kami menggabungkan Laravel + React untuk website yang cepat, scalable, dan siap mengonversi.
              Fokus pada performa, keamanan, dan pengalaman pengguna yang memikat.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/contact">
                <Button> Konsultasi Gratis </Button>
              </Link>
              <Link to="/portfolio">
                <Button variant="outline">Lihat Portofolio</Button>
              </Link>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="h-10 w-10 rounded-full bg-white/10 text-center text-lg font-semibold leading-10 text-cyan">
                  50+
                </span>
                <div>
                  <p className="font-semibold text-white">Project shipped</p>
                  <p className="text-xs text-slate-400">Across fintech, retail, education</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
              {[
                ['Time to market', '1-4 minggu'],
                ['Core stack', 'Laravel + React'],
                ['Support', 'Maintenance berkelanjutan'],
              ].map(([title, value]) => (
                <div key={title} className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
                  <p className="text-lg font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1d3a] via-[#0b1021] to-[#0d1428] p-6 shadow-2xl shadow-cyan/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,247,0.12),transparent_25%)]" />
              <div className="relative space-y-4">
                <p className="text-sm uppercase tracking-wide text-cyan">Mockup</p>
                <div className="space-y-3 rounded-2xl bg-white/5 p-4">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Dashboard NeoSite</span>
                    <span>Live preview</span>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-gradient-to-tr from-cyan/10 via-white/5 to-transparent p-6 text-white">
                    <p className="text-lg font-semibold">Traffic & Conversion</p>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div className="rounded-lg bg-white/5 p-3">
                        <p className="text-slate-400">Visitors</p>
                        <p className="text-2xl font-bold">124k</p>
                        <p className="text-xs text-emerald-400">+12% MoM</p>
                      </div>
                      <div className="rounded-lg bg-white/5 p-3">
                        <p className="text-slate-400">Conversion</p>
                        <p className="text-2xl font-bold">4.7%</p>
                        <p className="text-xs text-emerald-400">+0.8% MoM</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs text-slate-300">
                  {['SEO ready', 'Mobile first', 'Performance'].map((item) => (
                    <div key={item} className="rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-center">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper
        id="advantages"
        eyebrow="Keunggulan NeoSite"
        title="Website modern dengan fondasi kuat"
        description="Kami fokus pada performa, keamanan, dan pengalaman pengguna agar bisnis Anda tumbuh lebih cepat."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            ['Cepat Online', 'Proses terstruktur dengan komponen reusable membuat launch lebih cepat.'],
            ['Desain Eksklusif', 'UI clean, techy, dan konsisten dengan brand guideline.'],
            ['SEO Friendly', 'Struktur semantik dan kecepatan tinggi untuk peringkat lebih baik.'],
            ['Scalable', 'Arsitektur API-first dengan Laravel + React yang mudah dikembangkan.'],
            ['Support Penuh', 'Maintenance, backup, dan monitoring dasar setelah go-live.'],
            ['Data-Driven', 'Integrasi analitik, heatmap, dan A/B testing ringan.'],
          ].map(([title, desc]) => (
            <div key={title} className="glass rounded-2xl p-5 shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:shadow-cyan/20">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan/10 text-cyan">
                <span>◆</span>
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-300">{desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="services"
        eyebrow="Layanan Kami"
        title="Solusi website untuk berbagai kebutuhan"
        description="Paket fleksibel untuk brand, startup, dan corporate."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <div
              key={service.slug}
              className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 transition hover:-translate-y-1 hover:border-cyan/30 hover:shadow-glow"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs text-cyan">Mulai</span>
              </div>
              <p className="mt-3 text-sm text-slate-300">{service.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-200">
                <span>Mulai {Number(service.starting_price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}</span>
                <span className="text-slate-400">{service.estimated_time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link to="/services">
            <Button variant="outline">Lihat semua layanan</Button>
          </Link>
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="process"
        eyebrow="Proses Kerja"
        title="Rapi, transparan, dan kolaboratif"
        description="Setiap tahap memiliki deliverable yang jelas agar tim Anda mudah memantau progres."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {processSteps.map((step, idx) => (
            <div key={step} className="rounded-2xl border border-white/5 bg-white/5 p-5">
              <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
                <span>Step {idx + 1}</span>
                <span className="h-6 w-6 rounded-full bg-cyan/10 text-center text-cyan">{idx + 1}</span>
              </div>
              <h4 className="text-lg font-semibold text-white">{step}</h4>
              <p className="mt-2 text-sm text-slate-300">
                {idx < 2
                  ? 'Sinkronisasi kebutuhan dan scope proyek.'
                  : idx < 4
                    ? 'Eksekusi desain & development dengan review berkala.'
                    : 'QA, launch, dan dukungan pasca rilis.'}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="portfolio"
        eyebrow="Portofolio Singkat"
        title="Project pilihan"
        description="Beberapa karya terbaru kami dari berbagai industri."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {portfolios.slice(0, 3).map((item) => (
            <Link
              to={`/portfolio/${item.slug}`}
              key={item.slug}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-cyan/30"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.project_name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="space-y-2 p-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{item.category}</span>
                  <span>{item.industry}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">{item.project_name}</h3>
                <p
                  className="text-sm text-slate-300"
                  style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
          <Link to="/portfolio">
            <Button variant="outline">Lihat portofolio lengkap</Button>
          </Link>
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="testimonials"
        eyebrow="Testimoni Klien"
        title="Dipercaya tim marketing & product"
        description="Cerita kolaborasi kami dengan brand dan startup."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm text-slate-200">“{item.content}”</p>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                <div>
                  <p className="font-semibold text-white">{item.client_name}</p>
                  <p>
                    {item.position} • {item.company}
                  </p>
                </div>
                <span className="rounded-full bg-cyan/10 px-3 py-1 text-cyan">{item.rating}/5</span>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="faq" eyebrow="FAQ" title="Pertanyaan umum">
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">{faq.question}</p>
              <p className="mt-2 text-sm text-slate-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="cta"
        title="Siap diskusikan proyek Anda?"
        description="Cerita pendek tentang kebutuhan Anda sudah cukup untuk kami siapkan rekomendasi timeline dan biaya."
        className="pb-24"
      >
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-cyan/30 bg-gradient-to-r from-cyan/10 via-white/5 to-transparent p-10 text-center shadow-glow">
          <p className="text-sm text-slate-300">Respon dalam 1x24 jam kerja</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="px-8">Hubungi NeoSite</Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="px-8">
                Lihat Paket
              </Button>
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Home;
