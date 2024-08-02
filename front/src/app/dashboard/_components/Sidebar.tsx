import { CustomLink } from "../../../components/common/CustomLink";
import { TextLogo } from "../../../components/common/TextLogo";
import { INavLink } from "../types";
import Link from "next/link";
import { Logout } from "./Logout";

const Sidebar = ({ navLinks }: { navLinks: INavLink[] }) => {
  return (
    <section className="h-full min-h-screen pt-4 pb-8 w-64 space-y-10 flex-col justify-between hidden lg:flex fixed">
      <div className="space-y-8">
        <div className="px-3">
          <Link href="/">
            <TextLogo />
          </Link>
        </div>
        <div className="flex flex-col gap-y-4">
          {navLinks?.map((link) => (
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
        <Logout />
      </div>
    </section>
  );
};

export { Sidebar };
