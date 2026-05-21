import { Menu, Shield, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { navLinks } from '../data/mockData.js';
import PageTransition from '../components/PageTransition.jsx';

function AppLayout({ appData }) {
  const [open, setOpen] = useState(false);
  const { currentUser } = appData;

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-2xl px-3.5 py-2.5 text-sm font-bold transition duration-200 ${
      isActive
        ? 'bg-brand-50 text-brand-700 shadow-sm'
        : 'text-slate-600 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-950'
    }`;

  return (
    <div className="min-h-screen bg-transparent">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 shadow-sm shadow-slate-200/30 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <NavLink to="/dashboard" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5">
              <Shield size={22} />
            </span>
            <div>
              <p className="text-base font-black leading-5 tracking-tight text-slate-950">SafeHer</p>
              <p className="text-xs font-semibold text-slate-500">Safety companion</p>
            </div>
          </NavLink>

          <div className="hidden items-center gap-1.5 rounded-3xl bg-slate-50 p-1.5 ring-1 ring-slate-200/70 md:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink key={link.path} to={link.path} className={linkClass}>
                  <Icon size={17} />
                  {link.label}
                </NavLink>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div className="max-w-36 text-right">
              <p className="text-sm font-bold text-slate-950">{currentUser.name}</p>
              <p className="text-xs text-slate-500">{currentUser.plan}</p>
            </div>
            <NavLink
              to="/profile"
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition hover:-translate-y-0.5 hover:bg-brand-50 hover:text-brand-700 hover:shadow-md"
            >
              <UserRound size={20} />
            </NavLink>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition hover:bg-slate-200 focus:outline-none  focus-visible:ring-0 focus-visible:outline-none focus-visible:brightness-95 md:hidden"
            onClick={() => setOpen((current) => !current)}
            type="button"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {open && (
          <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg shadow-slate-200/40 md:hidden">
            <div className="space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={linkClass}
                    onClick={() => setOpen(false)}
                  >
                    <Icon size={17} />
                    {link.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <PageTransition>
          <Outlet context={appData} />
        </PageTransition>
      </main>
    </div>
  );
}

export default AppLayout;
