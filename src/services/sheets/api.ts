import { google } from 'googleapis';
import { SHEETS_CONFIG } from '../../config/sheets';
import type { SheetsResponse, SyncResult } from './types';
import { orderToSheetRow, sheetRowToOrder } from './mapper';
import { Order } from '../../types/order';

const sheets = google.sheets({ version: 'v4', auth: SHEETS_CONFIG.apiKey });

export async function fetchOrders(): Promise<SyncResult> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEETS_CONFIG.spreadsheetId,
      range: SHEETS_CONFIG.range,
    });

    const rows = response.data.values as SheetsResponse['values'];
    if (!rows || rows.length === 0) {
      return { success: true, data: [] };
    }

    // Skip header row
    const orders = rows.slice(1).map((row) => {
      const orderData = sheetRowToOrder({ values: row });
      return {
        ...orderData,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        timeRemaining: 7 * 24 * 60 * 60 * 1000, // 7 days
      } as Order;
    });

    return { success: true, data: orders };
  } catch (error) {
    console.error('Failed to fetch orders from Google Sheets:', error);
    return {
      success: false,
      error: {
        message: 'Failed to fetch orders',
        code: 'FETCH_ERROR',
      },
    };
  }
}

export async function appendOrder(order: Order): Promise<SyncResult> {
  try {
    const row = orderToSheetRow(order);
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEETS_CONFIG.spreadsheetId,
      range: SHEETS_CONFIG.range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [row.values],
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to append order to Google Sheets:', error);
    return {
      success: false,
      error: {
        message: 'Failed to append order',
        code: 'APPEND_ERROR',
      },
    };
  }
}