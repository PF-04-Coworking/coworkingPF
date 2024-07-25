import Image from "next/image";
import logo from "../assets/logo.png";

interface IProps extends React.ButtonHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const Logo = ({ className, ...props }: IProps) => {
  const baseClassName = "h-10";

  return <Image src={logo} alt="Logo" className={baseClassName} {...props} />;
};

export { Logo };
