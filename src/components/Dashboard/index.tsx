import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { RevenueChart } from './RevenueChart';
import { StatCard } from './StatCard';
import { CustomerTable } from './CustomerTable';
import { ExcelActions } from '../ExcelActions';
import { DollarSign, Users, TrendingUp, Package } from 'lucide-react';
import { getMonthlyStats } from '../../utils/analytics';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export function Dashboard() {
  const [password, setPassword] = useState('');
  const loginDashboard = useStore((state) => state.loginDashboard);
  const isDashboardAuthenticated = useStore((state) => state.isDashboardAuthenticated);
  const orders = useStore((state) => state.orders);

  if (!isDashboardAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="p-6"
      >
        <Card className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Dashboard Access 🔒</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginDashboard(password);
            }}
          >
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter dashboard password"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 bg-blue-500 text-white p-3 rounded-md"
              type="submit"
            >
              Access Dashboard
            </motion.button>
          </form>
        </Card>
      </motion.div>
    );
  }

  const stats = getMonthlyStats(orders);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 space-y-6"
    >
      {/* Excel Actions */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Data Management 📊</h2>
          <ExcelActions />
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={<DollarSign className="w-6 h-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Orders"
          value={formatNumber(stats.totalOrders)}
          icon={<Package className="w-6 h-6" />}
        />
        <StatCard
          title="Active Customers"
          value={formatNumber(stats.activeCustomers)}
          icon={<Users className="w-6 h-6" />}
        />
        <StatCard
          title="Average Order Value"
          value={formatCurrency(stats.averageOrderValue)}
          icon={<TrendingUp className="w-6 h-6" />}
        />
      </div>

      {/* Revenue Chart */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Revenue Over Time 📈</h2>
        <RevenueChart />
      </Card>

      {/* Top Customers */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Top Customers 👑</h2>
        <CustomerTable />
      </Card>
    </motion.div>
  );
}