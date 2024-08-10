import { Search } from "lucide-react";
import { Button } from "../../../../components/common/Button";
import { TextInput } from "../../../../components/common/TextInput";
import "./Searchbar.css";

const Searchbar = () => {
  return (
    <div className="flex items-center gap-x-4">
      <div className="relative w-full max-w-80">
        <TextInput
          type="text"
          placeholder="Ingresa tu ciudad"
          className="w-full text-white"
        />
        <Search
          size={16}
          className="text-secondary absolute right-4 top-1/2 -translate-y-1/2"
        />
      </div>
      <Button variant="primary">Buscar</Button>
    </div>
  );
};

export { Searchbar };
<Search />;
