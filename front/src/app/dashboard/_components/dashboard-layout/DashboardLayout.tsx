import { Header } from "@/app/dashboard/_components/Header";
import { Sidebar } from "@/app/dashboard/_components/Sidebar";
import { INavLink } from "../../types";
import { ToastContainer } from "react-toastify";
import "./DashboardLayout.css";

interface IProps {
  children: React.ReactNode;
  headerTitle: string;
  navLinks: INavLink[];
}

const DashboardLayout = ({ children, headerTitle, navLinks }: IProps) => {
  return (
    <div
      className="bg-no-repeat bg-center bg-fixedv h-[80vh]" 
      style={{ backgroundImage: `url(/images/fondo-2.png)` }}
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export { DashboardLayout };
