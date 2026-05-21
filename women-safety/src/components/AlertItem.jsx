import { CheckCircle2 } from 'lucide-react';

function AlertItem({ alert }) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
        <CheckCircle2 size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-slate-900">{alert.title}</p>
        <p className="text-sm text-slate-500">{alert.time}</p>
      </div>
      <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">
        {alert.status}
      </span>
    </div>
  );
}

export default AlertItem;
