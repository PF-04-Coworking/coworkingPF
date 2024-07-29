import Image from "next/image";
import faceImage from "@/../public/images/face-1.png";
import { EditProfileForm } from "./_components/EditProfileForm";
import { Paragraph } from "@/components/common/Paragraph";
import { Heading } from "@/components/common/Heading";
import { DashboardLayout } from "../../_components/dashboard-layout/DashboardLayout";
import { ADMIN_LINKS } from "../../user/links";

const Account = () => {
  return (
    <DashboardLayout
      headerTitle="Panel de administración"
      navLinks={ADMIN_LINKS}
    >
      <div className="flex flex-col items-center">
        <div className="flex flex-col text-center sm:text-left sm:flex-row items-center gap-8 pt-8">
          <Image
            src={faceImage}
            alt="Imagen de perfil"
            className="size-40 border border-primary rounded-full p-3"
          />
          <div className="space-y-1">
            <Heading level="2">Bardo Untiveros</Heading>
            <Paragraph variant="primary">bardountiveros@gmail.com</Paragraph>
            <Paragraph variant="secondary">Administrador</Paragraph>
          </div>
        </div>
      </div>
      <EditProfileForm />
    </DashboardLayout>
  );
};

export default Account;
