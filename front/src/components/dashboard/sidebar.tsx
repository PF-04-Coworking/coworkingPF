import {
  BuildingIcon,
  CalendarCheck2Icon,
  CircleUserRoundIcon,
  LogOutIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { CustomLink } from "../ui/custom-link";
import { Heading } from "../ui/heading";
import { TextLogo } from "../ui/text-logo";
import { MobileMenu } from "./mobile-menu/mobile-menu";

const links = [
  {
    name: "Mi cuenta",
    href: "/dashboard/account",
    icon: <CircleUserRoundIcon size={20} />,
  },
  {
    name: "Gestionar oficinas",
    href: "#",
    icon: <BuildingIcon size={20} />,
  },
  {
    name: "Gestionar reservas",
    href: "#",
    icon: <CalendarCheck2Icon size={20} />,
  },
];

const Sidebar = () => {
  return (
    <section className="h-full min-h-screen pt-4 pb-8 w-64 space-y-10 flex-col justify-between hidden lg:flex">
      <div className="space-y-8">
        <div className="px-3">
          <TextLogo />
        </div>
        <div className="flex flex-col gap-y-4">
          {links.map((link) => (
            <CustomLink
              key={link.name}
              href={link.href}
              className="p-2.5 hover:bg-secondaryDark rounded-md transition flex items-center gap-x-3"
              prefetch={false}
            >
              {link.icon}
              {link.name}
            </CustomLink>
          ))}
        </div>
      </div>
      <div>
        <Button variant="outline" className="flex gap-x-2">
          <LogOutIcon size={16} />
          Cerrar sesión
        </Button>
      </div>
    </section>
  );
};

export { Sidebar };
