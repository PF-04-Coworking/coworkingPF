import { Button } from "@/components/common/Button";
import { XLogo } from "@/app/_page/_components/XLogo";
import { FacebookIcon, Linkedin } from "lucide-react";

const socials = [
  {
    name: "Facebook",
    href: "#",
    icon: <FacebookIcon size={16} fill="currentColor" />,
  },
  {
    name: "Linkedin",
    href: "#",
    icon: <Linkedin size={16} fill="currentColor" />,
  },
  {
    name: "X",
    href: "#",
    icon: <XLogo className="size-4" fill="currentColor" />,
  },
];

const FooterSection = () => {
  return (
    <div className="layout py-12 space-y-8">
      <div className="flex items-center justify-center gap-x-4">
        {socials.map((social, index) => (
          <div
            key={index}
            className="flex items-center gap-x-3 text-sm text-primary bg-primary bg-opacity-25 hover:bg-opacity-50 transition-colors rounded-full p-2 cursor-pointer"
          >
            {social.icon}
          </div>
        ))}
      </div>
      <hr className="border border-primary bg-primary" />
    </div>
  );
};

export { FooterSection };
