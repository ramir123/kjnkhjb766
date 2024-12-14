import { memo } from 'react';
import { formatDuration, intervalToDuration } from 'date-fns';

interface TimeDisplayProps {
  timeLeft: number;
}

export const TimeDisplay = memo(function TimeDisplay({ timeLeft }: TimeDisplayProps) {
  if (timeLeft <= 0) {
    return <span className="text-green-500">Completed</span>;
  }

  const duration = intervalToDuration({ 
    start: 0,
    end: timeLeft
  });

  const formattedDuration = formatDuration(duration, {
    format: ['days', 'hours', 'minutes'],
    zero: false,
  });

  return <span className="text-blue-500">{formattedDuration}</span>;
});