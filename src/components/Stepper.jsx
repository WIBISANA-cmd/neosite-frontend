import clsx from 'clsx';

const Stepper = ({
  steps = [],
  activeIndex = 0,
  title = 'Progres Proyek',
  onNext = () => {},
  onPrev = () => {},
}) => {
  const currentStep = steps[activeIndex] || steps[0] || {};
  const isFirst = activeIndex <= 0;
  const isLast = activeIndex >= steps.length - 1;

  return (
    <div className="reveal-card relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0715] p-8 shadow-[0_20px_60px_rgba(91,63,255,0.2)] sm:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(91,63,255,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.06),transparent_30%)]" />

      <div className="relative flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Proses Kerja</p>
            <h3 className="text-lg font-semibold text-white md:text-xl">{title}</h3>
          </div>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
            Step {activeIndex + 1} / {steps.length}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          {steps.map((step, idx) => {
            const status = idx < activeIndex ? 'done' : idx === activeIndex ? 'active' : 'upcoming';
            return (
              <div key={step.title} className="flex flex-1 items-center gap-3">
                <div
                  className={clsx(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-semibold transition-all duration-300',
                    status === 'done' && 'bg-[#5b3fff] text-white shadow-[0_0_30px_rgba(91,63,255,0.6)]',
                    status === 'active' &&
                      'bg-[#5b3fff] text-white ring-4 ring-[#5b3fff]/30 shadow-[0_0_25px_rgba(91,63,255,0.5)]',
                    status === 'upcoming' && 'bg-white/5 text-slate-200 border border-white/10',
                  )}
                >
                  {status === 'done' ? '✓' : idx + 1}
                </div>
                {idx !== steps.length - 1 && (
                  <div
                    className={clsx(
                      'h-1 w-full rounded-full',
                      idx < activeIndex ? 'bg-[#5b3fff]' : 'bg-white/10',
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <p className="text-2xl font-semibold text-white sm:text-3xl">
              {currentStep.title || 'Detail langkah'}
            </p>
            {currentStep.output && (
              <span className="mt-2 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                {currentStep.output}
              </span>
            )}
            {currentStep.summary && <p className="mt-2 text-sm text-slate-400">{currentStep.summary}</p>}
          </div>
          {currentStep.points?.length > 0 && (
            <ul className="space-y-2 text-sm text-slate-200">
              {currentStep.points.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#5b3fff]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {currentStep.note && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-slate-300">
              Note: {currentStep.note}
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onPrev}
              disabled={isFirst}
              className="text-base font-medium text-slate-200 hover:text-white disabled:cursor-not-allowed disabled:text-slate-500"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={isLast}
              className="rounded-full bg-[#5b3fff] px-6 py-3 text-base font-semibold text-white shadow-[0_10px_30px_rgba(91,63,255,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(91,63,255,0.55)]"
              style={{ opacity: isLast ? 0.7 : 1 }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
