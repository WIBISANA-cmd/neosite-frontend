import clsx from 'clsx';

const SectionWrapper = ({ id, title, eyebrow, description, children, className }) => {
  return (
    <section id={id} className={clsx('section-padding', className)}>
      <div className="mx-auto max-w-6xl space-y-8">
        {(eyebrow || title || description) && (
          <div className="space-y-3 text-center">
            {eyebrow && <span className="text-xs uppercase tracking-[0.2em] text-cyan">{eyebrow}</span>}
            {title && <h2 className="text-3xl font-semibold text-white md:text-4xl">{title}</h2>}
            {description && <p className="text-base text-slate-300 md:text-lg">{description}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
