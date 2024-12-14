import { PaymentMethod, Source, FishSize } from '../types/order';

export const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: 'CCP', label: 'CCP' },
  { value: 'Baridimob', label: 'Baridimob' },
  { value: 'flexi', label: 'Flexi' },
];

export const SOURCES: { value: Source; label: string }[] = [
  { value: 'Discord', label: 'Discord' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Other', label: 'Other' },
];

export const FISH_SIZES: { value: FishSize; label: string }[] = [
  { value: 'crab +1000', label: 'Crab (+1000)' },
  { value: 'Fish +2000', label: 'Fish (+2000)' },
  { value: 'shark +10000', label: 'Shark (+10000)' },
];