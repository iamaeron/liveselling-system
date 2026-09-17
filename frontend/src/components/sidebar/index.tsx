import { NavLink, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { sessionQueryOptions } from "@/lib/session";
import { authClient } from "@/lib/auth-client";
import {
  AltArrowDownIcon,
  BagHeartIcon,
  SidebarOpenIcon,
} from "@solar-icons/react/linear";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ActionIcon } from "@/components/ui/action-icon";
import { sidebarNavigation } from "@/constants/nav-links";
import NavItem from "./nav-item";

const Sidebar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Access the cached user session resolved by the loader
  const { data: user } = useQuery(sessionQueryOptions);

  const handleSignOut = async () => {
    await authClient.signOut();
    queryClient.invalidateQueries({ queryKey: ["session"] });
    navigate("/login");
  };

  return (
    <aside className="flex flex-col w-70 border-r border-zinc-200">
      <header className="mb-6 flex items-center justify-between pl-4 pt-4 pr-2">
        <div className="flex items-center gap-2">
          <div className="bg-white shadow-xl shadow-black/5 rounded-md p-1">
            <BagHeartIcon strokeWidth={2} size={20} className="text-pink-600" />
          </div>
          <span className="font-bold text-lg font-serif">Velo</span>
        </div>
        {/* <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded capitalize">
            {user?.role}
          </span> */}

        <ActionIcon variant="ghost">
          <SidebarOpenIcon strokeWidth={2} size={20} />
        </ActionIcon>
      </header>

      {/* main navs */}
      <div className="flex-1">
        {sidebarNavigation.map((section) => (
          <div
            key={section.group}
            className="mb-4 pt-4 border-t border-zinc-100 first:border-0"
          >
            <div className="px-3">
              <p className="text-xs font-medium capitalize text-zinc-400 px-2 mb-2">
                {section.group.toLowerCase()}
              </p>

              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavItem key={item.link} item={item} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 border-t border-zinc-100">
        <button onClick={handleSignOut}>logout</button>
        <div className="p-2  flex gap-2 items-center">
          <Avatar>
            <AvatarFallback className="font-semibold">
              {user?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 truncate">
            <span className="block font-medium text-sm text-foreground">
              {user?.name}
            </span>
            <span className="leading-none mb-1 block text-sm text-muted-foreground">
              {user?.email}
            </span>
          </div>

          <ActionIcon variant="ghost">
            <AltArrowDownIcon strokeWidth={2} size={16} />
          </ActionIcon>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
