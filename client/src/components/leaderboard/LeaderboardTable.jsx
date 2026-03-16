import { Trophy, Medal } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

export default function LeaderboardTable({ entries, showEvent }) {
  const tableRef = useScrollReveal();
  if (!entries || entries.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-white/5">
            <th className="py-6 px-8 font-ui text-[10px] text-muted tracking-[3px] uppercase">Rank</th>
            <th className="py-6 px-8 font-ui text-[10px] text-muted tracking-[3px] uppercase">Subject / Team</th>
            {showEvent && <th className="py-6 px-8 font-ui text-[10px] text-muted tracking-[3px] uppercase">Event</th>}
            <th className="py-6 px-8 font-ui text-[10px] text-muted tracking-[3px] uppercase">Origin / College</th>
            <th className="py-6 px-8 font-ui text-[10px] text-muted tracking-[3px] uppercase text-right">Score</th>
          </tr>
        </thead>
        <tbody ref={tableRef} className="font-mono text-sm tracking-[1px] reveal-stagger">
          {entries.map((entry, i) => {
            const rank = i + 1;
            const isTop3 = rank <= 3;
            
            return (
              <tr 
                key={entry._id || i}
                className={`border-b border-white/[0.03] hover:bg-fire/[0.03] transition-colors group ${
                  rank === 1 ? 'bg-fire/[0.02]' : ''
                }`}
              >
                <td className="py-5 px-8">
                  <div className="flex items-center gap-3">
                    {rank === 1 && <Trophy size={16} className="text-fire animate-pulse" />}
                    {rank === 2 && <Medal size={16} className="text-secondary opacity-70" />}
                    {rank === 3 && <Medal size={16} className="text-ember opacity-70" />}
                    <span className={`text-[11px] ${isTop3 ? 'text-primary font-bold' : 'text-muted font-light'}`}>
                      {String(rank).padStart(2, '0')}
                    </span>
                  </div>
                </td>
                <td className="py-5 px-8">
                  <div className={`text-primary group-hover:text-fire transition-colors ${rank === 1 ? 'text-fire text-base tracking-widest' : ''}`}>
                    {entry.teamName}
                  </div>
                  <div className="text-[9px] text-muted mt-1 uppercase tracking-wider">
                    {entry.members && entry.members.length > 0 ? entry.members.join(' • ') : 'SQUAD UNKNOWN'}
                  </div>
                </td>
                {showEvent && (
                  <td className="py-5 px-8">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] text-secondary tracking-widest uppercase">
                      {entry.eventName}
                    </span>
                  </td>
                )}
                <td className="py-5 px-8 text-secondary font-light text-[12px] uppercase tracking-wide opacity-60">
                  {entry.college}
                </td>
                <td className="py-5 px-8 text-right">
                  <span className={`font-bold text-lg ${rank === 1 ? 'text-fire' : 'text-primary'}`}>
                    {entry.score}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
