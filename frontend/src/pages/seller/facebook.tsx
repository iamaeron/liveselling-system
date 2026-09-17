import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useFetchUserPage } from "@/lib/fetcher/facebook.fetcher";
import { FlagIcon } from "@solar-icons/react/bold";

import {
  ShareCircleIcon,
  ChatRoundIcon,
  Dialog2Icon,
  InfoCircleIcon,
} from "@solar-icons/react/linear";
import { cn } from "cn";

const facebookPermissions = [
  {
    id: "page_access",
    title: "Page Information & Selection",
    accessText: "Your Facebook Page information and list",
    benefitText:
      "To select and connect your official business page to our dashboard.",
    icon: InfoCircleIcon,
  },
  {
    id: "live_comments",
    title: "Live Video Comments",
    accessText: "Live video streams and real-time comment feeds",
    benefitText:
      'To monitor broadcasts and automatically capture buyer claims (e.g., "Mine 3AB") in real time.',
    icon: Dialog2Icon,
  },
  {
    id: "messenger",
    title: "Page Messenger Access",
    accessText: "Page Messenger capabilities",
    benefitText:
      "To send automated cart summaries and payment instructions directly to buyers.",
    icon: ChatRoundIcon,
  },
  {
    id: "webhooks",
    title: "Automated Webhooks",
    accessText: "Page webhook subscription management",
    benefitText:
      "To trigger instant 15-minute stock holds and cart timer resets automatically.",
    icon: ShareCircleIcon,
  },
];

const SellerFacebookPage = () => {
  const { data, isPending } = useFetchUserPage();

  const handleConnect = () => {
    const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    window.location.href = `${backendUrl}/api/facebook/connect`;
  };

  return (
    <div className="p-1 rounded-lg">
      {/* <div className="h-30 bg-linear-to-b from-pink-100 to-white rounded-t-lg"></div> */}
      {isPending ? (
        <div className="h-8 w-30 rounded-lg bg-zinc-100"></div>
      ) : !data.page ? (
        <div>
          <div className="bg-white w-max shadow-xl shadow-black/5 mb-4 p-2 rounded-lg">
            <FlagIcon className="text-pink-600" />
          </div>

          <p className="font-semibold text-xl text-foreground">
            Your page isn't connected yet.
          </p>
          <p className="text-sm text-muted-foreground">
            Before proceeding, please take note that we will be able to gain
            access to the following:
          </p>
          <ul className="text-sm mt-4 space-y-4">
            {facebookPermissions.map((permission) => {
              const Icon = permission.icon;

              return (
                <li key={permission.id} className="flex items-start gap-2">
                  <Icon
                    strokeWidth={2}
                    size={20}
                    className="shrink-0 text-pink-700"
                  />
                  <div>
                    <p className="font-medium text-pink-700">
                      {permission.accessText}
                    </p>
                    <p className="text-muted-foreground">
                      {permission.benefitText}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex">
            <Button onClick={handleConnect}>Connect to Facebook</Button>
          </div>
        </div>
      ) : (
        <div>
          <header className="border-b border-zinc-200 mb-8 pb-2">
            <h1 className="text-lg font-semibold text-zinc-700">Your Page</h1>
          </header>

          <Avatar className="rounded-lg border border-black/5 mb-2 size-16">
            <AvatarImage src={data.page.profileUrl} />
            <AvatarFallback>
              <h1 className="text-2xl font-bold">
                {data.page.pageName.charAt(0)}
              </h1>
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-semibold text-zinc-700">
            {data.page.pageName}
          </h1>

          <div className="flex text-sm items-center gap-2">
            <div
              className={cn(
                "h-0.5 w-3 rounded-full",
                data.page.isConnected ? "bg-emerald-500" : "bg-rose-500",
              )}
            ></div>
            <p
              className={cn(
                data.page.isConnected ? "text-emerald-700" : "text-rose-700",
              )}
            >
              {data.page.isConnected ? "Connected" : "Connected"}
            </p>
          </div>

          <footer className="mt-6 flex justify-end">
            <Button variant="destructive">Disconnect</Button>
          </footer>
        </div>
      )}
    </div>
  );
};

export default SellerFacebookPage;
