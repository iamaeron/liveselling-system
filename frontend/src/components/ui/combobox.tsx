import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { cn } from "cn";

interface ComboboxProps<
  Value = any,
  Multiple extends boolean | undefined = false,
> extends BaseCombobox.Root.Props<Value, Multiple> {}

function Combobox<Value = any, Multiple extends boolean | undefined = false>(
  props: ComboboxProps<Value, Multiple>,
) {
  return <BaseCombobox.Root {...props} />;
}

interface ComboboxLabelProps extends BaseCombobox.Label.Props {}

function ComboboxLabel({ className, ...props }: ComboboxLabelProps) {
  return (
    <BaseCombobox.Label
      className={cn("text-sm font-medium pl-2 mb-1", className)}
      {...props}
    />
  );
}

interface ComboboxInputGroupProps extends BaseCombobox.InputGroup.Props {}

function ComboboxInputGroup({ className, ...props }: ComboboxInputGroupProps) {
  return (
    <BaseCombobox.InputGroup
      className={cn(
        "shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_0_0_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,1)] flex rounded-full transition-[color,box-shadow]",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-primary",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

interface ComboboxInputProps extends BaseCombobox.Input.Props {}

function ComboboxInput({ className, ...props }: ComboboxInputProps) {
  return (
    <BaseCombobox.Input
      className={cn(
        "placeholder:text-zinc-400 flex-1 px-3.5 py-1.5 transition-[color,box-shadow] outline-none text-sm font-medium text-zinc-600 focus:text-black",
        className,
      )}
      {...props}
    />
  );
}

interface ComboboxTriggerProps extends BaseCombobox.Trigger.Props {}

function ComboboxTrigger({ className, ...props }: ComboboxTriggerProps) {
  return <BaseCombobox.Trigger className={cn("px-3", className)} {...props} />;
}

interface ComboboxIconProps extends BaseCombobox.Icon.Props {}

function ComboboxIcon({ className, ...props }: ComboboxIconProps) {
  return <BaseCombobox.Icon className={cn(className)} {...props} />;
}

interface ComboboxClearProps extends BaseCombobox.Clear.Props {}

function ComboboxClear({ className, ...props }: ComboboxClearProps) {
  return <BaseCombobox.Clear className={cn(className)} {...props} />;
}

interface ComboboxValueProps extends BaseCombobox.Value.Props {}

function ComboboxValue(props: ComboboxValueProps) {
  return <BaseCombobox.Value {...props} />;
}

interface ComboboxChipsProps extends BaseCombobox.Chips.Props {}

function ComboboxChips({ className, ...props }: ComboboxChipsProps) {
  return <BaseCombobox.Chips className={cn(className)} {...props} />;
}

interface ComboboxChipProps extends BaseCombobox.Chip.Props {}

function ComboboxChip({ className, ...props }: ComboboxChipProps) {
  return <BaseCombobox.Chip className={cn(className)} {...props} />;
}

interface ComboboxChipRemoveProps extends BaseCombobox.ChipRemove.Props {}

function ComboboxChipRemove({ className, ...props }: ComboboxChipRemoveProps) {
  return <BaseCombobox.ChipRemove className={cn(className)} {...props} />;
}

interface ComboboxPortalProps extends BaseCombobox.Portal.Props {}

function ComboboxPortal(props: ComboboxPortalProps) {
  return <BaseCombobox.Portal {...props} />;
}

interface ComboboxBackdropProps extends BaseCombobox.Backdrop.Props {}

function ComboboxBackdrop({ className, ...props }: ComboboxBackdropProps) {
  return <BaseCombobox.Backdrop className={cn(className)} {...props} />;
}

interface ComboboxPositionerProps extends BaseCombobox.Positioner.Props {}

function ComboboxPositioner({ className, ...props }: ComboboxPositionerProps) {
  return <BaseCombobox.Positioner className={cn(className)} {...props} />;
}

interface ComboboxPopupProps extends BaseCombobox.Popup.Props {}

function ComboboxPopup({ className, ...props }: ComboboxPopupProps) {
  return (
    <BaseCombobox.Popup
      className={cn(
        "bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_0_0_rgba(0,0,0,0.07),0_6px_10px_0_rgba(0,0,0,0.05)] p-1 relative",
        "w-(--anchor-width)",
        "origin-(--transform-origin) transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

interface ComboboxArrowProps extends BaseCombobox.Arrow.Props {}

function ComboboxArrow({ className, ...props }: ComboboxArrowProps) {
  return <BaseCombobox.Arrow className={cn(className)} {...props} />;
}

interface ComboboxStatusProps extends BaseCombobox.Status.Props {}

function ComboboxStatus({ className, ...props }: ComboboxStatusProps) {
  return <BaseCombobox.Status className={cn(className)} {...props} />;
}

interface ComboboxEmptyProps extends BaseCombobox.Empty.Props {}

function ComboboxEmpty({ className, ...props }: ComboboxEmptyProps) {
  return (
    <BaseCombobox.Empty
      className={cn("text-zinc-600 text-center text-sm", className)}
      {...props}
    />
  );
}

interface ComboboxListProps extends BaseCombobox.List.Props {}

function ComboboxList({ className, ...props }: ComboboxListProps) {
  return <BaseCombobox.List className={cn(className)} {...props} />;
}

interface ComboboxRowProps extends BaseCombobox.Row.Props {}

function ComboboxRow({ className, ...props }: ComboboxRowProps) {
  return <BaseCombobox.Row className={cn(className)} {...props} />;
}

interface ComboboxItemProps extends BaseCombobox.Item.Props {}

function ComboboxItem({ className, ...props }: ComboboxItemProps) {
  return (
    <BaseCombobox.Item
      className={cn(
        "flex items-center cursor-default gap-2 data-highlighted:bg-zinc-100 text-foreground font-medium px-3 py-1 rounded-md text-sm",
        className,
      )}
      {...props}
    />
  );
}

interface ComboboxItemIndicatorProps extends BaseCombobox.ItemIndicator.Props {}

function ComboboxItemIndicator({
  className,
  ...props
}: ComboboxItemIndicatorProps) {
  return (
    <BaseCombobox.ItemIndicator
      className={cn("text-zinc-600", className)}
      {...props}
    />
  );
}

interface ComboboxSeparatorProps extends BaseCombobox.Separator.Props {}

function ComboboxSeparator({ className, ...props }: ComboboxSeparatorProps) {
  return <BaseCombobox.Separator className={cn(className)} {...props} />;
}

interface ComboboxGroupProps extends BaseCombobox.Group.Props {}

function ComboboxGroup({ className, ...props }: ComboboxGroupProps) {
  return <BaseCombobox.Group className={cn(className)} {...props} />;
}

interface ComboboxGroupLabelProps extends BaseCombobox.GroupLabel.Props {}

function ComboboxGroupLabel({ className, ...props }: ComboboxGroupLabelProps) {
  return <BaseCombobox.GroupLabel className={cn(className)} {...props} />;
}

interface ComboboxCollectionProps extends BaseCombobox.Collection.Props {}

function ComboboxCollection(props: ComboboxCollectionProps) {
  return <BaseCombobox.Collection {...props} />;
}

export {
  Combobox,
  ComboboxLabel,
  ComboboxInputGroup,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxIcon,
  ComboboxClear,
  ComboboxValue,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxPortal,
  ComboboxBackdrop,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxArrow,
  ComboboxStatus,
  ComboboxEmpty,
  ComboboxList,
  ComboboxRow,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxSeparator,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxCollection,
};
