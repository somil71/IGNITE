import { Trophy, Medal } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

export default function LeaderboardTable({ entries }) {
  const tableRef = useScrollReveal();
  if (!entries || entries.length === 0) {
    return (
      <div className="py-20 text-center border border-dashed border-[var(--border-subtle)] bg-surface/20">
        <div className="font-mono text-xs text-muted tracking-[3px] uppercase">Rankings will be published during the fest</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-[var(--border-subtle)]">
            <th className="py-4 px-6 font-ui text-[11px] text-muted tracking-[3px] uppercase">Rank</th>
            <th className="py-4 px-6 font-ui text-[11px] text-muted tracking-[3px] uppercase">Team Name</th>
            <th className="py-4 px-6 font-ui text-[11px] text-muted tracking-[3px] uppercase">College</th>
            <th className="py-4 px-6 font-ui text-[11px] text-muted tracking-[3px] uppercase text-right">Score</th>
          </tr>
        </thead>
        <tbody ref={tableRef} className="font-mono text-sm tracking-[1px] reveal-stagger">
          {entries.map((entry, i) => {
            const rank = i + 1;
            const isTop3 = rank <= 3;
            
            return (
              <tr 
                key={entry._id || i}
                className={`border-b border-[var(--border-subtle)] hover:bg-fire/5 transition-colors group ${
                  rank === 1 ? 'bg-fire/5 border-l-4 border-l-fire' : 
                  rank === 2 ? 'border-l-4 border-l-secondary' :
                  rank === 3 ? 'border-l-4 border-l-ember' : ''
                }`}
              >
                <td className="py-5 px-6">
                  <div className="flex items-center gap-3">
                    {rank === 1 ? <Trophy size={18} className="text-fire" /> : 
                     rank === 2 ? <Medal size={18} className="text-secondary" /> :
                     rank === 3 ? <Medal size={18} className="text-ember" /> : null}
                    <span className={isTop3 ? 'font-bold' : 'text-muted'}>{String(rank).padStart(2, '0')}</span>
                  </div>
                </td>
                <td className="py-5 px-6">
                  <div className="text-primary group-hover:text-fire transition-colors">{entry.teamName}</div>
                  <div className="text-[10px] text-muted mt-0.5">{entry.members.join(', ')}</div>
                </td>
                <td className="py-5 px-6 text-secondary">{entry.college}</td>
                <td className="py-5 px-6 text-right text-primary font-bold">{entry.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
