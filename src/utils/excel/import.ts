import * as XLSX from 'xlsx';
import { z } from 'zod';
import { Order } from '../../types/order';
import { ExcelRow, ImportResult } from './types';
import { excelRowToOrder } from './mapper';

const excelRowSchema = z.object({
  'IGN': z.string().min(1),
  'Customer Name': z.string().min(1),
  'Payment Method': z.enum(['CCP', 'Baridimob', 'flexi']),
  'Status': z.enum(['Pending', 'Processing', 'Completed', 'Cancelled']),
  'Payment Status': z.enum(['Paid', 'Not Paid']),
  'Source': z.enum(['Discord', 'Instagram', 'Facebook', 'Other']),
  'Fish Size': z.enum(['crab +1000', 'Fish +2000', 'shark +10000']),
  'RP Total': z.number().min(0),
  'DZD Amount': z.number().min(0),
  'Skins/Pass': z.string(),
  'Notes': z.string(),
});

export async function importOrdersFromExcel(file: File): Promise<ImportResult> {
  try {
    // Read the Excel file
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(worksheet) as ExcelRow[];

    // Validate each row
    const validatedRows: ExcelRow[] = [];
    for (const row of rows) {
      try {
        const validatedRow = excelRowSchema.parse(row);
        validatedRows.push(validatedRow);
      } catch (error) {
        return {
          success: false,
          error: `Invalid row data: ${(error as Error).message}`,
        };
      }
    }

    // Convert to orders
    const orders: Order[] = validatedRows.map((row) => ({
      ...excelRowToOrder(row),
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      timeRemaining: 7 * 24 * 60 * 60 * 1000, // 7 days
    }));

    return {
      success: true,
      orders,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to parse Excel file',
    };
  }
}