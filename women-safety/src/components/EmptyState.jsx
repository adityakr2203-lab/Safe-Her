import { Inbox } from 'lucide-react';
import Button from './Button.jsx';

function EmptyState({ action, description, icon: Icon = Inbox, title }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-8 text-center shadow-soft">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        <Icon size={26} />
      </div>
      <h3 className="mt-4 text-lg font-black text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        {description}
      </p>
      {action && (
        <Button className="mt-5" onClick={action.onClick} variant={action.variant || 'primary'}>
          {action.icon}
          {action.label}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
