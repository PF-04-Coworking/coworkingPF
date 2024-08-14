import { Heading } from "@/components/common/Heading";
import { Highlight } from "@/components/common/Highlight";
import { Paragraph } from "@/components/common/Paragraph";
import { useTranslations } from "next-intl";

const CallToAction = () => {
const t = useTranslations('CallToActionSection');

  return (
    <div className="layout text-center space-y-12 py-12">
      <Heading level="2">
        {t('heading')} <Highlight>{t('heading1')}</Highlight>. {t('heading2')}
      </Heading>
      <Paragraph variant="secondary" className="max-w-xl mx-auto">
        {t('paragraph')}
      </Paragraph>
    </div>
  );
};

export { CallToAction };
