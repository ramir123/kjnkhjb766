import { Order } from '../../types/order';
import { ExcelRow } from './types';

export function orderToExcelRow(order: Order): ExcelRow {
  return {
    'IGN': order.ign,
    'Customer Name': order.customerName,
    'Payment Method': order.paymentMethod,
    'Status': order.status,
    'Payment Status': order.paymentStatus,
    'Source': order.source,
    'Fish Size': order.fishSize,
    'RP Total': order.rpTotal,
    'DZD Amount': order.dzdAmount,
    'Skins/Pass': order.skinsPass,
    'Notes': order.notes,
  };
}

export function excelRowToOrder(row: ExcelRow): Omit<Order, 'id' | 'createdAt' | 'timeRemaining'> {
  return {
    ign: row['IGN'],
    customerName: row['Customer Name'],
    paymentMethod: row['Payment Method'] as Order['paymentMethod'],
    status: row['Status'] as Order['status'],
    paymentStatus: row['Payment Status'] as Order['paymentStatus'],
    source: row['Source'] as Order['source'],
    fishSize: row['Fish Size'] as Order['fishSize'],
    rpTotal: Number(row['RP Total']),
    dzdAmount: Number(row['DZD Amount']),
    skinsPass: row['Skins/Pass'],
    notes: row['Notes'],
  };
}