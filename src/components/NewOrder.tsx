import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { PAYMENT_METHODS, SOURCES, FISH_SIZES } from '../utils/constants';

export function NewOrder() {
  const addOrder = useStore((state) => state.addOrder);
  const [formData, setFormData] = useState({
    ign: '',
    customerName: '',
    paymentMethod: 'CCP',
    status: 'Pending',
    paymentStatus: 'Not Paid' as const,
    source: 'Discord',
    fishSize: 'crab +1000',
    rpTotal: 0,
    dzdAmount: 0,
    skinsPass: '',
    accountUsed: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOrder(formData);
    toast.success('Order created successfully! 🎉');
    setFormData({
      ign: '',
      customerName: '',
      paymentMethod: 'CCP',
      status: 'Pending',
      paymentStatus: 'Not Paid',
      source: 'Discord',
      fishSize: 'crab +1000',
      rpTotal: 0,
      dzdAmount: 0,
      skinsPass: '',
      accountUsed: '',
      notes: '',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      <div className="bg-[#1e2330] rounded-lg p-6 shadow-lg max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Package className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-medium text-white">New Order Form ✨</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="In-Game Name (IGN)"
              value={formData.ign}
              onChange={(e) => setFormData({ ...formData, ign: e.target.value })}
              placeholder="Enter IGN"
              required
            />
            <Input
              label="Customer Name"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder="Enter customer name"
              required
            />
          </div>

          {/* Status and Method */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Payment Method"
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
              options={PAYMENT_METHODS}
            />
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              options={[
                { value: 'Pending', label: 'Pending' },
                { value: 'Processing', label: 'Processing' },
                { value: 'Completed', label: 'Completed' },
                { value: 'Cancelled', label: 'Cancelled' },
              ]}
            />
            <Select
              label="Payment Status"
              value={formData.paymentStatus}
              onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as any })}
              options={[
                { value: 'Paid', label: 'Paid' },
                { value: 'Not Paid', label: 'Not Paid' },
              ]}
            />
          </div>

          {/* Source and Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Source"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
              options={SOURCES}
            />
            <Select
              label="Fish Size"
              value={formData.fishSize}
              onChange={(e) => setFormData({ ...formData, fishSize: e.target.value as any })}
              options={FISH_SIZES}
            />
          </div>

          {/* Payment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="RP Total"
              type="number"
              value={formData.rpTotal}
              onChange={(e) => setFormData({ ...formData, rpTotal: parseInt(e.target.value) || 0 })}
              placeholder="0"
              required
            />
            <Input
              label="DZD Amount"
              type="number"
              value={formData.dzdAmount}
              onChange={(e) => setFormData({ ...formData, dzdAmount: parseInt(e.target.value) || 0 })}
              placeholder="0"
              required
            />
          </div>

          {/* Account Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Skins/Pass"
              value={formData.skinsPass}
              onChange={(e) => setFormData({ ...formData, skinsPass: e.target.value })}
              placeholder="Enter skins or pass details"
            />
            <Input
              label="Account Used"
              value={formData.accountUsed}
              onChange={(e) => setFormData({ ...formData, accountUsed: e.target.value })}
              placeholder="Enter account details"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Enter any additional notes"
              className="w-full p-2 rounded bg-[#2a303c] border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors min-h-[100px]"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <span>Create Order</span> 🚀
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}