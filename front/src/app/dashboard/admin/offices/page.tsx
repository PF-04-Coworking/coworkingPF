import { CardAdd } from "./_components/CardAdd";
import { CardOffice } from "./_components/CardOffice";
import { TextInput } from "@/components/common/TextInput";
import { Offices } from "./helpers/offices-data";
import { SearchIcon } from "lucide-react";
import { DashboardLayout } from "../../_components/DashboardLayout";
import { ADMIN_LINKS } from "../../user/links";

const DashboardOffices = () => {
  return (
    <DashboardLayout
      headerTitle="Panel de administración"
      navLinks={ADMIN_LINKS}
    >
      <div className="font-sans">
        <div className="rounded-md">
          <div className="flex justify-between mb-8">
            <div className="flex-1 relative">
              <TextInput
                type="search"
                placeholder="Buscar oficinas..."
                className="w-full pl-10 border-gradient py-2 focus:outline-none text-white"
              />
              <SearchIcon
                size={20}
                className="text-white absolute left-3 top-1/2 -translate-y-1/2"
              />
            </div>
            <CardAdd />
          </div>

          <div className="w-full lg:grid-cols-2 grid gap-10 md:grid-cols-2 grid-cols-1">
            {Offices.map((office, index) => (
              <CardOffice
                key={index}
                url={office.url}
                nombre={office.nombre}
                direccion={office.direccion}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardOffices;
