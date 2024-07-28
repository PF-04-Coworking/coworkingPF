import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { CustomLink } from "../../../components/ui/custom-link";
import { TextLogo } from "../../../components/ui/text-logo";
import "./MobileMenu.css";

const links = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "#" },
  { name: "Sobre Nosotros", href: "#" },
  { name: "Contacto", href: "#" },
];

const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <div className="text-white hover:bg-background hover:border-background cursor-pointer p-2 rounded-md transition">
          <Menu className="size-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </div>
      </SheetTrigger>
      <SheetContent
        side="right"
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
              className="p-2.5 hover:bg-secondaryDark rounded-md transition"
              prefetch={false}
            >
              {link.name}
            </CustomLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export { Sidebar };
