import { CustomLink } from "../../../components/common/CustomLink";
import { TextLogo } from "../../../components/common/TextLogo";
import { Sidebar } from "./MobileMenu/MobileMenu";
import { links } from "../links";
import { ControlToken } from "./ControlToken";

const Header = () => {
  return (
    <header className="fixed h-20 w-full py-4 z-10 backdrop-blur-xl bg-background/20">
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
          <ControlToken />
        </div>

        <Sidebar />
      </div>
    </header>
  );
};

export { Header };
