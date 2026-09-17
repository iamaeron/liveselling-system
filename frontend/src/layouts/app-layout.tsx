import { Outlet } from "react-router";
import Sidebar from "@/components/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ActionIcon } from "@/components/ui/action-icon";
import { BellIcon } from "@solar-icons/react/linear";

export function AppLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      {/* 2. Main Content Area where nested child routes render */}
      <main className="flex-1 w-full">
        <div className="max-w-5xl mx-auto">
          <header className="p-4 flex items-center justify-between">
            <div></div>

            <div className="flex items-center gap-1">
              <ActionIcon variant="ghost">
                <BellIcon strokeWidth={2} size={20} />
              </ActionIcon>

              <Avatar>
                <AvatarFallback>K</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
