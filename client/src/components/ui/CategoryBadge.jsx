export default function CategoryBadge({ category, size = 'sm' }) {
  const cls = category === 'Technical' ? 'badge-technical'
    : category === 'Creative & Innovation' ? 'badge-creative'
    : 'badge-fun';

  const sizeClass = size === 'sm'
    ? 'text-[9px] px-2.5 py-1 tracking-[2px]'
    : 'text-[11px] px-3 py-1.5 tracking-[2px]';

  const short = category === 'Creative & Innovation' ? 'CREATIVE'
    : category.toUpperCase();

  return (
    <span className={`${cls} ${sizeClass} font-mono font-500 uppercase rounded-none`}>
      {short}
    </span>
  );
}
