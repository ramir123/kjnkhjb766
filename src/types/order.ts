import { z } from 'zod';

export type OrderStatus = 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
export type PaymentMethod = 'CCP' | 'Baridimob' | 'flexi';
export type Source = 'Discord' | 'Instagram' | 'Facebook' | 'Other';
export type FishSize = 'crab +1000' | 'Fish +2000' | 'shark +10000';
export type PaymentStatus = 'Paid' | 'Not Paid';

export interface Order {
  id: string;
  ign: string;
  customerName: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  source: Source;
  fishSize: FishSize;
  rpTotal: number;
  dzdAmount: number;
  skinsPass: string;
  accountUsed: string;
  notes: string;
  createdAt: number;
  timeRemaining: number;
  completedAt?: number;
}