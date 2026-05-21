import { LockKeyhole, Mail, Shield, UserRound } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';

function Login({ onAuth, onToast }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      onToast({
        title: 'Missing login details',
        message: 'Enter your name and email to continue.',
        type: 'error',
      });
      return;
    }

    onAuth(formData);
    navigate('/dashboard');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-transparent px-4 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-200/70 ring-1 ring-white/80 md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden bg-slate-950 p-8 text-white sm:p-10">
          <div className="pointer-events-none absolute -right-24 top-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 shadow-lg shadow-rose-500/20">
              <Shield size={24} />
            </span>
            <span className="text-xl font-black">SafeHer</span>
          </div>
          <div className="relative mt-16 max-w-md">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-rose-200">
              Personal safety network
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Stay connected when every second matters.
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Access trusted contacts, live location tools, route check-ins, and
              emergency support from one calm, reliable dashboard.
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-500">
            Login to continue to your safety dashboard.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Full name</span>
              <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-brand-300 focus-within:bg-white">
                <UserRound size={18} className="text-slate-400" />
                <input
                  className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400"
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter your name"
                  type="text"
                  value={formData.name}
                />
              </span>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-brand-300 focus-within:bg-white">
                <Mail size={18} className="text-slate-400" />
                <input
                  className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400"
                  name="email"
                  onChange={handleChange}
                  placeholder="you@example.com"
                  type="email"
                  value={formData.email}
                />
              </span>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Password</span>
              <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-brand-300 focus-within:bg-white">
                <LockKeyhole size={18} className="text-slate-400" />
                <input
                  className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400"
                  placeholder="Enter password"
                  type="password"
                />
              </span>
            </label>

            <Button className="mt-2 w-full" type="submit">
              Login securely
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            New to SafeHer?{' '}
            <Link className="font-bold text-brand-600 hover:text-brand-700" to="/signup">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
