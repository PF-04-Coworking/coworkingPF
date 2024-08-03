import { CircleUserRound, CircleUserRoundIcon } from "lucide-react";
import { Heading } from "../../../components/common/Heading";
import { MobileMenu } from "../_components/mobile-menu/MobileMenu";
import { useUser } from "../_hooks/useUser";
import { Paragraph } from "@/components/common/Paragraph";

const Header = ({ title }: { title: string }) => {
  const { userData } = useUser();

  return (
    <header className="w-full py-5 flex justify-between items-center lg:pl-72">
      <div className="flex items-center justify-between">
        <MobileMenu />
        <Heading level="3" className="font-medium">
          {title}
        </Heading>
      </div>
      <div className="items-center gap-x-4 hidden sm:flex">
        <Paragraph variant="primary" className="!text-primary font-semibold">
          {userData?.name}
        </Paragraph>
        <CircleUserRound size={32} className="text-primary" />
      </div>
    </header>
  );
};

export { Header };
