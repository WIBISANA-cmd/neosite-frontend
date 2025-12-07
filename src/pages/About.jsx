import SectionWrapper from '../components/SectionWrapper';

const team = [
  { name: 'Raka Pradipta', role: 'Tech Lead', skills: 'Laravel, DevOps, Architecture' },
  { name: 'Nadia Lestari', role: 'Product Designer', skills: 'UI/UX, Prototyping, Design System' },
  { name: 'Dimas Arief', role: 'Frontend Engineer', skills: 'React, TailwindCSS, Animations' },
  { name: 'Sella Putri', role: 'Project Manager', skills: 'Scrum, Client Success, QA' },
];

const About = () => {
  return (
    <SectionWrapper
      title="Tentang NeoSite"
      eyebrow="Our Story"
      description="Kami adalah tim fullstack yang membantu brand dan startup meluncurkan website yang cepat, scalable, dan memukau."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4 text-slate-300">
          <p>
            NeoSite lahir dari kebutuhan klien untuk mendapatkan website yang rapi secara arsitektur namun tetap indah secara
            visual. Kami percaya kolaborasi erat antara desain, engineering, dan bisnis menghasilkan produk digital yang
            impactful.
          </p>
          <p>
            Stack utama kami adalah Laravel + React, dipadukan dengan TailwindCSS untuk pace desain yang cepat. Kami menjaga
            best practice mulai dari versioning, CI/CD dasar, sampai dokumentasi handover.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              ['Klien puas', '96%'],
              ['Project selesai', '50+'],
              ['Rata-rata launch', '2-4 minggu'],
              ['Support', 'Dedicated team'],
            ].map(([title, value]) => (
              <div key={title} className="reveal-card rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-slate-400">{title}</p>
                <p className="text-2xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Tim Inti</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {team.map((member) => (
              <div key={member.name} className="reveal-card rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-lg font-semibold text-white">{member.name}</p>
                <p className="text-sm text-cyan">{member.role}</p>
                <p className="mt-2 text-sm text-slate-300">{member.skills}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
