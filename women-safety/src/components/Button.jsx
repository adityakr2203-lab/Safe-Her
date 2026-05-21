function Button({
  children,
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const variants = {
    primary:
      'bg-brand-600 text-white shadow-lg shadow-rose-200/80 hover:bg-brand-700 hover:shadow-xl hover:shadow-rose-200',
    secondary:
      'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-950 hover:shadow-md',
    dark: 'bg-slate-950 text-white shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl',
    danger:
      'bg-red-600 text-white shadow-lg shadow-red-200/80 hover:bg-red-700 hover:shadow-xl hover:shadow-red-200',
  };

  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold tracking-normal transition duration-200 ease-out hover:-translate-y-0.5 focus:outline-none  focus-visible:ring-0 focus-visible:outline-none focus-visible:brightness-95 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
