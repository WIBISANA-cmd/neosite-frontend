import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const usePageAnimations = (scopeRef) => {
  const location = useLocation();

  useEffect(() => {
    if (!scopeRef?.current) return undefined;
    if (typeof window === 'undefined') return undefined;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const hero = document.querySelector('.page-hero');
      if (hero) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.hero-chip', { y: -12, opacity: 0, duration: 0.45 })
          .from('.hero-title', { y: 34, opacity: 0, duration: 0.85 }, '-=0.1')
          .from('.hero-subtitle', { y: 24, opacity: 0, duration: 0.7 }, '-=0.35')
          .from('.hero-actions', { y: 16, opacity: 0, duration: 0.6 }, '-=0.25')
          .from('.hero-stat', { y: 18, opacity: 0, duration: 0.55, stagger: 0.08 }, '-=0.2')
          .from('.mockup-card', { y: 28, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.15');
      }

      gsap.utils.toArray('.section-heading').forEach((heading) => {
        gsap.from(heading.children, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            once: true,
          },
        });
      });

      gsap.utils.toArray('.reveal-card').forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 86%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      });

      gsap.utils.toArray('.process-card').forEach((card, idx) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.75,
          delay: (idx % 3) * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
        });
      });

      gsap.utils.toArray('.reveal-section').forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            once: true,
          },
        });
      });
    }, scopeRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [location.pathname, scopeRef]);
};

export default usePageAnimations;
