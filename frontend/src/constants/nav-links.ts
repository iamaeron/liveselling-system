import {
  Widget3Icon,
  VideocameraIcon,
  BoxIcon,
  AlarmPlayIcon,
  Bag4Icon,
  UsersGroupRoundedIcon,
  //   ShareIcon,
  SettingsMinimalisticIcon,
  FlagIcon,
} from "@solar-icons/react/linear";

import {
  Widget3Icon as Widget3IconBold,
  VideocameraIcon as VideocameraIconBold,
  BoxIcon as BoxIconBold,
  AlarmPlayIcon as AlarmPlayIconBold,
  Bag4Icon as Bag4IconBold,
  UsersGroupRoundedIcon as UsersGroupRoundedIconBold,
  //   ShareIcon as ShareIconBold,
  SettingsMinimalisticIcon as SettingsMinimalisticIconBold,
  FlagIcon as FlagIconBold,
} from "@solar-icons/react/bold";

export const sidebarNavigation = [
  {
    group: "MAIN",
    items: [
      {
        label: "Dashboard",
        icon: Widget3Icon,
        activeIcon: Widget3IconBold,
        link: "/seller/dashboard",
      },
      {
        label: "Live Streams",
        icon: VideocameraIcon,
        activeIcon: VideocameraIconBold,
        link: "/seller/live-streams",
        badge: "Live",
      },
      {
        label: "Products & Codes",
        icon: BoxIcon,
        activeIcon: BoxIconBold,
        link: "/seller/products",
      },
    ],
  },
  {
    group: "SALES & ORDERS",
    items: [
      {
        label: "Active Stock Holds",
        icon: AlarmPlayIcon,
        activeIcon: AlarmPlayIconBold,
        link: "/seller/holds",
      },
      {
        label: "Orders",
        icon: Bag4Icon,
        activeIcon: Bag4IconBold,
        link: "/seller/orders",
      },
      {
        label: "Customers",
        icon: UsersGroupRoundedIcon,
        activeIcon: UsersGroupRoundedIconBold,
        link: "/seller/customers",
      },
    ],
  },
  {
    group: "SETTINGS",
    items: [
      {
        label: "Facebook Page",
        icon: FlagIcon,
        activeIcon: FlagIconBold,
        link: "/seller/settings/facebook",
      },
      {
        label: "Store & Holds",
        icon: SettingsMinimalisticIcon,
        activeIcon: SettingsMinimalisticIconBold,
        link: "/seller/settings/store",
      },
    ],
  },
];
