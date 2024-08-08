"use client";

import Image from "next/image";
import faceImage from "@/../public/images/face-1.png";
import { EditProfileForm } from "../../_components/EditProfileForm";
import { Paragraph } from "@/components/common/Paragraph";
import { Heading } from "@/components/common/Heading";
import { DashboardLayout } from "../../_components/dashboard-layout/DashboardLayout";
import { ADMIN_LINKS } from "../../user/links";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";

const Account = () => {
  const { userData } = useAuthStore();
  const { name, lastname, email } = userData || {};

  return (
    <DashboardLayout headerTitle="Mi cuenta" navLinks={ADMIN_LINKS}>
      <div className="flex flex-col items-center">
        <div className="flex flex-col text-center sm:text-left sm:flex-row items-center gap-8 pt-8">
          <Image
            src={faceImage}
            alt="Imagen de perfil"
            className="size-40 border border-primary rounded-full p-3"
          />
          <div className="space-y-1">
            <Heading level="2">
              {name} {lastname}
            </Heading>
            <Paragraph variant="primary">{email}</Paragraph>
            <Paragraph variant="secondary">Administrador</Paragraph>
          </div>
        </div>
      </div>
      <EditProfileForm />
    </DashboardLayout>
  );
};

export default Account;
