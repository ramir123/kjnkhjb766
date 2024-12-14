import { memo, useState, useEffect } from 'react';
import { TimeSelect } from './TimeSelect';

interface TimeEditorProps {
  initialDays: number;
  initialHours: number;
  initialMinutes: number;
  onTimeChange: (days: number, hours: number, minutes: number) => void;
}

export const TimeEditor = memo(function TimeEditor({ 
  initialDays, 
  initialHours, 
  initialMinutes, 
  onTimeChange 
}: TimeEditorProps) {
  const [time, setTime] = useState({
    days: initialDays,
    hours: initialHours,
    minutes: initialMinutes
  });

  // Update local state when initial values change
  useEffect(() => {
    setTime({
      days: initialDays,
      hours: initialHours,
      minutes: initialMinutes
    });
  }, [initialDays, initialHours, initialMinutes]);

  const handleChange = (field: 'days' | 'hours' | 'minutes', value: number) => {
    const newTime = { ...time, [field]: value };
    setTime(newTime);
    onTimeChange(newTime.days, newTime.hours, newTime.minutes);
  };

  return (
    <div className="flex gap-2">
      <TimeSelect
        label="days"
        value={time.days}
        max={31}
        onChange={(value) => handleChange('days', value)}
      />
      <TimeSelect
        label="hours"
        value={time.hours}
        max={24}
        onChange={(value) => handleChange('hours', value)}
      />
      <TimeSelect
        label="minutes"
        value={time.minutes}
        max={60}
        onChange={(value) => handleChange('minutes', value)}
      />
    </div>
  );
});