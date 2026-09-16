import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cn } from "cn";

interface CheckboxProps extends BaseCheckbox.Root.Props {}

function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-[3px] active:translate-y-0.5 p-0 transition-all shadow-[0_0_0_1px,0_1px_0_0,0_1px_3px_0] shadow-black/10 bg-white text-white data-checked:bg-primary data-checked:shadow-primary data-checked:text-white dark:data-checked:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:focus-visible:outline-white",
        className,
      )}
      {...props}
    />
  );
}

interface CheckboxIndicatorProps extends BaseCheckbox.Indicator.Props {}

function CheckboxIndicator({
  className,
  children,
  ...props
}: CheckboxIndicatorProps) {
  return (
    <BaseCheckbox.Indicator
      className={cn(
        "flex items-center justify-center text-white data-unchecked:hidden",
        className,
      )}
      {...props}
    >
      {children ?? <CheckIcon className="size-4" />}
    </BaseCheckbox.Indicator>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l5 5l10 -10" />
    </svg>
  );
}

export { Checkbox, CheckboxIndicator, CheckIcon };
