import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { Button } from "@/components/common/Button";
import { DialogFooter } from "@/components/common/Dialog";
import { FieldValidate } from "@/components/common/FieldValidate";
import { InputLabel } from "@/components/common/InputLabel";
import { apiReservations } from "@/lib/api/reservations/apiReservations";
import { utcDateFormatter } from "@/lib/utils/dateUtils";
import { IReservation } from "@/types/types";
import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const EditReservationForm = ({
  reservation,
}: {
  reservation: IReservation;
}) => {
  const { authToken } = useAuthStore();

  console.log(reservation);

  const validationSchema = Yup.object({
    start_day: Yup.date().required("Debes ingresar una fecha"),
    end_day: Yup.date().required("Debes ingresar una fecha"),
    guests_number: Yup.number().required("Debes ingresar un número"),
  });

  const handleSubmit = async (
    values: Partial<IReservation>,
    { resetForm }: FormikHelpers<Partial<IReservation>>
  ) => {
    if (!authToken) return;
    const formattedValues = {
      ...values,
      start_day: values.start_day,
      end_day: values.end_day,
    };
    console.log(formattedValues);
    const promise = apiReservations.updateReservation(
      authToken,
      reservation.id,
      formattedValues
    );
    toast.promise(promise, {
      pending: "Actualizando...",
      success: "Actualizado exitosamente",
      error: "Error",
    });
    resetForm({ values });
  };

  return (
    <Formik
      initialValues={{
        start_day: reservation.start_day,
        end_day: reservation.end_day,
        guests_number: reservation.guests_number,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, dirty }: any) => (
        <Form>
          <div className="grid gap-8">
            <div className="grid gap-2">
              <InputLabel htmlFor="name">Fecha de inicio</InputLabel>
              <FieldValidate
                type="text"
                name="start_day"
                className="rounded-md py-3 mt-1 text-md w-full bg-inherit text-white border focus:outline-none px-3 border-primary text-sm"
              />
            </div>
            <div className="grid gap-2">
              <InputLabel htmlFor="location">Fecha de finalización</InputLabel>
              <FieldValidate
                type="text"
                name="end_day"
                className="rounded-md py-3 mt-1 text-md w-full bg-inherit text-white border focus:outline-none border-primary px-3 text-sm"
              />
            </div>
            <div className="grid gap-2">
              <InputLabel htmlFor="capacity">Número de invitados</InputLabel>
              <FieldValidate
                type="number"
                name="guests_number"
                className="rounded-md py-3 mt-1 text-md w-full bg-inherit text-white border focus:outline-none border-primary px-3 text-sm"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2 mt-8">
            <Button
              variant="primary"
              className="w-full"
              type="submit"
              disabled={isSubmitting || !dirty}
            >
              Confirmar
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="w-full"
              // onClick={() => handleDeleteOffice({ id: selectedOffice.id })}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </Form>
      )}
    </Formik>
  );
};

export default EditReservationForm;
