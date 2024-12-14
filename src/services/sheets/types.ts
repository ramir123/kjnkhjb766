import { Order } from '../../types/order';

export interface SheetRow {
  values: (string | number)[];
}

export interface SheetsResponse {
  values: SheetRow[];
}

export interface SheetsSyncError {
  message: string;
  code: string;
}

export type SyncResult = {
  success: boolean;
  error?: SheetsSyncError;
  data?: Order[];
};