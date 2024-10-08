"use client";

import { CircleUserRound } from "lucide-react";
import { Heading } from "../../../components/common/Heading";
import { MobileMenu } from "../_components/mobile-menu/MobileMenu";
import { Paragraph } from "@/components/common/Paragraph";
import Link from "next/link";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { ADMIN_LINKS, USER_LINKS } from "../user/links";

const Header = ({ title }: { title: string }) => {
  const { userData } = useAuthStore();

  const dashboardLink =
    userData?.role === "admin"
      ? "/dashboard/admin/account"
      : "/dashboard/user/account";

  const mobileMenuLinks = userData?.role === "admin" ? ADMIN_LINKS : USER_LINKS;

  return (
    <header className="w-full py-5 flex justify-between items-center lg:pl-72">
      <div className="flex items-center justify-between">
        <MobileMenu links={mobileMenuLinks} />
        <Heading level="3" className="font-medium">
          {title}
        </Heading>
      </div>
      <Link href={dashboardLink} className="flex items-center gap-x-4">
        <Paragraph variant="primary" className="!text-primary font-semibold">
          {userData?.name}
        </Paragraph>
        <CircleUserRound size={35} className="text-primary" />
      </Link>
    </header>
  );
};

export { Header };
