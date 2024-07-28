import { CircleUserRound, CircleUserRoundIcon } from "lucide-react";
import { Heading } from "../ui/heading";
import { Paragraph } from "../ui/paragraph";
import { MobileMenu } from "./mobile-menu/mobile-menu";

const Header = () => {
  return (
    <header className="w-full py-5 flex justify-between items-center">
      <div className="flex items-center justify-between">
        <MobileMenu />
        <Heading level="3" className="font-medium">
          Panel de administración
        </Heading>
      </div>
      <div className="items-center gap-x-4 hidden sm:flex">
        <Paragraph variant="primary" className="!text-primary font-medium">
          Bardo
        </Paragraph>
        <CircleUserRound size={32} className="text-primary" />
      </div>
    </header>
  );
};

export { Header };
