import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { fetchOrders, appendOrder } from '../services/sheets/api';
import toast from 'react-hot-toast';

export function useSheetSync() {
  const { orders, setOrders, addOrder: storeAddOrder } = useStore();

  // Initial sync with Google Sheets
  useEffect(() => {
    async function syncOrders() {
      const result = await fetchOrders();
      if (result.success && result.data) {
        setOrders(result.data);
        toast.success('Orders synced with Google Sheets');
      } else {
        toast.error('Failed to sync orders with Google Sheets');
      }
    }

    syncOrders();
  }, [setOrders]);

  // Wrap addOrder to sync with Google Sheets
  const addOrder = async (orderData: Parameters<typeof storeAddOrder>[0]) => {
    const order = {
      ...orderData,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      timeRemaining: 7 * 24 * 60 * 60 * 1000,
    };

    // Add to local store first
    storeAddOrder(orderData);

    // Sync with Google Sheets
    const result = await appendOrder(order);
    if (!result.success) {
      toast.error('Failed to sync order with Google Sheets');
    }
  };

  return { orders, addOrder };
}