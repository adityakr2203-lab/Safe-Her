import {
  Car,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Siren,
  Users,
} from 'lucide-react';

export const defaultUser = {
  name: 'SafeHer User',
  email: 'user@example.com',
  phone: '+91 98765 43210',
  city: 'Bengaluru, India',
  plan: 'SafeHer Plus',
  verificationStatus: 'Verified member',
  healthProfileStatus: 'Ready',
};

export const initialContacts = [
  {
    id: 1,
    name: 'Riya Kapoor',
    relation: 'Sister',
    phone: '+91 99887 77665',
    status: 'Online',
    initials: 'RK',
  },
  {
    id: 2,
    name: 'Meera Sharma',
    relation: 'Mother',
    phone: '+91 88776 66554',
    status: 'Available',
    initials: 'MS',
  },
  {
    id: 3,
    name: 'Kabir Jain',
    relation: 'Friend',
    phone: '+91 77665 55443',
    status: 'Away',
    initials: 'KJ',
  },
  {
    id: 4,
    name: 'Neha Singh',
    relation: 'Roommate',
    phone: '+91 66554 44332',
    status: 'Online',
    initials: 'NS',
  },
];

export const initialAlerts = [
  {
    id: 1,
    title: 'Location shared with Riya and Meera',
    time: 'Today, 8:45 PM',
    status: 'Delivered',
  },
  {
    id: 2,
    title: 'Safe arrival confirmed at home',
    time: 'Today, 7:58 PM',
    status: 'Safe',
  },
  {
    id: 3,
    title: 'Battery alert sent during commute',
    time: 'Yesterday, 10:18 PM',
    status: 'Resolved',
  },
  {
    id: 4,
    title: 'Cab route changed near Indiranagar',
    time: 'Yesterday, 9:42 PM',
    status: 'Reviewed',
  },
];

export const initialSafetyTips = [
  'Share your ride details before starting a late-night trip.',
  'Keep at least two trusted contacts active for SOS alerts.',
  'Use well-lit routes and avoid isolated shortcuts when possible.',
];

export const initialLocation = {
  address: 'MG Road, Bengaluru',
  coordinates: '12.9716 N, 77.5946 E',
  battery: 86,
  status: 'Sharing',
  movement: 'Moving',
  signal: 'Active',
  lastUpdated: '12 seconds ago',
  routeName: 'Route to home',
  distance: '2.4 km away',
  eta: '14 min',
  travelMode: 'Cab',
};

export const initialPreferences = [
  { id: 'share-location-sos', label: 'Auto-share location during SOS', enabled: true },
  { id: 'battery-alerts', label: 'Notify contacts when battery is low', enabled: true },
  { id: 'checkin-reminder', label: 'Send check-in reminder after 30 minutes', enabled: true },
];

export const initialSafetyState = {
  checksCompleted: 18,
  medicalIdReady: true,
  pushAlertsEnabled: true,
};

export const quickActions = [
  { label: 'Call Police', icon: Phone, color: 'text-brand-600', bg: 'bg-brand-50' },
  { label: 'Share Location', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Message Contacts', icon: MessageCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Safe Ride', icon: Car, color: 'text-amber-600', bg: 'bg-amber-50' },
];

export const initialSosTimeline = [
  { label: 'Alert contacts', done: true },
  { label: 'Share live location', done: true },
  { label: 'Connect emergency line', done: false },
  { label: 'Start audio recording', done: false },
];

export const navLinks = [
  { label: 'Dashboard', path: '/dashboard', icon: Home },
  { label: 'Contacts', path: '/contacts', icon: Users },
  { label: 'SOS', path: '/sos', icon: Siren },
  { label: 'Profile', path: '/profile', icon: ShieldCheck },
];
