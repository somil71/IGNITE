import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/admin.service';
import ScrambleText from '../../components/ui/ScrambleText';
import IgniteButton from '../../components/ui/IgniteButton';
import toast from 'react-hot-toast';
import { Plus, Edit2, Power, Search, Trash2, X, DollarSign } from 'lucide-react';

export default function AdminEvents() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [editForm, setEditForm] = useState({});

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['admin-events'],
    queryFn: async () => {
      const res = await adminService.getAllEvents();
      return res.data.events;
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => adminService.updateEvent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-events']);
      toast.success('Event updated successfully');
      setEditingEvent(null);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Update failed')
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => adminService.deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-events']);
      toast.success('Event deactivated');
    }
  });

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setEditForm({
      title: event.title || '',
      registrationFee: event.registrationFee ?? 0,
      feeType: event.feeType || 'per_person',
      description: event.description || '',
      whatsappGroupLink: event.whatsappGroupLink || '',
      maxParticipants: event.maxParticipants || '',
      registrationDeadline: event.registrationDeadline ? new Date(event.registrationDeadline).toISOString().slice(0, 16) : '',
      isActive: event.isActive ?? true,
    });
  };

  const handleSaveEdit = () => {
    const data = { ...editForm };
    data.registrationFee = Number(data.registrationFee);
    if (data.maxParticipants === '') data.maxParticipants = null;
    if (data.registrationDeadline === '') data.registrationDeadline = null;
    updateMutation.mutate({ id: editingEvent._id, data });
  };

  const handleToggleActive = (event) => {
    updateMutation.mutate({ id: event._id, data: { isActive: !event.isActive } });
  };

  const filteredEvents = events.filter(e => {
    const matchesFilter = filter === 'ALL' || 
                          filter === 'INACTIVE' ? !e.isActive :
                          filter === 'ALL' || e.category.toUpperCase() === filter.toUpperCase();
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (
      filter === 'ALL' ? true :
      filter === 'INACTIVE' ? !e.isActive :
      e.category.toUpperCase() === filter.toUpperCase()
    );
  });

  const inputClasses = "w-full bg-void border border-white/10 p-3 text-sm text-primary font-mono mt-1 focus:border-fire/50 outline-none transition-colors";
  const labelClasses = "text-[9px] text-muted tracking-[2px] uppercase font-mono";

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-fire/10">
        <div>
          <h1 className="font-display text-4xl md:text-6xl text-primary tracking-[4px] mb-2 uppercase">
            <ScrambleText text="EVENT REPOSITORY" />
          </h1>
          <p className="font-mono text-secondary text-[11px] tracking-[4px] uppercase">
            Configure // Deploy // Monitor Competitions
          </p>
        </div>
        <IgniteButton variant="primary" onClick={() => toast('Full event creation form coming next')} className="px-10">
          <Plus size={18} className="mr-2" /> NEW DEPLOYMENT
        </IgniteButton>
      </header>

      {/* Filter Tabs */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex flex-wrap bg-[#0A0A15] border border-white/5 p-1 rounded-sm w-full md:w-auto gap-1">
          {['ALL', 'TECHNICAL', 'CREATIVE & INNOVATION', 'FUN', 'INACTIVE'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 font-ui text-[10px] tracking-[2px] uppercase transition-all ${
                filter === cat ? (cat === 'INACTIVE' ? 'bg-red-500/80 text-white' : 'bg-fire text-white') : 'text-muted hover:text-primary'
              }`}
            >
              {cat === 'CREATIVE & INNOVATION' ? 'CREATIVE' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="SEARCH DATABASE..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0A0A15] border border-white/5 focus:border-fire/50 outline-none pl-12 pr-4 py-3 font-mono text-xs text-primary"
          />
        </div>
      </div>

      {/* Events Table */}
      <div className="ignite-card overflow-x-auto border-fire/5 bg-[#0A0A10]/50 no-scrollbar">
        <table className="admin-table">
          <thead>
            <tr>
              <th>EVENT TITLE</th>
              <th>CATEGORY</th>
              <th>TEAM SIZE</th>
              <th>FEE</th>
              <th>STATUS</th>
              <th className="text-right">OPERATIONS</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="6" className="text-center py-20 animate-pulse">DRY-RUNNING REPOSITORY...</td></tr>
            ) : filteredEvents.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-20 text-muted">NO EVENTS FOUND</td></tr>
            ) : (
              filteredEvents.map(event => (
                <tr key={event._id} className={!event.isActive ? 'opacity-50' : ''}>
                  <td className="font-bold text-primary tracking-wider">
                    {event.title.toUpperCase()}
                    {!event.isActive && (
                      <span className="ml-2 px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[8px] tracking-[1px] uppercase">OFFLINE</span>
                    )}
                  </td>
                  <td>
                    <span className={`px-2 py-1 text-[9px] border ${
                      event.category === 'Technical' ? 'border-cyan text-cyan bg-cyan/5' : 
                      event.category === 'Fun' ? 'border-ember text-ember bg-ember/5' : 'border-fire text-fire bg-fire/5'
                    }`}>
                      {event.category.toUpperCase()}
                    </span>
                  </td>
                  <td>{event.teamSize?.label || 'SOLO/TEAM'}</td>
                  <td className={event.registrationFee === 0 ? 'text-green' : 'text-fire font-bold'}>
                    {event.registrationFee === 0 ? 'FREE' : <div className="leading-tight">₹{event.registrationFee}<br/><span className="text-[8px] text-muted">{event.feeType === 'per_team' ? 'PER TEAM' : 'PER PERSON'}</span></div>}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${event.isActive ? 'bg-green animate-pulse' : 'bg-red-500'}`} />
                       <span className={event.isActive ? 'text-green' : 'text-red-400'}>
                         {event.isActive ? 'ACTIVE' : 'OFFLINE'}
                       </span>
                    </div>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEditClick(event)}
                        className="p-2 bg-white/5 hover:bg-white/10 text-muted hover:text-cyan transition-colors"
                        title="Edit Configuration"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleToggleActive(event)}
                        className={`p-2 bg-white/5 hover:bg-white/10 transition-colors ${event.isActive ? 'text-muted hover:text-red-400' : 'text-muted hover:text-green'}`}
                        title={event.isActive ? 'Deactivate' : 'Reactivate'}
                      >
                        <Power size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm(`Permanently delete "${event.title}"? This cannot be undone.`)) {
                            // For now, soft-delete (deactivate)
                            deleteMutation.mutate(event._id);
                          }
                        }}
                        className="p-2 bg-white/5 hover:bg-fire/10 text-muted hover:text-fire transition-colors"
                        title="Deactivate Event"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-sm" onClick={() => setEditingEvent(null)}>
          <div className="bg-[#0A0A15] border border-fire/20 p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display text-2xl text-primary tracking-[3px] uppercase">Edit Event</h3>
              <button onClick={() => setEditingEvent(null)} className="p-2 text-muted hover:text-fire"><X size={20} /></button>
            </div>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className={labelClasses}>Event Title</label>
                <input 
                  type="text" 
                  value={editForm.title}
                  onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                  className={inputClasses}
                />
              </div>

              {/* Price + Status Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Registration Fee (₹)</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fire mt-0.5" />
                      <input 
                        type="number" 
                        min="0"
                        value={editForm.registrationFee}
                        onChange={e => setEditForm({ ...editForm, registrationFee: e.target.value })}
                        className={`${inputClasses} pl-10 text-fire font-bold text-lg`}
                      />
                    </div>
                    <select 
                      value={editForm.feeType}
                      onChange={e => setEditForm({ ...editForm, feeType: e.target.value })}
                      className={`${inputClasses} flex-1`}
                    >
                      <option value="per_person">Per Person</option>
                      <option value="per_team">Per Team</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Active Status</label>
                  <button
                    type="button"
                    onClick={() => setEditForm({ ...editForm, isActive: !editForm.isActive })}
                    className={`w-full p-3 mt-1 font-mono text-sm border transition-all ${
                      editForm.isActive 
                        ? 'bg-green/10 border-green/30 text-green' 
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}
                  >
                    {editForm.isActive ? '● ACTIVE' : '○ OFFLINE'}
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className={labelClasses}>Description</label>
                <textarea 
                  rows={3}
                  value={editForm.description}
                  onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              {/* WhatsApp + Max Seats */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Max Participants</label>
                  <input 
                    type="number"
                    placeholder="Unlimited"
                    value={editForm.maxParticipants}
                    onChange={e => setEditForm({ ...editForm, maxParticipants: e.target.value })}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Deadline</label>
                  <input 
                    type="datetime-local" 
                    value={editForm.registrationDeadline}
                    onChange={e => setEditForm({ ...editForm, registrationDeadline: e.target.value })}
                    className={`${inputClasses} [color-scheme:dark]`}
                  />
                </div>
              </div>

              {/* WhatsApp Link */}
              <div>
                <label className={labelClasses}>WhatsApp Group Link</label>
                <input 
                  type="text" 
                  value={editForm.whatsappGroupLink}
                  onChange={e => setEditForm({ ...editForm, whatsappGroupLink: e.target.value })}
                  placeholder="https://chat.whatsapp.com/..."
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <IgniteButton variant="primary" onClick={handleSaveEdit} loading={updateMutation.isPending} className="flex-1">
                SAVE CHANGES
              </IgniteButton>
              <IgniteButton variant="ghost" onClick={() => setEditingEvent(null)} className="flex-1">
                CANCEL
              </IgniteButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
