import { Button } from "@/components/ui/button";
import { CustomLink } from "../../../components/ui/custom-link";
import { TextLogo } from "../../../components/ui/text-logo";
import { Sidebar } from "../Sidebar/Sidebar";

const links = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "#" },
  { name: "Sobre Nosotros", href: "#" },
  { name: "Contacto", href: "#" },
];

const Header = () => {
  return (
    <header className="fixed h-20 w-full py-4 z-10 backdrop-blur-xl bg-background/15">
      <div className="layout flex items-center justify-between">
        <div className="mr-8">
          <TextLogo />
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-lg font-medium md:gap-5 md:text-sm lg:gap-6 ">
          {links.map((link) => (
            <CustomLink key={link.name} href={link.href} prefetch={false}>
              {link.name}
            </CustomLink>
          ))}
        </nav>
        <div className="ml-auto hidden lg:flex gap-x-4">
          <Button variant="outline">Iniciar Sesión</Button>
          <Button variant="primary">Registrarse</Button>
        </div>

        <Sidebar />
      </div>
    </header>
  );
};

export { Header };
