import * as nodemailer from 'nodemailer';
import { config as dotenvConfig } from 'dotenv';

// Cargar las variables de entorno desde el archivo .development.env
dotenvConfig({ path: '.development.env' });

// Crear el transportador de nodemailer
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Usar `true` para el puerto 465, `false` para todos los demás puertos
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

// Verificar la configuración del transportador
transporter
  .verify()
  .then(() => {
    console.log('NodeMailer ready');
  })
  .catch((error) => {
    console.error('Error verifying transporter:', error);
  });
