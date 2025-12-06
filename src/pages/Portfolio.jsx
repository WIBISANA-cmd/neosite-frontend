import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import SectionWrapper from '../components/SectionWrapper';
import { api } from '../utils/api';

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async (page = 1, selectedCategory = category) => {
    try {
      setLoading(true);
      const res = await api.getPortfolios(selectedCategory, page);
      const data = res.data || res;
      setItems(data);
      setMeta(res.meta || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1, category);
  }, [category]);

  const categories = useMemo(() => {
    const set = new Set(items.map((item) => item.category).filter(Boolean));
    return Array.from(set);
  }, [items]);

  return (
    <SectionWrapper
      title="Portofolio"
      eyebrow="Project pilihan"
      description="Hasil kolaborasi dengan tim marketing dan product dari berbagai industri."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Button variant={!category ? 'primary' : 'outline'} onClick={() => setCategory('')}>
          Semua
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={cat === category ? 'primary' : 'outline'}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {loading && <p className="text-slate-300">Memuat portofolio...</p>}

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
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

      {meta && meta.last_page > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button variant="outline" disabled={meta.current_page === 1} onClick={() => fetchData(meta.current_page - 1)}>
            Prev
          </Button>
          <p className="text-sm text-slate-300">
            Page {meta.current_page} / {meta.last_page}
          </p>
          <Button
            variant="outline"
            disabled={meta.current_page === meta.last_page}
            onClick={() => fetchData(meta.current_page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </SectionWrapper>
  );
};

export default Portfolio;
