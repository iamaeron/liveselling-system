interface NumberFormatterProps {
  value: number;
  locale?: string;
}

export const NumberFormatter: React.FC<NumberFormatterProps> = ({
  value,
  locale = "en-US",
}) => {
  const formattedValue = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);

  return <span>{formattedValue}</span>;
};
