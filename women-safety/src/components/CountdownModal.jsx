import { CheckCircle2, Siren } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from './Button.jsx';

function CountdownModal({ onClose }) {
  const [count, setCount] = useState(5);
  const alertSent = count === 0;

  useEffect(() => {
    if (count === 0) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl ring-1 ring-white/80">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 shadow-inner">
          {alertSent ? <CheckCircle2 size={34} /> : <Siren size={34} />}
        </div>

        <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
          {alertSent ? 'Emergency alert sent' : 'SOS activating'}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {alertSent
            ? 'Trusted contacts have been notified and live location sharing is active.'
            : 'Sending alerts in a few seconds. You can cancel this simulated SOS.'}
        </p>

        <div className="relative mx-auto mt-7 flex h-32 w-32 items-center justify-center rounded-full bg-brand-50 shadow-inner ring-8 ring-rose-50">
          {!alertSent && (
            <div className="absolute inset-2 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
          )}
          <span className="text-5xl font-black text-brand-700">{count}</span>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {!alertSent && (
            <Button onClick={onClose} variant="secondary">
              Cancel SOS
            </Button>
          )}
          <Button
            className={alertSent ? 'sm:col-span-2' : ''}
            onClick={onClose}
            variant={alertSent ? 'primary' : 'danger'}
          >
            {alertSent ? 'Done' : 'Keep activating'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CountdownModal;
