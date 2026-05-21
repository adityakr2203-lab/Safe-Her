import { CheckCircle2, Clock, MapPin, Radio, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import CountdownModal from '../components/CountdownModal.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import SOSButton from '../components/SOSButton.jsx';

function EmergencySOS() {
  const [activated, setActivated] = useState(false);
  const [sosOpen, setSosOpen] = useState(false);
  const { addAlert, addToast, contacts, location, setSosTimeline, sosTimeline } =
    useOutletContext();

  function handleActivateSos() {
    setActivated(true);
    setSosOpen(true);
    setSosTimeline((currentTimeline) =>
      currentTimeline.map((item) => ({ ...item, done: true })),
    );
    addAlert('SOS emergency alert triggered', 'Live');
    addToast({
      title: 'SOS alert activated',
      message: 'Trusted contacts are being notified in demo mode.',
      type: 'info',
    });
  }

  return (
    <div className="space-y-8">
      {sosOpen && <CountdownModal onClose={() => setSosOpen(false)} />}

      <SectionHeader
        title="Emergency SOS"
        subtitle="A simulated emergency flow with alert status and live tracking UI."
      />

      <section className="grid gap-6 lg:grid-cols-[minmax(20rem,0.95fr)_minmax(0,1.05fr)]">
        <Card className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-600">
            Press and hold
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            Send emergency alert
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
            This frontend demo shows the alert workflow without contacting real
            emergency services.
          </p>

          <div className="my-9 sm:my-10">
            <SOSButton
              active={activated}
              label={activated ? 'LIVE' : 'SOS'}
              onClick={handleActivateSos}
            />
          </div>

          <Button
            className="w-full sm:w-auto"
            onClick={() => {
              if (activated) {
                setActivated(false);
                setSosTimeline((currentTimeline) =>
                  currentTimeline.map((item, index) => ({
                    ...item,
                    done: index < 2,
                  })),
                );
                addAlert('Marked safe after SOS', 'Safe');
                addToast({
                  title: 'Marked safe',
                  message: 'Your trusted contacts would receive a safe update.',
                  type: 'success',
                });
                return;
              }

              handleActivateSos();
            }}
            variant={activated ? 'dark' : 'danger'}
          >
            <ShieldAlert size={18} />
            {activated ? 'Mark as safe' : 'Activate SOS'}
          </Button>
        </Card>

        <div className="grid gap-6">
          <Card>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">Countdown</p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                  {activated ? 'Alert sent' : '5 second safety window'}
                </h2>
              </div>
              <div className="relative flex h-24 w-24 items-center justify-center self-center rounded-full bg-brand-50 shadow-inner ring-8 ring-rose-50">
                <div className="absolute inset-2 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
                <span className="text-2xl font-black text-brand-700">
                  {activated ? '0' : '5'}
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <SectionHeader title="Emergency alert status" />
            <div className="space-y-3">
              {sosTimeline.map((item) => (
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100" key={item.label}>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      item.done || activated
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {item.done || activated ? <CheckCircle2 size={19} /> : <Clock size={19} />}
                  </span>
                  <span className="font-semibold text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
        <Card>
          <SectionHeader
            title="Fake live tracking"
            subtitle="Location simulation for frontend display only."
          />
          <div className="relative h-80 overflow-hidden rounded-3xl bg-slate-100 shadow-inner ring-1 ring-slate-200/80">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(148,163,184,0.22)_1px,transparent_1px),linear-gradient(rgba(148,163,184,0.22)_1px,transparent_1px)] bg-[length:42px_42px]" />
            <div className="absolute left-[18%] top-[62%] h-2 w-[64%] -rotate-12 rounded-full bg-brand-300" />
            <div className="absolute left-[32%] top-[30%] h-2 w-[46%] rotate-45 rounded-full bg-blue-300" />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-white shadow-xl">
              <Radio className="text-brand-300" size={20} />
              <span className="text-sm font-bold">Live signal active</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-3 shadow-lg ring-1 ring-slate-100 sm:right-auto">
              <p className="text-xs font-semibold text-slate-500">Current location</p>
              <p className="font-bold text-slate-950">{location.coordinates}</p>
            </div>
          </div>
        </Card>

        <Card>
          <SectionHeader title="Alert recipients" />
          <div className="space-y-3">
            {contacts.slice(0, 3).map((contact) => (
              <div
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 transition hover:bg-white hover:shadow-md"
                key={contact.id}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-black text-brand-700 shadow-sm">
                    {contact.initials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-950">{contact.name}</p>
                    <p className="text-sm text-slate-500">{contact.relation}</p>
                  </div>
                </div>
                <MapPin className="text-emerald-600" size={18} />
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

export default EmergencySOS;
