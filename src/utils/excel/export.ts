import * as XLSX from 'xlsx';
import { Order } from '../../types/order';
import { orderToExcelRow } from './mapper';

export function exportOrdersToExcel(orders: Order[]): void {
  // Convert orders to Excel format
  const excelData = orders.map(orderToExcelRow);

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(excelData);

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Orders');

  // Generate Excel file
  XLSX.writeFile(wb, `orders_${new Date().toISOString().split('T')[0]}.xlsx`);
}