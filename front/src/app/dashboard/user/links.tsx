import {
  BuildingIcon,
  CalendarCheck2Icon,
  CalendarCogIcon,
  CircleUserRoundIcon,
  UserSearchIcon,
} from "lucide-react";

const ADMIN_LINKS = [
  {
    name: "Mi cuenta",
    href: "/dashboard/admin/account",
    icon: <CircleUserRoundIcon size={20} />,
  },
  {
    name: "Gestionar oficinas",
    href: "/dashboard/admin/offices",
    icon: <BuildingIcon size={20} />,
  },
  {
    name: "Gestionar reservas",
    href: "/dashboard/admin/reservations",
    icon: <CalendarCogIcon size={20} />,
  },
  {
    name: "Gestionar usuarios",
    href: "/dashboard/admin/users",
    icon: <UserSearchIcon size={20} />,
  },
];

const USER_LINKS = [
  {
    name: "Mi cuenta",
    href: "/dashboard/user/account",
    icon: <CircleUserRoundIcon size={20} />,
  },
  {
    name: "Gestionar reservas",
    href: "/dashboard/user/reservations",
    icon: <CalendarCheck2Icon size={20} />,
  },
];

export { ADMIN_LINKS, USER_LINKS };
