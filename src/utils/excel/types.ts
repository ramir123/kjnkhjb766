import { Order } from '../../types/order';

export interface ExcelRow {
  IGN: string;
  'Customer Name': string;
  'Payment Method': string;
  Status: string;
  'Payment Status': string;
  Source: string;
  'Fish Size': string;
  'RP Total': number;
  'DZD Amount': number;
  'Skins/Pass': string;
  Notes: string;
}

export interface ImportResult {
  success: boolean;
  orders?: Order[];
  error?: string;
}