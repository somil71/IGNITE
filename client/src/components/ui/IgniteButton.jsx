import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function IgniteButton({
  children,
  variant = 'default', // 'default' | 'primary' | 'cyan' | 'ghost'
  size = 'md',
  to,
  href,
  loading = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) {
  const sizeClasses = {
    sm: 'py-2 px-4 text-[11px]',
    md: 'py-3 px-7 text-[12px]',
    lg: 'py-4 px-10 text-[13px]',
  };

  const variantClass = variant === 'primary' ? 'ignite-btn ignite-btn-primary'
    : variant === 'cyan' ? 'ignite-btn ignite-btn-cyan'
    : variant === 'ghost' ? 'ignite-btn border-[var(--border-subtle)] text-secondary hover:text-primary'
    : 'ignite-btn';

  const classes = `${variantClass} ${sizeClasses[size]} tracking-[2px] uppercase font-600 ${
    disabled || loading ? 'opacity-50 pointer-events-none' : ''
  } ${className}`;

  const content = loading ? (
    <span className="flex items-center gap-2">
      <Loader2 size={14} className="animate-spin" />
      <span>Loading...</span>
    </span>
  ) : (
    <span>{children}</span>
  );

  if (to) return <Link to={to} className={classes} {...props}>{content}</Link>;
  if (href) return <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>{content}</a>;
  return <button onClick={onClick} disabled={disabled || loading} className={classes} {...props}>{content}</button>;
}
