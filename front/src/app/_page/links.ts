import { useTranslations } from "next-intl";

const useLinks = () => {
  const t = useTranslations("links");

  return [
    { name: t("home"), href: "/" },
    { name: t("offices"), href: "/rooms" },
    { name: t("about_us"), href: "#" },
    { name: t("contact"), href: "#" },
  ];
};

export { useLinks };
