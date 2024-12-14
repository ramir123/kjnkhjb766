import { Order } from '../../types/order';
import type { SheetRow } from './types';

export function orderToSheetRow(order: Order): SheetRow {
  return {
    values: [
      order.ign,
      order.customerName,
      order.paymentMethod,
      order.status,
      order.paymentStatus,
      order.source,
      order.fishSize,
      order.rpTotal,
      order.dzdAmount,
      order.skinsPass,
      order.notes,
    ],
  };
}

export function sheetRowToOrder(row: SheetRow): Partial<Order> {
  const [
    ign,
    customerName,
    paymentMethod,
    status,
    paymentStatus,
    source,
    fishSize,
    rpTotal,
    dzdAmount,
    skinsPass,
    notes,
  ] = row.values;

  return {
    ign: String(ign),
    customerName: String(customerName),
    paymentMethod: String(paymentMethod) as Order['paymentMethod'],
    status: String(status) as Order['status'],
    paymentStatus: String(paymentStatus) as Order['paymentStatus'],
    source: String(source) as Order['source'],
    fishSize: String(fishSize) as Order['fishSize'],
    rpTotal: Number(rpTotal),
    dzdAmount: Number(dzdAmount),
    skinsPass: String(skinsPass),
    notes: String(notes),
  };
}