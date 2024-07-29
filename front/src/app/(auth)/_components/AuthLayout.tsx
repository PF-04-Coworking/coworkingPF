import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import backgroundImage from "@/../public/images/fondo-2.png";
import Image from "next/image";
import { Testimonial } from "./TestimonialSection";

interface IProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: IProps) => {
  return (
    <div className="layout">
      <div className="absolute top-60 left-20 bg-cover -z-10">
        <Image src={backgroundImage} alt="background" />
      </div>

      <div className="flex justify-center font-sans gap-x-24 mt-8 lg:mt-0">
        <div className="text-white shrink lg:shrink-0">
          <div className="lg:absolute lg:left-10 lg:top-10 rounded-full bg-primary/20 w-min">
            <Link href="/">
              <ChevronLeft className="text-primary size-12" />
            </Link>
          </div>
          <div className="flex h-auto lg:h-full lg:items-center py-8 lg:py-0">
            {children}
          </div>
        </div>
        <Testimonial />
      </div>
    </div>
  );
};

export { AuthLayout };
