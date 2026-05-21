import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import AppLayout from './layouts/AppLayout.jsx';
import {
  defaultUser,
  initialAlerts,
  initialContacts,
  initialLocation,
  initialPreferences,
  initialSafetyState,
  initialSafetyTips,
  initialSosTimeline,
} from './data/mockData.js';
import useLocalStorage from './hooks/useLocalStorage.js';
import Dashboard from './pages/Dashboard.jsx';
import EmergencySOS from './pages/EmergencySOS.jsx';
import Login from './pages/Login.jsx';
import Location from './pages/Location.jsx';
import Profile from './pages/Profile.jsx';
import register from './pages/register.jsx';
import TrustedContacts from './pages/TrustedContacts.jsx';
import ToastContainer from './components/ToastContainer.jsx';

const STORAGE_KEY = 'safeher_user';

function App() {
  const [toasts, setToasts] = useState([]);
  const [storedUser, setCurrentUser] = useLocalStorage(STORAGE_KEY, defaultUser);
  const [contacts, setContacts] = useLocalStorage('safeher_contacts', initialContacts);
  const [alerts, setAlerts] = useLocalStorage('safeher_alerts', initialAlerts);
  const [safetyTips, setSafetyTips] = useLocalStorage(
    'safeher_safety_tips',
    initialSafetyTips,
  );
  const [location, setLocation] = useLocalStorage('safeher_location', initialLocation);
  const [preferences, setPreferences] = useLocalStorage(
    'safeher_preferences',
    initialPreferences,
  );
  const [safetyState, setSafetyState] = useLocalStorage(
    'safeher_safety_state',
    initialSafetyState,
  );
  const [sosTimeline, setSosTimeline] = useLocalStorage(
    'safeher_sos_timeline',
    initialSosTimeline,
  );

  const currentUser = { ...defaultUser, ...storedUser };

  function handleAuth(userDetails) {
    setCurrentUser((previousUser) => ({
      ...defaultUser,
      ...previousUser,
      ...userDetails,
      name: userDetails.name.trim() || previousUser.name,
      email: userDetails.email.trim() || previousUser.email,
      phone: userDetails.phone?.trim() || previousUser.phone,
    }));
    addToast({
      title: 'Welcome to SafeHer',
      message: 'Your mock safety profile is ready.',
      type: 'success',
    });
  }

  function dismissToast(toastId) {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== toastId),
    );
  }

  function addToast({ message, title, type = 'success' }) {
    const toast = {
      id: Date.now() + Math.random(),
      message,
      title,
      type,
    };

    setToasts((currentToasts) => [toast, ...currentToasts].slice(0, 4));
    setTimeout(() => dismissToast(toast.id), 3800);
  }

  function addAlert(title, status = 'Updated') {
    const newAlert = {
      id: Date.now(),
      title,
      time: 'Just now',
      status,
    };

    setAlerts((currentAlerts) => [newAlert, ...currentAlerts].slice(0, 8));
  }

  const appData = {
    addAlert,
    addToast,
    alerts,
    contacts,
    currentUser,
    location,
    preferences,
    safetyState,
    safetyTips,
    setAlerts,
    setContacts,
    setCurrentUser,
    setLocation,
    setPreferences,
    setSafetyState,
    setSafetyTips,
    setSosTimeline,
    sosTimeline,
  };

  return (
    <>
      <ToastContainer onDismiss={dismissToast} toasts={toasts} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={<Login onAuth={handleAuth} onToast={addToast} />}
        />
        <Route
          path="/signup"
          element={<Signup onAuth={handleAuth} onToast={addToast} />}
        />
        <Route element={<AppLayout appData={appData} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts" element={<TrustedContacts />} />
          <Route path="/location" element={<Location />} />
          <Route path="/sos" element={<EmergencySOS />} />
          <Route path="/profile" element={<Profile />} />
          
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default App;
