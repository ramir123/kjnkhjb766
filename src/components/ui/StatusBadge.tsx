import { OrderStatus } from '../../types/order';

const statusColors: Record<OrderStatus, string> = {
  Pending: 'bg-yellow-500',
  Processing: 'bg-blue-500',
  Completed: 'bg-green-500',
  Cancelled: 'bg-red-500',
};

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
    >
      {status}
    </span>
  );
}