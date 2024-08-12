import { Header } from "@/app/dashboard/_components/Header";
import { Sidebar } from "@/app/dashboard/_components/Sidebar";
import { INavLink } from "../../types";

interface IProps {
  children: React.ReactNode;
  headerTitle: string;
  navLinks: INavLink[];
}

const DashboardLayout = ({ children, headerTitle, navLinks }: IProps) => {
  return (
    <div
      className="h-screen bg-no-repeat bg-top bg-cover"
      style={{ backgroundImage: "url(/images/fondo-1.png)" }}
    >
      <div className="layout-admin flex gap-x-8">
        <Sidebar navLinks={navLinks} />
        <div className="flex flex-col gap-y-4 w-full">
          <Header title={headerTitle} />
          <div className="h-full text-white space-y-12 lg:pl-72">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export { DashboardLayout };
