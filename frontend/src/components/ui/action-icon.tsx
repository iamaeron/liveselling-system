import { Button as BaseButton } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const button = cva(
  "inline-flex select-none items-center border border-transparent justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all disabled:pointer-events-none active:translate-y-0.5 will-change-transform disabled:opacity-70 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-primary dark:border-transparent border-blue-600 shadow-[inset_0_-1px_0_0_#2D72F5,inset_0_2px_0_0_#538FFF,0_3px_12px_0_#3078FF4D]! dark:shadow-[inset_0_2px_0_0_#538FFF]! text-primary-foreground hover:opacity-90",
        destructive:
          "bg-destructive border-rose-700 shadow-[inset_0_-1px_0_0_var(--color-rose-500),inset_0_2px_0_0_var(--color-rose-400),0_3px_12px_0_color-mix(in_srgb,var(--color-rose-500)_30%,transparent)]! text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "bg-background text-zinc-600 shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_1px_0_0_rgba(0,0,0,0.05),0_2px_4px_0_rgba(0,0,0,0.08)] hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost:
          "hover:bg-accent text-zinc-600 hover:text-accent-foreground dark:hover:bg-accent/50",
        flat: "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 shadow-[0_0_0_1px] shadow-zinc-100 hover:shadow-zinc-200 hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "p-1.5 [&_svg:not([class*='size-'])]:size-5",
        sm: "p-1 [&_svg:not([class*='size-'])]:size-4.5",
        lg: "text-base gap-3 p-2.5 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ActionIconProps
  extends BaseButton.Props, VariantProps<typeof button> {}

export function ActionIcon({
  children,
  variant,
  size,
  className,
  ...props
}: ActionIconProps) {
  return (
    <BaseButton {...props} className={cn(button({ size, variant, className }))}>
      {children}
    </BaseButton>
  );
}
