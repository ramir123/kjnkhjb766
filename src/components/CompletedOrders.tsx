import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { OrderRow } from './OrderRow';
import { Card } from './ui/Card';

export function CompletedOrders() {
  const orders = useStore((state) => 
    state.orders.filter(order => order.status === 'Completed')
  );

  if (orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="p-6"
      >
        <Card>
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-400">No completed orders yet ✨</h3>
            <p className="text-gray-500 mt-2">Completed orders will appear here.</p>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-3 px-4">Customer</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 px-4">Payment Status</th>
                <th className="pb-3 px-4">Source</th>
                <th className="pb-3 px-4">RP Total</th>
                <th className="pb-3 px-4">DZD Amount</th>
                <th className="pb-3 px-4">Fish Size</th>
                <th className="pb-3 px-4">Completed At</th>
                <th className="pb-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}