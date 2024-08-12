"use client";

import { DashboardLayout } from "../../_components/dashboard-layout/DashboardLayout";
import { ADMIN_LINKS } from "../../user/links";
import { TextInput } from "@/components/common/TextInput";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useReservations } from "./_hooks/useReservations";
import ReservationsTable from "./_components/ReservationsTable";
import { Sort } from "@/app/rooms/_components/Sort";
import { sortOptions } from "@/lib/constants/sortReservationsOptions";

const ReservationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("dateDesc");
  const { reservations } = useReservations({ searchTerm });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (option: string) => {
    setSortOption(option);
  };

  const sortedReservations = [...reservations].sort((a, b) => {
    switch (sortOption) {
      case "dateDesc":
        return (
          new Date(b.start_day).getTime() - new Date(a.start_day).getTime()
        );
      case "dateAsc":
        return (
          new Date(a.start_day).getTime() - new Date(b.start_day).getTime()
        );
      default:
        return 0;
    }
  });

  return (
    <DashboardLayout headerTitle="Gestionar reservas" navLinks={ADMIN_LINKS}>
      <div className="flex justify-between gap-x-4">
        <div className="relative w-full">
          <TextInput
            type="search"
            placeholder="Buscar reservas..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full py-2 focus:outline-none text-white"
          />
          <SearchIcon size={20} className="text-white absolute right-4 top-3" />
        </div>
        <Sort
          onSort={handleSort}
          sortOptions={sortOptions}
          defaultSortOption="dateDesc"
        />
      </div>
      <ReservationsTable reservations={sortedReservations} />
    </DashboardLayout>
  );
};

export default ReservationsPage;
