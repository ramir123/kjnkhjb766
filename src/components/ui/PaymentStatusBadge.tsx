import { PaymentStatus } from '../../types/order';

const statusColors: Record<PaymentStatus, string> = {
  'Paid': 'bg-green-500',
  'Not Paid': 'bg-red-500',
};

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
    >
      {status}
    </span>
  );
}