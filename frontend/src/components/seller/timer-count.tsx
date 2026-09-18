import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  expiresAt: string | Date | number;
  onExpire?: () => void;
}

/**
 * Parses target date and returns formatted string like "7h 5m" or "Expired"
 */
function formatTimeRemaining(targetDate: Date): {
  text: string;
  isExpired: boolean;
} {
  const now = new Date().getTime();
  const diffMs = targetDate.getTime() - now;

  if (diffMs <= 0) {
    return { text: "Expired", isExpired: true };
  }

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return { text: `${hours}h ${minutes}m`, isExpired: false };
  }

  return { text: `${minutes}m`, isExpired: false };
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  expiresAt,
  onExpire,
}) => {
  const targetDate = new Date(expiresAt);
  const [{ text, isExpired }, setTimeState] = useState(() =>
    formatTimeRemaining(targetDate),
  );

  console.log(expiresAt);

  useEffect(() => {
    // Initial check
    const currentStatus = formatTimeRemaining(targetDate);
    setTimeState(currentStatus);

    if (currentStatus.isExpired) {
      onExpire?.();
      return;
    }

    // Update every minute (60,000 ms)
    const interval = setInterval(() => {
      const updated = formatTimeRemaining(targetDate);
      setTimeState(updated);

      if (updated.isExpired) {
        onExpire?.();
        clearInterval(interval);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <span
      className={`inline-flex items-center rounded text-sm font-medium ${
        isExpired
          ? "text-red-800 dark:bg-red-900/30 dark:text-red-400"
          : "text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
      }`}
    >
      {text}
    </span>
  );
};
