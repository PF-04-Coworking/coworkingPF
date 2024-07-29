interface FormValues {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  lastname?: string;
}

const validateRegister = (values: FormValues) => {
  const errors: FormValues = {};

  if (!values.email) {
    errors.email = "Ingresa tu Email";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Ingresa un Email valido (ejemplo@mail.com)";
  } else if (values.email.length > 35) {
    errors.email = "El Email excede el limite de caracteres";
  }

  if (!values.password || values.password.length < 8) {
    errors.password = "La contraseña debe tener minimo 8 caractares";
  } else if (!/\d/.test(values.password)) {
    errors.password = "La contraseña debe tener al menos 1 número";
  } else if (values.password.length > 35) {
    errors.password = "La contraseña excede el limite de caracteres";
  }

  if (!values.name || values.name.length < 4) {
    errors.name = "El nombre tiene que tener minimo 4 caracteres";
  } else if (values.name.length > 35) {
    errors.name = "El nombre excede el limite de caracteres";
  }

  if (!values.lastname || values.lastname.length < 4) {
    errors.lastname = "El apellido tiene que tener minimo 4 caracteres";
  } else if (values.lastname.length > 35) {
    errors.lastname = "El nombre excede el limite de caracteres";
  }

  const phone = /^\+?[0-9]*$/;
  if (!values.phone) {
    errors.phone = "Ingresa tu número de teléfono";
  } else if (!phone.test(values.phone)) {
    errors.phone =
      "Ingresa un número de teléfono válido (solo números y un '+' opcional al inicio)";
  } else if (values.phone.length < 6) {
    errors.phone = "Ingresa un número valido";
  }

  return errors;
};

export default validateRegister;
