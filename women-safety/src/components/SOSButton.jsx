import { Siren } from 'lucide-react';

function SOSButton({ onClick, active = false, label = 'SOS' }) {
  return (
    <button
      onClick={onClick}
      className={`group relative mx-auto flex h-40 w-40 items-center justify-center rounded-full text-white shadow-2xl transition duration-300 ease-out hover:scale-105 focus:outline-none  focus-visible:ring-0 focus-visible:outline-none focus-visible:brightness-95 active:scale-100 sm:h-52 sm:w-52 ${
        active
          ? 'bg-red-700 shadow-red-300'
          : 'bg-gradient-to-br from-brand-500 to-red-700 shadow-rose-200'
      }`}
      type="button"
    >
      <span className="absolute inset-0 rounded-full bg-red-400 opacity-30 blur-xl transition group-hover:opacity-40" />
      <span className="absolute h-full w-full animate-ping rounded-full bg-red-500 opacity-20" />
      <span className="relative flex flex-col items-center gap-2">
        <Siren size={38} />
        <span className="text-4xl font-black tracking-normal sm:text-5xl">{label}</span>
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-red-100">
          Emergency
        </span>
      </span>
    </button>
  );
}

export default SOSButton;
