import clsx from 'clsx';

const SectionWrapper = ({ id, title, eyebrow, description, children, className, fullWidth = false }) => {
  return (
    <section
      id={id}
      className={clsx('section-padding reveal-section relative overflow-visible group/section', className)}
    >
      <div className="pointer-events-none absolute inset-4 -z-10 rounded-[36px] bg-[radial-gradient(circle_at_25%_25%,rgba(14,165,233,0.25),transparent_40%),radial-gradient(circle_at_75%_35%,rgba(91,63,255,0.25),transparent_45%)] opacity-0 blur-3xl transition duration-500 group-hover/section:scale-105 group-hover/section:opacity-80" />
      <div
        className={clsx(
          'mx-auto space-y-8 transition duration-500 group-hover/section:drop-shadow-[0_0_120px_rgba(14,165,233,0.35)] group-hover/section:scale-[1.002]',
          fullWidth ? 'max-w-none w-full' : 'max-w-6xl',
        )}
      >
        {(eyebrow || title || description) && (
          <div className="section-heading space-y-3 text-center">
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
