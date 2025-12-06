import clsx from 'clsx';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200';

const variants = {
  primary: 'bg-cyan text-surface shadow-glow hover:-translate-y-0.5 hover:shadow-lg',
  outline: 'border border-white/20 text-white hover:bg-white/10',
  ghost: 'text-cyan hover:text-white hover:bg-cyan/10',
};

export const Button = ({ as = 'button', variant = 'primary', className, children, ...props }) => {
  const Component = as;

  return (
    <Component className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </Component>
  );
};

export default Button;
