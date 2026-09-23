import { cn } from "cn";

interface NumberFormatterProps {
  value: number;
  locale?: string;
  className?: string;
}

export const NumberFormatter: React.FC<NumberFormatterProps> = ({
  value,
  locale = "en-US",
  className,
}) => {
  const formattedValue = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);

  return <span className={cn(className)}>{formattedValue}</span>;
};
