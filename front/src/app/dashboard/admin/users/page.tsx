"use client";

import Image from "next/image";
import { DashboardLayout } from "../../_components/dashboard-layout/DashboardLayout";
import { ADMIN_LINKS } from "../../user/links";
import { useUsers } from "../reservations/_hooks/useUsers";
import { Paragraph } from "@/components/common/Paragraph";
import { TextInput } from "@/components/common/TextInput";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { users } = useUsers({ searchTerm });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <DashboardLayout headerTitle="Gestionar usuarios" navLinks={ADMIN_LINKS}>
      <div className="flex justify-between gap-x-4">
        <div className="relative w-full">
          <TextInput
            type="search"
            placeholder="Buscar reservas..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border-gradient py-2 focus:outline-none text-white"
          />
          <SearchIcon size={20} className="text-white absolute right-4 top-3" />
        </div>
      </div>
      <div className="rounded-md border-2 border-primary/25">
        <table className="w-full text-sm bg-background/50 backdrop-blur-md rounded-md table-fixed">
          <thead className="text-left">
            <tr>
              <th className="px-6 py-3 w-4/12">Nombre</th>
              <th className="px-6 py-3 w-5/12">Contacto</th>
              <th className="px-6 py-3 w-2/12">Ubicación</th>
              <th className="px-6 py-3 w-2/12">Edad</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id} className="border-t-2 border-primary/50">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <Image
                        src={user.imgUrl}
                        alt="user"
                        width={35}
                        height={35}
                      />
                      <div className="overflow-hidden">
                        <Paragraph variant="primary">
                          {user.name} {user.lastname}
                        </Paragraph>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <Paragraph variant="secondary">{user.email}</Paragraph>
                    <Paragraph variant="secondary">
                      {user.phone || "-"}
                    </Paragraph>
                  </td>
                  <td className="p-6">
                    <Paragraph variant="secondary">
                      {user.country || "-"}
                    </Paragraph>
                    <Paragraph variant="secondary">
                      {user.city || "-"}
                    </Paragraph>
                  </td>
                  <td className="p-6">
                    <Paragraph variant="secondary">{user.age || "-"}</Paragraph>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
