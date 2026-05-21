import { LockKeyhole, Mail, Phone, UserRound } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';

function Signup({ onAuth, onToast }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      onToast({
        title: 'Complete your profile',
        message: 'Name, email, and phone are needed for this safety profile.',
        type: 'error',
      });
      return;
    }

    onAuth(formData);
    navigate('/dashboard');
  }

  return (
    <main className="min-h-screen bg-transparent px-4 py-10">
      <section className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-2xl shadow-slate-200/70 ring-1 ring-white/80 sm:p-10">
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Create your safety profile</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Set up your account and add emergency details in a few simple steps.
          </p>
        </div>

        <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="block sm:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Full name</span>
            <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-brand-300 focus-within:bg-white">
              <UserRound size={18} className="text-slate-400" />
              <input
                className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400"
                name="name"
                onChange={handleChange}
                placeholder="Enter your name"
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
            <span className="text-sm font-semibold text-slate-700">Phone</span>
            <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-brand-300 focus-within:bg-white">
              <Phone size={18} className="text-slate-400" />
              <input
                className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400"
                name="phone"
                onChange={handleChange}
                placeholder="+91 98765 43210"
                value={formData.phone}
              />
            </span>
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Password</span>
            <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-brand-300 focus-within:bg-white">
              <LockKeyhole size={18} className="text-slate-400" />
              <input className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400" placeholder="Create password" type="password" />
            </span>
          </label>

          <Button className="w-full sm:col-span-2" type="submit">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link className="font-bold text-brand-600 hover:text-brand-700" to="/login">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Signup;
