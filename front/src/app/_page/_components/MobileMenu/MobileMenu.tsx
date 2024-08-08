"use client";

import React from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/common/Sheet";
import { Menu } from "lucide-react";
import { CustomLink } from "../../../../components/common/CustomLink";
import { TextLogo } from "../../../../components/common/TextLogo";
import { authLinks, links } from "../../links";
import "./MobileMenu.css";
import Link from "next/link";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { Logout } from "@/app/dashboard/_components/Logout";
import { Button } from "@/components/common/Button";

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

SheetTriggerButton.displayName = "SheetTriggerButton";

const MobileMenu = () => {
  const { userData } = useAuthStore();

  console.log("userData", userData);

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
        {!userData && (
          <nav className="flex flex-col gap-y-4 mt-8">
            <Link href="/login">
              <Button variant="outline" className="w-full">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" className="w-full">
                Registrarse
              </Button>
            </Link>
          </nav>
        )}
        {userData && (
          <div className="p-2 mt-4">
            <Logout />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export { MobileMenu };
