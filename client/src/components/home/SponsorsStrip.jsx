export default function SponsorsStrip() {
  const sponsors = [
    'TITLE SPONSOR',
    'GOLD PARTNER',
    'GOLD PARTNER',
    'SILVER PARTNER',
    'SILVER PARTNER',
    'TECHNICAL PARTNER',
    'MEDIA PARTNER',
  ];

  return (
    <section className="py-20 bg-void border-y border-[var(--border-subtle)] overflow-hidden">
      <div className="text-center mb-10">
        <div className="font-mono text-[10px] text-muted tracking-[5px] uppercase">Our Sponsors</div>
      </div>
      
      <div className="flex relative">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {sponsors.concat(sponsors).map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-center min-w-[200px] h-24 border border-[var(--border-subtle)] bg-surface/30 px-8"
            >
              <div className="text-center">
                <div className="font-display text-xl text-secondary opacity-50">{s}</div>
                <div className="font-mono text-[9px] text-muted uppercase mt-1">COMING SOON</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
