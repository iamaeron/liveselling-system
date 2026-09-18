import * as React from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { cn } from "cn";

interface MenuProps extends BaseMenu.Root.Props {}

function Menu(props: MenuProps) {
  return <BaseMenu.Root {...props} />;
}

interface SubMenuProps extends BaseMenu.SubmenuRoot.Props {}

function SubMenu(props: SubMenuProps) {
  return <BaseMenu.SubmenuRoot {...props} />;
}

interface MenuTriggerProps extends BaseMenu.Trigger.Props {}

function MenuTrigger({ className, ...props }: MenuTriggerProps) {
  return <BaseMenu.Trigger className={cn(className)} {...props} />;
}

interface MenuPortalProps extends BaseMenu.Portal.Props {}

function MenuPortal(props: MenuPortalProps) {
  return <BaseMenu.Portal {...props} />;
}

interface MenuPositionerProps extends BaseMenu.Positioner.Props {}

function MenuPositioner({ className, ...props }: MenuPositionerProps) {
  return <BaseMenu.Positioner className={cn(className)} {...props} />;
}

interface MenuPopupProps extends BaseMenu.Popup.Props {}

function MenuPopup({ className, ...props }: MenuPopupProps) {
  return (
    <BaseMenu.Popup
      className={cn(
        "bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_0_0_rgba(0,0,0,0.07),0_6px_10px_0_rgba(0,0,0,0.05)] p-1 relative",
        "origin-(--transform-origin) transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

interface MenuItemProps extends BaseMenu.Item.Props {}

function MenuItem({ className, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item
      className={cn(
        "text-sm text-foreground flex items-center font-medium px-3 py-1 hover:bg-zinc-100 rounded-md cursor-default gap-2 data-disabled:opacity-50 data-disabled:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

interface MenuItemKeyProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  children?: any;
}

function MenuItemKey({ className, ...props }: MenuItemKeyProps) {
  return (
    <div
      className={cn(
        "text-sm flex items-center [&_svg:not([class*='size-'])]:size-4 gap-1 text-muted-foreground flex-1 justify-end ml-10",
        className,
      )}
      {...props}
    />
  );
}

interface MenuCheckboxItemProps extends BaseMenu.CheckboxItem.Props {}

function MenuCheckboxItem({ className, ...props }: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem
      className={cn(
        "text-sm text-foreground flex items-center font-medium px-3 py-1 hover:bg-zinc-100 rounded-md cursor-default data-disabled:opacity-50 data-disabled:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

interface MenuCheckboxItemIndicatorProps
  extends BaseMenu.CheckboxItemIndicator.Props {}

function MenuCheckboxItemIndicator({
  className,
  ...props
}: MenuCheckboxItemIndicatorProps) {
  return (
    <BaseMenu.CheckboxItemIndicator
      className={cn("flex items-center justify-center size-4 mr-2", className)}
      {...props}
    />
  );
}

interface MenuRadioGroupProps extends BaseMenu.RadioGroup.Props {}

function MenuRadioGroup({ className, ...props }: MenuRadioGroupProps) {
  return <BaseMenu.RadioGroup className={cn(className)} {...props} />;
}

interface MenuRadioItemProps extends BaseMenu.RadioItem.Props {}

function MenuRadioItem({ className, ...props }: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem
      className={cn(
        "text-sm text-foreground flex items-center font-medium px-3 py-1 hover:bg-zinc-100 rounded-md cursor-default data-disabled:opacity-50 data-disabled:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

interface MenuRadioItemIndicatorProps
  extends BaseMenu.RadioItemIndicator.Props {}

function MenuRadioItemIndicator({
  className,
  ...props
}: MenuRadioItemIndicatorProps) {
  return (
    <BaseMenu.RadioItemIndicator
      className={cn("flex items-center justify-center size-4 mr-2", className)}
      {...props}
    />
  );
}

interface MenuSubmenuTriggerProps extends BaseMenu.SubmenuTrigger.Props {
  icon?: React.ReactNode;
}

function MenuSubmenuTrigger({
  className,
  children,
  icon = <ChevronRightIcon className="size-4 ml-auto text-muted-foreground" />,
  ...props
}: MenuSubmenuTriggerProps) {
  return (
    <BaseMenu.SubmenuTrigger
      className={cn(
        "text-sm text-foreground flex items-center justify-between font-medium px-3 py-1 hover:bg-zinc-100 rounded-md cursor-default data-disabled:opacity-50 data-disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      {children}
      {icon}
    </BaseMenu.SubmenuTrigger>
  );
}

interface MenuSeparatorProps extends BaseMenu.Separator.Props {}

function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return (
    <BaseMenu.Separator
      className={cn("w-full border-t my-1 border-border", className)}
      {...props}
    />
  );
}

interface MenuGroupProps extends BaseMenu.Group.Props {}

function MenuGroup({ className, ...props }: MenuGroupProps) {
  return <BaseMenu.Group className={cn(className)} {...props} />;
}

interface MenuGroupLabelProps extends BaseMenu.GroupLabel.Props {}

function MenuGroupLabel({ className, ...props }: MenuGroupLabelProps) {
  return <BaseMenu.GroupLabel className={cn(className)} {...props} />;
}

interface MenuArrowProps extends BaseMenu.Arrow.Props {}

function MenuArrow({ className, ...props }: MenuArrowProps) {
  return <BaseMenu.Arrow className={cn(className)} {...props} />;
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 6l6 6l-6 6" />
    </svg>
  );
}

export {
  Menu,
  SubMenu,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuItem,
  MenuItemKey,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuSubmenuTrigger,
  MenuSeparator,
  MenuGroup,
  MenuGroupLabel,
  MenuArrow,
};

export type {
  MenuProps,
  SubMenuProps,
  MenuTriggerProps,
  MenuPortalProps,
  MenuPositionerProps,
  MenuPopupProps,
  MenuItemProps,
  MenuItemKeyProps,
  MenuCheckboxItemProps,
  MenuCheckboxItemIndicatorProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuRadioItemIndicatorProps,
  MenuSubmenuTriggerProps,
  MenuSeparatorProps,
  MenuGroupProps,
  MenuGroupLabelProps,
  MenuArrowProps,
};
