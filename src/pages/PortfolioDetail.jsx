import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import SectionWrapper from '../components/SectionWrapper';
import { api } from '../utils/api';

const PortfolioDetail = () => {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getPortfolio(slug)
      .then((res) => setPortfolio(res.data || res))
      .catch((err) => setError(err.message));
  }, [slug]);

  if (error) {
    return (
      <SectionWrapper title="Portofolio" description="Project tidak ditemukan.">
        <p className="text-slate-300">{error}</p>
      </SectionWrapper>
    );
  }

  if (!portfolio) {
    return (
      <SectionWrapper title="Portofolio">
        <p className="text-slate-300">Memuat detail project...</p>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      title={portfolio.project_name}
      description={portfolio.description}
      eyebrow={`${portfolio.category} • ${portfolio.industry}`}
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <img src={portfolio.image_url} alt={portfolio.project_name} className="h-full w-full object-cover" />
        </div>
        <div className="space-y-4 text-slate-300">
          <p>{portfolio.description}</p>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-white">Tech Stack</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {portfolio.tech_stack?.map((tech) => (
                <span key={tech} className="rounded-full bg-cyan/10 px-3 py-1 text-xs text-cyan">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          {portfolio.demo_url && (
            <Button as="a" href={portfolio.demo_url} target="_blank" rel="noreferrer" className="inline-flex w-fit">
              Lihat Demo
            </Button>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default PortfolioDetail;
