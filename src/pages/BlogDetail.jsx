import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SectionWrapper from '../components/SectionWrapper';
import { api } from '../utils/api';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getPost(slug)
      .then((res) => setPost(res.data || res))
      .catch((err) => setError(err.message));
  }, [slug]);

  if (error) {
    return (
      <SectionWrapper title="Artikel">
        <p className="text-slate-300">{error}</p>
      </SectionWrapper>
    );
  }

  if (!post) {
    return (
      <SectionWrapper title="Artikel">
        <p className="text-slate-300">Memuat artikel...</p>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper title={post.title} eyebrow={post.category}>
      <div className="space-y-4 text-slate-200">
        <p className="text-sm text-slate-400">
          {post.published_at && new Date(post.published_at).toLocaleDateString('id-ID')}
        </p>
        <p className="text-base leading-relaxed whitespace-pre-line">{post.content}</p>
      </div>
    </SectionWrapper>
  );
};

export default BlogDetail;
