import { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { exportOrdersToExcel } from '../utils/excel/export';
import { importOrdersFromExcel } from '../utils/excel/import';
import { Button } from './ui/Button';
import toast from 'react-hot-toast';

export function ExcelActions() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { orders, setOrders } = useStore();

  const handleExport = () => {
    try {
      exportOrdersToExcel(orders);
      toast.success('Orders exported successfully! 📊');
    } catch (error) {
      toast.error('Failed to export orders');
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await importOrdersFromExcel(file);
    if (result.success && result.orders) {
      setOrders(result.orders);
      toast.success('Orders imported successfully! 📥');
    } else {
      toast.error(result.error || 'Failed to import orders');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleExport} className="flex items-center gap-2">
        <Download className="w-4 h-4" />
        Export Excel
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleImport}
        className="hidden"
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="secondary"
        className="flex items-center gap-2"
      >
        <Upload className="w-4 h-4" />
        Import Excel
      </Button>
    </div>
  );
}