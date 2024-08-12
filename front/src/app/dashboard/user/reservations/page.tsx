"use client";

import { DashboardLayout } from "../../_components/dashboard-layout/DashboardLayout";
import { USER_LINKS } from "../links";
import { CardReservation } from "./_components/CardReservation";
import { useUser } from "@/hooks/useUser";
import { Paragraph } from "@/components/common/Paragraph";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoIcon } from "lucide-react";

const Reservations = () => {
  const { userData } = useUser();

  const pendingReservations = userData?.reservations?.filter(
    (reservation) => new Date(reservation.start_day) >= new Date()
  );

  const pastReservations = userData?.reservations?.filter(
    (reservation) =>
      new Date(reservation.start_day).getDate() < new Date().getDate()
  );

  return (
    <DashboardLayout headerTitle="Mis reservas" navLinks={USER_LINKS}>
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="w-full bg-transparent p-0 h-auto border-2 border-primary flex flex-col sm:flex-row">
          <TabsTrigger
            value="pending"
            className="w-full sm:w-1/2 bg-transparent data-[state=active]:bg-primary !text-white p-3"
          >
            Reservas pendientes (
            {pendingReservations && pendingReservations.length})
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="w-full sm:w-1/2 bg-transparent data-[state=active]:bg-primary !text-white p-3"
          >
            Reservas pasadas ({pastReservations && pastReservations.length})
          </TabsTrigger>
        </TabsList>
        <div className="py-8">
          <TabsContent value="pending" className="space-y-8">
            <div className="border-2 border-primary rounded-md p-4 flex items-center gap-x-4">
              <InfoIcon />
              <Paragraph variant="secondary">
                Las recepción de los clientes en las oficinas será a partir de
                las <span className="text-white">09:00 a.m.</span> Por favor,
                asistir a partir de esa hora para la entrega de la oficina.
              </Paragraph>
            </div>
            {pendingReservations && pendingReservations.length > 0 && (
              <div className="flex flex-col gap-8">
                {pendingReservations.map((reservation) => (
                  <CardReservation
                    key={reservation.id}
                    reservation={reservation}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="past">
            {pastReservations && pastReservations.length > 0 && (
              <div className="flex flex-col gap-8">
                {pastReservations.map((reservation) => (
                  <CardReservation
                    key={reservation.id}
                    reservation={reservation}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </DashboardLayout>
  );
};

export default Reservations;
