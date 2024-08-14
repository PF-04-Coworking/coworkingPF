import { Heading } from "@/components/common/Heading";
import { Paragraph } from "../../../../components/common/Paragraph";
import officeImage from "@/../public/images/office-1.png";
import "./Hero.css";
import Image from "next/image";
import { Check, Clock, Lock } from "lucide-react";
import { Searchbar } from "../Searchbar/Searchbar";
import { Badge } from "../../../../components/common/Badge";
import { useTranslations } from "next-intl";

const Hero = () => {
const t = useTranslations('hero');

const features = [
  t('features.feature1'),
  t('features.feature2'),
  t('features.feature3'),
  t('features.feature4'),
];

const badges = [
  { text: t("badges.safe_payment"), icon: <Lock size={16} /> },
  { text: t("badges.easy_to_use"), icon: <Check size={16} /> },
  { text: t("badges.instant"), icon: <Clock size={16} /> },
];

  return (
    <div className="layout flex items-center pt-32 md:pt-36 pb-12 space-x-10">
      <div className="space-y-6">
        <Heading level="2" className="uppercase">
          {t('coworking')}
        </Heading>
        <Heading level="1" className="uppercase text-gradient w-min font-[Clash] font-bold tracking-[1rem]">
          {t('relux')}
        </Heading>
        <Paragraph variant="primary">
          {t('primary_text')}
        </Paragraph>
        <Paragraph variant="secondary">
          {t('secondary_text')}
        </Paragraph>
        <div className="flex gap-x-4">
          {features.map((feature) => (
            <Paragraph
              variant="secondary"
              size="xs"
              key={feature}
              className="flex items-center gap-x-2"
            >
              <Check size={16} className="text-white" />
              {feature}
            </Paragraph>
          ))}
        </div>
        <div className="space-y-2">
          <Paragraph variant="primary">
            {t('search_prompt')}
          </Paragraph>
          <Searchbar />
          <Paragraph variant="secondary" size="xs">
            {t('privacy_policy')} <span className="text-white">{t('privacy_policy1')}</span>
          </Paragraph>
        </div>
      </div>
      <div className="shrink-0 relative hidden lg:block">
        <Image
          src={officeImage}
          alt="hero"
          className="size-96 h-auto rounded-tl-3xl rounded-br-3xl"
        />
        <div className="absolute top-4 right-4 flex gap-x-2">
          {badges.map((badge, index) => (
            <Badge key={index} className="shrink-0">
              <span className="text-primary">{badge.icon}</span> {badge.text}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Hero };
