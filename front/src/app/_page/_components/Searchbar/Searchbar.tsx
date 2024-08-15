"use client";
import { MapPin, Search } from "lucide-react";
import { Button } from "../../../../components/common/Button";
import { TextInput } from "../../../../components/common/TextInput";
import "./Searchbar.css";
import { useState, useEffect, useRef } from "react";
import { IOffice } from "../../../../types/types";
import { axiosClient } from "@/lib/api/apiConfig";
import { ScrollArea } from "@/components/common/scroll-area";
import Link from "next/link";
import { Paragraph } from "@/components/common/Paragraph";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const [country, setCountry] = useState("");
  const [offices, setOffices] = useState<IOffice[]>([]);
  const [showDropdown, setShowDropdown] = useState(false); // Nueva variable de estado para controlar el dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data && data.address && data.address.country) {
              setCountry(data.address.country);
            }
          })
          .catch((error) =>
            console.error("Error al geocodificar la ubicación:", error)
          );
      });
    } else {
      console.error("Geolocalización no es soportada por este navegador.");
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setCountry(inputValue);
  };

  const fetchOffices = async (query: string) => {
    try {
      const response = await axiosClient.get("/offices", {
        params: { location: query },
      });
      setOffices(response.data);
    } catch (error) {
      console.error("Error al traer oficinas:", error);
    }
  };

  const handleSubmit = async () => {
    await fetchOffices(country);
    setShowDropdown(true); // Mostrar el dropdown al hacer clic en Buscar
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false); // Ocultar el dropdown si se hace clic fuera
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center gap-x-4 relative">
      <div className="relative w-full max-w-80">
        <TextInput
          type="text"
          placeholder="Ingresa tu país"
          className="w-full text-white"
          value={country}
          onChange={handleInputChange}
        />
        <Search
          size={16}
          className="text-secondary absolute right-4 top-1/2 -translate-y-1/2"
        />
      </div>
      <Button variant="primary" onClick={handleSubmit}>
        Buscar
      </Button>

      {showDropdown && (
        <div className="absolute top-14 z-10 shadow-lg" ref={dropdownRef}>
          <ScrollArea className="bg-background border-primary border rounded-md p-4 h-[15rem]">
            {offices.length > 0 ? (
              <ul>
                {offices.map((office, index) => (
                  <li
                    key={index}
                    className="text-secondary p-3 border-b cursor-pointer"
                  >
                    <Link
                      href={`/rooms/${office.id}`}
                      className="flex gap-2 hover:text-white duration-500"
                    >
                      <MapPin />
                      <Paragraph
                        variant="secondary"
                        className="hover:text-white duration-500 truncate w-[30rem] text-sm"
                      >
                        {office.name} - {office.description}
                      </Paragraph>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="w-[30rem]">
                <div className="p-3 flex justify-center">
                  <Paragraph variant="secondary">
                    No se encontraron oficinas en tu ubicación. <br />
                    <Link href={`/rooms`} className="flex justify-center mt-5">
                      <Paragraph
                        variant="primary"
                        className="!text-primary border-b-primary border-b"
                      >
                        Ver todas las oficinas
                      </Paragraph>
                    </Link>
                  </Paragraph>
                </div>
                <div></div>
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export { Searchbar };
