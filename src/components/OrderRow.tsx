import { useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import { Order, PaymentStatus } from '../types/order';
import { StatusBadge } from './ui/StatusBadge';
import { PaymentStatusBadge } from './ui/PaymentStatusBadge';
import { TimeRemaining } from './ui/TimeRemaining';
import { Select } from './ui/Select';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useStore } from '../store/useStore';
import { PAYMENT_METHODS, SOURCES, FISH_SIZES } from '../utils/constants';
import { formatNumber, formatCurrency } from '../utils/formatters';

interface OrderRowProps {
  order: Order;
}

export function OrderRow({ order }: OrderRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState(order);
  const updateOrder = useStore((state) => state.updateOrder);

  const handleSave = () => {
    updateOrder(editedOrder);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedOrder(order);
    setIsEditing(false);
  };

  const handleTimeChange = (newTimeRemaining: number) => {
    setEditedOrder({
      ...editedOrder,
      timeRemaining: newTimeRemaining,
    });
  };

  return (
    <tr className="border-b border-gray-700 hover:bg-[#2a303c] transition-colors">
      <td className="py-4 px-4">
        <div>
          <div className="font-medium">{order.ign}</div>
          <div className="text-sm text-gray-400">{order.customerName}</div>
        </div>
      </td>
      <td className="py-4 px-4">
        {isEditing ? (
          <Select
            value={editedOrder.status}
            onChange={(e) => setEditedOrder({ ...editedOrder, status: e.target.value as any })}
            options={[
              { value: 'Pending', label: 'Pending' },
              { value: 'Processing', label: 'Processing' },
              { value: 'Completed', label: 'Completed' },
              { value: 'Cancelled', label: 'Cancelled' },
            ]}
          />
        ) : (
          <StatusBadge status={order.status} />
        )}
      </td>
      <td className="py-4 px-4">
        {isEditing ? (
          <Select
            value={editedOrder.paymentStatus}
            onChange={(e) => setEditedOrder({ ...editedOrder, paymentStatus: e.target.value as PaymentStatus })}
            options={[
              { value: 'Paid', label: 'Paid' },
              { value: 'Not Paid', label: 'Not Paid' },
            ]}
          />
        ) : (
          <PaymentStatusBadge status={order.paymentStatus} />
        )}
      </td>
      <td className="py-4 px-4">
        {isEditing ? (
          <Select
            value={editedOrder.source}
            onChange={(e) => setEditedOrder({ ...editedOrder, source: e.target.value as any })}
            options={SOURCES}
          />
        ) : (
          order.source
        )}
      </td>
      <td className="py-4 px-4">
        {isEditing ? (
          <Input
            type="number"
            value={editedOrder.rpTotal}
            onChange={(e) => setEditedOrder({ ...editedOrder, rpTotal: parseInt(e.target.value) || 0 })}
            className="w-24"
          />
        ) : (
          formatNumber(order.rpTotal)
        )}
      </td>
      <td className="py-4 px-4">
        {isEditing ? (
          <Input
            type="number"
            value={editedOrder.dzdAmount}
            onChange={(e) => setEditedOrder({ ...editedOrder, dzdAmount: parseInt(e.target.value) || 0 })}
            className="w-24"
          />
        ) : (
          formatCurrency(order.dzdAmount)
        )}
      </td>
      <td className="py-4 px-4">
        {isEditing ? (
          <Select
            value={editedOrder.fishSize}
            onChange={(e) => setEditedOrder({ ...editedOrder, fishSize: e.target.value as any })}
            options={FISH_SIZES}
          />
        ) : (
          order.fishSize
        )}
      </td>
      <td className="py-4 px-4">
        <TimeRemaining
          endTime={order.createdAt + order.timeRemaining}
          onComplete={() => updateOrder({ ...order, status: 'Completed' })}
          isEditing={isEditing}
          onTimeChange={handleTimeChange}
        />
      </td>
      <td className="py-4 px-4">
        {isEditing ? (
          <div className="flex gap-2">
            <Button onClick={handleSave}>
              <Save className="w-4 h-4" />
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            <Edit2 className="w-4 h-4" />
          </Button>
        )}
      </td>
    </tr>
  );
}