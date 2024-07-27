import Image from "next/image";
import textLogo from "@/../public/text-logo.png";

interface IProps extends React.ButtonHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const TextLogo = ({ className, ...props }: IProps) => {
  const baseClassName = "h-10 w-auto";

  return (
    <Image src={textLogo} alt="Logo" className={baseClassName} {...props} />
  );
};

export { TextLogo };
