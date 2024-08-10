"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IOffice } from "../../../types/types";
import { apiOffices } from "@/lib/api/offices/apiOffices";

const useFetchOfficeById = ({ params }: { params: { id: string } }) => {
  const [office, setOffice] = useState<IOffice | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOfficeById = async () => {
      try {
        const response = await apiOffices.getOfficeById(params.id);
        setOffice(response);
      } catch (error) {
        console.log(error);
        router.push("/not-found");
      }
    };
    fetchOfficeById();
  }, [params.id, router]);

  return { office, setOffice };
};

export { useFetchOfficeById };
3;
