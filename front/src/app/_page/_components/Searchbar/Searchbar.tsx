import { Search } from "lucide-react";
import { Button } from "../../../../components/common/Button";
import { TextInput } from "../../../../components/common/TextInput";
import { useTranslations } from "next-intl";
import "./Searchbar.css";

const Searchbar = () => {
  const t = useTranslations('Searchbar');

  return (
    <div className="flex items-center gap-x-4">
      <div className="relative w-full max-w-80">
        <TextInput
          type="text"
          placeholder={t("placeholder")}
          className="w-full border-gradient text-white"
        />
        <Search
          size={16}
          className="text-secondary absolute right-4 top-1/2 -translate-y-1/2"
        />
      </div>
      <Button variant="primary">{t("button_text")}</Button>
    </div>
  );
};

export { Searchbar };
<Search />;
