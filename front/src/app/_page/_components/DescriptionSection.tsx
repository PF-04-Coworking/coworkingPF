import { Heading } from "@/components/common/Heading";
import { Highlight } from "../../../components/common/Highlight";
import { Logo } from "../../../components/common/Logo";
import { Paragraph } from "../../../components/common/Paragraph";
import Image from "next/image";
import officeImage from "@/../public/images/office-2.png";
import { Button } from "../../../components/common/Button";
import { Badge } from "../../../components/common/Badge";
import { UsersRound } from "lucide-react";
import { useTranslations } from "next-intl";

const Description = () => {
const t = useTranslations('DescriptionSection');

const badges = [
  {
    description: t("badges.description1"),
    capacity: t("badges.capacity1"),
  },
  {
    description: t("badges.description2"),
    capacity: t("badges.capacity2"),
  },
  {
    description: t("badges.description3"),
    capacity: t("badges.capacity3"),
  },
];

  return (
    <div className="layout py-12">
      <div className="bg-white rounded-3xl p-12">
        <div className="flex items-center gap-x-4">
          <Logo />
          <Paragraph variant="secondary">
            {t('logo_text')} <Highlight>{t('logo_text1')}</Highlight>
          </Paragraph>
        </div>
        <div className="flex items-center flex-col lg:flex-row gap-x-36 gap-y-36 mt-12">
          <div className="space-y-8">
            <Heading level="2" className="font-medium !text-black">
              {t('heading')} <Highlight>{t('heading2')}</Highlight> {t('heading3')}
            </Heading>
            <Paragraph variant="secondary">
              {t('paragraph')}
            </Paragraph>
            <Button variant="primary">{t('button_text')}</Button>
          </div>
          <div className="shrink-0 relative">
            <Image
              src={officeImage}
              alt="hero"
              className="size-96 h-auto rounded-tr-3xl rounded-bl-3xl"
            />
            <div className="space-y-4 absolute -top-24 lg:top-auto left-1/2 -translate-x-1/2 lg:bg-transparent bg-white bg-opacity-75 p-2 rounded-lg lg:left-0 lg:bottom-14 ">
              {badges.map((badge, index) => (
                <div className="flex items-center gap-x-4" key={index}>
                  <Badge className="w-48">
                    <span className="text-black bg-white rounded-full p-1">
                      <UsersRound size={16} />
                    </span>
                    <div className="flex flex-col gap-y-0.5">
                      <span>{badge.description}</span>
                      <span className="text-secondary">{badge.capacity}</span>
                    </div>
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Description };
