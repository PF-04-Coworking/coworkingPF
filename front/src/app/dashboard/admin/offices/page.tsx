"use client";

import { CardAdd } from "./_components/modals/CreateOfficeModal";
import { CardOffice } from "./_components/CardOffice";
import { TextInput } from "@/components/common/TextInput";
import { SearchIcon } from "lucide-react";
import { DashboardLayout } from "../../_components/dashboard-layout/DashboardLayout";
import { ADMIN_LINKS } from "../../user/links";
import useOffices from "./_hooks/useOffices";

const DashboardOffices = () => {
  const { offices } = useOffices();

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
            {offices.map((office, index) => (
              <CardOffice
                key={index}
                id={office.id}
                imgUrl={office.imgUrl}
                name={office.name}
                location={office.location}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardOffices;
