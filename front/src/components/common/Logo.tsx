import Image from "next/image";
import logo from "@/../public/images/logo.png";

interface IProps extends React.ButtonHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const Logo = ({ className, ...props }: IProps) => {
  const baseClassName = "";

  return <Image src={logo} alt="Logo" className={baseClassName} {...props} />;
};

export { Logo };
