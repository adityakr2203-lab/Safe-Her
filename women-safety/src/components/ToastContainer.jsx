import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

function ToastContainer({ onDismiss, toasts }) {
  const icons = {
    error: AlertTriangle,
    info: Info,
    success: CheckCircle2,
  };

  const styles = {
    error: 'border-red-100 bg-red-50 text-red-700',
    info: 'border-blue-100 bg-blue-50 text-blue-700',
    success: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  };

  return (
    <div className="fixed right-4 top-4 z-[30] grid w-[calc(100%-2rem)] max-w-sm gap-3 sm:right-6 sm:top-6">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] || Info;

        return (
          <div
            className={`animate-slide-in rounded-3xl border p-4 shadow-2xl shadow-slate-200/70 ring-1 ring-white/80 ${styles[toast.type]}`}
            key={toast.id}
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/80">
                <Icon size={19} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-black text-slate-950">{toast.title}</p>
                {toast.message && (
                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    {toast.message}
                  </p>
                )}
              </div>
              <button
                aria-label="Dismiss notification"
                className="rounded-full p-1 text-slate-400 transition hover:bg-white/80 hover:text-slate-700 focus:outline-none  focus-visible:ring-0 focus-visible:outline-none focus-visible:brightness-95"
                onClick={() => onDismiss(toast.id)}
                type="button"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ToastContainer;
