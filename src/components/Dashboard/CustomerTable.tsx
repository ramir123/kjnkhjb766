import { useStore } from '../../store/useStore';
import { getTopCustomers } from '../../utils/analytics';
import { formatCurrency } from '../../utils/formatters';

export function CustomerTable() {
  const orders = useStore((state) => state.orders);
  const topCustomers = getTopCustomers(orders);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="pb-3">Customer</th>
            <th className="pb-3">Orders</th>
            <th className="pb-3">Total Spent</th>
            <th className="pb-3">Fish Size</th>
          </tr>
        </thead>
        <tbody>
          {topCustomers.map((customer) => (
            <tr key={customer.ign} className="border-b border-gray-700">
              <td className="py-3">
                <div>
                  <div className="font-medium">{customer.ign}</div>
                  <div className="text-sm text-gray-400">{customer.customerName}</div>
                </div>
              </td>
              <td className="py-3">{customer.orderCount}</td>
              <td className="py-3">{formatCurrency(customer.totalSpent)}</td>
              <td className="py-3">
                <span className={customer.fishSize === 'shark +10000' ? 'text-blue-500' : ''}>
                  {customer.fishSize}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}