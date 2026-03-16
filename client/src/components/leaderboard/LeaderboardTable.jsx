import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { Trophy, AlertCircle } from 'lucide-react';

export default function LeaderboardTable({ selectedSlug }) {
  const { data: rankings = [], isLoading } = useQuery({
    queryKey: ['leaderboard', selectedSlug],
    queryFn: async () => {
      if (!selectedSlug) return [];
      const res = await api.get(`/leaderboard/${selectedSlug}`);
      return res.data.entries;
    },
    enabled: !!selectedSlug
  });

  if (!selectedSlug) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
        <Trophy size={80} strokeWidth={1} />
        <div className="font-mono text-sm uppercase tracking-[1em] mt-8">WAITING FOR INPUT...</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-12 bg-white/5" />
        <div className="h-[400px] bg-white/5" />
      </div>
    );
  }

  if (rankings.length === 0) {
    return (
       <div className="h-full flex flex-col items-center justify-center p-12 text-center">
         <div className="p-6 border border-fire/20 bg-fire/5 max-w-md">
            <AlertCircle size={32} className="text-fire mx-auto mb-4" />
            <h3 className="font-display text-2xl text-white uppercase mb-4">DATA UNAVAILABLE</h3>
            <p className="font-mono text-[11px] text-secondary leading-relaxed uppercase">
              RANKINGS FOR THIS MISSION HAVE NOT BEEN PUBLISHED BY COMMAND. 
              EXPECT UPDATES DURING LIVE EXECUTION PHASES.
            </p>
         </div>
       </div>
    );
  }

  return (
    <div className="animate-fade-in">
       {/* ACTIVE MISSION STATUS */}
       <div className="flex items-center justify-between mb-8 border-l-2 border-fire pl-4">
          <div>
            <div className="font-mono text-[9px] text-fire uppercase tracking-widest mb-1">MISSION SUBJECT</div>
            <div className="font-display text-4xl text-white uppercase">{rankings[0]?.event?.title}</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[9px] text-secondary uppercase tracking-widest mb-1">UNITS TRACKED</div>
            <div className="font-mono text-xl text-white font-bold">{rankings.length}</div>
          </div>
       </div>

       {/* TABLE */}
       <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/5 font-mono text-[10px] text-fire text-left uppercase tracking-widest">
                <th className="p-4 border-r border-white/5 w-20 text-center">RANK</th>
                <th className="p-4">IDENTIFIER / TEAM</th>
                <th className="p-4 hidden md:table-cell">COLLEGE_REF</th>
                <th className="p-4 text-right">SCORE_VAL</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((entry, index) => {
                const isTop = index < 3;
                return (
                  <tr key={entry._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 border-r border-white/5 text-center">
                       <span className={`font-display text-2xl ${isTop ? 'text-fire' : 'text-secondary'}`}>
                         {String(index + 1).padStart(2, '0')}
                       </span>
                    </td>
                    <td className="p-4">
                       <div className="font-ui font-bold text-white uppercase tracking-wider">
                         {entry.teamName || entry.leader?.name}
                       </div>
                       <div className="font-mono text-[9px] text-muted max-w-[240px] truncate uppercase mt-0.5">
                         {entry.members?.map(m => typeof m === 'string' ? m : m.name).join(', ')}
                       </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                       <div className="font-mono text-[10px] text-secondary uppercase tracking-wider">
                         {entry.college || 'EXTERNAL_UNIT'}
                       </div>
                    </td>
                    <td className="p-4 text-right">
                       <div className="font-mono text-xl text-fire font-bold group-hover:animate-pulse">
                         {String(entry.score).padStart(4, '0')}
                       </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
       </div>
    </div>
  );
}
