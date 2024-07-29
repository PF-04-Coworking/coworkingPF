import { TextInput } from "@/components/common/TextInput";
import { Header } from "../_page/_components/HeaderSection";
import { SearchIcon } from "lucide-react";
import CardAdd from "@/components/dashboard/cardAdd";
import Offices from "@/helpers/data";
import CardOffice from "@/components/dashboard/cardOffice";

const rooms = () => {
  return (
<>
<Header />

<div className="font-sans">
        <div className="rounded-md">
          <div className="flex justify-between mb-8">
            <div className="flex-1 relative">
              <TextInput
                type="search"
                placeholder="Buscar oficinas..."
                className="w-full pl-10 border-gradient py-2 focus:outline-none text-white"
              />
              <SearchIcon
                size={20}
                className="text-white absolute left-3 top-1/2 -translate-y-1/2"
              />
            </div>
            <CardAdd />
          </div>

          <div className="w-full lg:grid-cols-2 grid gap-10 md:grid-cols-2 grid-cols-1">
            {Offices.map((office, index) => (
              <CardOffice
                key={index}
                url={office.url}
                nombre={office.nombre}
                direccion={office.direccion}
              />
            ))}
          </div>
        </div>
      </div>
</>
  );
};

export default rooms;