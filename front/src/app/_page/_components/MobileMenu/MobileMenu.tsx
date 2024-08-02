import React from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/common/Sheet";
import { Menu } from "lucide-react";
import { CustomLink } from "../../../../components/common/CustomLink";
import { TextLogo } from "../../../../components/common/TextLogo";
import { links } from "../../links";
import "./MobileMenu.css";

interface ISheetTriggerButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SheetTriggerButton = React.forwardRef<
  HTMLDivElement,
  ISheetTriggerButtonProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className="text-white hover:bg-background hover:border-background cursor-pointer p-2 rounded-md transition lg:hidden"
  >
    <Menu className="size-5" />
    <span className="sr-only">Toggle navigation menu</span>
  </div>
));

const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <SheetTriggerButton />
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
