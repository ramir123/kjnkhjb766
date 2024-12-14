import { memo } from 'react';

interface TimeSelectProps {
  label: string;
  value: number;
  max: number;
  onChange: (value: number) => void;
}

export const TimeSelect = memo(function TimeSelect({ label, value, max, onChange }: TimeSelectProps) {
  return (
    <select
      className="bg-[#2a303c] border border-gray-700 rounded px-2 py-1 text-sm"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      aria-label={label}
    >
      {[...Array(max)].map((_, i) => (
        <option key={i} value={i}>
          {i} {label}
        </option>
      ))}
    </select>
  );
});