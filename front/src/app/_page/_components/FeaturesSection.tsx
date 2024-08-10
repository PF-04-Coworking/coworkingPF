import { Card } from "@/components/common/Card";
import { CustomLink } from "@/components/common/CustomLink";
import { Heading } from "@/components/common/Heading";
import { Highlight } from "@/components/common/Highlight";
import { Paragraph } from "@/components/common/Paragraph";
import { useTranslations } from "next-intl";
import {
  BriefcaseBusiness,
  Building,
  CircleDollarSign,
  MapPin,
  MoveRight,
  PackagePlus,
  Share,
} from "lucide-react";

const Features = () => {
  const t = useTranslations("FeaturesSection");

  const features = [
    {
      icon: <MapPin size={20} />,
      title: t("features.title1"),
      description: t("features.description1"),
    },
    {
      icon: <Building size={20} />,
      title: t("features.title2"),
      description: t("features.description2"),
    },
    {
      icon: <BriefcaseBusiness size={20} />,
      title: t("features.title3"),
      description: t("features.description3"),
    },
    {
      icon: <PackagePlus size={20} />,
      title: t("features.title4"),
      description: t("features.description4"),
    },
    {
      icon: <CircleDollarSign size={20} />,
      title: t("features.title5"),
      description: t("features.description5"),
    },
    {
      icon: <Share size={20} />,
      title: t("features.title6"),
      description: t("features.description6"),
    },
  ];

  return (
    <div className="layout space-y-12 py-12">
      <div className="space-y-12 text-center">
        <Heading level="2" className="font-medium">
          {t("header1")} <Highlight>{t("header2")}</Highlight>?
        </Heading>
        <Paragraph variant="secondary" className="max-w-lg mx-auto">
          {t("intro")}
        </Paragraph>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            variant={index % 2 === 0 ? "1" : "2"}
            className="space-y- space-y-4"
          >
            <div
              className={`flex items-center gap-x-3 ${
                index % 2 === 0 ? "text-black" : "text-white"
              }`}
            >
              {feature.icon}
              {feature.title}
            </div>
            <Paragraph
              variant="primary"
              size="sm"
              className={index % 2 !== 0 ? "!text-secondary" : ""}
            >
              {feature.description}
            </Paragraph>
            <CustomLink
              href="#"
              className={`flex items-center gap-x-3 ${
                index % 2 !== 0 ? "text-white" : "!text-black"
              }`}
            >
              <Paragraph
                variant="primary"
                className={index % 2 !== 0 ? "text-white" : "!text-black"}
              >
                {t("discover_more")}
              </Paragraph>
              <MoveRight size={20} />
            </CustomLink>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { Features };
