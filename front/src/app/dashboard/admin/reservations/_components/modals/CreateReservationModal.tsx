import { Button } from "@/components/common/Button";
import { useState } from "react";

const CreateReservationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-shrink-0">
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Crear reserva
      </Button>
    </div>
  );
};

export { CreateReservationModal };
