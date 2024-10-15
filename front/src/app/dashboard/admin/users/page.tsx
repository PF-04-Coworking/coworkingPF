"use client";

import Image from "next/image";
import { DashboardLayout } from "../../_components/dashboard-layout/DashboardLayout";
import { ADMIN_LINKS } from "../../user/links";
import { useUsers } from "../reservations/_hooks/useUsers";
import { Paragraph } from "@/components/common/Paragraph";
import { TextInput } from "@/components/common/TextInput";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { EditReservationsModal } from "../reservations/_components/modals/EditReservationsModal";
import { DeactivateUser } from "./_components/DeactivateUser";
import { useRedirectAdminHook } from "../../_hooks/useRedirectAdminHook";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { users } = useUsers({ searchTerm });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useRedirectAdminHook();

  return (
    <DashboardLayout headerTitle="Gestionar usuarios" navLinks={ADMIN_LINKS}>
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
      </div>
      <div className="rounded-md border-2 border-primary overflow-auto">
        <table className="min-w-[50rem] text-sm bg-background/50 backdrop-blur-md rounded-md table-fixed">
          <thead className="text-left">
            <tr>
              <th className="px-8 py-3 w-4/12">Nombre</th>
              <th className="px-8 py-3 w-3/12">Contacto</th>
              <th className="px-8 py-3 w-2/12">Ubicación</th>
              <th className="px-8 py-3 w-2/12">Edad</th>
              <th className="px-8 py-3 w-2/12"></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id} className="border-t-2 border-primary">
                  <td className="p-8">
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
                        {user.is_active ? (
                          <Paragraph variant="secondary">
                            <span className="text-primary">Activo</span>
                          </Paragraph>
                        ) : (
                          <Paragraph variant="secondary">
                            <span className="text-red-400">Inactivo</span>
                          </Paragraph>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <Paragraph variant="secondary">{user.email}</Paragraph>
                    <Paragraph variant="secondary">
                      {user.phone || "-"}
                    </Paragraph>
                  </td>
                  <td className="p-8">
                    <Paragraph variant="secondary">
                      {user.country || "-"}
                    </Paragraph>
                    <Paragraph variant="secondary">
                      {user.city || "-"}
                    </Paragraph>
                  </td>
                  <td className="p-8">
                    <Paragraph variant="secondary">{user.age || "-"}</Paragraph>
                  </td>
                  <td className="py-6 px-8">
                    <DeactivateUser
                      userId={user.id}
                      is_active={user.is_active}
                    />
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
