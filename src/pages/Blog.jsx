import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import SectionWrapper from '../components/SectionWrapper';
import { api } from '../utils/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.getPosts(page);
      const data = res.data || res;
      setPosts(data);
      setMeta(res.meta || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <SectionWrapper
      title="Blog NeoSite"
      eyebrow="Insight & Studi Kasus"
      description="Tips development, studi kasus, dan panduan membangun website yang siap scale."
    >
      {loading && <p className="text-slate-300">Memuat artikel...</p>}
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            to={`/blog/${post.slug}`}
            key={post.slug}
            className="reveal-card group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-cyan/30"
          >
            <p className="text-xs uppercase tracking-wide text-cyan">{post.category}</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{post.title}</h3>
            <p
              className="mt-2 text-sm text-slate-300"
              style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {post.excerpt}
            </p>
            <p className="mt-3 text-xs text-slate-400">
              {post.published_at && new Date(post.published_at).toLocaleDateString('id-ID')}
            </p>
          </Link>
        ))}
      </div>

      {meta && meta.last_page > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button variant="outline" disabled={meta.current_page === 1} onClick={() => load(meta.current_page - 1)}>
            Prev
          </Button>
          <p className="text-sm text-slate-300">
            Page {meta.current_page} / {meta.last_page}
          </p>
          <Button
            variant="outline"
            disabled={meta.current_page === meta.last_page}
            onClick={() => load(meta.current_page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </SectionWrapper>
  );
};

export default Blog;
