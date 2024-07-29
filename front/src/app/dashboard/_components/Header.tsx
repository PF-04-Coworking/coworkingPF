import { CircleUserRound, CircleUserRoundIcon } from "lucide-react";
import { Heading } from "../../../components/common/Heading";
import { Paragraph } from "../../../components/common/Paragraph";
import { MobileMenu } from "../_components/mobile-menu/MobileMenu";

const Header = ({ title }: { title: string }) => {
  return (
    <header className="w-full py-5 flex justify-between items-center lg:pl-72">
      <div className="flex items-center justify-between">
        <MobileMenu />
        <Heading level="3" className="font-medium">
          {title}
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
