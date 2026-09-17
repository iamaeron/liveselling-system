import { Button } from "@/components/ui/button";
import { FlagIcon } from "@solar-icons/react/bold";

import {
  ShareCircleIcon,
  ChatRoundIcon,
  Dialog2Icon,
  InfoCircleIcon,
} from "@solar-icons/react/linear";

export const facebookPermissions = [
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
  return (
    <div className="p-1 rounded-lg">
      {/* <div className="h-30 bg-linear-to-b from-pink-100 to-white rounded-t-lg"></div> */}
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
                <Icon size={20} className="shrink-0 text-pink-700" />
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
          <Button>Connect to Facebook</Button>
        </div>
      </div>
    </div>
  );
};

export default SellerFacebookPage;
