export default function EventSelector({ events, selectedSlug, onSelect, isLoading }) {
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-10 bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {events.map((event) => {
        const isSelected = selectedSlug === event.slug;
        return (
          <button
            key={event._id}
            onClick={() => onSelect(event.slug)}
            className={`
              w-full p-4 border-b border-white/5 flex items-center justify-between transition-all group
              ${isSelected ? 'bg-fire/10' : 'hover:bg-white/5'}
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-fire shadow-[0_0_8px_#FF5500]' : 'bg-white/10'}`} />
              <span className={`
                font-mono text-[11px] text-left uppercase tracking-tight transition-colors
                ${isSelected ? 'text-fire font-bold' : 'text-secondary group-hover:text-white'}
              `}>
                {event.title}
              </span>
            </div>

            {isSelected && (
              <span className="font-mono text-[9px] text-fire animate-pulse underline underline-offset-4">READING...</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
