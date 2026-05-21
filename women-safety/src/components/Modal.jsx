import { X } from 'lucide-react';
import Button from './Button.jsx';

function Modal({ children, open, onClose, title }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-white/80">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-black tracking-tight text-slate-950">{title}</h2>
          <button
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:-translate-y-0.5 hover:bg-slate-200 focus:outline-none  focus-visible:ring-0 focus-visible:outline-none focus-visible:brightness-95"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4">{children}</div>

        <Button className="mt-5 w-full" onClick={onClose} variant="secondary">
          Close
        </Button>
      </div>
    </div>
  );
}

export default Modal;
