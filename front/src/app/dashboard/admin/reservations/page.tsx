"use client";

import { Button } from "@/components/common/Button";
import { DashboardLayout } from "../../_components/dashboard-layout/DashboardLayout";
import { ADMIN_LINKS } from "../../user/links";
import { TextInput } from "@/components/common/TextInput";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { CreateReservationModal } from "./_components/modals/CreateReservationModal";

const ReservationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <DashboardLayout headerTitle="Gestionar reservas" navLinks={ADMIN_LINKS}>
      <div className="flex justify-between gap-x-4">
        <div className="relative w-full">
          <TextInput
            type="search"
            placeholder="Buscar reservas..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border-gradient py-2 focus:outline-none text-white"
          />
          <SearchIcon size={20} className="text-white absolute right-4 top-2" />
        </div>
        <CreateReservationModal />
      </div>
    </DashboardLayout>
  );
};

export default ReservationsPage;
