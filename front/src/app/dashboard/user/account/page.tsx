"use client";

import Image from "next/image";
import faceImage from "@/../public/images/usuario.png";
import { EditProfileForm } from "../../_components/EditProfileForm";
import { Paragraph } from "@/components/common/Paragraph";
import { Heading } from "@/components/common/Heading";
import { DashboardLayout } from "../../_components/dashboard-layout/DashboardLayout";
import { USER_LINKS } from "../links";
import { useUser } from "../../../../hooks/useUser";
import { useRedirectUserHook } from "../../_hooks/useRedirectUserHook";

const Account = () => {
  const { userData } = useUser();
  const { name, lastname, email } = userData || {};

  useRedirectUserHook();

  return (
    <DashboardLayout headerTitle="Mi cuenta" navLinks={USER_LINKS}>
      <div className="flex flex-col items-center bg-black/50 rounded-lg p-8">
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
          </div>
        </div>
      </div>
      <EditProfileForm />
    </DashboardLayout>
  );
};

export default Account;
