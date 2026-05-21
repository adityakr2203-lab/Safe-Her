import {
  BatteryFull,
  Car,
  Clock,
  MapPin,
  Navigation,
  Phone,
  Share2,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import Modal from '../components/Modal.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

function Location() {
  const navigate = useNavigate();
  const { addAlert, addToast, location, setLocation } = useOutletContext();
  const [loading, setLoading] = useState('');
  const [modal, setModal] = useState(null);
  const sharing = location.status === 'Sharing';

  function showMessage(title, message) {
    setModal({ title, message });
  }

  function handleShareAgain() {
    setLoading('share');
    setTimeout(() => {
      setLoading('');
      setLocation((currentLocation) => ({
        ...currentLocation,
        lastUpdated: 'just now',
        status: 'Sharing',
      }));
      addAlert('Live location shared again', 'Sharing');
      addToast({
        title: 'Location shared',
        message: 'Trusted contacts received your latest live location.',
        type: 'success',
      });
      showMessage('Location shared', 'Your mock live location was sent to trusted contacts.');
    }, 700);
  }

  function toggleSharing() {
    setLocation((currentLocation) => ({
      ...currentLocation,
      status: currentLocation.status === 'Sharing' ? 'Paused' : 'Sharing',
      lastUpdated: 'just now',
    }));
    addAlert(sharing ? 'Live location paused' : 'Live location resumed', 'Updated');
    addToast({
      title: sharing ? 'Sharing paused' : 'Sharing resumed',
      message: sharing
        ? 'Your mock live location is paused.'
        : 'Your mock live location is visible again.',
      type: sharing ? 'info' : 'success',
    });
  }

  return (
    <div className="space-y-8">
      <Modal
        open={Boolean(modal)}
        onClose={() => setModal(null)}
        title={modal?.title}
      >
        <p className="text-sm leading-6 text-slate-600">{modal?.message}</p>
      </Modal>

      <SectionHeader
        title="Live location"
        subtitle="Mock tracking view for frontend-only route and sharing behavior."
        action={
          <Button onClick={() => navigate('/dashboard')} variant="secondary">
            Back to dashboard
          </Button>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)]">
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Current location</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                {location.address}
              </h1>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                {location.coordinates} • Updated {location.lastUpdated}
              </p>
            </div>
            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                sharing
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {sharing ? 'Sharing live' : 'Paused'}
            </span>
          </div>

          <div className="relative mt-6 h-[24rem] overflow-hidden rounded-3xl bg-slate-100 shadow-inner ring-1 ring-slate-200/80 sm:h-[28rem]">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(148,163,184,0.22)_1px,transparent_1px),linear-gradient(rgba(148,163,184,0.22)_1px,transparent_1px)] bg-[length:48px_48px]" />
            <div className="absolute left-[8%] top-[32%] h-3 w-[84%] rotate-6 rounded-full bg-blue-200" />
            <div className="absolute left-[18%] top-[68%] h-3 w-[62%] -rotate-12 rounded-full bg-brand-200" />
            <div className="absolute left-[48%] top-[44%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-600 p-5 text-white shadow-2xl shadow-rose-200">
              <MapPin size={34} />
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/95 p-4 shadow-xl ring-1 ring-slate-100">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-black text-slate-950">{location.routeName}</p>
                  <p className="text-sm text-slate-500">
                    {location.distance} • Best-lit route selected
                  </p>
                </div>
                <Button
                  onClick={() => {
                    addAlert('Mock route navigation opened', 'Ready');
                    addToast({
                      title: 'Navigation ready',
                      message: 'Best-lit mock route is selected.',
                      type: 'success',
                    });
                    showMessage('Route opened', 'Mock turn-by-turn navigation is ready.');
                  }}
                  variant="dark"
                >
                  <Navigation size={17} />
                  Navigate
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <SectionHeader title="Tracking status" />
            <div className="grid gap-3">
              {[
                { label: 'Battery', value: `${location.battery}%`, icon: BatteryFull },
                { label: 'ETA home', value: location.eta, icon: Clock },
                { label: 'Travel mode', value: location.travelMode, icon: Car },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    className="flex items-center justify-between rounded-2xl bg-slate-50 p-3.5 ring-1 ring-slate-100"
                    key={item.label}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="text-brand-600" size={20} />
                      <span className="font-semibold text-slate-600">{item.label}</span>
                    </div>
                    <span className="font-black text-slate-950">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <SectionHeader title="Location actions" />
            <div className="grid gap-3">
              <Button disabled={loading === 'share'} onClick={handleShareAgain}>
                <Share2 size={17} />
                {loading === 'share' ? 'Sharing...' : 'Share live location'}
              </Button>
              <Button
                onClick={() => {
                  addAlert('Primary contact called from location', 'Connected');
                  addToast({
                    title: 'Call started',
                    message: 'Connecting to your primary trusted contact.',
                    type: 'success',
                  });
                  showMessage(
                    'Calling emergency contact...',
                    'Connecting to your primary contact.',
                  );
                }}
                variant="secondary"
              >
                <Phone size={17} />
                Call contact
              </Button>
              <Button onClick={toggleSharing} variant="secondary">
                {sharing ? 'Pause sharing' : 'Resume sharing'}
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default Location;
