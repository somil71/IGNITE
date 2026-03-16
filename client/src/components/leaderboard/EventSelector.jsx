export default function EventSelector({ events, selectedId, onSelect }) {
  return (
    <div className="flex flex-wrap gap-4 mb-12">
      {events.map((event) => (
        <button
          key={event._id}
          onClick={() => onSelect(event)}
          className={`px-6 py-2.5 font-ui text-[12px] tracking-[2px] uppercase transition-all duration-300 border ${
            selectedId === event._id
              ? 'border-fire bg-fire/10 text-fire shadow-fire'
              : 'border-[var(--border-subtle)] text-muted hover:text-secondary hover:border-secondary'
          }`}
        >
          {event.title}
        </button>
      ))}
    </div>
  );
}
