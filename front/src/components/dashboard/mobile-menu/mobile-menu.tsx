import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  BuildingIcon,
  CalendarCheck2Icon,
  CircleUserRoundIcon,
  Menu,
} from "lucide-react";
import { CustomLink } from "@/components/ui/custom-link";
import { TextLogo } from "@/components/ui/text-logo";
import "./MobileMenu.css";

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

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <div className="text-white hover:bg-background hover:border-background cursor-pointer p-2 rounded-md transition">
          <Menu className="size-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-background text-white sheet-content border-background"
      >
        <CustomLink
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          prefetch={false}
        >
          <TextLogo />
        </CustomLink>
        <nav className="flex flex-col gap-y-4 mt-8">
          {links.map((link) => (
            <CustomLink
              key={link.name}
              href={link.href}
              className="p-2.5 hover:bg-secondaryDark rounded-md transition flex gap-x-3"
              prefetch={false}
            >
              {link.icon}
              {link.name}
            </CustomLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export { MobileMenu };
