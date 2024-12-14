import { useEffect, useState, useCallback } from 'react';
import { TimeEditor } from './TimeEditor';
import { TimeDisplay } from './TimeDisplay';

interface TimeRemainingProps {
  endTime: number;
  onComplete?: () => void;
  isEditing?: boolean;
  onTimeChange?: (newTime: number) => void;
}

export function TimeRemaining({ 
  endTime, 
  onComplete, 
  isEditing, 
  onTimeChange 
}: TimeRemainingProps) {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, endTime - Date.now()));

  useEffect(() => {
    if (!isEditing) {
      const updateTime = () => {
        const newTimeLeft = Math.max(0, endTime - Date.now());
        setTimeLeft(newTimeLeft);
        
        if (newTimeLeft <= 0) {
          onComplete?.();
        }
      };

      updateTime();
      const timer = setInterval(updateTime, 1000);
      return () => clearInterval(timer);
    }
  }, [endTime, onComplete, isEditing]);

  const handleTimeChange = useCallback((days: number, hours: number, minutes: number) => {
    const totalMilliseconds = 
      (days * 24 * 60 * 60 * 1000) + 
      (hours * 60 * 60 * 1000) + 
      (minutes * 60 * 1000);
    
    onTimeChange?.(totalMilliseconds);
  }, [onTimeChange]);

  if (isEditing) {
    const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));

    return (
      <TimeEditor
        initialDays={days}
        initialHours={hours}
        initialMinutes={minutes}
        onTimeChange={handleTimeChange}
      />
    );
  }

  return <TimeDisplay timeLeft={timeLeft} />;
}