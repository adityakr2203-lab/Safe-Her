import { Loader2, Phone, Trash2 } from 'lucide-react';
import Button from './Button.jsx';
import Card from './Card.jsx';

function ContactCard({
  contact,
  calling = false,
  onCall,
  onRemove,
  showRemove = false,
}) {
  const isOnline = contact.status === 'Online' || contact.status === 'Available';

  return (
    <Card className="h-full transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-sm font-black text-brand-700 shadow-sm">
            {contact.initials}
          </div>
          <div>
            <h3 className="font-black text-slate-950">{contact.name}</h3>
            <p className="text-sm text-slate-500">{contact.relation}</p>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isOnline
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-amber-50 text-amber-700'
          }`}
        >
          {contact.status}
        </span>
      </div>

      <p className="mt-4 rounded-2xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
        {contact.phone}
      </p>

      <div className="mt-5 flex gap-3">
        <Button
          className="flex-1"
          disabled={calling}
          onClick={() => onCall?.(contact)}
          variant="secondary"
        >
          {calling ? <Loader2 className="animate-spin" size={17} /> : <Phone size={17} />}
          {calling ? 'Calling...' : 'Call'}
        </Button>
        {showRemove && (
          <Button
            className="px-3"
            onClick={() => onRemove?.(contact)}
            variant="secondary"
            aria-label="Remove contact"
          >
            <Trash2 size={17} />
          </Button>
        )}
      </div>
    </Card>
  );
}

export default ContactCard;
