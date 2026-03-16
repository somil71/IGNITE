export default function FacultyCard({ name, role, initials, photo, accent = 'fire' }) {
  const isCyan = accent === 'cyan';
  const color = isCyan ? '#00D4FF' : '#FF5500';

  return (
    <div className="flex flex-col group cursor-pointer">
      {/* PHOTO AREA (top part) */}
      <div className="relative w-full pb-[100%] overflow-hidden bg-gradient-to-br from-[#0D0D14] to-[#1A1A28]">
        <div className="absolute inset-0 flex items-center justify-center">
          {photo ? (
            <img 
              src={photo} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.06]"
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
               {/* Monogram */}
               <span className="font-display text-[40px] select-none z-10" style={{ color: color }}>
                 {initials}
               </span>
               {/* Subtle Grid Pattern */}
               <div 
                 className="absolute inset-0 opacity-[0.03] pointer-events-none"
                 style={{ 
                   backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
                   backgroundSize: '12px 12px'
                 }} 
               />
            </div>
          )}
        </div>

        {/* Top-right dot */}
        <div 
          className="absolute top-[10px] right-[10px] w-2 h-2 rounded-full z-20"
          style={{ 
             backgroundColor: color,
             animation: 'dotPulse 2s infinite'
          }} 
        />

        {/* Bottom-left designation badge */}
        <div className="absolute bottom-2 left-2 bg-black/85 px-2 py-0.5 z-20">
          <span className="font-mono text-[7px] uppercase tracking-[0.2em]" style={{ color: color }}>
             {role.split(' ').pop()}
          </span>
        </div>
      </div>

      {/* INFO AREA (bottom part) */}
      <div className="relative p-4 bg-card border border-white/5 border-t-0 group-hover:bg-elevated group-hover:border-[#FF550059] transition-all duration-200 overflow-hidden">
        <div className="flex items-center gap-2">
          <h4 className="font-ui font-bold text-[14px] text-white uppercase tracking-tight truncate flex-1">
            {name}
          </h4>
        </div>
        <p className="font-mono text-[10px] text-white/45 truncate mt-1">
          {role}
        </p>

        {/* Bottom accent line */}
        <div 
          className="card-accent-line group-hover:scale-x-100"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
