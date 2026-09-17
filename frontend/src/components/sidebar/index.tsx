import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { sessionQueryOptions } from "@/lib/session";
import { authClient } from "@/lib/auth-client";
import { AltArrowDownIcon, SidebarOpenIcon } from "@solar-icons/react/linear";
import { BagHeartIcon } from "@solar-icons/react/bold";
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
    // <div className="w-76 p-2 flex">
    <aside className="flex flex-col w-76 border border-zinc-200 bg-zinc-100">
      <header className="flex items-center justify-between pl-4 pt-4 pr-2">
        <div className="flex items-center gap-3 px-0.5">
          <div className="flex items-center gap-2">
            <BagHeartIcon strokeWidth={2} size={30} className="text-pink-600" />
            <span className="font-bold text-lg font-serif text-pink-700">
              Velo
            </span>
          </div>
        </div>
        {/* <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded capitalize">
            {user?.role}
          </span> */}

        <ActionIcon variant="ghost">
          <SidebarOpenIcon strokeWidth={2} size={20} />
        </ActionIcon>
      </header>

      <div className="px-2 mt-5 mb-1">
        <div className="hover:bg-zinc-200 py-1.5 px-2 rounded-lg flex gap-2 items-center">
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

          {/* <ActionIcon variant="ghost"> */}
          <AltArrowDownIcon strokeWidth={2} size={16} />
          {/* </ActionIcon> */}
        </div>
      </div>

      {/* main navs */}
      <div className="flex-1">
        {sidebarNavigation.map((section) => (
          <div
            key={section.group}
            className="mb-4 border-t border-zinc-200 border-dashed group first:border-0"
          >
            <hr className="border-t border-white group-first:border-0 mb-4 border-dashed" />
            <div className="px-3">
              <p className="text-xs font-medium text-zinc-400 px-2 mb-2">
                {section.group}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavItem key={item.link} item={item} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <hr className="border-t border-zinc-200" /> */}
      <div className="p-2">
        <button onClick={handleSignOut}>logout</button>
      </div>
    </aside>
    // </div>
  );
};

export default Sidebar;
