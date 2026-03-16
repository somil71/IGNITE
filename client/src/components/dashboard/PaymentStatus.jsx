import { ShieldCheck, Clock, CircleX, CircleCheck } from 'lucide-react';

export default function PaymentStatus({ status, payment }) {
  const getStatusConfig = () => {
    if (status === 'confirmed') return {
      label: 'VERIFIED / CONFIRMED',
      color: 'text-green',
      icon: <CircleCheck size={12} />,
      bg: 'bg-green/10'
    };
    if (status === 'rejected') return {
      label: 'REJECTED / RE-UPLOAD NEEDED',
      color: 'text-fire',
      icon: <CircleX size={12} />,
      bg: 'bg-fire/10'
    };
    if (!payment || !payment.paymentProof) return {
      label: 'FREE EVENT / NO PAYMENT',
      color: 'text-cyan',
      icon: <CircleCheck size={12} />,
      bg: 'bg-cyan/10'
    };
    return {
      label: 'PENDING VERIFICATION',
      color: 'text-ember',
      icon: <Clock size={12} />,
      bg: 'bg-ember/10'
    };
  };

  const config = getStatusConfig();

  return (
    <div className={`px-4 py-2 border border-current ${config.color} ${config.bg} flex items-center gap-2 font-mono text-[9px] tracking-[1.5px] uppercase font-bold`}>
      {config.icon}
      {config.label}
    </div>
  );
}
