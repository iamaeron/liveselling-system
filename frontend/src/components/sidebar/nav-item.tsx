import type { Icon } from "@solar-icons/react/lib/types";
import { NavLink } from "react-router";

interface NavItemProps {
  item: {
    label: string;
    icon: Icon;
    activeIcon: Icon;
    link: string;
    badge?: undefined | string;
  };
}

const NavItem = ({ item }: NavItemProps) => {
  return (
    <NavLink
      to={item.link}
      className={({ isActive }) =>
        `flex items-center active:scale-98 gap-3 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-[colors,scale] will-change-transform ${
          isActive
            ? "bg-white text-pink-700 shadow-lg shadow-black/3"
            : "text-muted-foreground border-transparent hover:bg-zinc-200 hover:text-zinc-700"
        }`
      }
    >
      {({ isActive }) => {
        const Icon = isActive ? item.activeIcon : item.icon;
        return (
          <>
            <Icon strokeWidth={2} size={20} />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="text-xs uppercase bg-red-500 border border-red-600 shadow-[inset_0_-2px_0_0_var(--color-red-600),inset_0_2px_0_0_var(--color-red-400)]! text-white px-2 py-0.5 rounded-full font-bold">
                {item.badge}
              </span>
            )}
          </>
        );
      }}
    </NavLink>
  );
};

export default NavItem;
