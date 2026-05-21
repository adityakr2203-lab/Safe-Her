function Card({ children, className = '' }) {
  const hasCustomBackground = className.includes('bg-');

  return (
    <div
      className={`rounded-3xl border border-white/80 p-5 shadow-soft ring-1 ring-slate-100/80 transition duration-200 sm:p-6 ${
        hasCustomBackground ? '' : 'bg-white'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
