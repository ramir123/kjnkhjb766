import { useEffect, useState } from 'react';
import { formatDuration, intervalToDuration } from 'date-fns';

interface TimeRemainingProps {
  endTime: number;
  onComplete?: () => void;
  isEditing?: boolean;
  onTimeChange?: (newTime: number) => void;
}

export function TimeRemaining({ endTime, onComplete, isEditing, onTimeChange }: TimeRemainingProps) {
  const [timeLeft, setTimeLeft] = useState(endTime - Date.now());

  useEffect(() => {
    setTimeLeft(endTime - Date.now());
    
    if (isEditing) return;

    const timer = setInterval(() => {
      const newTimeLeft = endTime - Date.now();
      if (newTimeLeft <= 0) {
        clearInterval(timer);
        onComplete?.();
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onComplete, isEditing]);

  if (isEditing) {
    const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));

    const handleTimeChange = (newDays: number, newHours: number, newMinutes: number) => {
      const now = Date.now();
      const newEndTime = now + 
        (newDays * 24 * 60 * 60 * 1000) + 
        (newHours * 60 * 60 * 1000) + 
        (newMinutes * 60 * 1000);
      const newTimeLeft = newEndTime - now;
      
      setTimeLeft(newTimeLeft);
      onTimeChange?.(newTimeLeft);
    };

    return (
      <div className="flex gap-2">
        <select
          className="bg-[#2a303c] border border-gray-700 rounded px-2 py-1 text-sm"
          value={days}
          onChange={(e) => handleTimeChange(parseInt(e.target.value), hours, minutes)}
        >
          {[...Array(31)].map((_, i) => (
            <option key={i} value={i}>
              {i} days
            </option>
          ))}
        </select>
        <select
          className="bg-[#2a303c] border border-gray-700 rounded px-2 py-1 text-sm"
          value={hours}
          onChange={(e) => handleTimeChange(days, parseInt(e.target.value), minutes)}
        >
          {[...Array(24)].map((_, i) => (
            <option key={i} value={i}>
              {i} hours
            </option>
          ))}
        </select>
        <select
          className="bg-[#2a303c] border border-gray-700 rounded px-2 py-1 text-sm"
          value={minutes}
          onChange={(e) => handleTimeChange(days, hours, parseInt(e.target.value))}
        >
          {[...Array(60)].map((_, i) => (
            <option key={i} value={i}>
              {i} minutes
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (timeLeft <= 0) {
    return <span className="text-green-500">Completed</span>;
  }

  const duration = intervalToDuration({ start: Date.now(), end: Date.now() + timeLeft });
  const formattedDuration = formatDuration(duration, {
    format: ['days', 'hours', 'minutes'],
    zero: false,
  });

  return <span className="text-blue-500">{formattedDuration}</span>;
}