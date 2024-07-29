import Image from "next/image";
import textLogo from "@/../public/images/text-logo.png";
import whiteTextLogo from "@/../public/images/white-text-logo.png";

interface IProps extends React.ButtonHTMLAttributes<HTMLImageElement> {
  variant?: "regular" | "white";
  className?: string;
}

const TextLogo = ({ className, variant = "regular", ...props }: IProps) => {
  const baseClassName = "h-10 w-auto";

  return (
    <Image
      src={variant === "regular" ? textLogo : whiteTextLogo}
      alt="Logo"
      {...props}
    />
  );
};

export { TextLogo };
