import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../components/Button';
import SectionWrapper from '../components/SectionWrapper';
import Stepper from '../components/Stepper';
import FloatingLines from '../components/FloatingLines';
import CardSwap, { Card } from '../components/CardSwap';
import { api } from '../utils/api';
import useReducedMotion from '../hooks/useReducedMotion';

const processSteps = [
  {
    title: 'Tahap Awal: Konsultasi & Brief Project',
    summary: 'Menyelaraskan kebutuhan, target audiens, dan arah visual.',
    points: [
      'Mengumpulkan kebutuhan fitur, fungsi, dan tujuan website.',
      'Menentukan target audience & competitor.',
      'Memilih jenis website (company profile, ecommerce, landing page).',
      'Membahas budget & timeline.',
      'Menentukan style design awal (warna, moodboard).',
    ],
  },
  {
    title: 'Penawaran & Kesepakatan (Proposal)',
    summary: 'Menyusun ruang lingkup dan ekspektasi sebelum mulai.',
    points: [
      'Space kerja (scope pekerjaan) & daftar fitur yang akan dibuat.',
      'Timeline pengerjaan (milestone).',
      'Biaya & termin pembayaran + tools & teknologi.',
      'Garansi & maintenance setelah go-live.',
      'Jika disetujui → klien bayar DP → proyek dimulai.',
    ],
  },
  {
    title: 'Tahap Desain (Wireframe & UI Design)',
    output: 'Output: Figma/Prototype yang bisa dilihat klien.',
    points: [
      'Membuat wireframe (kerangka layout).',
      'Membuat UI visual (warna, font, ilustrasi).',
      'Revisi maksimal sesuai perjanjian.',
      'Finalisasi desain sebelum coding.',
    ],
    note: 'Lebih cepat jika desain disepakati dulu sebelum coding agar revisi tidak berlarut.',
  },
  {
    title: 'Tahap Development (Frontend & Backend)',
    output: 'Output: Website berfungsi penuh di staging server.',
    points: [
      'Frontend: struktur UI (React), responsive, animasi & interaksi.',
      'Backend: setup database, API, autentikasi, admin panel.',
      'Integrasi fitur: booking, payment gateway, email, dsb.',
      'Testing: UI/UX, mobile-friendly, speed, bug fixing.',
      'Klien memantau progres di server dev/staging.',
    ],
  },
  {
    title: 'Revisi & Finalisasi',
    summary: 'Klien cek hasil; website siap deploy.',
    points: [
      'Perbaikan konten & penyesuaian layout.',
      'Penambahan minor fitur (sesuai scope awal).',
    ],
  },
  {
    title: 'Deployment (Go-Live)',
    output: 'Output: Website aktif & bisa diakses publik.',
    points: [
      'Setup hosting / VPS / domain.',
      'Upload file & database + konfigurasi SSL (https).',
      'Konfigurasi email domain.',
      'Optimasi kecepatan & keamanan dasar.',
      'Biasanya dilakukan setelah pelunasan pembayaran.',
    ],
  },
  {
    title: 'Serah Terima & Dokumentasi',
    output: 'Output: Manual penggunaan + akses website.',
    points: [
      'Memberikan akses admin panel.',
      'Dokumentasi (PDF/Notion/Google Docs).',
      'SOP update konten bila kelola mandiri.',
      'Backup file & database.',
    ],
  },
  {
    title: 'Maintenance (Opsional / Langganan)',
    summary: 'Paket bulanan/tahunan pasca go-live.',
    points: [
      'Update konten ringan & perbaikan bug.',
      'Monitor uptime & keamanan.',
      'Cadangan data rutin.',
    ],
  },
];

const makeDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const advantageCards = [
  {
    title: 'Cepat Online',
    desc: 'Proses terstruktur dengan komponen reusable membuat launch lebih cepat.',
    img: makeDataUri(
      `<svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#5b3fff"/><stop offset="100%" stop-color="#0ea5e9"/></linearGradient></defs><rect width="400" height="250" fill="#0b1021"/><rect x="34" y="40" width="332" height="170" rx="22" fill="#0f172a" stroke="url(#g1)" stroke-opacity="0.4"/><path d="M70 158C120 120 150 95 210 122C270 150 300 118 330 90" stroke="url(#g1)" stroke-width="14" fill="none" stroke-linecap="round"/><circle cx="120" cy="120" r="16" fill="#5b3fff"/><circle cx="210" cy="122" r="16" fill="#0ea5e9"/><circle cx="300" cy="105" r="13" fill="#c084fc"/><rect x="60" y="64" width="110" height="12" rx="6" fill="#fff" opacity="0.08"/><rect x="230" y="180" width="120" height="10" rx="5" fill="#fff" opacity="0.14"/><rect x="60" y="180" width="150" height="10" rx="5" fill="#fff" opacity="0.2"/></svg>`,
    ),
  },
  {
    title: 'Desain Eksklusif',
    desc: 'UI clean, techy, dan konsisten dengan brand guideline.',
    img: makeDataUri(
      `<svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#c084fc"/><stop offset="100%" stop-color="#60a5fa"/></linearGradient></defs><rect width="400" height="250" fill="#0b1021"/><rect x="55" y="36" width="290" height="178" rx="22" fill="#0f172a" stroke="url(#g2)" stroke-opacity="0.5"/><path d="M120 190 L200 60 L280 190 Z" fill="url(#g2)" opacity="0.7"/><path d="M132 182 L200 80 L268 182 Z" fill="#0b1021" opacity="0.82"/><circle cx="200" cy="122" r="18" fill="url(#g2)"/><rect x="90" y="62" width="60" height="12" rx="6" fill="#fff" opacity="0.14"/><rect x="250" y="62" width="60" height="12" rx="6" fill="#fff" opacity="0.12"/><rect x="100" y="198" width="200" height="12" rx="6" fill="#fff" opacity="0.12"/></svg>`,
    ),
  },
  {
    title: 'SEO Friendly',
    desc: 'Struktur semantik dan kecepatan tinggi untuk peringkat lebih baik.',
    img: makeDataUri(
      `<svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#22d3ee"/><stop offset="100%" stop-color="#818cf8"/></linearGradient></defs><rect width="400" height="250" fill="#0b1021"/><rect x="60" y="42" width="280" height="166" rx="18" fill="#0f172a" stroke="url(#g3)" stroke-opacity="0.5"/><rect x="80" y="70" width="240" height="12" rx="6" fill="url(#g3)" opacity="0.85"/><rect x="80" y="94" width="190" height="10" rx="5" fill="#fff" opacity="0.14"/><rect x="80" y="116" width="160" height="10" rx="5" fill="#fff" opacity="0.12"/><rect x="80" y="138" width="220" height="10" rx="5" fill="#fff" opacity="0.1"/><circle cx="320" cy="142" r="32" fill="none" stroke="url(#g3)" stroke-width="10"/><path d="M343 166 L365 188" stroke="#22d3ee" stroke-width="10" stroke-linecap="round"/><rect x="92" y="186" width="130" height="10" rx="5" fill="#fff" opacity="0.16"/></svg>`,
    ),
  },
  {
    title: 'Scalable',
    desc: 'Arsitektur API-first dengan Laravel + React yang mudah dikembangkan.',
    img: makeDataUri(
      `<svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0ea5e9"/><stop offset="100%" stop-color="#5b3fff"/></linearGradient></defs><rect width="400" height="250" fill="#0b1021"/><g transform="translate(60 36)"><rect x="0" y="0" width="280" height="180" rx="22" fill="#0f172a" stroke="url(#g4)" stroke-opacity="0.4"/><rect x="24" y="30" width="92" height="64" rx="14" fill="url(#g4)" opacity="0.75"/><rect x="132" y="30" width="92" height="64" rx="14" fill="url(#g4)" opacity="0.55"/><rect x="76" y="112" width="130" height="42" rx="14" fill="#0b1021" stroke="url(#g4)" stroke-width="2" stroke-opacity="0.6"/><path d="M66 72 L96 112" stroke="url(#g4)" stroke-width="6" stroke-linecap="round"/><path d="M204 72 L184 112" stroke="url(#g4)" stroke-width="6" stroke-linecap="round"/></g><rect x="100" y="198" width="200" height="10" rx="5" fill="#fff" opacity="0.14"/></svg>`,
    ),
  },
  {
    title: 'Support Penuh',
    desc: 'Maintenance, backup, dan monitoring dasar setelah go-live.',
    img: makeDataUri(
      `<svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#22d3ee"/><stop offset="100%" stop-color="#14b8a6"/></linearGradient></defs><rect width="400" height="250" fill="#0b1021"/><rect x="52" y="46" width="296" height="158" rx="22" fill="#0f172a" stroke="url(#g5)" stroke-opacity="0.45"/><path d="M110 140 C110 108 140 90 170 90 H230 C260 90 290 108 290 140" stroke="url(#g5)" stroke-width="18" fill="none" stroke-linecap="round"/><circle cx="200" cy="140" r="22" fill="url(#g5)"/><rect x="90" y="70" width="60" height="12" rx="6" fill="#fff" opacity="0.14"/><rect x="250" y="70" width="60" height="12" rx="6" fill="#fff" opacity="0.12"/><rect x="110" y="186" width="180" height="10" rx="5" fill="#fff" opacity="0.14"/></svg>`,
    ),
  },
  {
    title: 'Data-Driven',
    desc: 'Integrasi analitik, heatmap, dan A/B testing ringan.',
    img: makeDataUri(
      `<svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g6" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#5b3fff"/><stop offset="100%" stop-color="#22d3ee"/></linearGradient></defs><rect width="400" height="250" fill="#0b1021"/><rect x="55" y="46" width="290" height="158" rx="20" fill="#0f172a" stroke="url(#g6)" stroke-opacity="0.45"/><rect x="80" y="84" width="42" height="92" rx="12" fill="url(#g6)" opacity="0.85"/><rect x="142" y="106" width="42" height="70" rx="12" fill="url(#g6)" opacity="0.7"/><rect x="204" y="74" width="42" height="102" rx="12" fill="url(#g6)" opacity="0.82"/><rect x="266" y="124" width="42" height="52" rx="12" fill="url(#g6)" opacity="0.6"/><polyline points="90,124 163,142 225,110 287,132" fill="none" stroke="#22d3ee" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/><circle cx="90" cy="124" r="6" fill="#22d3ee"/><circle cx="163" cy="142" r="6" fill="#22d3ee"/><circle cx="225" cy="110" r="6" fill="#22d3ee"/><circle cx="287" cy="132" r="6" fill="#22d3ee"/></svg>`,
    ),
  },
];

const Home = () => {
  const reduceMotion = useReducedMotion();
  const [services, setServices] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [activeProcess, setActiveProcess] = useState(0);
  const [cardSize, setCardSize] = useState({ width: 740, height: 520 });
  const heroRef = useRef(null);
  const fallbackPortfolios = [
    {
      project_name: 'Orbit Fintech',
      category: 'Fintech',
      industry: 'Web App',
      description: 'Sistem web canggih untuk mengelola transaksi dan analitik finansial real-time.',
      stack: ['Laravel', 'React', 'TailwindCSS'],
      image_url: '',
    },
    {
      project_name: 'Lumina Beauty',
      category: 'E-Commerce',
      industry: 'Beauty Brand',
      description: 'Toko online premium dengan pengalaman belanja cepat dan visual modern.',
      stack: ['Next.js', 'Stripe API', 'GSAP'],
      image_url: '',
    },
    {
      project_name: 'Astra Logistics',
      category: 'Company Profile',
      industry: 'Logistics',
      description: 'Website perusahaan profesional dengan integrasi form dan dashboard tracking.',
      stack: ['Laravel', 'MySQL', 'Custom API'],
      image_url: '',
    },
    {
      project_name: 'Neo CRM Dashboard',
      category: 'Dashboard',
      industry: 'SaaS',
      description: 'Dashboard analitik untuk pemantauan pelanggan & performa penjualan.',
      stack: ['React', 'Recharts', 'REST API'],
      image_url: '',
    },
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const maxWidth = 740;
    const minWidth = 320;
    let raf;
    const update = () => {
      const horizontalPadding = window.innerWidth < 640 ? 48 : window.innerWidth < 1024 ? 96 : 160;
      const availableWidth = Math.max(minWidth, window.innerWidth - horizontalPadding);
      const width = Math.min(maxWidth, availableWidth);
      const height = Math.round(width * 0.7);
      setCardSize({ width, height });
    };
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const distanceScale = cardSize.width / 740;
  const cardDistance = Math.round(Math.min(120, Math.max(70, 120 * distanceScale)));
  const verticalDistance = Math.round(Math.min(105, Math.max(60, 105 * distanceScale)));

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

  useEffect(() => {
    if (reduceMotion) return undefined;
    if (typeof window === 'undefined') return undefined;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-parallax',
        { y: '-6%' },
        {
          y: '12%',
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        '.hero-content',
        { y: 0, opacity: 1 },
        {
          y: -30,
          opacity: 0.92,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }, heroRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div className="relative space-y-10 overflow-hidden">
      <section ref={heroRef} className="page-hero relative flex min-h-screen items-center overflow-hidden">
        <div className="hero-parallax absolute inset-0">
          <FloatingLines
            linesGradient={['#5b3fff', '#3dd9ff', '#c084fc']}
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[10, 15, 14]}
            lineDistance={[8, 6, 5]}
            topWavePosition={{ x: 8, y: 0.4, rotate: -0.35 }}
            middleWavePosition={{ x: 4, y: 0.0, rotate: 0.35 }}
            bottomWavePosition={{ x: 2.5, y: -0.6, rotate: -0.2 }}
            animationSpeed={reduceMotion ? 0.6 : 1.15}
            parallax={!reduceMotion}
            parallaxStrength={reduceMotion ? 0.08 : 0.18}
            interactive={!reduceMotion}
            mixBlendMode="screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1021]/70 via-[#0b1021]/80 to-[#0b1021]" />
        </div>
        <div className="hero-content section-padding relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <div className="hero-chip inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
            ✦ NeoSite Release
          </div>
          <h1 className="hero-title mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl">
            Gelombang digital yang elegan <br className="hidden md:block" />
            untuk brand Anda.
          </h1>
          <p className="hero-subtitle mt-4 max-w-3xl text-lg text-slate-200 md:text-xl">
            Build website modern dengan performa tinggi, UI memikat, dan fondasi yang siap scale. Laravel + React dengan
            sentuhan animasi halus.
          </p>
          <div className="hero-actions mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact">
              <Button className="px-7">Get Started</Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" className="px-7">
                Lihat Portofolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SectionWrapper
        id="advantages"
        eyebrow="Keunggulan NeoSite"
        title="Website modern dengan fondasi kuat"
        description="Kami fokus pada performa, keamanan, dan pengalaman pengguna agar bisnis Anda tumbuh lebih cepat."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {advantageCards.map(({ title, desc, img }) => (
            <div
              key={title}
              className="reveal-card group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-transparent shadow-lg shadow-black/10 transition hover:-translate-y-1.5 hover:border-cyan/50 hover:shadow-[0_30px_120px_rgba(14,165,233,0.45)] hover:shadow-cyan/30"
            >
              <div className="relative">
                <img
                  src={img}
                  alt={title}
                  className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1021] via-transparent to-transparent opacity-70" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan">
                  ✦ Advantage
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-300">{desc}</p>
              </div>
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
              className="reveal-card group rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 transition hover:-translate-y-1 hover:border-cyan/30 hover:shadow-glow"
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
        <Stepper
          steps={processSteps}
          activeIndex={activeProcess}
          onNext={() => setActiveProcess((idx) => Math.min(idx + 1, processSteps.length - 1))}
          onPrev={() => setActiveProcess((idx) => Math.max(idx - 1, 0))}
        />
      </SectionWrapper>

      <SectionWrapper
        id="portfolio"
        eyebrow="Portofolio Singkat"
        title="Project Pilihan"
        fullWidth
      >
        <div className="relative isolate min-h-[520px] overflow-visible px-4 sm:px-6 lg:px-10 ">
          <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-5 items-center">
            <p className="text-3xl font-semibold text-white md:text-4xl ">Karya terbaik kami.</p>
            <p className="text-lg text-slate-300">
              Menampilkan project unggulan yang kami bangun untuk fintech, beauty, hingga logistik — siap scale dengan performa
              tinggi.
            </p>
            <div className="flex flex-wrap gap-2 text-sm text-slate-200">
              {['💼 Company Profile', '🛒 E-Commerce', '📲 Landing Page', '⚙️ Web App', '🧾 Dashboard'].map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/portfolio">
                <Button className="px-6">Lihat Portofolio</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="px-6">
                  Diskusi Project
                </Button>
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 w-full max-w-5xl">
            <CardSwap
              width={cardSize.width}
              height={cardSize.height}
              cardDistance={cardDistance}
              verticalDistance={verticalDistance}
              delay={reduceMotion ? 5200 : 3600}
              pauseWhenOffscreen
              disabled={reduceMotion}
            >
              {(portfolios.slice(0, 4).length ? portfolios.slice(0, 4) : fallbackPortfolios).map((item, idx) => (
                <Card
                  key={item.slug || idx}
                  customClass="pointer-events-auto overflow-hidden border-white/30 bg-gradient-to-br from-[#0f1229] via-[#0c0f24] to-[#0d0a1f] shadow-[0_30px_90px_rgba(91,63,255,0.4)]"
                >
                  <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-gradient-to-br from-[#0f1024] via-[#0c0f1f] to-[#0c0b1b]">
                    <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                      <span className="text-lg">✦</span>
                      <span>{item.project_name || 'Project NeoSite'}</span>
                      <span className="ml-auto rounded-full bg-white/10 px-2 py-1 text-xs text-white/60">
                        {`${item.category || 'Web'} • ${item.industry || 'App'}`}
                      </span>
                    </div>
                    <div className="relative flex-1">
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-[#5b3fff]/30 via-transparent to-[#0ea5e9]/20"
                        aria-hidden
                      />
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.project_name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-400">Preview unavailable</div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-sm text-white">
                        <p className="font-semibold">
                          {item.industry || item.category || 'Digital Experience'}
                        </p>
                        <p className="line-clamp-2 text-slate-200">
                          {item.description || 'Eksperimen interface interaktif dengan performa tinggi.'}
                        </p>
                        {item.stack?.length ? (
                          <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-white/80">
                            {item.stack.map((tech) => (
                              <span key={tech} className="rounded-full border border-white/15 bg-white/10 px-2 py-1">
                                {tech}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        <div className="mt-3 inline-flex items-center gap-2 text-xs text-cyan-200">
                          <span>View Project</span>
                          <span aria-hidden>→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
          <div className="relative z-10 mt-10 flex flex-wrap gap-4 text-sm text-slate-300">
            {[
              ['20+', 'proyek selesai'],
              ['10+', 'industri berbeda'],
              ['95%', 'klien puas'],
              ['Support', 'maintenance tersedia'],
            ].map(([title, label]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                <p className="text-base font-semibold text-white">{title}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
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
              className="reveal-card flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5"
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
            <div key={faq.id} className="reveal-card rounded-2xl border border-white/10 bg-white/5 p-5">
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
        <div className="reveal-card flex flex-col items-center gap-4 rounded-3xl border border-cyan/30 bg-gradient-to-r from-cyan/10 via-white/5 to-transparent p-10 text-center shadow-glow">
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
