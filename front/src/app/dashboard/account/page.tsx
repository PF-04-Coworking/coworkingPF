import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

const Account = () => {
  return (
    <div className="layout flex gap-x-8">
      <Sidebar />
      <div className="flex flex-col gap-y-4 w-full">
        <Header />
        <div className="border border-gray-800 h-full text-white p-4">
          Contenido
        </div>
      </div>
    </div>
  );
};

export default Account;
