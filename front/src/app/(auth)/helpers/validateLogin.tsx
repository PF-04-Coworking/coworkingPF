interface FormValues {
  email?: string;
  password?: string;
}

const validateLogin = (values: FormValues) => {
  const errors: FormValues = {};

  if (!values.email) {
    errors.email = "Ingresa tu correo electrónico";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Ingresa un correo electrónico válido (ejemplo@mail.com)";
  }

  if (!values.password || values.password.length < 8) {
    errors.password = "La contraseña debe tener minimo 8 caracteres";
  } else if (!/\d/.test(values.password)) {
    errors.password = "La contraseña debe tener al menos 1 número";
  }

  return errors;
};

export { validateLogin };
