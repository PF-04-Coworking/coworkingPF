import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { Button } from "@/components/common/Button";
import { DialogFooter } from "@/components/common/Dialog";
import { FieldValidate } from "@/components/common/FieldValidate";
import { InputLabel } from "@/components/common/InputLabel";
import { apiReservations } from "@/lib/api/reservations/apiReservations";
import { stringToDate, utcDateFormatter } from "@/lib/utils/dateUtils";
import { IFullReservation } from "@/types/types";
import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useReservationsStore } from "../_stores/useReservationsStore";
import { CancelReservation } from "./CancelReservation";

const EditReservationForm = ({
  reservation,
}: {
  reservation: IFullReservation;
}) => {
  const { updateReservation } = useReservationsStore();
  const { authToken } = useAuthStore();

  const validationSchema = Yup.object({
    start_day: Yup.string().required("Debes ingresar una fecha"),
    end_day: Yup.string().required("Debes ingresar una fecha"),
    guests_number: Yup.number().required("Debes ingresar un número"),
  });

  const handleSubmit = async (
    values: Partial<IFullReservation>,
    { resetForm }: FormikHelpers<Partial<IFullReservation>>
  ) => {
    if (!authToken || !values.start_day || !values.end_day) return;
    const formattedValues = {
      ...values,
      start_day: stringToDate(values.start_day),
      end_day: stringToDate(values.end_day),
    };
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
    const _reservation = await promise;
    console.log(_reservation);
    updateReservation(reservation.id, formattedValues);
  };

  return (
    <Formik
      initialValues={{
        start_day: utcDateFormatter(reservation.start_day),
        end_day: utcDateFormatter(reservation.end_day),
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
              className="w-1/2"
              type="submit"
              disabled={isSubmitting || !dirty}
            >
              Confirmar
            </Button>
            <CancelReservation />
          </DialogFooter>
        </Form>
      )}
    </Formik>
  );
};

export default EditReservationForm;
