import { Order } from '../types/order';
import { format } from 'date-fns';

export function groupOrdersByMonth(orders: Order[]) {
  const monthlyData: Record<string, number> = {};

  orders.forEach((order) => {
    const month = format(order.createdAt, 'MMM yyyy');
    monthlyData[month] = (monthlyData[month] || 0) + order.dzdAmount;
  });

  return Object.entries(monthlyData).map(([month, revenue]) => ({
    month,
    revenue,
  }));
}

export function getTopCustomers(orders: Order[]) {
  const customerMap = new Map<string, {
    ign: string;
    customerName: string;
    orderCount: number;
    totalSpent: number;
    fishSize: string;
  }>();

  orders.forEach((order) => {
    const existing = customerMap.get(order.ign) || {
      ign: order.ign,
      customerName: order.customerName,
      orderCount: 0,
      totalSpent: 0,
      fishSize: order.fishSize,
    };

    customerMap.set(order.ign, {
      ...existing,
      orderCount: existing.orderCount + 1,
      totalSpent: existing.totalSpent + order.dzdAmount,
      fishSize: order.fishSize === 'shark +10000' ? 'shark +10000' : existing.fishSize,
    });
  });

  return Array.from(customerMap.values())
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 10);
}

export function getMonthlyStats(orders: Order[]) {
  const currentMonth = new Date().getMonth();
  const currentMonthOrders = orders.filter(
    (order) => new Date(order.createdAt).getMonth() === currentMonth
  );

  const totalRevenue = currentMonthOrders.reduce((sum, order) => sum + order.dzdAmount, 0);
  const totalOrders = currentMonthOrders.length;
  const uniqueCustomers = new Set(currentMonthOrders.map((order) => order.ign));
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return {
    totalRevenue,
    totalOrders,
    activeCustomers: uniqueCustomers.size,
    averageOrderValue,
  };
}