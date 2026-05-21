import {
  Activity,
  BatteryFull,
  MapPinned,
  Navigation,
  Plus,
  ShieldCheck,
  Loader2,
  Bell,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import AlertItem from '../components/AlertItem.jsx';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import ContactCard from '../components/ContactCard.jsx';
import CountdownModal from '../components/CountdownModal.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingCard from '../components/LoadingCard.jsx';
import Modal from '../components/Modal.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import SOSButton from '../components/SOSButton.jsx';
import { quickActions } from '../data/mockData.js';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState('');
  const [modal, setModal] = useState(null);
  const [sosOpen, setSosOpen] = useState(false);
  const {
    addAlert,
    addToast,
    alerts,
    contacts,
    currentUser,
    location,
    safetyTips,
    setContacts,
    setSosTimeline,
  } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  function showMessage(title, message) {
    setModal({ title, message });
  }

  function handleCall(contactName = 'emergency contact') {
    setActionLoading(contactName);
    setTimeout(() => {
      setActionLoading('');
      addAlert(`Called ${contactName}`, 'Connected');
      addToast({
        title: 'Call started',
        message: `Connecting to ${contactName}.`,
        type: 'success',
      });
      showMessage('Calling emergency contact...', `Connecting to ${contactName}.`);
    }, 600);
  }

  function handleQuickAction(actionLabel) {
    if (actionLabel === 'Call Police') {
      setActionLoading(actionLabel);
      setTimeout(() => {
        setActionLoading('');
        addAlert('Called emergency services', 'Connected');
        addToast({
          title: 'Emergency call started',
          message: 'Connecting to emergency services.',
          type: 'success',
        });
        showMessage('Calling emergency contact...', 'Connecting to emergency services.');
      }, 600);
      return;
    }

    if (actionLabel === 'Share Location') {
      setActionLoading(actionLabel);
      setTimeout(() => {
        setActionLoading('');
        addAlert('Live location shared', 'Sharing');
        addToast({
          title: 'Live location shared',
          message: 'Trusted contacts can now see your current route.',
          type: 'success',
        });
        navigate('/location');
      }, 500);
      return;
    }

    if (actionLabel === 'Message Contacts') {
      addAlert('Trusted contacts messaged', 'Delivered');
      addToast({
        title: 'Message delivered',
        message: 'Your trusted contacts received a check-in update.',
        type: 'success',
      });
      showMessage('Message sent', 'Your trusted contacts received a check-in update.');
      return;
    }

    addAlert('Safe ride requested', 'Searching');
    addToast({
      title: 'Safe ride requested',
      message: 'Searching nearby verified rides in demo mode.',
      type: 'info',
    });
    showMessage('Safe ride requested', 'Searching nearby verified rides in demo mode.');
  }

  function handleDashboardAddContact() {
    const nextContactNumber = contacts.length + 1;
    const newContact = {
      id: Date.now(),
      name: `Trusted Contact ${nextContactNumber}`,
      relation: 'Emergency contact',
      phone: `+91 90000 00${String(nextContactNumber).padStart(3, '0')}`,
      status: 'Available',
      initials: 'TC',
    };

    setContacts((currentContacts) => [newContact, ...currentContacts]);
    addAlert(`${newContact.name} added`, 'Updated');
    addToast({
      title: 'Contact added',
      message: `${newContact.name} is now in your trusted network.`,
      type: 'success',
    });
    showMessage('Contact added', `${newContact.name} was added to trusted contacts.`);
  }

  function handleDashboardSos() {
    setSosOpen(true);
    setSosTimeline((currentTimeline) =>
      currentTimeline.map((item) => ({ ...item, done: true })),
    );
    addAlert('SOS countdown started', 'Live');
    addToast({
      title: 'SOS countdown started',
      message: 'Emergency alert will be sent after the countdown.',
      type: 'info',
    });
  }

  return (
    <div className="space-y-8">
      {sosOpen && <CountdownModal onClose={() => setSosOpen(false)} />}
      <Modal
        open={Boolean(modal)}
        onClose={() => setModal(null)}
        title={modal?.title}
      >
        <p className="text-sm leading-6 text-slate-600">{modal?.message}</p>
      </Modal>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="relative overflow-hidden bg-slate-950 p-6 text-white sm:p-8">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-rose-200 sm:text-sm">
                Good evening, {currentUser.name.split(' ')[0]}
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                Your safety network is active and ready.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
                Trigger SOS, share your current location, or check in with trusted
                people from a single dashboard.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  onClick={() => {
                    addAlert('Safety check-in started', 'Active');
                    addToast({
                      title: 'Check-in started',
                      message: 'Your safety timer is active for 30 minutes.',
                      type: 'success',
                    });
                    showMessage(
                      'Check-in started',
                      'Your safety timer is now active for 30 minutes.',
                    );
                  }}
                  variant="primary"
                  className="sm:w-auto"
                >
                  Start check-in
                </Button>
                <Button
                  onClick={() => navigate('/location')}
                  variant="secondary"
                  className="bg-white/10 text-white ring-white/15 hover:bg-white/15 hover:text-white sm:w-auto"
                >
                  View route
                </Button>
              </div>
            </div>
            <SOSButton onClick={handleDashboardSos} />
          </div>
        </Card>

        <Card className="h-full">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-500">Live location</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                {location.address}
              </h2>
            </div>
            <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
              {location.status}
            </span>
          </div>

          <div className="mt-5 overflow-hidden rounded-3xl bg-slate-100 ring-1 ring-slate-200/70">
            <div className="relative h-60 bg-[linear-gradient(135deg,#e2e8f0_25%,transparent_25%),linear-gradient(225deg,#e2e8f0_25%,transparent_25%),linear-gradient(45deg,#e2e8f0_25%,transparent_25%),linear-gradient(315deg,#e2e8f0_25%,#f8fafc_25%)] bg-[length:36px_36px] bg-[position:18px_0,18px_0,0_0,0_0]">
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-600 p-4 text-white shadow-xl shadow-rose-200">
                <MapPinned size={28} />
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-3 text-sm font-bold text-slate-700 shadow-lg">
                Last updated {location.lastUpdated}
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
              <Navigation className="mx-auto text-blue-600" size={20} />
              <p className="mt-1 text-xs text-slate-500">{location.movement}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
              <BatteryFull className="mx-auto text-emerald-600" size={20} />
              <p className="mt-1 text-xs text-slate-500">{location.battery}%</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
              <Activity className="mx-auto text-brand-600" size={20} />
              <p className="mt-1 text-xs text-slate-500">{location.signal}</p>
            </div>
          </div>

          <Button
            className="mt-5 w-full"
            onClick={() => navigate('/location')}
            variant="secondary"
          >
            <MapPinned size={17} />
            Open live location
          </Button>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div>
          <SectionHeader
            title="Quick actions"
            subtitle="One-tap tools for common safety moments."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  onClick={() => handleQuickAction(action.label)}
                  disabled={actionLoading === action.label}
                  className="group rounded-3xl border border-white/80 bg-white p-5 text-left shadow-soft ring-1 ring-slate-100/80 transition duration-200 hover:-translate-y-1 hover:shadow-xl focus:outline-none  focus-visible:ring-0 focus-visible:outline-none focus-visible:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                  key={action.label}
                  type="button"
                >
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl transition duration-200 group-hover:scale-105 ${action.bg} ${action.color}`}>
                    {actionLoading === action.label ? (
                      <Loader2 className="animate-spin" size={22} />
                    ) : (
                      <Icon size={22} />
                    )}
                  </span>
                  <span className="mt-5 block font-black text-slate-950">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <Card className="h-full">
          <SectionHeader title="Safety tips" />
          <div className="space-y-3">
            {safetyTips.map((tip) => (
              <div className="flex gap-3 rounded-2xl bg-slate-50/80 p-3.5 ring-1 ring-slate-100" key={tip}>
                <ShieldCheck className="mt-0.5 shrink-0 text-emerald-600" size={18} />
                <p className="text-sm leading-6 text-slate-600">{tip}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)]">
        <div>
          <SectionHeader
            title="Trusted contacts"
            subtitle="People who receive your emergency updates."
            action={
              <Button
                onClick={handleDashboardAddContact}
                variant="secondary"
              >
                <Plus size={17} />
                Add contact
              </Button>
            }
          />
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2">
              <LoadingCard />
              <LoadingCard />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {contacts.slice(0, 2).map((contact) => (
                <ContactCard
                  calling={actionLoading === contact.name}
                  contact={contact}
                  key={contact.id}
                  onCall={(selectedContact) => handleCall(selectedContact.name)}
                />
              ))}
            </div>
          )}
        </div>

        <Card>
          <SectionHeader title="Recent alerts" />
          <div className="space-y-3">
            {alerts.length > 0 ? (
              alerts.map((alert) => <AlertItem alert={alert} key={alert.id} />)
            ) : (
              <EmptyState
                description="Safety updates, calls, check-ins, and SOS events will appear here."
                icon={Bell}
                title="No recent alerts yet"
              />
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}

export default Dashboard;
