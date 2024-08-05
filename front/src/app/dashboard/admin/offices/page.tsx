"use client";

import { CardAdd } from "./_components/modals/CreateOfficeModal";
import { CardOffice } from "./_components/CardOffice";
import { TextInput } from "@/components/common/TextInput";
import { SearchIcon } from "lucide-react";
import { DashboardLayout } from "../../_components/dashboard-layout/DashboardLayout";
import { ADMIN_LINKS } from "../../user/links";
import useOffices from "./_hooks/useOffices";
import { useState } from "react";

const DashboardOffices = () => {
  const { offices } = useOffices();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const searchedOffices = offices.filter(
    (office) =>
      office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout headerTitle="Gestionar oficinas" navLinks={ADMIN_LINKS}>
      <div className="font-sans">
        <div className="rounded-md">
          <div className="flex justify-between mb-8">
            <div className="relative w-full">
              <TextInput
                type="search"
                placeholder="Buscar oficinas..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full border-gradient py-2 focus:outline-none text-white"
              />
              <SearchIcon
                size={20}
                className="text-white absolute right-4 top-2"
              />
            </div>
            <CardAdd />
          </div>

          <div className="w-full lg:grid-cols-2 grid gap-10 md:grid-cols-2 grid-cols-1">
            {searchedOffices.map((office, index) => (
              <CardOffice
                key={index}
                id={office.id}
                name={office.name}
                location={office.location}
                capacity={office.capacity}
                price={office.price}
                description={office.description}
                imgUrl={office.imgUrl}
                services={office.services}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardOffices;
