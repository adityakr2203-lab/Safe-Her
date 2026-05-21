import {
  Bell,
  Edit3,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import Modal from '../components/Modal.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function Profile() {
  const {
    addToast,
    alerts,
    contacts,
    currentUser,
    preferences,
    safetyState,
    setPreferences,
  } = useOutletContext();
  const [modal, setModal] = useState(null);
  const profileStats = [
    { label: 'Trusted contacts', value: contacts.length, icon: Users },
    { label: 'Safety checks', value: safetyState.checksCompleted, icon: ShieldCheck },
    { label: 'Alerts sent', value: alerts.length, icon: Bell },
    {
      label: 'Health profile',
      value: currentUser.healthProfileStatus,
      icon: HeartPulse,
    },
  ];

  function togglePreference(preferenceId) {
    const changedPreference = preferences.find(
      (preference) => preference.id === preferenceId,
    );

    setPreferences((currentPreferences) =>
      currentPreferences.map((preference) =>
        preference.id === preferenceId
          ? { ...preference, enabled: !preference.enabled }
          : preference,
      ),
    );
    addToast({
      title: 'Preference updated',
      message: `${changedPreference?.label || 'Safety preference'} changed.`,
      type: 'success',
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
        title="Profile"
        subtitle="Your personal safety settings and emergency information."
        action={
          <Button
            onClick={() =>
              setModal({
                title: 'Edit profile',
                message: 'Profile editing is simulated in this frontend-only demo.',
              })
            }
            variant="secondary"
          >
            <Edit3 size={17} />
            Edit profile
          </Button>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[minmax(20rem,0.85fr)_minmax(0,1.15fr)]">
        <Card className="h-fit">
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-brand-100 text-3xl font-black text-brand-700 shadow-inner ring-8 ring-rose-50">
              {getInitials(currentUser.name)}
            </div>
            <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950">
              {currentUser.name}
            </h1>
            <p className="mt-1 text-sm font-semibold text-slate-500">{currentUser.email}</p>
            <span className="mt-5 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 ring-1 ring-emerald-100">
              {currentUser.verificationStatus}
            </span>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5 ring-1 ring-slate-100">
              <MapPin className="text-brand-600" size={20} />
              <span className="font-semibold text-slate-700">{currentUser.city}</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5 ring-1 ring-slate-100">
              <Bell className="text-blue-600" size={20} />
              <span className="font-semibold text-slate-700">
                Push alerts {safetyState.pushAlertsEnabled ? 'enabled' : 'disabled'}
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5 ring-1 ring-slate-100">
              <HeartPulse className="text-emerald-600" size={20} />
              <span className="font-semibold text-slate-700">
                Medical ID {safetyState.medicalIdReady ? 'ready' : 'incomplete'}
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5 ring-1 ring-slate-100">
              <Phone className="text-amber-600" size={20} />
              <span className="font-semibold text-slate-700">{currentUser.phone}</span>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {profileStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card className="transition hover:-translate-y-1 hover:shadow-xl" key={stat.label}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon size={24} />
                  </div>
                  <p className="mt-5 text-3xl font-black tracking-tight text-slate-950">{stat.value}</p>
                  <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
                </Card>
              );
            })}
          </div>

          <Card>
            <SectionHeader title="Safety preferences" />
            <div className="space-y-4">
              {preferences.map((preference) => (
                <label
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 transition hover:bg-white hover:shadow-md"
                  key={preference.id}
                >
                  <span className="font-semibold text-slate-700">
                    {preference.label}
                  </span>
                  <input
                    className="h-5 w-5 shrink-0 accent-brand-600"
                    checked={preference.enabled}
                    onChange={() => togglePreference(preference.id)}
                    type="checkbox"
                  />
                </label>
              ))}
            </div>
          </Card>

          <Card className="bg-slate-950 text-white">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                <ShieldCheck size={24} />
              </span>
              <div>
                <h2 className="text-xl font-black">Safety score: Excellent</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Your contact list, location sharing, and alert preferences are
                  configured for fast emergency response.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default Profile;
