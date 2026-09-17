import { Button as BaseButton } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const button = cva(
  "inline-flex select-none items-center border border-transparent justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all disabled:pointer-events-none active:translate-y-0.5 will-change-transform disabled:opacity-70 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4.5 [&_svg:not([class*='text-'])]:opacity-90 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative",
  {
    variants: {
      variant: {
        primary:
          "bg-primary dark:border-transparent border-pink-600 shadow-[inset_0_-1px_0_0_var(--color-pink-400),inset_0_2px_0_0_var(--color-pink-400),0_3px_12px_0_var(--color-pink-200)]! text-primary-foreground hover:opacity-90",
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
        default: "px-3.5 py-1.5 has-[>svg]:pl-3",
        sm: "rounded-full gap-1.5 px-3 py-0.75 has-[>svg]:pl-2.5",
        lg: "text-base gap-3 px-7 py-2.5 rounded-full has-[>svg]:pl-4",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

function ButtonSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4.5 animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-30"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7V2Z"
      />
    </svg>
  );
}

export interface ButtonProps
  extends BaseButton.Props, VariantProps<typeof button> {
  loading?: boolean;
}

export function Button({
  children,
  variant,
  size,
  className,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      {...props}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(button({ size, variant, className }))}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <ButtonSpinner />
        </span>
      )}
      <span
        className={cn(
          "inline-flex items-center justify-center gap-2",
          loading && "invisible",
        )}
      >
        {children}
      </span>
    </BaseButton>
  );
}
