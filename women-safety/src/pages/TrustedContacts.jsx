import { Loader2, Plus, Search, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Button from '../components/Button.jsx';
import ContactCard from '../components/ContactCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Modal from '../components/Modal.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

function TrustedContacts() {
  const { addAlert, addToast, contacts, setContacts } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState(null);
  const [loadingAction, setLoadingAction] = useState('');
  const filteredContacts = contacts.filter((contact) =>
    `${contact.name} ${contact.relation} ${contact.phone}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  function showMessage(title, message) {
    setModal({ title, message });
  }

  function handleCall(contact) {
    setLoadingAction(contact.id);
    setTimeout(() => {
      setLoadingAction('');
      addAlert(`Called ${contact.name}`, 'Connected');
      addToast({
        title: 'Call started',
        message: `Connecting to ${contact.name}.`,
        type: 'success',
      });
      showMessage('Calling emergency contact...', `Connecting to ${contact.name}.`);
    }, 600);
  }

  function handleRemove(contact) {
    setContacts((currentContacts) =>
      currentContacts.filter((item) => item.id !== contact.id),
    );
    addAlert(`${contact.name} removed from contacts`, 'Updated');
    addToast({
      title: 'Contact removed',
      message: `${contact.name} was removed from trusted contacts.`,
      type: 'info',
    });
    showMessage('Contact removed', `${contact.name} was removed from trusted contacts.`);
  }

  function handleAddContact() {
    const nextContactNumber = contacts.length + 1;
    const newContact = {
      id: Date.now(),
      name: `Trusted Contact ${nextContactNumber}`,
      relation: 'Emergency contact',
      phone: `+91 90000 00${String(nextContactNumber).padStart(3, '0')}`,
      status: 'Available',
      initials: `TC`,
    };

    setContacts((currentContacts) => [newContact, ...currentContacts]);
    addAlert(`${newContact.name} added`, 'Updated');
    addToast({
      title: 'Contact added',
      message: `${newContact.name} is ready to receive safety updates.`,
      type: 'success',
    });
    showMessage('Contact added', `${newContact.name} was added to trusted contacts.`);
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
        title="Trusted contacts"
        subtitle="Manage the people who can receive SOS messages and location updates."
        action={
          <Button onClick={handleAddContact}>
            <Plus size={17} />
            Add contact
          </Button>
        }
      />

      <div className="grid gap-4 rounded-3xl border border-white/80 bg-white p-4 shadow-soft ring-1 ring-slate-100/80 md:grid-cols-[1fr_auto] md:items-center">
        <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-brand-300 focus-within:bg-white">
          <Search size={18} className="text-slate-400" />
          <input
            className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search contacts"
            type="search"
            value={searchTerm}
          />
        </label>
        <Button
          disabled={loadingAction === 'import'}
          onClick={() => {
            setLoadingAction('import');
              setTimeout(() => {
                setLoadingAction('');
                addAlert('Contacts import checked', 'Ready');
                addToast({
                  title: 'Contacts checked',
                  message: 'No duplicate emergency contacts found.',
                  type: 'success',
                });
                showMessage('Contacts imported', 'Mock contacts were checked successfully.');
              }, 700);
          }}
          variant="secondary"
        >
          {loadingAction === 'import' ? (
            <Loader2 className="animate-spin" size={17} />
          ) : (
            <UserPlus size={17} />
          )}
          Import contacts
        </Button>
      </div>

      {filteredContacts.length > 0 ? (
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {filteredContacts.map((contact) => (
            <ContactCard
              calling={loadingAction === contact.id}
              contact={contact}
              key={contact.id}
              onCall={handleCall}
              onRemove={handleRemove}
              showRemove
            />
          ))}
        </section>
      ) : (
        <EmptyState
          action={{
            icon: <Plus size={17} />,
            label: 'Add contact',
            onClick: handleAddContact,
          }}
          description={
            searchTerm
              ? 'Try a different name, relation, or phone number.'
              : 'Add at least one trusted contact to receive emergency updates.'
          }
          icon={Users}
          title={searchTerm ? 'No contacts match your search' : 'No trusted contacts yet'}
        />
      )}
    </div>
  );
}

export default TrustedContacts;
