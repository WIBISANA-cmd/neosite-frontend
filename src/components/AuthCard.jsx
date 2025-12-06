const AuthCard = ({ title, description, children, footer }) => {
  return (
    <div className="mx-auto max-w-md space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-cyan/10">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {description && <p className="text-sm text-slate-300">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
      {footer && <div className="text-center text-sm text-slate-300">{footer}</div>}
    </div>
  );
};

export default AuthCard;
